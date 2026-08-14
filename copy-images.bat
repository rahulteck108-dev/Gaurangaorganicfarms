@echo off
echo Creating public/images folder if it doesn't exist...
mkdir frontend\public\images 2>nul
echo Copying all images to frontend/public/images...
xcopy /s /y images\* frontend\public\images\
echo Images copied successfully! Please refresh your browser.
pause
