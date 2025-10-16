import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Button } from './ui/button';
import { Flag, RotateCcw } from 'lucide-react';
import { SPEED_MS_PER_KM, TOTAL_ATTEMPTS, getNextKm, evaluateAttempt } from '../data/mock';
import gameSounds from '../utils/sounds';

const GameScreen = ({ onGameComplete, currentAttempt, setCurrentAttempt, attempts, setAttempts }) => {
  const [currentKm, setCurrentKm] = useState(1);
  const [isRunning, setIsRunning] = useState(true);
  const [showResult, setShowResult] = useState(false);
  const [lastResult, setLastResult] = useState(null);
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  
  const timerRef = useRef(null);
  const debounceRef = useRef(null);

  // Contador automático
  useEffect(() => {
    if (isRunning) {
      timerRef.current = setInterval(() => {
        setCurrentKm(prev => {
          gameSounds.playCounterTick(); // Sonido de tick del contador
          return getNextKm(prev);
        });
      }, SPEED_MS_PER_KM);
    } else {
      clearInterval(timerRef.current);
    }

    return () => clearInterval(timerRef.current);
  }, [isRunning]);

  const handleMetaPress = useCallback(() => {
    if (!isRunning || isButtonDisabled) return;

    // Anti-abuso: debounce
    if (debounceRef.current) return;
    
    // Sonido del botón META
    gameSounds.playButtonClick();
    
    setIsButtonDisabled(true);
    debounceRef.current = setTimeout(() => {
      debounceRef.current = null;
    }, 250);

    // Detener contador
    setIsRunning(false);
    
    // Evaluar resultado
    const isSuccess = evaluateAttempt(currentKm);
    const newAttempts = [...attempts];
    newAttempts[currentAttempt] = currentKm;
    setAttempts(newAttempts);

    // Sonidos según el resultado
    setTimeout(() => {
      if (isSuccess) {
        gameSounds.playSuccess();
      } else {
        gameSounds.playFail();
      }
    }, 200);

    // Mostrar resultado
    setLastResult({
      km: currentKm,
      isSuccess: isSuccess,
      isWin: isSuccess
    });
    setShowResult(true);

    // Vibración en dispositivos móviles
    if (navigator.vibrate) {
      navigator.vibrate(isSuccess ? [100, 50, 100] : [200]);
    }
  }, [currentKm, isRunning, isButtonDisabled, currentAttempt, attempts, setAttempts]);

  const handleNextAttempt = () => {
    gameSounds.playButtonClick(); // Sonido del botón
    setShowResult(false);
    setIsButtonDisabled(false);
    
    if (currentAttempt < TOTAL_ATTEMPTS - 1) {
      setCurrentAttempt(currentAttempt + 1);
      setCurrentKm(1);
      setIsRunning(true);
    } else {
      onGameComplete();
    }
  };

  const formatKm = (km) => {
    return km.toString().padStart(2, '0');
  };

  return (
    <div 
      className="min-h-screen w-full relative flex flex-col items-center justify-between p-4 sm:p-6 overflow-hidden"
      style={{
        background: '#C62D42'
      }}
    >
      {/* Formas orgánicas superpuestas - patrón rojo animado */}
      <div className="absolute inset-0">
        <div 
          className="absolute top-0 left-0 w-48 sm:w-72 h-48 sm:h-72 rounded-full opacity-50 animate-pulse"
          style={{
            background: 'linear-gradient(135deg, #FF8A95 0%, #E91E63 50%, #8E24AA 100%)',
            transform: 'translate(-20%, -15%) scale(1.3)',
            filter: 'blur(1px)',
            animationDelay: '0s'
          }}
        />
        
        <div 
          className="absolute bottom-0 right-0 w-52 sm:w-80 h-64 sm:h-96 rounded-full opacity-40 animate-pulse"
          style={{
            background: 'linear-gradient(45deg, #FFB3C1 0%, #D32F2F 40%, #6A1B9A 100%)',
            transform: 'translate(40%, 20%) rotate(-20deg)',
            filter: 'blur(0.8px)',
            animationDelay: '1s'
          }}
        />

        <div 
          className="absolute top-2/3 left-1/3 w-32 sm:w-48 h-32 sm:h-48 rounded-full opacity-35 animate-pulse"
          style={{
            background: 'linear-gradient(225deg, #B71C1C 0%, #FF5722 100%)',
            transform: 'translate(-50%, 10%)',
            filter: 'blur(0.5px)',
            animationDelay: '2s'
          }}
        />

        <div 
          className="absolute top-1/2 right-1/4 w-20 sm:w-32 h-20 sm:h-32 rounded-full opacity-30 animate-bounce"
          style={{
            background: 'linear-gradient(45deg, #FF1744 0%, #E65100 100%)',
            animationDelay: '0.5s'
          }}
        />
      </div>

      {/* Header con información */}
      <div className="w-full flex justify-between items-start z-10 mt-2">
        {/* Información del intento */}
        <div className="bg-white/90 backdrop-blur-sm rounded-lg p-2 sm:p-3 shadow-lg">
          <p className="text-gray-800 font-semibold text-sm sm:text-base">Intento {currentAttempt + 1}/{TOTAL_ATTEMPTS}</p>
        </div>

        {/* Objetivo */}
        <div className="bg-white/90 backdrop-blur-sm rounded-lg p-2 sm:p-3 shadow-lg text-center">
          <p className="text-gray-600 font-medium text-xs">Apunta a 21K o 42K</p>
          <p className="text-red-600 font-bold text-xs">3 = Premio A</p>
          <p className="text-blue-600 font-bold text-xs">2 = Premio B</p>
          <p className="text-green-600 font-bold text-xs">1 = Premio C</p>
        </div>
      </div>

      {/* Área central del juego */}
      <div className="flex-1 flex flex-col items-center justify-center z-10 py-4 sm:py-8">
        {/* Contador principal con marco fijo simple */}
        <div className="text-center mb-6 sm:mb-12">
          {/* Marco fijo con línea blanca simple */}
          <div className="relative inline-block">
            <div 
              className="border-2 sm:border-4 border-white rounded-xl sm:rounded-2xl p-4 sm:p-8 bg-transparent"
              style={{ 
                width: 'min(80vw, 320px)', 
                height: 'min(25vh, 280px)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              {/* Números con estilo anterior */}
              <div className="relative">
                <div className="text-white text-7xl sm:text-8xl md:text-9xl font-black leading-none drop-shadow-2xl">
                  {formatKm(currentKm)}
                </div>
                <div className="absolute inset-0 text-black text-7xl sm:text-8xl md:text-9xl font-black leading-none transform translate-x-1 translate-y-1 sm:translate-x-2 sm:translate-y-2 opacity-30 flex items-center justify-center">
                  {formatKm(currentKm)}
                </div>
              </div>
            </div>
          </div>
          
          <p className="text-white text-xl sm:text-2xl md:text-3xl font-bold mt-3 sm:mt-6 drop-shadow-lg">KILÓMETROS</p>
          {isRunning && (
            <div className="mt-2 sm:mt-4 flex justify-center">
              <div className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse"></div>
              <div className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse delay-200 mx-1"></div>
              <div className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse delay-400"></div>
            </div>
          )}
        </div>

        {/* Botón META responsivo */}
        <Button
          onClick={handleMetaPress}
          disabled={!isRunning || isButtonDisabled}
          className="w-48 h-48 sm:w-60 sm:h-60 md:w-72 md:h-72 rounded-full bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600 hover:from-yellow-300 hover:to-yellow-500 border-4 sm:border-8 border-white shadow-2xl transform hover:scale-110 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none relative"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-orange-400 to-red-500 rounded-full opacity-20 animate-pulse"></div>
          <div className="flex flex-col items-center justify-center text-center relative z-10">
            <img 
              src="https://customer-assets.emergentagent.com/job_maraton-juarez/artifacts/2jyoagwc_Personaje_corriendo.png"
              alt="Corredor"
              className="w-16 sm:w-20 md:w-24 h-16 sm:h-20 md:h-24 mb-2 sm:mb-4 drop-shadow-lg object-contain"
            />
            <span className="text-red-800 font-black text-2xl sm:text-3xl md:text-4xl tracking-wider drop-shadow-lg">META</span>
          </div>
        </Button>

        {/* Imagen de fechas del maratón */}
        <div className="mt-6 sm:mt-8 animate-in fade-in duration-1000">
          <img 
            src="https://customer-assets.emergentagent.com/job_maraton-juarez/artifacts/3kzu3vqx_fecha_MARATON2024_fecha.png"
            alt="Fechas Maratón Internacional de Juárez 1991-25"
            className="w-48 sm:w-56 md:w-64 h-auto drop-shadow-xl mx-auto object-contain"
          />
        </div>
      </div>

      {/* Overlay de resultado */}
      {showResult && (
        <div className="fixed inset-0 bg-black/75 flex items-center justify-center z-50 backdrop-blur-sm p-4">
          <div className="bg-white rounded-2xl p-6 sm:p-8 text-center shadow-2xl transform animate-in slide-in-from-bottom duration-300 w-full max-w-sm">
            {lastResult?.isWin ? (
              <>
                <div className="text-5xl sm:text-6xl mb-4">🎯</div>
                <h2 className="text-xl sm:text-2xl font-bold text-green-600 mb-3">
                  ¡ACIERTO!
                </h2>
                <p className="text-base sm:text-lg text-gray-700 mb-2">
                  Te detuviste en el KM correcto
                </p>
                <p className="text-lg sm:text-xl font-bold mb-6">
                  <span className="text-blue-600">KM {lastResult?.km}</span>
                </p>
              </>
            ) : (
              <>
                <div className="text-5xl sm:text-6xl mb-4">💪</div>
                <h2 className="text-xl sm:text-2xl font-bold text-orange-600 mb-3">
                  ¡Buen Intento!
                </h2>
                <p className="text-base sm:text-lg text-gray-700 mb-6">
                  Te detuviste en <span className="font-bold text-red-600">KM {lastResult?.km}</span>
                </p>
              </>
            )}
            
            <Button 
              onClick={handleNextAttempt}
              className="bg-gradient-to-r from-red-500 to-red-600 hover:from-red-400 hover:to-red-500 text-white font-bold py-3 px-6 text-base sm:text-lg rounded-xl w-full"
            >
              {currentAttempt < TOTAL_ATTEMPTS - 1 ? (
                <>
                  <RotateCcw className="mr-2" size={20} />
                  Siguiente Intento
                </>
              ) : (
                'Ver Resultados'
              )}
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default GameScreen;
