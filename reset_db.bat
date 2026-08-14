@echo off
echo Resetting Gauranga Organic Farm Database...
echo.

if exist "database.sqlite" (
    del /f /q "database.sqlite"
    echo [SUCCESS] database.sqlite has been deleted.
) else (
    echo [INFO] database.sqlite does not exist.
)

echo.
echo Now, please run start-backend.bat again to generate the new database with the beautiful dynamic images!
echo.
pause
