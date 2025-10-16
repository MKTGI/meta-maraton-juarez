import React, { useEffect, useRef } from 'react';
import { Button } from './ui/button';
import { Play, Maximize } from 'lucide-react';
import gameSounds from '../utils/sounds';

const IdleScreen = ({ onPlay, onFullscreen }) => {
  const timeoutRef = useRef(null);

  // Auto-reset después de 30s sin interacción
  useEffect(() => {
    timeoutRef.current = setTimeout(() => {
      // Mantener en idle con animación
    }, 30000);

    return () => clearTimeout(timeoutRef.current);
  }, []);

  const handleInteraction = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
  };

  return (
    <div 
      className="min-h-screen w-full relative flex flex-col items-center justify-center p-4 sm:p-6 md:p-8 overflow-hidden"
      style={{
        background: '#C62D42'
      }}
      onTouchStart={handleInteraction}
      onClick={handleInteraction}
    >
      {/* Formas orgánicas superpuestas - patrón rojo */}
      <div className="absolute inset-0">
        {/* Forma principal superior izquierda */}
        <div 
          className="absolute top-0 left-0 w-64 sm:w-80 md:w-96 h-64 sm:h-80 md:h-96 rounded-full opacity-70"
          style={{
            background: 'linear-gradient(135deg, #FF6B8A 0%, #E91E63 50%, #8E24AA 100%)',
            transform: 'translate(-30%, -20%) scale(1.5)',
            filter: 'blur(1px)'
          }}
        />
        
        {/* Forma central izquierda */}
        <div 
          className="absolute top-1/3 left-0 w-56 sm:w-64 md:w-80 h-80 sm:h-96 md:h-[500px] rounded-full opacity-60"
          style={{
            background: 'linear-gradient(160deg, #FFB3C1 0%, #FF1744 30%, #6A1B9A 100%)',
            transform: 'translate(-40%, 20%) rotate(-15deg)',
            filter: 'blur(0.5px)'
          }}
        />

        {/* Forma circular superior derecha */}
        <div 
          className="absolute top-1/4 right-0 w-48 sm:w-56 md:w-64 h-48 sm:h-56 md:h-64 rounded-full opacity-50"
          style={{
            background: 'linear-gradient(45deg, #D32F2F 0%, #FF5722 100%)',
            transform: 'translate(40%, -10%)',
            filter: 'blur(1px)'
          }}
        />

        {/* Forma circular media derecha */}
        <div 
          className="absolute top-2/3 right-0 w-32 sm:w-40 md:w-48 h-32 sm:h-40 md:h-48 rounded-full opacity-40"
          style={{
            background: 'linear-gradient(225deg, #B71C1C 0%, #E65100 100%)',
            transform: 'translate(30%, 20%)',
            filter: 'blur(0.5px)'
          }}
        />

        {/* Líneas sutiles superiores */}
        <div 
          className="absolute top-0 left-0 w-1 sm:w-2 h-20 sm:h-24 md:h-32 opacity-30"
          style={{
            background: 'linear-gradient(180deg, #FFCDD2 0%, transparent 100%)',
            transform: 'translate(20%, 15%) rotate(-30deg)',
            borderRadius: '2px'
          }}
        />
        <div 
          className="absolute top-0 left-0 w-0.5 sm:w-1 h-16 sm:h-20 md:h-24 opacity-25"
          style={{
            background: 'linear-gradient(180deg, #F8BBD9 0%, transparent 100%)',
            transform: 'translate(30%, 25%) rotate(-25deg)',
            borderRadius: '1px'
          }}
        />
      </div>

      {/* Contenido principal centrado */}
      <div className="flex flex-col items-center justify-center h-full z-10 py-8 sm:py-12 md:py-16 max-w-2xl mx-auto">
        {/* Logotipo del Maratón */}
        <div className="mb-6 sm:mb-8 animate-in fade-in duration-1000">
          <img 
            src="/images/logo-maraton.png"
            alt="Maratón Internacional de Juárez"
            className="w-64 sm:w-80 md:w-96 h-auto drop-shadow-2xl mx-auto"
            onError={(e) => {
              e.target.style.display = 'none';
              e.target.nextElementSibling.style.display = 'block';
            }}
          />
          <div className="w-64 sm:w-80 md:w-96 h-32 sm:h-40 md:h-48 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center text-white font-bold text-lg sm:text-xl md:text-2xl mx-auto" style={{display: 'none'}}>
            MIJ LOGO
          </div>
        </div>

        {/* Título principal */}
        <div className="text-center mb-4 sm:mb-6">
          <h1 className="text-white text-5xl sm:text-6xl md:text-7xl font-black mb-2 drop-shadow-2xl animate-in slide-in-from-top duration-1000 delay-200">
            META
          </h1>
          <p className="text-white text-lg sm:text-xl md:text-2xl font-bold drop-shadow-lg animate-in slide-in-from-top duration-1000 delay-400">
            Maratón Internacional de Juárez
          </p>
        </div>

        {/* Espacio eliminado */}

        {/* Botones principales */}
        <div className="flex flex-col gap-3 sm:gap-4 w-full max-w-sm px-4">
          <Button
            onClick={() => {
              gameSounds.resumeAudioContext(); // Reanudar contexto de audio
              gameSounds.playButtonClick();
              setTimeout(() => gameSounds.playGameStart(), 100);
              onPlay();
            }}
            className="bg-gradient-to-r from-yellow-400 to-yellow-600 hover:from-yellow-300 hover:to-yellow-500 text-red-800 font-black text-xl sm:text-2xl md:text-3xl py-4 sm:py-5 md:py-6 px-8 sm:px-10 md:px-12 rounded-2xl shadow-2xl transform hover:scale-105 transition-all duration-200 animate-in slide-in-from-bottom duration-1000 delay-800 w-full"
          >
            <Play className="mr-2 sm:mr-3" size={window.innerWidth < 640 ? 24 : 28} />
            JUGAR
          </Button>

          <Button
            onClick={() => {
              gameSounds.playButtonClick();
              onFullscreen();
            }}
            variant="outline"
            className="bg-white/90 hover:bg-white text-gray-800 border-2 sm:border-4 border-white font-bold text-base sm:text-lg md:text-xl py-3 sm:py-4 px-6 sm:px-8 rounded-xl shadow-xl backdrop-blur-sm animate-in slide-in-from-bottom duration-1000 delay-1000 w-full"
          >
            <Maximize className="mr-2" size={window.innerWidth < 640 ? 18 : 20} />
            Pantalla Completa
          </Button>
        </div>
      </div>

      {/* Footer con imagen del maratón */}
      <div className="absolute bottom-4 sm:bottom-6 left-1/2 transform -translate-x-1/2 z-10">
        <img 
          src="/images/footer-corazones.png"
          alt="Para Grandes Corazones de Pies Ligeros"
          className="w-64 sm:w-72 md:w-80 h-auto object-contain drop-shadow-lg"
        />
      </div>

      {/* Indicador offline (si PWA está activo) */}
      {navigator.serviceWorker?.controller && (
        <div className="absolute bottom-2 left-4 sm:left-6 bg-green-500 text-white px-2 py-1 rounded-lg text-xs font-semibold shadow-lg z-10">
          ✓ Offline
        </div>
      )}
    </div>
  );
};

export default IdleScreen;
