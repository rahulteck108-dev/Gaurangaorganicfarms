@echo off
echo Setting up React Frontend for Gauranga Organic Farm...
echo.

cd frontend
echo Installing dependencies...
call npm install

echo Copying styles...
copy /Y ..\style.css src\index.css

echo.
echo Starting React Development Server...
call npm run dev
pause
