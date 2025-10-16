@echo off
chcp 65001 > nul
title Instalador META - Maratón Internacional de Juárez
color 0B
cls

echo ╔══════════════════════════════════════════════════════════════╗
echo ║                   META - MARATÓN INTERNACIONAL DE JUÁREZ     ║
echo ║                         INSTALADOR AUTOMÁTICO               ║
echo ╚══════════════════════════════════════════════════════════════╝
echo.
echo 🏃 Preparando la instalación...
echo.

:: Verificar si Node.js está instalado
echo [PASO 1/4] Verificando Node.js...
where node >nul 2>nul
if %errorlevel% neq 0 (
    echo ❌ Node.js no está instalado
    echo.
    echo 📥 DESCARGANDO NODE.JS AUTOMÁTICAMENTE...
    echo    Abriendo página de descarga...
    start "" https://nodejs.org/dist/v18.17.0/node-v18.17.0-x64.msi
    echo.
    echo ⚠️  INSTRUCCIONES:
    echo    1. Se abrirá una página web
    echo    2. Se descargará automáticamente un archivo .msi
    echo    3. Ejecuta el archivo descargado
    echo    4. Sigue las instrucciones (solo dar "Siguiente")
    echo    5. Cuando termine, ejecuta este archivo de nuevo
    echo.
    pause
    exit /b 1
) else (
    echo ✅ Node.js encontrado
)

:: Verificar versión de Node
for /f "tokens=*" %%i in ('node --version') do set NODE_VERSION=%%i
echo    Versión: %NODE_VERSION%

echo.
echo [PASO 2/4] Instalando servidor web local...
call npm install -g serve >nul 2>nul
if %errorlevel% neq 0 (
    echo ❌ Error instalando servidor
    echo    Intentando método alternativo...
    call npm install -g http-server >nul 2>nul
    if %errorlevel% neq 0 (
        echo ❌ No se pudo instalar el servidor
        echo    Verifica tu conexión a internet
        pause
        exit /b 1
    )
    echo ✅ Servidor alternativo instalado
) else (
    echo ✅ Servidor instalado correctamente
)

echo.
echo [PASO 3/4] Creando acceso directo...
set CURRENT_DIR=%~dp0
set DESKTOP=%USERPROFILE%\Desktop

:: Crear archivo de inicio rápido
echo @echo off > "%CURRENT_DIR%INICIAR-META.bat"
echo title META - Maratón Internacional de Juárez >> "%CURRENT_DIR%INICIAR-META.bat"
echo cd /d "%CURRENT_DIR%" >> "%CURRENT_DIR%INICIAR-META.bat"
echo echo Iniciando META... >> "%CURRENT_DIR%INICIAR-META.bat"
echo start "" http://localhost:3000 >> "%CURRENT_DIR%INICIAR-META.bat"
echo call npx serve -s . -p 3000 -n >> "%CURRENT_DIR%INICIAR-META.bat"

echo ✅ Archivo de inicio creado

echo.
echo [PASO 4/4] Probando instalación...
timeout /t 2 /nobreak >nul
echo ✅ ¡Instalación completada exitosamente!

echo.
echo ╔══════════════════════════════════════════════════════════════╗
echo ║                        ¡LISTO PARA USAR!                    ║
echo ╚══════════════════════════════════════════════════════════════╝
echo.
echo 🎮 PARA INICIAR EL JUEGO:
echo    └─ Haz doble clic en: "INICIAR-META.bat"
echo.
echo 📋 ARCHIVOS IMPORTANTES:
echo    └─ INICIAR-META.bat      ← Para abrir el juego
echo    └─ INSTRUCCIONES.txt     ← Ayuda completa
echo.
echo 🖥️  PARA PANTALLA COMPLETA:
echo    └─ Presiona F11 en el navegador
echo    └─ O usa el botón "Pantalla Completa" del juego
echo.
echo ⚠️  IMPORTANTE PARA EL EVENTO:
echo    └─ NO muevas esta carpeta de lugar
echo    └─ NO borres ningún archivo
echo    └─ Funciona SIN INTERNET después de instalado
echo.

pause
