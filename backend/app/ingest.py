"""
Data Ingestion Script for Dx9029 RAG Chatbot (Local FAISS Vector DB).

Reads the knowledge base markdown, splits it into chunks,
generates embeddings via Google gemini-embedding-2 API,
and saves a local FAISS index file to backend/data/faiss_index.

Usage:
    cd backend
    python -m app.ingest
"""

from langchain_text_splitters import RecursiveCharacterTextSplitter
from langchain_community.vectorstores import FAISS

from . import config
from .rag_engine import get_embeddings_for_ingest


def load_knowledge_base() -> str:
    """Read the knowledge base markdown file."""
    kb_path = config.KNOWLEDGE_BASE_PATH
    if not kb_path.exists():
        raise FileNotFoundError(f"Knowledge base not found at: {kb_path}")
    return kb_path.read_text(encoding="utf-8")


def chunk_text(text: str) -> list:
    """Split text into overlapping chunks for embedding."""
    splitter = RecursiveCharacterTextSplitter(
        chunk_size=config.CHUNK_SIZE,
        chunk_overlap=config.CHUNK_OVERLAP,
        separators=["\n---\n", "\n## ", "\n### ", "\n\n", "\n", " ", ""],
    )
    chunks = splitter.create_documents([text])
    return chunks


def ingest():
    """Main ingestion pipeline for Local FAISS Store."""
    missing = config.validate_config()
    if missing:
        raise RuntimeError(
            f"Missing required environment variables: {', '.join(missing)}. "
            f"Copy .env.example to .env and fill in your API keys."
        )

    print("=" * 60)
    print("Dx9029 — Local Knowledge Base Ingestion (FAISS)")
    print("=" * 60)

    # Step 1: Load knowledge base
    print("\n[1/3] Loading knowledge base...")
    text = load_knowledge_base()
    print(f"  Loaded {len(text)} characters from {config.KNOWLEDGE_BASE_PATH.name}")

    # Step 2: Chunk text
    print("\n[2/3] Splitting into chunks...")
    chunks = chunk_text(text)
    print(f"  Created {len(chunks)} chunks (size={config.CHUNK_SIZE}, overlap={config.CHUNK_OVERLAP})")

    # Step 3: Embed and save to Local FAISS
    print("\n[3/3] Generating embeddings & saving Local FAISS index...")
    embeddings = get_embeddings_for_ingest()

    vector_store = FAISS.from_documents(chunks, embeddings)
    
    # Save index locally
    config.VECTORSTORE_DIR.mkdir(parents=True, exist_ok=True)
    vector_store.save_local(folder_path=str(config.VECTORSTORE_DIR))

    print(f"\n{'=' * 60}")
    print(f"Successfully ingested {len(chunks)} chunks into Local FAISS DB!")
    print(f"   Directory: {config.VECTORSTORE_DIR}")
    print(f"   Embedding model: {config.EMBEDDING_MODEL}")
    print(f"{'=' * 60}")


if __name__ == "__main__":
    ingest()

