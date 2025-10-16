@echo off
chcp 1252 >nul
echo ========================================
echo  META - Maraton Internacional de Juarez
echo  Iniciando el juego...
echo ========================================
echo.

cd /d "%~dp0"

echo Verificando Node.js...
where node >nul 2>nul
if %errorlevel% neq 0 (
    echo ERROR: Node.js no esta instalado
    echo Por favor ejecuta primero INSTALAR-JUEGO.bat
    pause
    exit /b 1
)

echo Node.js detectado!
echo.

if not exist "node_modules" (
    echo ERROR: Dependencias no instaladas
    echo Por favor ejecuta primero INSTALAR-JUEGO.bat
    pause
    exit /b 1
)

echo Iniciando el juego...
echo.
echo El juego se abrira en tu navegador
echo Accede a: http://localhost:3000
echo.
echo Para DETENER el juego:
echo Presiona Ctrl+C en esta ventana
echo.

start http://localhost:3000

call yarn start

pause
