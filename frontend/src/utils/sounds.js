// Sistema de sonidos para META - Maratón Internacional de Juárez

class GameSounds {
  constructor() {
    this.audioContext = null;
    this.sounds = {};
    this.enabled = true;
    this.masterVolume = 0.7;
    this.init();
  }

  init() {
    try {
      // Crear contexto de audio
      this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
      
      // Crear sonidos sintéticos
      this.createSounds();
    } catch (error) {
      console.log('Audio no disponible:', error);
      this.enabled = false;
    }
  }

  createSounds() {
    // Sonido de botón (clic)
    this.sounds.buttonClick = this.createTone(800, 0.1, 'sine');
    
    // Sonido de contador (tick)
    this.sounds.counterTick = this.createTone(400, 0.05, 'square');
    
    // Sonido de acierto (éxito)
    this.sounds.success = this.createSuccessSound();
    
    // Sonido de fallo
    this.sounds.fail = this.createFailSound();
    
    // Sonido ambiente del juego
    this.sounds.gameStart = this.createGameStartSound();
    
    // Sonido de premio A (épico)
    this.sounds.prizeA = this.createPrizeASound();
    
    // Sonido de premio B/C
    this.sounds.prizeBC = this.createPrizeBCSound();
  }

  createTone(frequency, duration, type = 'sine') {
    return () => {
      if (!this.enabled || !this.audioContext) return;
      
      try {
        const oscillator = this.audioContext.createOscillator();
        const gainNode = this.audioContext.createGain();
        
        oscillator.connect(gainNode);
        gainNode.connect(this.audioContext.destination);
        
        oscillator.frequency.setValueAtTime(frequency, this.audioContext.currentTime);
        oscillator.type = type;
        
        gainNode.gain.setValueAtTime(0, this.audioContext.currentTime);
        gainNode.gain.linearRampToValueAtTime(this.masterVolume * 0.3, this.audioContext.currentTime + 0.01);
        gainNode.gain.exponentialRampToValueAtTime(0.001, this.audioContext.currentTime + duration);
        
        oscillator.start(this.audioContext.currentTime);
        oscillator.stop(this.audioContext.currentTime + duration);
      } catch (error) {
        console.log('Error reproduciendo sonido:', error);
      }
    };
  }

  createSuccessSound() {
    return () => {
      if (!this.enabled || !this.audioContext) return;
      
      try {
        // Sonido de campana/ding
        const frequencies = [523, 659, 784]; // Do, Mi, Sol
        frequencies.forEach((freq, index) => {
          setTimeout(() => {
            const oscillator = this.audioContext.createOscillator();
            const gainNode = this.audioContext.createGain();
            
            oscillator.connect(gainNode);
            gainNode.connect(this.audioContext.destination);
            
            oscillator.frequency.setValueAtTime(freq, this.audioContext.currentTime);
            oscillator.type = 'sine';
            
            gainNode.gain.setValueAtTime(0, this.audioContext.currentTime);
            gainNode.gain.linearRampToValueAtTime(this.masterVolume * 0.4, this.audioContext.currentTime + 0.01);
            gainNode.gain.exponentialRampToValueAtTime(0.001, this.audioContext.currentTime + 0.3);
            
            oscillator.start(this.audioContext.currentTime);
            oscillator.stop(this.audioContext.currentTime + 0.3);
          }, index * 100);
        });
      } catch (error) {
        console.log('Error reproduciendo sonido de éxito:', error);
      }
    };
  }

  // Métodos públicos para reproducir sonidos
  playButtonClick() {
    this.sounds.buttonClick?.();
  }

  playCounterTick() {
    this.sounds.counterTick?.();
  }

  playSuccess() {
    this.sounds.success?.();
  }

  playFail() {
    this.sounds.fail?.();
  }

  playGameStart() {
    this.sounds.gameStart?.();
  }

  playPrizeA() {
    this.sounds.prizeA?.();
  }

  playPrizeBC() {
    this.sounds.prizeBC?.();
  }

  // Reanudar contexto de audio (requerido en algunos navegadores)
  resumeAudioContext() {
    if (this.audioContext && this.audioContext.state === 'suspended') {
      this.audioContext.resume();
    }
  }
}

// Crear instancia global
const gameSounds = new GameSounds();

export default gameSounds;
