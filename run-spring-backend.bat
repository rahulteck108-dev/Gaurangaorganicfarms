@echo off
echo Checking Maven installation...

cd backend
where mvn >nul 2>nul
if %errorlevel% neq 0 (
    echo Maven is not installed or not in PATH.
    echo Downloading Maven Wrapper automatically...
    if not exist "mvnw.cmd" (
        curl -s https://start.spring.io/starter.zip -d type=maven-project -o starter.zip
        tar -xf starter.zip mvnw.cmd mvnw .mvn
        del starter.zip
        echo Maven Wrapper downloaded successfully!
    )
    echo Starting Spring Boot Backend using Maven Wrapper...
    call mvnw.cmd spring-boot:run
) else (
    echo Starting Spring Boot Backend using global Maven...
    call mvn spring-boot:run
)

if %errorlevel% neq 0 (
    echo.
    echo [ERROR] Spring Boot failed to start.
) else (
    echo [SUCCESS] Server stopped gracefully.
)
cd ..
pause
