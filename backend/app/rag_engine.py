"""
RAG Engine for Dx9029 Portfolio Chatbot.

Pipeline:
  Query → HuggingFace Embedding → Pinecone Vector Search (Top-K)
  → Retrieved Chunks + System Prompt → Gemini 2.5 Flash → Answer
"""

from langchain_huggingface import HuggingFaceEmbeddings
from langchain_pinecone import PineconeVectorStore
from langchain_google_genai import ChatGoogleGenerativeAI
from langchain.chains import RetrievalQA
from langchain.prompts import PromptTemplate
from pinecone import Pinecone

from . import config

# ── System Prompt ────────────────────────────────────────────────
SYSTEM_PROMPT_TEMPLATE = """You are Dx9029, a friendly and professional AI assistant for Dương Quốc Vinh's (Vinh Duong) portfolio website.

Your role is to help visitors (recruiters, employers, collaborators) learn about Vinh's background, skills, projects, experience, and contact information.

Rules:
1. Answer ONLY based on the provided context. If the answer is not in the context, say "I don't have that specific information, but you can reach out to Vinh directly at duongquocvinh9029@gmail.com or via Zalo: 0559149285".
2. Be concise, professional, and helpful.
3. Reply in the SAME LANGUAGE as the user's question (Vietnamese or English).
4. When listing projects or skills, format them nicely.
5. Always be positive and highlight Vinh's strengths.
6. If asked about hiring/availability, mention that Vinh is currently open for internships.

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


def get_embeddings() -> HuggingFaceEmbeddings:
    """Get or create the HuggingFace embedding model (singleton)."""
    global _embeddings
    if _embeddings is None:
        _embeddings = HuggingFaceEmbeddings(
            model_name=config.EMBEDDING_MODEL,
            model_kwargs={"device": "cpu"},
            encode_kwargs={"normalize_embeddings": True},
        )
    return _embeddings


def get_vector_store() -> PineconeVectorStore:
    """Get or create the Pinecone vector store (singleton)."""
    global _vector_store
    if _vector_store is None:
        # Initialize Pinecone client
        pc = Pinecone(api_key=config.PINECONE_API_KEY)
        index = pc.Index(config.PINECONE_INDEX_NAME)

        _vector_store = PineconeVectorStore(
            index=index,
            embedding=get_embeddings(),
            text_key="text",
        )
    return _vector_store


def get_qa_chain() -> RetrievalQA:
    """Get or create the RAG QA chain (singleton)."""
    global _qa_chain
    if _qa_chain is None:
        llm = ChatGoogleGenerativeAI(
            model=config.GEMINI_MODEL,
            google_api_key=config.GOOGLE_API_KEY,
            temperature=0.3,
            convert_system_message_to_human=True,
        )

        retriever = get_vector_store().as_retriever(
            search_type="similarity",
            search_kwargs={"k": config.RETRIEVAL_TOP_K},
        )

        _qa_chain = RetrievalQA.from_chain_type(
            llm=llm,
            chain_type="stuff",
            retriever=retriever,
            return_source_documents=False,
            chain_type_kwargs={"prompt": PROMPT},
        )
    return _qa_chain


async def ask(question: str) -> str:
    """
    Run the RAG pipeline: embed the question, retrieve relevant chunks
    from Pinecone, and generate an answer with Gemini.
    """
    chain = get_qa_chain()
    result = chain.invoke({"query": question})
    return result.get("result", "Sorry, I couldn't generate an answer.")
