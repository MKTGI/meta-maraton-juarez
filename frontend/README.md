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
