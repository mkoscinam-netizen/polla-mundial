@echo off
echo ========================================
echo   Polla Mundial 2026
echo ========================================
echo.
cd /d "%~dp0"
echo Iniciando servidor de desarrollo...
echo La app abrira en http://localhost:5173
echo.
echo Rutas disponibles:
echo   http://localhost:5173/andina
echo   http://localhost:5173/ineptos
echo.
npm run dev
pause
