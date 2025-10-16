import React, { useState, useEffect } from 'react';
import './App.css';
import IdleScreen from './components/IdleScreen';
import InstructionsScreen from './components/InstructionsScreen';
import GameScreen from './components/GameScreen';
import ResultsScreen from './components/ResultsScreen';
import { GAME_STATES, TOTAL_ATTEMPTS } from './data/mock';

function App() {
  const [gameState, setGameState] = useState(GAME_STATES.IDLE);
  const [currentAttempt, setCurrentAttempt] = useState(0);
  const [attempts, setAttempts] = useState([]);
  const [fullscreenAvailable, setFullscreenAvailable] = useState(true);

  // PWA Service Worker registration
  useEffect(() => {
    if ('serviceWorker' in navigator) {
      window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
          .then((registration) => {
            console.log('SW registered: ', registration);
          })
          .catch((registrationError) => {
            console.log('SW registration failed: ', registrationError);
          });
      });
    }
  }, []);

  // Auto-reset por inactividad
  useEffect(() => {
    let inactivityTimer;
    
    const resetToIdle = () => {
      setGameState(GAME_STATES.IDLE);
      resetGameData();
    };

    const handleUserActivity = () => {
      clearTimeout(inactivityTimer);
      inactivityTimer = setTimeout(resetToIdle, 60000); // 60s
    };

    // Detectar actividad del usuario
    const events = ['mousedown', 'mousemove', 'keypress', 'scroll', 'touchstart'];
    events.forEach(event => {
      document.addEventListener(event, handleUserActivity, true);
    });

    // Detectar cuando la ventana pierde foco
    const handleVisibilityChange = () => {
      if (document.hidden) {
        inactivityTimer = setTimeout(resetToIdle, 60000);
      } else {
        clearTimeout(inactivityTimer);
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);

    // Cleanup
    return () => {
      clearTimeout(inactivityTimer);
      events.forEach(event => {
        document.removeEventListener(event, handleUserActivity, true);
      });
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, []);

  const resetGameData = () => {
    setCurrentAttempt(0);
    setAttempts([]);
  };

  const handleFullscreen = async () => {
    try {
      if (document.documentElement.requestFullscreen) {
        await document.documentElement.requestFullscreen();
      } else if (document.documentElement.webkitRequestFullscreen) {
        await document.documentElement.webkitRequestFullscreen();
      } else if (document.documentElement.msRequestFullscreen) {
        await document.documentElement.msRequestFullscreen();
      }
    } catch (error) {
      console.log('Fullscreen request failed:', error);
      setFullscreenAvailable(false);
    }
  };

  const handlePlay = () => {
    resetGameData();
    setGameState(GAME_STATES.INSTRUCTIONS);
  };

  const handleStartGame = () => {
    setGameState(GAME_STATES.PLAYING);
  };

  const handleGameComplete = () => {
    setGameState(GAME_STATES.RESULTS);
  };

  const handleBackToHome = () => {
    setGameState(GAME_STATES.IDLE);
    resetGameData();
  };

  // Deshabilitar zoom y multitouch
  useEffect(() => {
    const preventDefault = (e) => {
      if (e.touches && e.touches.length > 1) {
        e.preventDefault();
      }
    };

    document.addEventListener('touchstart', preventDefault, { passive: false });
    document.addEventListener('touchmove', preventDefault, { passive: false });

    // Deshabilitar zoom por double-tap
    let lastTouchEnd = 0;
    document.addEventListener('touchend', (event) => {
      const now = (new Date()).getTime();
      if (now - lastTouchEnd <= 300) {
        event.preventDefault();
      }
      lastTouchEnd = now;
    }, false);

    return () => {
      document.removeEventListener('touchstart', preventDefault);
      document.removeEventListener('touchmove', preventDefault);
    };
  }, []);

  return (
    <div className="App">
      {gameState === GAME_STATES.IDLE && (
        <IdleScreen 
          onPlay={handlePlay}
          onFullscreen={handleFullscreen}
        />
      )}

      {gameState === GAME_STATES.INSTRUCTIONS && (
        <InstructionsScreen 
          onStartGame={handleStartGame}
          onFullscreen={handleFullscreen}
        />
      )}

      {gameState === GAME_STATES.PLAYING && (
        <GameScreen 
          onGameComplete={handleGameComplete}
          currentAttempt={currentAttempt}
          setCurrentAttempt={setCurrentAttempt}
          attempts={attempts}
          setAttempts={setAttempts}
        />
      )}

      {gameState === GAME_STATES.RESULTS && (
        <ResultsScreen 
          attempts={attempts}
          onBackToHome={handleBackToHome}
        />
      )}
    </div>
  );
}

export default App;
