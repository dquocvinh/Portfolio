"""
RAG Engine for Dx9029 Portfolio Chatbot.

Pipeline:
  Query → Google text-embedding-004 API → Pinecone Vector Search (Top-K)
  → Retrieved Chunks + System Prompt → Gemini Flash → Answer

Switching from HuggingFace (local CPU model) to Google Embedding API:
- No model download or warm-up needed on cold start
- ~50% faster embedding vs. all-MiniLM-L6-v2 on CPU
- API-based: latency ~100-200ms per embed call vs. 1-3s local inference
- Requires GOOGLE_API_KEY (same key used for Gemini)
- Output dimension: 768 (vs. 384 for MiniLM) — Pinecone index must be re-created
"""

from langchain_google_genai import GoogleGenerativeAIEmbeddings, ChatGoogleGenerativeAI
from langchain_pinecone import PineconeVectorStore
from langchain_core.prompts import PromptTemplate
from langchain_core.runnables import RunnablePassthrough
from langchain_core.output_parsers import StrOutputParser
from pinecone import Pinecone

from . import config

# ── System Prompt ────────────────────────────────────────────────
SYSTEM_PROMPT_TEMPLATE = """You are Dx9029, a friendly and professional AI assistant for Dương Quốc Vinh's (Vinh Duong) portfolio website.

Your role is to help visitors (recruiters, employers, collaborators) learn about Vinh's background, skills, projects, experience, and contact information.

Rules:
1. Answer ONLY based on the provided context. If the answer is not in the context, politely state that you don't have that specific information, but they can reach out to Vinh directly via Email: duongquocvinh9029@gmail.com or Zalo: 0559149285.
2. Be concise, professional, and helpful.
3. CRITICAL: You MUST reply in the EXACT SAME LANGUAGE as the user's question. If the user asks in Vietnamese, your entire response must be in Vietnamese. If in English, reply in English.
4. When formatting text, use standard Markdown: use double asterisks for bold (e.g., **Bằng cấp:** Cử nhân...) and single asterisks for italics (e.g., *Trường:* TDTU). Do NOT output single orphan asterisks like "Bằng cấp*:".
5. Format lists nicely with bullet points (`•` or `-`).
6. Always be positive and highlight Vinh's strengths.
7. If asked about hiring/availability, mention that Vinh is currently open for internships.

Context from portfolio:
{context}

Question: {question}

Helpful Answer:"""

PROMPT = PromptTemplate(
    template=SYSTEM_PROMPT_TEMPLATE,
    input_variables=["context", "question"],
)


# ── Singleton instances ──────────────────────────────────────────
_embeddings = None
_vector_store = None
_qa_chain = None


def get_embeddings() -> GoogleGenerativeAIEmbeddings:
    """
    Get or create Google Generative AI Embeddings (singleton).

    Uses text-embedding-004 via Google API — no local model download needed.
    This eliminates the ~5-10s cold start from loading HuggingFace weights on CPU.
    """
    global _embeddings
    if _embeddings is None:
        _embeddings = GoogleGenerativeAIEmbeddings(
            model=config.EMBEDDING_MODEL,
            google_api_key=config.GOOGLE_API_KEY,
            task_type="retrieval_query",
        )
    return _embeddings


def get_embeddings_for_ingest() -> GoogleGenerativeAIEmbeddings:
    """
    Google embeddings configured for document ingestion (task_type differs for storage vs. query).
    """
    return GoogleGenerativeAIEmbeddings(
        model=config.EMBEDDING_MODEL,
        google_api_key=config.GOOGLE_API_KEY,
        task_type="retrieval_document",
    )


def get_vector_store() -> PineconeVectorStore:
    """Get or create the Pinecone vector store (singleton)."""
    global _vector_store
    if _vector_store is None:
        pc = Pinecone(api_key=config.PINECONE_API_KEY)
        index = pc.Index(config.PINECONE_INDEX_NAME)

        _vector_store = PineconeVectorStore(
            index=index,
            embedding=get_embeddings(),
            text_key="text",
        )
    return _vector_store


def format_docs(docs) -> str:
    """Format retrieved documents into a single text block."""
    return "\n\n".join(doc.page_content for doc in docs)


def get_qa_chain():
    """Get or create the RAG QA chain (singleton) using LCEL."""
    global _qa_chain
    if _qa_chain is None:
        llm = ChatGoogleGenerativeAI(
            model=config.GEMINI_MODEL,
            google_api_key=config.GOOGLE_API_KEY,
            temperature=0.3,
        )

        retriever = get_vector_store().as_retriever(
            search_type="similarity",
            search_kwargs={"k": config.RETRIEVAL_TOP_K},
        )

        _qa_chain = (
            {"context": retriever | format_docs, "question": RunnablePassthrough()}
            | PROMPT
            | llm
            | StrOutputParser()
        )
    return _qa_chain


async def ask(question: str) -> str:
    """
    Run the RAG pipeline (fully async — non-blocking):
      1. Embed user question via Google gemini-embedding-2 API (~200-400ms)
      2. Cosine similarity search on Pinecone Top-K chunks (~100-300ms)
      3. Build prompt: system context + retrieved chunks + user question
      4. Gemini Flash Lite LLM generates the final response (~500ms-2s)
    """
    chain = get_qa_chain()
    # Use ainvoke (async) so we don't block the FastAPI event loop
    result = await chain.ainvoke(question)
    return result if isinstance(result, str) else str(result)
