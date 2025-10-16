info

code
Code

preview
Preview

Deploy
Deploy
Robot
Hey Grupo, Quick input needed :
Déjame verificar directamente en tu repositorio qué componentes tienes. Basándome en lo que pude ver, aquí están los archivos que TE FALTAN:

📋 ARCHIVOS QUE TE FALTAN EN TU REPOSITORIO
1. En la raíz de /frontend/
✅ YA TIENES: INSTALAR-JUEGO.bat
❌ FALTA: INICIAR-META.bat
2. En /frontend/public/
✅ YA TIENES: index.html, manifest.json, sw.js
❌ FALTAN: 
   - favicon.ico
   - icon-192x192.png
   - icon-512x512.png
3. En /frontend/src/components/
❌ FALTAN los archivos de componentes principales:
   - IdleScreen.jsx
   - GameScreen.jsx
   - InstructionsScreen.jsx
   - ResultsScreen.jsx
4. En /frontend/src/components/ui/
✅ YA TIENES: button.jsx (probablemente)
5. En /frontend/src/hooks/
❌ FALTA toda la carpeta hooks/ con:
   - use-toast.js
6. En la raíz del proyecto (nivel superior)
❌ FALTA: README.md
🎯 ARCHIVOS QUE NECESITAS CREAR/SUBIR
Te proporciono ahora SOLO los archivos que te faltan:

1. INICIAR-META.bat
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
2. Crear carpeta /frontend/src/hooks/ y archivo use-toast.js
Ya te lo proporcioné en el mensaje anterior (el código completo de use-toast.js).

3. Los 4 componentes principales que faltan en /frontend/src/components/
Ya te los proporcioné anteriormente:

IdleScreen.jsx
GameScreen.jsx
InstructionsScreen.jsx
ResultsScreen.jsx
4. README.md en la raíz del proyecto
Ya te lo proporcioné anteriormente también.

5. Los íconos PWA (favicon.ico, icon-192x192.png, icon-512x512.png)
Estos son archivos de imagen. Tienes dos opciones:

Opción A: Usar íconos genéricos temporales Opción B: Generarlos desde el logo del maratón que ya tienes

Como son archivos binarios, no puedo generarlos por ti, pero puedes:

Usar un generador de favicons online como https://favicon.io/ o https://realfavicongenerator.net/
Subir el logo del maratón
Descargar los íconos en los tamaños necesarios (192x192, 512x512)
✅ RESUMEN: TE FALTAN
INICIAR-META.bat ← Te lo acabo de proporcionar arriba
src/hooks/use-toast.js ← Ya te lo di antes
src/components/ (4 archivos JSX) ← Ya te los di antes
public/ (3 archivos de imágenes: favicon.ico, icon-192x192.png, icon-512x512.png) ← Necesitas generarlos
README.md ← Ya te lo di antes
¿Quieres que te vuelva a proporcionar alguno de los archivos que ya te había dado antes? ¿O necesitas ayuda con los íconos PWA? 🚀

Oct 16, 11:05 AM

Copy
dame de nuevo el readme.md

Oct 16, 11:18 AM

Copy
Robot
Hey Grupo, Quick input needed :
Ask Question
Agent will continue working after your reply
📄 README.md
# 🏃 META - Maratón Internacional de Juárez

Juego táctil interactivo desarrollado para el Maratón Internacional de Juárez. Una Progressive Web App (PWA) que funciona completamente offline en Windows, Web y Android.

## 🎮 Descripción del Juego

**"Meta MIJ: 21K / 42K"** es un juego de habilidad donde los jugadores deben detener un contador en movimiento exactamente en las distancias del maratón: **21 KM** (media maratón) o **42 KM** (maratón completa).

### Mecánica del Juego

- **Objetivo**: Detener el contador en 21 KM o 42 KM
- **Intentos**: 3 oportunidades por partida
- **Contador**: Avanza de 1 a 42 KM en bucle continuo
- **Premios**: Sistema de 3 niveles basado en aciertos

### Sistema de Premios

- **Premio A** 🏆: 3 aciertos (detener en 21K o 42K las 3 veces)
- **Premio B** 🥈: 2 aciertos
- **Premio C** 🥉: 1 acierto
- **Sin premio**: 0 aciertos - "Seguir Intentando"

## 🎨 Características

- ✅ **PWA Completa**: Funciona offline una vez instalada
- ✅ **Responsive Design**: Optimizado para pantallas verticales
- ✅ **Efectos de Sonido**: Audio sintético para feedback del juego
- ✅ **Pantalla Completa**: Experiencia inmersiva
- ✅ **Touch-First**: Diseñado para interacción táctil
- ✅ **Auto-reset**: Regreso automático a pantalla de inicio tras inactividad
- ✅ **Tema Personalizado**: Colores del maratón (rojo, amarillo, azul)

## 🚀 Instalación en Windows (Offline)

### Requisitos Previos

- Windows 7 o superior
- Conexión a internet (solo para instalación inicial)

### Pasos de Instalación

