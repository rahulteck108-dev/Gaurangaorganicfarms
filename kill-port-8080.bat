@echo off
echo Stopping any processes running on port 8080...
FOR /F "tokens=5 delims= " %%P IN ('netstat -ano ^| findstr :8080') DO (
    echo Killing Process ID %%P...
    taskkill /PID %%P /F >nul 2>&1
)
echo Port 8080 has been cleared! You can now start your backend.
pause
