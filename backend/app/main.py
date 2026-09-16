"""
FastAPI server for Dx9029 RAG Chatbot.

Endpoints:
  GET  /health     — Health check
  POST /api/chat   — Chat with the RAG chatbot
  POST /api/ingest — Re-ingest knowledge base (protected)
"""

from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

from . import config
from .rag_engine import ask
from .ingest import ingest as run_ingest

# ── App Initialization ───────────────────────────────────────────
app = FastAPI(
    title="Dx9029 — Portfolio RAG Chatbot",
    description="AI-powered chatbot for Dương Quốc Vinh's portfolio website",
    version="1.0.0",
)

# ── CORS (allow frontend to call this API) ───────────────────────
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",
        "http://127.0.0.1:3000",
        "http://localhost:5173",
        "http://127.0.0.1:5173",
        "http://localhost:4173",
        "http://127.0.0.1:4173",
        "https://dquocvinh.github.io",
        "https://dquocvinh.github.io/",
        "https://vinh9029.github.io",
        "https://vinh9029.github.io/",
    ],
    allow_origin_regex=r"https://.*\.github\.io",
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
async def root():
    return {"message": "Dx9029 Portfolio RAG API Service is running."}


# ── Request / Response Models ────────────────────────────────────
class ChatRequest(BaseModel):
    message: str


class ChatResponse(BaseModel):
    response: str


# ── Endpoints ────────────────────────────────────────────────────
@app.get("/health")
async def health_check():
    """Health check endpoint for monitoring and uptime services."""
    missing = config.validate_config()
    return {
        "status": "healthy" if not missing else "degraded",
        "service": "dx9029-rag-chatbot",
        "model": config.GEMINI_MODEL,
        "embedding": config.EMBEDDING_MODEL,
        "missing_config": missing,
    }


@app.post("/api/chat", response_model=ChatResponse)
async def chat(request: ChatRequest):
    """
    Chat with the RAG chatbot.
    Receives a user message, retrieves relevant context from Pinecone,
    and generates a response using Gemini.
    """
    if not request.message.strip():
        raise HTTPException(status_code=400, detail="Message cannot be empty.")

    # Validate API keys are configured
    missing = config.validate_config()
    if missing:
        raise HTTPException(
            status_code=503,
            detail=f"Service not fully configured. Missing: {', '.join(missing)}",
        )

    try:
        answer = await ask(request.message.strip())
        return ChatResponse(response=answer)
    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=f"An error occurred while processing your request: {str(e)}",
        )


@app.post("/api/ingest")
async def ingest_endpoint(secret: str = ""):
    """
    Re-ingest the knowledge base into Pinecone.
    Protected by a simple secret key (set INGEST_SECRET env var).
    """
    import os

    expected_secret = os.getenv("INGEST_SECRET", "dx9029-ingest")
    if secret != expected_secret:
        raise HTTPException(status_code=403, detail="Invalid secret.")

    try:
        run_ingest()
        return {"status": "success", "message": "Knowledge base re-ingested."}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
