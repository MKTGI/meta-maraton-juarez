@echo off
chcp 1252 >nul
echo ========================================
echo  Instalador META - Maraton de Juarez
echo ========================================
echo.

cd /d "%~dp0"

echo Verificando Node.js...
where node >nul 2>nul
if %errorlevel% neq 0 (
    echo.
    echo Node.js NO esta instalado.
    echo.
    echo IMPORTANTE: Debes instalar Node.js manualmente:
    echo 1. Ve a: https://nodejs.org/
    echo 2. Descarga la version LTS
    echo 3. Instalalo
    echo 4. Reinicia esta ventana y vuelve a ejecutar este archivo
    echo.
    pause
    exit /b 1
)

echo Node.js detectado correctamente!
echo.

echo Instalando gestor de paquetes Yarn...
call npm install -g yarn
if %errorlevel% neq 0 (
    echo Error al instalar Yarn
    pause
    exit /b 1
)

echo.
echo Instalando dependencias del juego...
echo Esto puede tardar varios minutos...
echo.

call yarn install
if %errorlevel% neq 0 (
    echo Error al instalar dependencias
    pause
    exit /b 1
)

echo.
echo ==========================================
echo  INSTALACION COMPLETADA!
echo ==========================================
echo.
echo Ahora puedes ejecutar: INICIAR-META.bat
echo para iniciar el juego.
echo.
pause
