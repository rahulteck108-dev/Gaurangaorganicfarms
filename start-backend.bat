@echo off
cd /d "%~dp0"
echo ===================================================
echo Gauranga Organic Farm - Backend Setup
echo ===================================================
echo.
echo Installing required Node.js packages...
call npm install
echo.
echo Starting the backend server...
node server.js
pause
