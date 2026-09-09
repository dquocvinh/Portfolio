"""
Data Ingestion Script for Dx9029 RAG Chatbot.

Reads the knowledge base markdown, splits it into chunks,
generates embeddings via Google text-embedding-004 API,
and upserts into Pinecone.

NOTE: text-embedding-004 produces 768-dimension vectors.
If migrating from all-MiniLM-L6-v2 (384-dim), you MUST:
  1. Delete the existing Pinecone index (dimension mismatch)
  2. Run this ingest script to recreate with 768-dim vectors

Usage:
    cd backend
    python -m app.ingest
"""

from langchain_text_splitters import RecursiveCharacterTextSplitter
from langchain_pinecone import PineconeVectorStore
from pinecone import Pinecone, ServerlessSpec

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


def ensure_pinecone_index():
    """Create the Pinecone index if it doesn't exist."""
    pc = Pinecone(api_key=config.PINECONE_API_KEY)
    existing_indexes = [idx.name for idx in pc.list_indexes()]

    if config.PINECONE_INDEX_NAME not in existing_indexes:
        print(f"Creating Pinecone index: {config.PINECONE_INDEX_NAME}")
        pc.create_index(
            name=config.PINECONE_INDEX_NAME,
            dimension=3072,  # Google gemini-embedding-2 output dimension
            metric="cosine",
            spec=ServerlessSpec(cloud="aws", region="us-east-1"),
        )
        print("Index created successfully!")
    else:
        print(f"Index '{config.PINECONE_INDEX_NAME}' already exists.")


def ingest():
    """Main ingestion pipeline."""
    # Validate config
    missing = config.validate_config()
    if missing:
        raise RuntimeError(
            f"Missing required environment variables: {', '.join(missing)}. "
            f"Copy .env.example to .env and fill in your API keys."
        )

    print("=" * 60)
    print("Dx9029 — Knowledge Base Ingestion")
    print("=" * 60)

    # Step 1: Ensure Pinecone index exists
    print("\n[1/4] Checking Pinecone index...")
    ensure_pinecone_index()

    # Step 2: Load knowledge base
    print("\n[2/4] Loading knowledge base...")
    text = load_knowledge_base()
    print(f"  Loaded {len(text)} characters from {config.KNOWLEDGE_BASE_PATH.name}")

    # Step 3: Chunk text
    print("\n[3/4] Splitting into chunks...")
    chunks = chunk_text(text)
    print(f"  Created {len(chunks)} chunks (size={config.CHUNK_SIZE}, overlap={config.CHUNK_OVERLAP})")

    # Step 4: Embed and upsert to Pinecone
    print("\n[4/4] Embedding and upserting to Pinecone...")
    embeddings = get_embeddings_for_ingest()

    pc = Pinecone(api_key=config.PINECONE_API_KEY)
    index = pc.Index(config.PINECONE_INDEX_NAME)

    # Clear existing vectors before re-ingesting
    try:
        index.delete(delete_all=True)
        print("  Cleared existing vectors.")
    except Exception:
        print("  No existing vectors to clear (or namespace empty).")

    # Upsert new vectors
    PineconeVectorStore.from_documents(
        documents=chunks,
        embedding=embeddings,
        index_name=config.PINECONE_INDEX_NAME,
    )

    print(f"\n{'=' * 60}")
    print(f"Successfully ingested {len(chunks)} chunks into Pinecone!")
    print(f"   Index: {config.PINECONE_INDEX_NAME}")
    print(f"   Embedding model: {config.EMBEDDING_MODEL}")
    print(f"{'=' * 60}")


if __name__ == "__main__":
    ingest()
