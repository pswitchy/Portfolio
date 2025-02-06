import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion } from 'framer-motion';
import { TechIcon } from './tech-icons';

// Enhanced Tech Icon List with categories and special effects
const TECH_ICONS = [
  { name: 'React', color: '#61DAFB', points: 10, category: 'frontend', special: 'shield' },
  { name: 'Node.js', color: '#68A063', points: 10, category: 'backend', special: 'speedBoost' },
  { name: 'Python', color: '#3776AB', points: 10, category: 'backend', special: 'multiShot' },
  { name: 'JavaScript', color: '#F7DF1E', points: 15, category: 'frontend', special: 'pointsBoost' },
  { name: 'TypeScript', color: '#3178C6', points: 15, category: 'frontend', special: 'shield' },
  { name: 'MongoDB', color: '#47A248', points: 15, category: 'database', special: 'freeze' },
  { name: 'Docker', color: '#2496ED', points: 20, category: 'devops', special: 'clearScreen' },
  { name: 'Next.js', color: '#000000', points: 20, category: 'frontend', special: 'pointsBoost' },
  { name: 'GraphQL', color: '#E10098', points: 20, category: 'backend', special: 'multiShot' },
  { name: 'Tailwind CSS', color: '#06B6D4', points: 15, category: 'frontend', special: 'shield' },
  { name: 'AWS', color: '#FF9900', points: 25, category: 'cloud', special: 'clearScreen' },
  { name: 'Kubernetes', color: '#326CE5', points: 25, category: 'devops', special: 'freeze' },
  { name: 'Redis', color: '#DC382D', points: 20, category: 'database', special: 'speedBoost' },
  { name: 'Vue.js', color: '#4FC08D', points: 15, category: 'frontend', special: 'multiShot' },
  { name: 'Angular', color: '#DD0031', points: 20, category: 'frontend', special: 'shield' },
  { name: 'Rust', color: '#000000', points: 25, category: 'systems', special: 'clearScreen' },
  { name: 'Go', color: '#00ADD8', points: 20, category: 'backend', special: 'speedBoost' },
  { name: 'Swift', color: '#F05138', points: 20, category: 'mobile', special: 'multiShot' },
  { name: 'Kotlin', color: '#7F52FF', points: 20, category: 'mobile', special: 'pointsBoost' },
  { name: 'Flutter', color: '#02569B', points: 25, category: 'mobile', special: 'freeze' }
];

// Interfaces
interface FallingIcon {
  id: string;
  name: string;
  color: string;
  points: number;
  category: string;
  special: string;
  x: number;
  y: number;
  speed: number;
  angle: number;
  scale: number;
}

interface PowerUp {
  type: string;
  duration: number;
  startTime: number;
}

interface GameState {
  score: number;
  multiplier: number;
  timeLeft: number;
  lives: number;
  combo: number;
  powerUps: PowerUp[];
  difficulty: number;
  highScore: number;
}

interface CannonState {
  x: number;
  angle: number;
  width: number;
  heat: number;
  cooldownTime: number;
}

