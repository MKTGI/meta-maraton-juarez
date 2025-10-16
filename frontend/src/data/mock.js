// Variables globales del juego
export const SPEED_MS_PER_KM = 120;
export const TOTAL_ATTEMPTS = 3;
export const PRIZE_A_KM = 42;
export const PRIZE_B_KM = 21;
export const MAX_KM = 42;

// Estados del juego
export const GAME_STATES = {
  IDLE: 'idle',
  INSTRUCTIONS: 'instructions',
  PLAYING: 'playing', 
  RESULTS: 'results'
};

// Funciones helper para el juego
export const generateAttemptCode = (attempts, prize) => {
  const timestamp = new Date().toISOString().replace(/[-:.TZ]/g, '').slice(0, 14);
  const attemptStr = attempts.map(km => km || 'X').join(',');
  const hash = Math.abs(hashCode(`${timestamp}${attemptStr}${prize}`)) % 10000;
  return `MIJ25|KM|${timestamp}|I:${attemptStr}|P:${prize}|H:${hash.toString().padStart(4, '0')}`;
};

const hashCode = (str) => {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash;
  }
  return hash;
};

export const getNextKm = (currentKm) => {
  return currentKm >= MAX_KM ? 1 : currentKm + 1;
};

export const evaluateAttempt = (km) => {
  if (km === PRIZE_A_KM || km === PRIZE_B_KM) return true;
  return false;
};

// Nueva lógica de premios basada en cantidad de aciertos
export const getFinalPrize = (attempts) => {
  const successfulAttempts = attempts.filter(km => km === PRIZE_A_KM || km === PRIZE_B_KM).length;
  
  switch (successfulAttempts) {
    case 3:
      return 'A';
    case 2:
      return 'B';
    case 1:
      return 'C';
    default:
      return 'NONE';
  }
};

export const getPrizeDescription = (prize) => {
  switch (prize) {
    case 'A':
      return {
        title: '¡PREMIO A!',
        description: '3 aciertos perfectos',
        emoji: '🏆'
      };
    case 'B':
      return {
        title: '¡PREMIO B!',
        description: '2 aciertos excelentes',
        emoji: '🥈'
      };
    case 'C':
      return {
        title: '¡PREMIO C!',
        description: '1 acierto bueno',
        emoji: '🥉'
      };
    default:
      return {
        title: 'Seguir Intentando',
        description: 'No te rindas',
        emoji: '💪'
      };
  }
};
