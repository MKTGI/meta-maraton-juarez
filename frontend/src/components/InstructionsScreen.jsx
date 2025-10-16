import React, { useEffect, useRef } from 'react';
import { Button } from './ui/button';
import { Play, Maximize, Flag } from 'lucide-react';
import gameSounds from '../utils/sounds';

const InstructionsScreen = ({ onStartGame, onFullscreen }) => {
  const timeoutRef = useRef(null);

  // Auto-retorno a Idle tras 20s sin interacción
  useEffect(() => {
    timeoutRef.current = setTimeout(() => {
      window.history.back();
    }, 20000);

    return () => clearTimeout(timeoutRef.current);
  }, []);

  const handleInteraction = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
  };

  return (
    <div 
      className="min-h-screen w-full relative flex flex-col items-center overflow-hidden"
      style={{
        background: '#C62D42'
      }}
      onTouchStart={handleInteraction}
      onClick={handleInteraction}
    >
      {/* Formas orgánicas superpuestas - patrón rojo */}
      <div className="absolute inset-0">
        <div 
          className="absolute top-0 right-0 w-48 sm:w-64 md:w-80 h-48 sm:w-64 md:h-80 rounded-full opacity-60"
          style={{
            background: 'linear-gradient(225deg, #FF8A95 0%, #E91E63 60%, #8E24AA 100%)',
            transform: 'translate(30%, -20%) scale(1.2)',
            filter: 'blur(1px)'
          }}
        />
        
        <div 
          className="absolute bottom-0 left-0 w-64 sm:w-80 md:w-96 h-72 sm:h-80 md:h-96 rounded-full opacity-50"
          style={{
            background: 'linear-gradient(45deg, #FFB3C1 0%, #D32F2F 40%, #6A1B9A 100%)',
            transform: 'translate(-50%, 30%) rotate(20deg)',
            filter: 'blur(0.8px)'
          }}
        />

        <div 
          className="absolute top-2/3 right-0 w-32 sm:w-40 md:w-56 h-32 sm:h-40 md:h-56 rounded-full opacity-45"
          style={{
            background: 'linear-gradient(135deg, #B71C1C 0%, #FF5722 100%)',
            transform: 'translate(40%, 10%)',
            filter: 'blur(0.5px)'
          }}
        />
      </div>

      {/* Contenedor principal con scroll */}
      <div className="w-full h-full flex flex-col p-4 sm:p-6 z-10 overflow-y-auto">
        <div className="max-w-4xl w-full mx-auto bg-white/95 backdrop-blur-lg rounded-2xl sm:rounded-3xl p-4 sm:p-6 md:p-8 my-2 sm:my-4">
          {/* Título */}
          <h1 className="text-red-600 text-3xl sm:text-4xl md:text-5xl font-black text-center mb-6 sm:mb-8 md:mb-12">
            INSTRUCCIONES
          </h1>

          {/* Instrucciones principales */}
          <div className="space-y-4 sm:space-y-6 mb-6 sm:mb-8">
            <div className="flex items-center gap-3 sm:gap-4 bg-blue-50 p-3 sm:p-4 rounded-2xl">
              <div className="w-8 sm:w-10 h-8 sm:h-10 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-base sm:text-lg">1</div>
              <p className="text-gray-800 text-base sm:text-lg md:text-xl font-semibold">
                El contador recorre del <span className="text-blue-600 font-black">1 al 42</span> en bucle
              </p>
            </div>

            <div className="flex items-center gap-3 sm:gap-4 bg-yellow-50 p-3 sm:p-4 rounded-2xl">
              <div className="w-8 sm:w-10 h-8 sm:h-10 bg-yellow-600 text-white rounded-full flex items-center justify-center font-bold text-base sm:text-lg">2</div>
              <p className="text-gray-800 text-base sm:text-lg md:text-xl font-semibold">
                Toca el botón <span className="text-yellow-600 font-black">META</span> para detenerlo
              </p>
            </div>

            <div className="flex items-center gap-3 sm:gap-4 bg-red-50 p-3 sm:p-4 rounded-2xl">
              <div className="w-8 sm:w-10 h-8 sm:h-10 bg-red-600 text-white rounded-full flex items-center justify-center font-bold text-base sm:text-lg">3</div>
              <p className="text-gray-800 text-base sm:text-lg md:text-xl font-semibold">
                Tienes <span className="text-red-600 font-black">3 oportunidades</span> por turno
              </p>
            </div>
          </div>

          {/* Objetivos - Nueva dinámica de premios */}
          <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-4 sm:p-6 rounded-2xl mb-6 sm:mb-8">
            <h3 className="text-green-600 text-xl sm:text-2xl md:text-3xl font-black text-center mb-3 sm:mb-4 md:mb-6">DINÁMICA DE PREMIOS</h3>
            <div className="grid grid-cols-2 gap-2 sm:gap-3 mb-3 sm:mb-4">
              <div className="text-center bg-white p-2 sm:p-3 rounded-xl shadow-md">
                <div className="text-2xl sm:text-3xl mb-1">🏆</div>
                <p className="text-xs sm:text-sm font-bold text-yellow-600">Premio A</p>
                <p className="text-gray-600 text-xs">3 aciertos</p>
              </div>
              <div className="text-center bg-white p-2 sm:p-3 rounded-xl shadow-md">
                <div className="text-2xl sm:text-3xl mb-1">🥈</div>
                <p className="text-xs sm:text-sm font-bold text-blue-600">Premio B</p>
                <p className="text-gray-600 text-xs">2 aciertos</p>
              </div>
              <div className="text-center bg-white p-2 sm:p-3 rounded-xl shadow-md">
                <div className="text-2xl sm:text-3xl mb-1">🥉</div>
                <p className="text-xs sm:text-sm font-bold text-green-600">Premio C</p>
                <p className="text-gray-600 text-xs">1 acierto</p>
              </div>
              <div className="text-center bg-white p-2 sm:p-3 rounded-xl shadow-md">
                <div className="text-2xl sm:text-3xl mb-1">💪</div>
                <p className="text-xs sm:text-sm font-bold text-gray-600">Seguir</p>
                <p className="text-gray-600 text-xs">0 aciertos</p>
              </div>
            </div>
            <div className="text-center">
              <p className="text-gray-700 text-base sm:text-lg md:text-xl font-semibold">
                Acierta en <span className="text-red-600 font-black">21K</span> o <span className="text-blue-600 font-black">42K</span>
              </p>
            </div>
          </div>

          {/* Sección de vista previa eliminada */}

          {/* Botones de acción */}
          <div className="flex flex-col gap-3 sm:gap-4">
            <Button
              onClick={() => {
                gameSounds.playButtonClick();
                setTimeout(() => gameSounds.playGameStart(), 200);
                onStartGame();
              }}
              className="bg-gradient-to-r from-red-500 to-red-600 hover:from-red-400 hover:to-red-500 text-white font-black text-lg sm:text-xl md:text-2xl py-4 sm:py-5 md:py-6 px-8 sm:px-10 md:px-12 rounded-2xl shadow-xl transform hover:scale-105 transition-all duration-200 w-full"
            >
              <Play className="mr-2 sm:mr-3" size={window.innerWidth < 640 ? 20 : window.innerWidth < 768 ? 24 : 28} />
              EMPEZAR
            </Button>

            <Button
              onClick={() => {
                gameSounds.playButtonClick();
                onFullscreen();
              }}
              variant="outline"
              className="bg-white hover:bg-gray-50 text-gray-800 border-2 sm:border-4 border-gray-300 font-bold text-base sm:text-lg md:text-xl py-3 sm:py-4 px-6 sm:px-8 rounded-xl shadow-lg w-full"
            >
              <Maximize className="mr-2" size={window.innerWidth < 640 ? 16 : 20} />
              Pantalla Completa
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InstructionsScreen;