export function TechCannonBlast() {
  // Enhanced Game State
  const [gameState, setGameState] = useState<GameState>({
    score: 0,
    multiplier: 1,
    timeLeft: 90,
    lives: 3,
    combo: 0,
    powerUps: [],
    difficulty: 1,
    highScore: parseInt(localStorage.getItem('techCannonHighScore') || '0')
  });

  const [fallingIcons, setFallingIcons] = useState<FallingIcon[]>([]);
  const [cannonState, setCannonState] = useState<CannonState>({
    x: 200,
    angle: 0,
    width: 100,
    heat: 0,
    cooldownTime: 0
  });
  const [cannonballs, setCannonballs] = useState<{x: number, y: number, power?: string}[]>([]);
  const [particles, setParticles] = useState<{x: number, y: number, color: string, size: number}[]>([]);

  // Refs and Game State
  const gameAreaRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<number>();
  const lastShotTime = useRef<number>(0);

  // Sound Effects (using Web Audio API)
  const audioContext = useRef<AudioContext>();
  
  useEffect(() => {
    audioContext.current = new AudioContext();
    return () => {
      audioContext.current?.close();
    };
  }, []);

  const playSound = useCallback((type: 'shoot' | 'hit' | 'powerup') => {
    if (!audioContext.current) return;
    
    const oscillator = audioContext.current.createOscillator();
    const gainNode = audioContext.current.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.current.destination);
    
    switch (type) {
      case 'shoot':
        oscillator.frequency.setValueAtTime(220, audioContext.current.currentTime);
        gainNode.gain.setValueAtTime(0.1, audioContext.current.currentTime);
        break;
      case 'hit':
        oscillator.frequency.setValueAtTime(440, audioContext.current.currentTime);
        gainNode.gain.setValueAtTime(0.05, audioContext.current.currentTime);
        break;
      case 'powerup':
        oscillator.frequency.setValueAtTime(880, audioContext.current.currentTime);
        gainNode.gain.setValueAtTime(0.08, audioContext.current.currentTime);
        break;
    }
    
    oscillator.start();
    gainNode.gain.exponentialRampToValueAtTime(0.00001, audioContext.current.currentTime + 0.5);
    oscillator.stop(audioContext.current.currentTime + 0.5);
  }, []);

  // Enhanced Game Loop
  const gameLoop = useCallback(() => {
    if (gameState.timeLeft <= 0 || gameState.lives <= 0) {
      return;
    }

    // Dynamic difficulty adjustment
    const difficultyMultiplier = Math.min(2, 1 + gameState.score / 10000);
    
    // Spawn icons with increasing frequency based on difficulty
    if (Math.random() < 0.01 * difficultyMultiplier) {
      const newIcon = generateFallingIcon(difficultyMultiplier);
      setFallingIcons(prev => [...prev, newIcon]);
    }

    // Update falling icons with physics
    setFallingIcons(prevIcons => 
      prevIcons.map(icon => ({
        ...icon,
        y: icon.y + icon.speed * 0.3 * difficultyMultiplier,
        x: icon.x + Math.sin(icon.angle) * 0.5,
        angle: icon.angle + 0.01,
        scale: icon.scale + Math.sin(icon.angle) * 0.01
      })).filter(icon => {
        if (icon.y >= 600) {
          // Ensure lives don't go below 0
          setGameState(prev => ({
            ...prev,
            lives: Math.max(0, prev.lives - 1),
            combo: 0
          }));
          return false;
        }
        return true;
      })
    );

    // Update cannonballs with physics
    setCannonballs(prevBalls => 
      prevBalls
        .map(ball => ({ 
          ...ball, 
          y: ball.y - 10,
          x: ball.x + (ball.power === 'curve' ? Math.sin(ball.y / 30) * 2 : 0)
        }))
        .filter(ball => ball.y > -20)
    );

    // Update particles
    setParticles(prevParticles =>
      prevParticles
        .map(particle => ({
          ...particle,
          size: particle.size * 0.95,
          y: particle.y + Math.random() * 2 - 1,
          x: particle.x + Math.random() * 2 - 1
        }))
        .filter(particle => particle.size > 0.5)
    );

    // Collision Detection with Enhanced Effects
    setFallingIcons(prevIcons => {
      const remainingIcons = prevIcons.filter(icon => {
        const isHit = cannonballs.some(ball => 
          Math.abs(ball.x - icon.x) < 30 && 
          Math.abs(ball.y - icon.y) < 30
        );

        if (isHit) {
          // Create particle effects
          setParticles(prev => [
            ...prev,
            ...Array(5).fill(0).map(() => ({
              x: icon.x,
              y: icon.y,
              color: icon.color,
              size: Math.random() * 5 + 2
            }))
          ]);

          // Apply power-ups
          if (icon.special) {
            setGameState(prev => ({
              ...prev,
              powerUps: [...prev.powerUps, {
                type: icon.special,
                duration: 5000,
                startTime: Date.now()
              }]
            }));
          }

          playSound('hit');
          return false;
        }
        return true;
      });

      // Update score and combo
      const hitCount = prevIcons.length - remainingIcons.length;
      if (hitCount > 0) {
        setGameState(prev => {
          const newCombo = prev.combo + hitCount;
          const comboMultiplier = Math.min(3, 1 + newCombo / 10);
          const points = hitCount * 10 * prev.multiplier * comboMultiplier;
          
          return {
            ...prev,
            score: prev.score + points,
            combo: newCombo,
            multiplier: Math.min(prev.multiplier + 0.1, 3)
          };
        });
      }

      return remainingIcons;
    });

    // Update power-ups
    setGameState(prev => ({
      ...prev,
      powerUps: prev.powerUps.filter(powerUp => 
        Date.now() - powerUp.startTime < powerUp.duration
      )
    }));

    // Cool down cannon
    setCannonState(prev => ({
      ...prev,
      heat: Math.max(0, prev.heat - 0.5),
      cooldownTime: Math.max(0, prev.cooldownTime - 16)
    }));

    animationRef.current = requestAnimationFrame(gameLoop);
  }, [gameState.timeLeft, gameState.lives, gameState.score, playSound]);

  // Generate Enhanced Falling Icon
  const generateFallingIcon = useCallback((difficulty: number): FallingIcon => {
    const techIcon = TECH_ICONS[Math.floor(Math.random() * TECH_ICONS.length)];
    
    return {
      id: `icon-${Math.random().toString(36).substr(2, 9)}`,
      ...techIcon,
      x: Math.random() * 380,
      y: -50,
      speed: (Math.random() * 2 + 1) * difficulty,
      angle: Math.random() * Math.PI * 2,
      scale: 1
    };
  }, []);

  // Enhanced Cannon Controls
  const handleCannonMove = useCallback((e: React.MouseEvent) => {
    if (gameAreaRef.current) {
      const rect = gameAreaRef.current.getBoundingClientRect();
      const newX = e.clientX - rect.left - cannonState.width / 2;
      const constrainedX = Math.max(0, Math.min(newX, 400 - cannonState.width));
      
      setCannonState(prev => ({
        ...prev,
        x: constrainedX,
        angle: Math.min(45, Math.max(-45, (e.clientX - rect.left - 200) / 4))
      }));
    }
  }, []);

  // Enhanced Shooting Mechanics
  const shootCannonball = useCallback((e: React.MouseEvent) => {
    if (cannonState.heat >= 100 || cannonState.cooldownTime > 0) return;

    const now = Date.now();
    if (now - lastShotTime.current < 250) return;
    lastShotTime.current = now;

    const hasPowerUp = (type: string) => 
      gameState.powerUps.some(p => p.type === type);

    const baseShot = {
      x: cannonState.x + cannonState.width / 2,
      y: 450
    };

    if (hasPowerUp('multiShot')) {
      setCannonballs(prev => [
        ...prev,
        { ...baseShot, power: 'normal' },
        { ...baseShot, x: baseShot.x - 20, power: 'normal' },
        { ...baseShot, x: baseShot.x + 20, power: 'normal' }
      ]);
    } else {
      setCannonballs(prev => [...prev, { ...baseShot, power: 'normal' }]);
    }

    playSound('shoot');

    setCannonState(prev => ({
      ...prev,
      heat: prev.heat + 10,
      cooldownTime: prev.heat >= 90 ? 2000 : 0
    }));
  }, [cannonState, gameState.powerUps, playSound]);

  // Initialize Game
  useEffect(() => {
    animationRef.current = requestAnimationFrame(gameLoop);
    
    const timerInterval = setInterval(() => {
      setGameState(prev => ({
        ...prev,
        timeLeft: prev.timeLeft > 0 ? prev.timeLeft - 1 : 0
      }));
    }, 1000);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      clearInterval(timerInterval);
    };
  }, [gameLoop]);

  // Game Over Check
  useEffect(() => {
    if (gameState.timeLeft <= 0 || gameState.lives <= 0) {
      if (gameState.score > gameState.highScore) {
        localStorage.setItem('techCannonHighScore', gameState.score.toString());
      }
    }
  }, [gameState.timeLeft, gameState.lives, gameState.score, gameState.highScore]);

  // Restart Game
  const restartGame = () => {
    setGameState({
      score: 0,
      multiplier: 1,
      timeLeft: 90,
      lives: 3,
      combo: 0,
      powerUps: [],
      difficulty: 1,
      highScore: parseInt(localStorage.getItem('techCannonHighScore') || '0')
    });
    setFallingIcons([]);
    setCannonballs([]);
    setParticles([]);
    setCannonState({
      x: 200,
      angle: 0,
      width: 100,
      heat: 0,
      cooldownTime: 0
    });
  };

  // Calculate various game status effects
  const isOverheated = cannonState.heat >= 100;
  const isCoolingDown = cannonState.cooldownTime > 0;
  const activePowerUps = gameState.powerUps.map(p => p.type);
  const hasShield = activePowerUps.includes('shield');

  return (
    <div className="flex flex-col items-center gap-4">
      {/* Game Area */}
      <div 
        ref={gameAreaRef}
        className="relative w-[400px] h-[500px] bg-gradient-to-br from-blue-900 to-purple-900 overflow-hidden rounded-lg shadow-xl cursor-crosshair"
        onMouseMove={handleCannonMove}
        onClick={shootCannonball}
      >
        {/* Particle Effects */}
        {particles.map((particle, index) => (
          <motion.div
            key={`particle-${index}`}
            className="absolute rounded-full"
            style={{
              left: particle.x,
              top: particle.y,
              width: particle.size,
              height: particle.size,
              backgroundColor: particle.color,
              opacity: particle.size / 5
            }}
            initial={{ scale: 1 }}
            animate={{ scale: 0 }}
            transition={{ duration: 0.5 }}
          />
        ))}

        {/* Game HUD */}
        <div className="absolute top-0 left-0 w-full p-4 flex justify-between items-start">
          <div className="space-y-2">
            <div className="text-2xl font-bold text-white">
              Score: {Math.round(gameState.score)}
            </div>
            <div className="text-lg text-white">
              High Score: {Math.round(gameState.highScore)}
            </div>
          </div>
          
          <div className="space-y-2 text-right">
            <div className="text-2xl font-bold text-white">
              Time: {gameState.timeLeft}s
            </div>
            <div className="flex items-center gap-2">
            {Array.from({ length: Math.max(0, gameState.lives) }).map((_, i) => (
              <div key={i} className="w-4 h-4 bg-red-500 rounded-full" />
            ))}
            </div>
          </div>
        </div>

        {/* Power-ups and Status Effects */}
        <div className="absolute top-20 right-4 space-y-2">
          {gameState.powerUps.map((powerUp, index) => {
            const timeLeft = Math.max(0, (powerUp.duration - (Date.now() - powerUp.startTime)) / 1000);
            return (
              <div 
                key={`${powerUp.type}-${index}`}
                className="bg-white bg-opacity-20 rounded px-2 py-1 text-sm text-white"
              >
                {powerUp.type}: {timeLeft.toFixed(1)}s
              </div>
            );
          })}
        </div>

        {/* Combo and Multiplier Display */}
        <div className="absolute bottom-24 left-4 space-y-1">
          <div className="text-lg text-white">
            Combo: x{gameState.combo}
          </div>
          <div className="text-lg text-white">
            Multiplier: x{gameState.multiplier.toFixed(1)}
          </div>
        </div>

        {/* Cannon Heat Meter */}
        <div className="absolute bottom-20 right-4 w-24 h-3 bg-gray-800 rounded overflow-hidden">
          <div 
            className="h-full transition-all duration-100"
            style={{
              width: `${cannonState.heat}%`,
              backgroundColor: isOverheated ? '#ef4444' : '#3b82f6'
            }}
          />
        </div>

        {/* Falling Icons with Enhanced Effects */}
        {fallingIcons.map(icon => (
          <motion.div
            key={icon.id}
            className="absolute"
            style={{ 
              left: icon.x, 
              top: icon.y,
              transform: `rotate(${icon.angle}rad) scale(${icon.scale})`
            }}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: icon.scale }}
          >
            <TechIcon 
              name={icon.name} 
              color={icon.color} 
              size={50} 
            />
          </motion.div>
        ))}

        {/* Enhanced Cannonballs with Effects */}
        {cannonballs.map((ball, index) => (
          <motion.div
            key={`ball-${index}`}
            className="absolute rounded-full"
            style={{
              width: 10,
              height: 10,
              left: ball.x - 5,
              top: ball.y - 5,
              backgroundColor: ball.power === 'normal' ? '#ef4444' : '#3b82f6'
            }}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
          />
        ))}

        {/* Enhanced Cannon Design */}
        <div 
          className={`absolute bottom-0 transition-all duration-200 ${
            isOverheated ? 'bg-red-600' : 'bg-gray-800'
          } rounded-t-full`}
          style={{
            width: cannonState.width,
            height: 60,
            left: cannonState.x,
            transformOrigin: 'bottom center',
            transform: `rotate(${cannonState.angle}deg)`
          }}
        >
          {/* Cannon Barrel */}
          <div 
            className={`absolute rounded-lg transition-all duration-200 ${
              isOverheated ? 'bg-red-700' : 'bg-gray-700'
            }`}
            style={{
              width: 20,
              height: 40,
              top: -40,
              left: cannonState.width / 2 - 10,
              transformOrigin: 'bottom center',
              transform: `rotate(${-cannonState.angle}deg)`
            }}
          />
          
          {/* Heat Vents */}
          {isOverheated && (
            <>
              <motion.div
                className="absolute -top-2 left-4 w-2 h-4 bg-orange-500"
                animate={{ height: [4, 8, 4], opacity: [1, 0.5, 1] }}
                transition={{ duration: 0.5, repeat: Infinity }}
              />
              <motion.div
                className="absolute -top-2 right-4 w-2 h-4 bg-orange-500"
                animate={{ height: [4, 8, 4], opacity: [1, 0.5, 1] }}
                transition={{ duration: 0.5, repeat: Infinity, delay: 0.25 }}
              />
            </>
          )}
        </div>

        {/* Shield Effect */}
        {hasShield && (
          <motion.div
            className="absolute bottom-0 w-full h-20 bg-blue-500 bg-opacity-20 rounded-t-full"
            animate={{ opacity: [0.2, 0.4, 0.2] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        )}

        {/* Game Over Screen */}
        {(gameState.timeLeft === 0 || gameState.lives <= 0) && (
          <div className="absolute inset-0 bg-black bg-opacity-80 flex flex-col items-center justify-center">
            <h2 className="text-4xl text-white mb-4 font-bold">Game Over!</h2>
            <p className="text-2xl text-white mb-2">Final Score: {Math.round(gameState.score)}</p>
            {gameState.score > gameState.highScore && (
              <p className="text-xl text-yellow-400 mb-6">New High Score!</p>
            )}
            <button 
              onClick={restartGame}
              className="bg-blue-500 text-white px-6 py-3 rounded-full hover:bg-blue-600 transition-colors"
            >
              Play Again
            </button>
          </div>
        )}

        {/* Tutorial Overlay (shown on first play) */}
        {!localStorage.getItem('techCannonTutorialSeen') && (
          <div className="absolute inset-0 bg-black bg-opacity-80 flex flex-col items-center justify-center text-white p-8">
            <h3 className="text-2xl font-bold mb-4">How to Play</h3>
            <ul className="space-y-2 text-lg mb-6">
              <li>• Move mouse to aim the cannon</li>
              <li>• Click to shoot falling tech icons</li>
              <li>• Build combos for higher scores</li>
              <li>• Watch your cannon heat level</li>
              <li>• Collect power-ups for special abilities</li>
            </ul>
            <button 
              onClick={() => {
                localStorage.setItem('techCannonTutorialSeen', 'true');
                restartGame();
              }}
              className="bg-blue-500 text-white px-6 py-3 rounded-full hover:bg-blue-600 transition-colors"
            >
              Start Playing
            </button>
          </div>
        )}
      </div>

      {/* Game Stats and Controls */}
      <div className="w-[400px] p-4 bg-gray-800 rounded-lg text-white">
        <h3 className="text-lg font-bold mb-2">Power-ups</h3>
        <div className="grid grid-cols-2 gap-2 text-sm">
          <div>🛡️ Shield: Temporary protection</div>
          <div>🎯 Multi-shot: Triple projectiles</div>
          <div>❄️ Freeze: Slows falling icons</div>
          <div>⚡ Speed boost: Faster shooting</div>
        </div>
      </div>
    </div>
  );
}