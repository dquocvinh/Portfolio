# Dx9029 — AI Engineering & Full-stack Portfolio Website

A modern, high-performance portfolio website for **Dương Quốc Vinh (Dx9029)** featuring an **AI RAG Assistant Chatbot** powered by **Gemini 3.6 Flash** and **Pinecone Vector Database**.

Designed with a warm **Cappuccino Yellow-White** editorial theme, built with **Vite + React + TypeScript + Tailwind CSS + Framer Motion**, and backed by a **FastAPI** RAG microservice.

---

## ✨ Features & Architecture

- 🎨 **Cappuccino Design System**: Warm, elegant, editorial palette (`#FAF6EF` cream background, `#C8963E` gold accents, `#6B4C3B` coffee headings) with glassmorphism and subtle animations.
- 🤖 **Dx9029 RAG AI Chatbot**:
  - **Pinecone Vector Search**: Semantic retrieval over full portfolio & resume knowledge base (`all-MiniLM-L6-v2` embeddings).
  - **Gemini 3.6 Flash LLM**: Generates accurate, context-aware answers in both Vietnamese & English.
  - **Smart Token Saver**: Pre-defined local Q&A answers for common questions to eliminate unnecessary LLM token usage.
  - **Markdown Response Formatter**: Renders bold, italics, bullet points, and clean paragraphs nicely.
- 📄 **Interactive Portfolio**: Projects showcase, skills categorization, experience timeline, certificate view modal, and direct contact popups (Zalo, Email).
- 🚀 **Full-stack Setup**: Decoupled architecture allowing independent deployment (Frontend on **GitHub Pages**, Backend on **Render**).

---

## 🛠️ Tech Stack

### Frontend
- **Framework**: React 18 + TypeScript + Vite
- **Styling**: Tailwind CSS, CSS Custom Property tokens
- **Animations**: Framer Motion
- **Icons**: Lucide React

### Backend (AI & RAG Microservice)
- **API Framework**: FastAPI + Uvicorn
- **LLM**: Google Gemini 3.6 Flash (`langchain-google-genai`)
- **Vector DB**: Pinecone (`langchain-pinecone`)
- **Embeddings**: `sentence-transformers/all-MiniLM-L6-v2` (`langchain-huggingface`)
- **Pipeline Orchestration**: LangChain LCEL

---

## 📁 Project Structure

```
Portfolio/
├── run_dev.bat                   # 🚀 Auto-launch script (Venv check, Pip install, Uvicorn & Vite)
├── index.html
├── package.json
├── vite.config.ts
├── tailwind.config.ts
├── src/                          # Frontend Source Code
│   ├── components/
│   │   ├── Navbar.tsx            # Floating scroll-aware navigation
│   │   ├── Hero.tsx              # Hero section with interactive CTA & Zalo popup
│   │   ├── About.tsx             # Profile info & experience cards
│   │   ├── ProjectCard.tsx       # Interactive project showcase
│   │   ├── ChatbotWidget.tsx     # Dx9029 RAG Chatbot UI widget
│   │   ├── CertificateModal.tsx  # Certificate detail viewer
│   │   └── SocialContactPopup.tsx# Quick contact modal (Zalo, Email, Phone)
│   ├── data/                     # Static portfolio content
│   │   ├── projects.json
│   │   ├── certificates.json
│   │   ├── experience.json
│   │   └── skills.json
│   └── styles/
│       ├── index.css
│       └── theme.css
└── backend/                      # RAG Backend Microservice
    ├── requirements.txt
    ├── .env                      # API keys (GOOGLE_API_KEY, PINECONE_API_KEY)
    ├── data/
    │   └── knowledge_base.md    # Portfolio RAG Knowledge Base
    └── app/
        ├── main.py               # FastAPI app & CORS middleware
        ├── config.py             # Environment configurations
        ├── rag_engine.py         # Pinecone + Gemini 3.6 Flash LCEL chain
        └── ingest.py             # Knowledge base chunking & Pinecone upsert script
```

---

## 🚀 Quick Start (Local Development)

### Method 1: Using One-Click Batch Script (Recommended for Windows)

Double click `run_dev.bat` in the project root directory, or run in terminal:

```cmd
.\run_dev.bat
```

This script will automatically:
1. Check & create Python `venv` in `backend/venv` if missing.
2. Activate `venv` and install/update all dependencies from `backend/requirements.txt`.
3. Check & run `npm install` for frontend dependencies.
4. Spawn FastAPI server on **`http://127.0.0.1:8000`** in a dedicated window.
5. Launch Vite dev server on **`http://localhost:3000`**.

---

### Method 2: Manual Start

#### 1. Start Backend (FastAPI + RAG)
```bash
cd backend
python -m venv venv
# On Windows:
.\venv\Scripts\activate

pip install -r requirements.txt

# (Optional) Ingest knowledge base to Pinecone index:
python -m app.ingest

# Run Uvicorn server:
uvicorn app.main:app --reload --port 8000
```

#### 2. Start Frontend (Vite + React)
Open another terminal in root directory:
```bash
npm install
npm run dev
```
Open browser at `http://localhost:3000`.

---

## 🔑 Environment Variables (`backend/.env`)

Create a `.env` file inside `backend/` directory:

```env
GOOGLE_API_KEY=your_google_gemini_api_key
PINECONE_API_KEY=your_pinecone_api_key
PINECONE_INDEX_NAME=portfolio-rag
GEMINI_MODEL=gemini-3.6-flash
EMBEDDING_MODEL=sentence-transformers/all-MiniLM-L6-v2
```

---

## 🌐 Deployment Guide

- **Frontend**: Deployed to **GitHub Pages** via `npm run deploy-gh`.
- **Backend**: Deployed to **Render** as a Python Web Service (`uvicorn app.main:app --host 0.0.0.0 --port $PORT`).

---

## 📬 Contact Information

- **Developer**: Dương Quốc Vinh (Vinh Duong)
- **Role**: AI Engineering Intern / Full-stack Developer
- **Email**: [duongquocvinh9029@gmail.com](mailto:duongquocvinh9029@gmail.com)
- **Zalo / Phone**: `0559149285`
- **GitHub**: [github.com/vinh9029](https://github.com/vinh9029)
