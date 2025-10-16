@echo off
chcp 65001 >nul
echo ========================================
echo   META - Maratón Internacional de Juárez
echo   Iniciando el juego...
echo ========================================
echo.

cd /d "%~dp0"

echo Verificando Node.js...
where node >nul 2>nul
if %errorlevel% neq 0 (
    echo ❌ ERROR: Node.js no está instalado
    echo Por favor ejecuta primero INSTALAR-JUEGO.bat
    pause
    exit /b 1
)

echo ✓ Node.js detectado
echo.

if not exist "node_modules" (
    echo ⚠️  Dependencias no instaladas
    echo Por favor ejecuta primero INSTALAR-JUEGO.bat
    pause
    exit /b 1
)

echo Iniciando el juego...
echo.
echo ┌──────────────────────────────────────────┐
echo │  El juego se abrirá en tu navegador     │
echo │  Accede a: http://localhost:3000        │
echo │                                          │
echo │  Para DETENER el juego:                 │
echo │  Presiona Ctrl+C en esta ventana        │
echo └──────────────────────────────────────────┘
echo.

start http://localhost:3000

call yarn start

pause