1. **Descargar el proyecto** desde GitHub
2. **Ejecutar** `INSTALAR-JUEGO.bat` (doble clic)
   - Instalará Node.js automáticamente si no lo tienes
   - Instalará todas las dependencias necesarias
3. **Esperar** a que termine la instalación (puede tardar varios minutos)

### Iniciar el Juego

1. **Ejecutar** `INICIAR-META.bat` (doble clic)
2. El juego se abrirá automáticamente en tu navegador
3. Acceder a: `http://localhost:3000`

### Detener el Juego

- Presionar `Ctrl+C` en la ventana de terminal
- O simplemente cerrar la ventana

## 🛠️ Tecnologías Utilizadas

### Frontend
- **React 19** - Framework principal
- **Tailwind CSS 3.4** - Estilos y diseño
- **Shadcn UI** - Componentes de interfaz
- **Web Audio API** - Efectos de sonido sintéticos
- **Service Workers** - Funcionalidad PWA offline

### Configuración
- **CRACo** - Configuración de Create React App
- **PostCSS** - Procesamiento de CSS
- **Yarn** - Gestor de paquetes

## 📁 Estructura del Proyecto

meta-maraton-juarez/ ├── README.md ├── INSTALAR-JUEGO.bat # Script de instalación ├── INICIAR-META.bat # Script para iniciar el juego ├── INSTRUCCIONES-COMPLETAS.txt # Guía de instalación ├── package.json # Dependencias del proyecto ├── tailwind.config.js # Configuración de Tailwind ├── craco.config.js # Configuración de Webpack ├── postcss.config.js # Configuración de PostCSS ├── public/ │ ├── index.html # HTML principal │ ├── manifest.json # Manifiesto PWA │ ├── sw.js # Service Worker │ ├── favicon.ico # Ícono del sitio │ ├── icon-192x192.png # Ícono PWA 192x192 │ └── icon-512x512.png # Ícono PWA 512x512 └── src/ ├── index.js # Punto de entrada React ├── index.css # Estilos globales ├── App.js # Componente principal ├── App.css # Estilos del App ├── components/ │ ├── IdleScreen.jsx # Pantalla de inicio │ ├── GameScreen.jsx # Pantalla de juego │ ├── InstructionsScreen.jsx # Pantalla de instrucciones │ ├── ResultsScreen.jsx # Pantalla de resultados │ └── ui/ │ └── button.jsx # Componente de botón ├── data/ │ └── mock.js # Lógica del juego y constantes ├── utils/ │ └── sounds.js # Sistema de sonidos ├── hooks/ │ └── use-toast.js # Hook de notificaciones └── lib/ └── utils.js # Utilidades generales


## 🎯 Flujo del Juego

### 1. Pantalla de Inicio (Idle)
- Logo del Maratón Internacional de Juárez
- Botón "JUGAR"
- Botón "Pantalla Completa"
- Auto-regreso tras 30 segundos de inactividad

### 2. Pantalla de Instrucciones
- Reglas del juego
- Sistema de premios explicado
- Botón "EMPEZAR"
- Auto-regreso tras 20 segundos

### 3. Pantalla de Juego
- Contador grande de KM (1-42 en bucle)
- Botón META con ícono de corredor
- Imagen "1991-25" (aniversario)
- Indicador de intentos (X/3)
- Protección anti-rebote en clics

### 4. Pantalla de Resultados
- Resumen de intentos
- Premio obtenido
- Imagen promocional
- Auto-regreso tras 15 segundos

## 🔊 Sistema de Sonidos

El juego incluye efectos de audio sintéticos para:
- ✅ **Inicio de partida**: Tono de bienvenida
- ✅ **Tick del contador**: Sonido por cada KM
- ✅ **Acierto**: Sonido de éxito al detener en 21K o 42K
- ✅ **Fallo**: Sonido de error
- ✅ **Premio A/B/C**: Sonidos especiales según el premio
- ✅ **Clics de botones**: Feedback táctil

## 🌐 Uso como PWA

### En Windows
1. Abrir el juego en Chrome o Edge
2. Clic en el ícono de instalación en la barra de direcciones
3. Seguir las instrucciones para instalar

### En Android
1. Abrir el juego en Chrome
2. Menú → "Agregar a pantalla de inicio"
3. El juego funcionará offline

## 📱 Compatibilidad

- ✅ Windows 7, 8, 10, 11
- ✅ Android 6.0+
- ✅ Navegadores: Chrome, Edge, Firefox, Safari
- ✅ Pantallas: Optimizado para móviles y tablets verticales

## 🎨 Paleta de Colores

- **Rojo dominante**: Color principal del maratón
- **Amarillo**: Acentos energéticos
- **Azul**: Detalles secundarios
- **Gradientes orgánicos**: Fondo dinámico

## 👨‍💻 Desarrollo

### Comandos Disponibles

```bash
# Instalar dependencias
yarn install

# Iniciar servidor de desarrollo
yarn start

# Compilar para producción
yarn build

# Ejecutar pruebas
yarn test
