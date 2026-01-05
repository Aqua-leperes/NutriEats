
import React, { useRef, useEffect, useState, useCallback } from 'react';
// Added Apple to the import list from lucide-react
import { Gamepad2, RotateCcw, Heart, Trophy, Zap, AlertCircle, Apple } from 'lucide-react';

interface GameProps {
  onGameOver: (score: number) => void;
}

const PerspectiveRunner: React.FC<GameProps> = ({ onGameOver }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [gameState, setGameState] = useState<'idle' | 'playing' | 'gameOver'>('idle');
  const [score, setScore] = useState(0);
  const [health, setHealth] = useState(100);
  const [highScore, setHighScore] = useState(0);

  // Perspective Constants
  const LANES = 3;
  const ROAD_WIDTH_BASE = 800;
  const ROAD_WIDTH_HORIZON = 40;
  const HORIZON_Y = 180;
  const MAX_Z = 1200;
  const SPEED_START = 6;
  const GAME_WIDTH = 800;
  const GAME_HEIGHT = 600;

  // Refs for logic loop
  const playerLaneRef = useRef(1); 
  const itemsRef = useRef<{ id: number; type: string; z: number; lane: number; name: string }[]>([]);
  // Fixed: Added initial value undefined to satisfy "Expected 1 arguments, but got 0" error
  const frameRef = useRef<number | undefined>(undefined);
  const lastTimeRef = useRef<number>(0);
  const scoreRef = useRef(0);
  const healthRef = useRef(100);
  const distanceRef = useRef(0);

  const spawnItem = useCallback(() => {
    const types = [
      { type: 'healthy', name: 'Apple' },
      { type: 'healthy', name: 'Broccoli' },
      { type: 'unhealthy', name: 'Donut' },
      { type: 'unhealthy', name: 'Soda' },
      { type: 'obstacle', name: 'Rock' }
    ];
    const rand = Math.random();
    let selected;
    if (rand < 0.4) selected = types[0]; // Apple
    else if (rand < 0.6) selected = types[1]; // Broccoli
    else if (rand < 0.8) selected = types[2]; // Donut
    else if (rand < 0.9) selected = types[3]; // Soda
    else selected = types[4]; // Rock

    const lane = Math.floor(Math.random() * LANES);
    const id = Math.random();
    itemsRef.current.push({ id, ...selected, z: MAX_Z, lane });
  }, []);

  const startGame = () => {
    setGameState('playing');
    setScore(0);
    setHealth(100);
    scoreRef.current = 0;
    healthRef.current = 100;
    distanceRef.current = 0;
    itemsRef.current = [];
    playerLaneRef.current = 1;
    lastTimeRef.current = performance.now();
    frameRef.current = requestAnimationFrame(gameLoop);
  };

  const gameLoop = (time: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const deltaTime = (time - lastTimeRef.current) / 16; 
    lastTimeRef.current = time;

    // Logic
    const currentSpeed = (SPEED_START + (distanceRef.current / 10000)) * deltaTime;
    distanceRef.current += currentSpeed;
    
    if (Math.random() < 0.04) spawnItem();

    itemsRef.current = itemsRef.current.filter(item => {
      item.z -= currentSpeed;
      
      // Collision at player (near Z=50)
      if (item.z < 100 && item.z > 0 && item.lane === playerLaneRef.current) {
        if (item.type === 'healthy') {
          scoreRef.current += 100;
          healthRef.current = Math.min(100, healthRef.current + 5);
        } else if (item.type === 'unhealthy') {
          healthRef.current -= 15;
          scoreRef.current = Math.max(0, scoreRef.current - 50);
        } else if (item.type === 'obstacle') {
          healthRef.current -= 30;
        }
        return false;
      }
      return item.z > -50;
    });

    if (healthRef.current <= 0) {
      setGameState('gameOver');
      onGameOver(Math.floor(scoreRef.current));
      return;
    }

    setScore(Math.floor(scoreRef.current));
    setHealth(Math.max(0, Math.floor(healthRef.current)));

    // RENDER
    // 1. Clear & Background
    ctx.clearRect(0, 0, GAME_WIDTH, GAME_HEIGHT);
    
    // Sky
    const sky = ctx.createLinearGradient(0, 0, 0, HORIZON_Y);
    sky.addColorStop(0, '#020617');
    sky.addColorStop(1, '#1e293b');
    ctx.fillStyle = sky;
    ctx.fillRect(0, 0, GAME_WIDTH, HORIZON_Y);

    // Ground
    ctx.fillStyle = '#064e3b';
    ctx.fillRect(0, HORIZON_Y, GAME_WIDTH, GAME_HEIGHT - HORIZON_Y);

    // 2. Road Perspective
    ctx.beginPath();
    ctx.moveTo(GAME_WIDTH / 2 - ROAD_WIDTH_HORIZON / 2, HORIZON_Y);
    ctx.lineTo(GAME_WIDTH / 2 + ROAD_WIDTH_HORIZON / 2, HORIZON_Y);
    ctx.lineTo(GAME_WIDTH / 2 + ROAD_WIDTH_BASE / 2, GAME_HEIGHT);
    ctx.lineTo(GAME_WIDTH / 2 - ROAD_WIDTH_BASE / 2, GAME_HEIGHT);
    ctx.closePath();
    ctx.fillStyle = '#1e293b';
    ctx.fill();
    ctx.strokeStyle = '#334155';
    ctx.lineWidth = 2;
    ctx.stroke();

    // 3. Lane Lines
    ctx.setLineDash([40, 40]);
    ctx.lineDashOffset = -(distanceRef.current % 80);
    ctx.strokeStyle = '#fbbf24';
    ctx.lineWidth = 4;
    for (let i = 1; i < LANES; i++) {
      const xTop = (GAME_WIDTH / 2 - ROAD_WIDTH_HORIZON / 2) + (ROAD_WIDTH_HORIZON / LANES) * i;
      const xBottom = (GAME_WIDTH / 2 - ROAD_WIDTH_BASE / 2) + (ROAD_WIDTH_BASE / LANES) * i;
      ctx.beginPath();
      ctx.moveTo(xTop, HORIZON_Y);
      ctx.lineTo(xBottom, GAME_HEIGHT);
      ctx.stroke();
    }
    ctx.setLineDash([]);

    // 4. Draw Items (Sort by Z to ensure depth)
    const sortedItems = [...itemsRef.current].sort((a, b) => b.z - a.z);
    sortedItems.forEach(item => {
      const scale = Math.pow(1 - (item.z / MAX_Z), 2); // Exponential scaling for perspective
      const xOffset = (item.lane - 1) * (ROAD_WIDTH_HORIZON + (ROAD_WIDTH_BASE - ROAD_WIDTH_HORIZON) * scale) / LANES;
      const x = GAME_WIDTH / 2 + xOffset;
      const y = HORIZON_Y + (GAME_HEIGHT - HORIZON_Y) * scale;
      const size = 60 * scale;

      ctx.save();
      ctx.translate(x, y);

      if (item.type === 'healthy') {
        ctx.fillStyle = '#22c55e';
        ctx.beginPath();
        ctx.arc(0, -size/2, size, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = '#14532d';
        ctx.fillRect(-size/8, -size*1.2, size/4, size/2);
      } else if (item.type === 'unhealthy') {
        ctx.fillStyle = '#ef4444';
        ctx.beginPath();
        ctx.roundRect(-size, -size, size*2, size, size/4);
        ctx.fill();
        ctx.fillStyle = '#fbbf24';
        ctx.fillRect(-size, -size/1.5, size*2, size/4);
      } else {
        ctx.fillStyle = '#64748b';
        ctx.beginPath();
        ctx.moveTo(-size, 0);
        ctx.lineTo(0, -size*2);
        ctx.lineTo(size, 0);
        ctx.fill();
      }
      ctx.restore();
    });

    // 5. Draw Player
    const pX = GAME_WIDTH / 2 + (playerLaneRef.current - 1) * (ROAD_WIDTH_BASE / LANES);
    const pY = GAME_HEIGHT - 60;
    
    ctx.save();
    ctx.translate(pX, pY);
    // Player Glow
    const glow = ctx.createRadialGradient(0, 0, 10, 0, 0, 60);
    glow.addColorStop(0, 'rgba(34, 197, 94, 0.4)');
    glow.addColorStop(1, 'rgba(34, 197, 94, 0)');
    ctx.fillStyle = glow;
    ctx.beginPath(); ctx.arc(0, 0, 60, 0, Math.PI*2); ctx.fill();

    // Player Model
    ctx.fillStyle = '#22c55e';
    ctx.beginPath(); ctx.roundRect(-25, -80, 50, 80, 10); ctx.fill();
    ctx.fillStyle = '#ffffff';
    ctx.beginPath(); ctx.arc(-10, -65, 4, 0, Math.PI*2); ctx.fill();
    ctx.beginPath(); ctx.arc(10, -65, 4, 0, Math.PI*2); ctx.fill();
    ctx.restore();

    if (gameState === 'playing') {
      frameRef.current = requestAnimationFrame(gameLoop);
    }
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (gameState !== 'playing') return;
      if (e.key === 'ArrowLeft' || e.key === 'a') playerLaneRef.current = Math.max(0, playerLaneRef.current - 1);
      if (e.key === 'ArrowRight' || e.key === 'd') playerLaneRef.current = Math.min(2, playerLaneRef.current + 1);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      if (frameRef.current) cancelAnimationFrame(frameRef.current);
    };
  }, [gameState]);

  return (
    <div className="flex flex-col items-center gap-8 py-10">
      <div className="w-full max-w-4xl grid grid-cols-2 gap-4">
        <div className="flex items-center gap-6 bg-white dark:bg-gray-900 p-6 rounded-3xl shadow-xl border border-green-100 dark:border-gray-800">
          <div className="relative">
             <Heart className="text-red-500 fill-red-500 animate-pulse" size={40} />
             <div className="absolute -top-1 -right-1 bg-green-500 text-white text-[10px] font-black px-1.5 rounded-full">HP</div>
          </div>
          <div>
            <div className="text-xs font-black text-gray-400 uppercase tracking-widest mb-1">Vitality</div>
            <div className="text-4xl font-black text-gray-900 dark:text-white">{health}%</div>
          </div>
        </div>
        <div className="flex items-center gap-6 bg-white dark:bg-gray-900 p-6 rounded-3xl shadow-xl border border-green-100 dark:border-gray-800">
          <Trophy className="text-yellow-500" size={40} />
          <div>
            <div className="text-xs font-black text-gray-400 uppercase tracking-widest mb-1">Current Score</div>
            <div className="text-4xl font-black text-gray-900 dark:text-white">{score}</div>
          </div>
        </div>
      </div>

      <div className="relative group overflow-hidden rounded-[40px] shadow-2xl border-8 border-white dark:border-gray-800 bg-gray-900">
        <canvas ref={canvasRef} width={GAME_WIDTH} height={GAME_HEIGHT} className="max-w-full h-auto" />

        {gameState === 'idle' && (
          <div className="absolute inset-0 bg-green-900/90 backdrop-blur-md flex flex-col items-center justify-center text-white p-12 text-center">
            <div className="w-24 h-24 bg-white text-green-600 rounded-3xl flex items-center justify-center mb-8 shadow-2xl animate-bounce">
              <Gamepad2 size={56} />
            </div>
            <h2 className="text-6xl font-black mb-4">Nutri-Run</h2>
            <p className="text-xl opacity-80 mb-12 max-w-md">
              Dash through the green lanes! Collect <span className="text-green-400 font-bold">Apples</span>, dodge <span className="text-red-400 font-bold">Donuts</span> and <span className="text-gray-400 font-bold">Rocks</span>.
            </p>
            <button 
              onClick={startGame}
              className="px-14 py-6 bg-white text-green-700 hover:bg-green-50 rounded-2xl font-black text-2xl transition-all shadow-2xl hover:scale-105 active:scale-95"
            >
              Start Adventure
            </button>
          </div>
        )}

        {gameState === 'gameOver' && (
          <div className="absolute inset-0 bg-red-900/90 backdrop-blur-md flex flex-col items-center justify-center text-white p-12 text-center">
            <h2 className="text-7xl font-black mb-2 animate-bounce">Crash!</h2>
            <p className="text-2xl font-bold opacity-80 mb-10">You reached a score of {score}</p>
            <div className="flex gap-4">
               <button 
                onClick={startGame}
                className="flex items-center gap-3 px-10 py-5 bg-white text-red-700 rounded-2xl font-black text-xl hover:bg-red-50 transition-all shadow-2xl"
              >
                <RotateCcw size={24} />
                Try Again
              </button>
            </div>
          </div>
        )}
      </div>

      <div className="grid md:grid-cols-3 gap-6 w-full max-w-4xl">
        {[
          { icon: Apple, label: "Healthy Items", desc: "+100 Score & +5 HP", color: "text-green-500" },
          { icon: AlertCircle, label: "Junk Foods", desc: "-50 Score & -15 HP", color: "text-red-500" },
          { icon: Zap, label: "Obstacles", desc: "No Score & -30 HP hit", color: "text-amber-500" }
        ].map((guide, i) => (
          <div key={i} className="bg-white dark:bg-gray-900 p-6 rounded-3xl border border-green-50 dark:border-gray-800 shadow-lg text-center">
            <div className={`${guide.color} mb-3 flex justify-center`}><guide.icon size={32} /></div>
            <div className="font-black text-lg mb-1">{guide.label}</div>
            <div className="text-gray-400 text-sm font-medium">{guide.desc}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PerspectiveRunner;
