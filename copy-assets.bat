@echo off
echo Copying images and videos to React public folder...
xcopy images frontend\public\images /I /Y /E
echo.
echo Success! All videos and images have been copied.
echo Please refresh your browser to see the step-by-step videos.
pause
