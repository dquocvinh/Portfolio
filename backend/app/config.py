"""
Configuration module for Dx9029 RAG Chatbot.
Loads environment variables for Pinecone, Gemini, and HuggingFace.
"""

import os
from pathlib import Path
from dotenv import load_dotenv

# Load .env file from the backend root directory
_backend_dir = Path(__file__).resolve().parent.parent
load_dotenv(_backend_dir / ".env")

# --- Google Gemini ---
GOOGLE_API_KEY: str = os.getenv("GOOGLE_API_KEY", "")
GEMINI_MODEL: str = os.getenv("GEMINI_MODEL", "gemini-2.5-flash")

# --- Pinecone ---
PINECONE_API_KEY: str = os.getenv("PINECONE_API_KEY", "")
PINECONE_INDEX_NAME: str = os.getenv("PINECONE_INDEX_NAME", "portfolio-rag")

# --- HuggingFace Embeddings ---
EMBEDDING_MODEL: str = os.getenv(
    "EMBEDDING_MODEL", "sentence-transformers/all-MiniLM-L6-v2"
)

# --- Knowledge Base ---
KNOWLEDGE_BASE_PATH: Path = _backend_dir / "data" / "knowledge_base.md"

# --- RAG Parameters ---
CHUNK_SIZE: int = int(os.getenv("CHUNK_SIZE", "500"))
CHUNK_OVERLAP: int = int(os.getenv("CHUNK_OVERLAP", "50"))
RETRIEVAL_TOP_K: int = int(os.getenv("RETRIEVAL_TOP_K", "4"))


def validate_config() -> list[str]:
    """Return a list of missing required config values."""
    missing = []
    if not GOOGLE_API_KEY:
        missing.append("GOOGLE_API_KEY")
    if not PINECONE_API_KEY:
        missing.append("PINECONE_API_KEY")
    return missing
