import React, { useEffect, useRef } from 'react';
import { Button } from './ui/button';
import { Home, Trophy, RefreshCw, ExternalLink } from 'lucide-react';
import { getFinalPrize, getPrizeDescription, PRIZE_A_KM, PRIZE_B_KM } from '../data/mock';
import gameSounds from '../utils/sounds';

const ResultsScreen = ({ attempts, onBackToHome }) => {
  const timeoutRef = useRef(null);
  const finalPrize = getFinalPrize(attempts);
  const prizeInfo = getPrizeDescription(finalPrize);

  // Auto-retorno a Idle tras 15s sin interacción
  useEffect(() => {
    // Reproducir sonido según el premio obtenido
    setTimeout(() => {
      if (finalPrize === 'A') {
        gameSounds.playPrizeA();
      } else if (finalPrize === 'B' || finalPrize === 'C') {
        gameSounds.playPrizeBC();
      }
    }, 500);

    timeoutRef.current = setTimeout(() => {
      onBackToHome();
    }, 15000);

    return () => clearTimeout(timeoutRef.current);
  }, [onBackToHome, finalPrize]);

  const handleInteraction = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
  };

  const getPrizeDisplayInfo = () => {
    const successCount = attempts.filter(km => km === PRIZE_A_KM || km === PRIZE_B_KM).length;
    
    switch (finalPrize) {
      case 'A':
        return {
          emoji: '🏆',
          title: '¡FELICIDADES!',
          subtitle: 'Ganaste el Premio A',
          description: `¡Perfecto! ${successCount}/3 aciertos`,
          bgColor: 'from-yellow-400 to-orange-500',
          textColor: 'text-yellow-800'
        };
      case 'B':
        return {
          emoji: '🥈',
          title: '¡EXCELENTE!',
          subtitle: 'Ganaste el Premio B', 
          description: `¡Muy bien! ${successCount}/3 aciertos`,
          bgColor: 'from-blue-400 to-blue-600',
          textColor: 'text-blue-800'
        };
      case 'C':
        return {
          emoji: '🥉',
          title: '¡BUEN TRABAJO!',
          subtitle: 'Ganaste el Premio C',
          description: `¡Bien! ${successCount}/3 aciertos`,
          bgColor: 'from-green-400 to-green-600',
          textColor: 'text-green-800'
        };
      default:
        return {
          emoji: '💪',
          title: '¡SIGUE INTENTANDO!',
          subtitle: 'Sin premio esta vez',
          description: `${successCount}/3 aciertos - ¡No te rindas!`,
          bgColor: 'from-gray-400 to-gray-600',
          textColor: 'text-gray-800'
        };
    }
  };

  const displayInfo = getPrizeDisplayInfo();

  const formatAttempt = (km, index) => {
    if (!km) return { text: `I${index + 1}: Sin intento`, color: 'text-gray-600' };
    
    let status = '';
    let statusColor = 'text-gray-600';
    if (km === PRIZE_A_KM || km === PRIZE_B_KM) {
      status = ' ✅';
      statusColor = 'text-green-600 font-bold';
    }
    
    return { text: `I${index + 1}: KM ${km}${status}`, color: statusColor };
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
          className="absolute top-0 right-0 w-64 sm:w-80 md:w-96 h-64 sm:h-80 md:h-96 rounded-full opacity-60"
          style={{
            background: 'linear-gradient(225deg, #FF8A95 0%, #E91E63 50%, #8E24AA 100%)',
            transform: 'translate(40%, -30%) scale(1.4)',
            filter: 'blur(1px)'
          }}
        />
        
        <div 
          className="absolute bottom-0 left-0 w-56 sm:w-64 md:w-80 h-80 sm:h-96 md:h-[500px] rounded-full opacity-50"
          style={{
            background: 'linear-gradient(60deg, #FFB3C1 0%, #D32F2F 30%, #6A1B9A 100%)',
            transform: 'translate(-30%, 40%) rotate(30deg)',
            filter: 'blur(0.8px)'
          }}
        />

        <div 
          className="absolute top-1/2 right-1/3 w-40 sm:w-48 md:w-64 h-40 sm:h-48 md:h-64 rounded-full opacity-40"
          style={{
            background: 'linear-gradient(135deg, #B71C1C 0%, #FF5722 100%)',
            transform: 'translate(20%, -20%)',
            filter: 'blur(0.5px)'
          }}
        />
      </div>

      {/* Logotipo del Maratón */}
      <div className="absolute top-4 sm:top-6 left-4 sm:left-6 z-10">
        <img 
          src="/images/logo-maraton.png"
          alt="Maratón Internacional de Juárez"
          className="w-16 sm:w-20 md:w-24 h-auto drop-shadow-lg opacity-90"
        />
      </div>

      {/* Contenedor principal con scroll */}
      <div className="w-full h-full flex flex-col p-4 sm:p-6 z-10 overflow-y-auto">
        <div className="max-w-2xl w-full mx-auto bg-white/95 backdrop-blur-lg rounded-2xl sm:rounded-3xl p-4 sm:p-6 md:p-8 my-4 sm:my-6 md:my-8">
          {/* Resultado principal */}
          <div className={`bg-gradient-to-r ${displayInfo.bgColor} rounded-2xl p-4 sm:p-6 mb-4 sm:mb-6 text-center`}>
            <div className="text-5xl sm:text-6xl md:text-8xl mb-2 sm:mb-3 md:mb-4">{displayInfo.emoji}</div>
            <h1 className="text-white text-2xl sm:text-3xl md:text-4xl font-black mb-1 sm:mb-2 drop-shadow-lg">
              {displayInfo.title}
            </h1>
            <p className="text-white text-lg sm:text-xl md:text-2xl font-bold mb-1 drop-shadow">
              {displayInfo.subtitle}
            </p>
            <p className="text-white text-base sm:text-lg md:text-xl font-semibold drop-shadow">
              {displayInfo.description}
            </p>
          </div>

          {/* Resumen de intentos */}
          <div className="bg-gray-50 rounded-2xl p-4 sm:p-5 mb-4 sm:mb-6">
            <h3 className="text-gray-700 text-lg sm:text-xl md:text-2xl font-bold text-center mb-3 sm:mb-4">
              Resumen de Intentos
            </h3>
            <div className="space-y-2 sm:space-y-3">
              {attempts.map((km, index) => {
                const attemptInfo = formatAttempt(km, index);
                return (
                  <div 
                    key={index} 
                    className="flex items-center justify-between bg-white p-2 sm:p-3 rounded-xl shadow-sm"
                  >
                    <span className={`text-sm sm:text-base md:text-lg font-semibold ${attemptInfo.color}`}>
                      {attemptInfo.text}
                    </span>
                    {(km === PRIZE_A_KM || km === PRIZE_B_KM) && (
                      <div className="flex items-center gap-1 text-green-600 font-bold text-xs sm:text-sm">
                        <Trophy size={14} />
                        ¡Acierto!
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Mensaje de participación */}
          <div className="bg-blue-50 rounded-2xl p-4 sm:p-5 mb-4 sm:mb-6 text-center">
            <h3 className="text-blue-700 text-base sm:text-lg md:text-xl font-bold mb-2 sm:mb-3">
              {finalPrize !== 'NONE' ? '¡Felicidades por tu premio!' : '¡Gracias por participar!'}
            </h3>
            <p className="text-blue-600 text-sm sm:text-base md:text-lg">
              {finalPrize !== 'NONE' 
                ? 'Presenta esta pantalla en el evento para reclamar tu premio'
                : 'Sigue intentando para ganar un premio'
              }
            </p>
          </div>

          {/* Botones de acción */}
          <div className="flex flex-col gap-2 sm:gap-3">
            <Button
              onClick={() => {
                gameSounds.playButtonClick();
                onBackToHome();
              }}
              className="bg-gradient-to-r from-red-500 to-red-600 hover:from-red-400 hover:to-red-500 text-white font-black text-lg sm:text-xl md:text-2xl py-4 sm:py-5 px-4 sm:px-6 md:px-8 rounded-2xl shadow-xl transform hover:scale-105 transition-all duration-200 w-full"
            >
              <RefreshCw className="mr-2 sm:mr-3" size={window.innerWidth < 640 ? 20 : 24} />
              JUGAR DE NUEVO
            </Button>

            <Button
              onClick={() => {
                gameSounds.playButtonClick();
                onBackToHome();
              }}
              variant="outline"
              className="bg-white hover:bg-gray-50 text-gray-800 border-2 sm:border-4 border-gray-300 font-bold text-base sm:text-lg md:text-xl py-3 sm:py-4 px-4 sm:px-6 rounded-xl shadow-lg w-full"
            >
              <Home className="mr-2" size={window.innerWidth < 640 ? 16 : 20} />
              Volver al Inicio
            </Button>
          </div>
        </div>

        {/* Imagen del maratón 2024 como pie de página */}
        <div className="mt-6 sm:mt-8 px-4">
          <img 
            src="/images/promo-resultados.png"
            alt="Maratón Internacional de Juárez 2024"
            className="w-full max-w-md h-auto object-contain mx-auto rounded-lg shadow-lg"
          />
        </div>
      </div>
    </div>
  );
};

export default ResultsScreen;
