@echo off
title Dx9029 Portfolio Launcher

echo ============================================================
echo   Dx9029 Portfolio -- Starting Local Dev Environment
echo ============================================================
echo.

rem 1. Check Python virtual environment
if not exist "backend\venv" (
    echo [Backend] Virtual environment not found. Creating venv...
    python -m venv backend\venv
    if errorlevel 1 (
        echo Error: Failed to create virtual environment. Make sure Python is installed.
        pause
        exit /b 1
    )
)

echo [Backend] Checking and installing Python dependencies...
call backend\venv\Scripts\activate.bat
python -m pip install --upgrade pip --quiet
pip install -r backend\requirements.txt --quiet
if errorlevel 1 (
    echo Warning: Some packages failed to install. Please check backend\requirements.txt
) else (
    echo [Backend] Python dependencies are up to date!
)
echo.

rem 2. Check Frontend node_modules
if not exist "node_modules" (
    echo [Frontend] Installing npm dependencies...
    npm install
)

rem 3. Start Backend Server in a new window
echo Launching FastAPI backend server (http://127.0.0.1:8000)...
start "Dx9029 Backend" cmd /k "cd /d %~dp0backend && venv\Scripts\activate.bat && uvicorn app.main:app --reload --port 8000"

rem 4. Start Frontend Dev Server in current window
echo Launching Vite frontend dev server (http://localhost:3000)...
echo.
npm run dev

pause
