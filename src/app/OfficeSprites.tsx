"use client";

import { useState, useEffect } from "react";

interface SpriteData {
  id: string;
  name: string;
  emoji: string;
  role: string;
  color: string;
}

const sprites: SpriteData[] = [
  { id: "kirbo", name: "Kirbo", emoji: "🤖", role: "CEO & Business Dev", color: "from-cyan-400 to-blue-600" },
  { id: "kitty", name: "Kitty", emoji: "🐱", role: "Creative Director", color: "from-pink-400 to-purple-600" },
  { id: "ralph", name: "Ralph", emoji: "🦊", role: "Marketing Strategy", color: "from-orange-400 to-red-600" },
  { id: "max", name: "Max", emoji: "🎵", role: "Music Grants Research", color: "from-green-400 to-emerald-600" },
];

interface SpriteProps {
  data: SpriteData;
  initialX: number;
}

function OfficeSprite({ data, initialX }: SpriteProps) {
  const [position, setPosition] = useState({ x: initialX, y: 85 });
  const [direction, setDirection] = useState(1);
  const [isWalking, setIsWalking] = useState(true);
  const [frame, setFrame] = useState(0);
  const [showTooltip, setShowTooltip] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (isPaused || !isWalking) return;

    const walkInterval = setInterval(() => {
      setPosition((prev) => {
        // Random walk
        const newX = prev.x + (Math.random() * 3 - 1) * 1.5;
        const clampedX = Math.max(5, Math.min(95, newX));
        
        // Occasionally change direction
        if (Math.random() < 0.02) {
          setDirection((d) => (d === 1 ? -1 : 1));
        }
        
        return { ...prev, x: clampedX };
      });
      
      setFrame((f) => (f + 1) % 4);
    }, 180);

    return () => clearInterval(walkInterval);
  }, [isWalking, isPaused]);

  const handleClick = () => {
    setIsPaused(!isPaused);
    setShowTooltip(!showTooltip);
    setIsWalking(!isWalking);
  };

  return (
    <div
      className="absolute cursor-pointer transition-transform duration-100 hover:scale-110"
      style={{
        left: `${position.x}%`,
        top: `${position.y}%`,
        transform: `translateX(-50%) scaleX(${direction})`,
        zIndex: 50,
      }}
      onClick={handleClick}
    >
      {/* Sprite Body - Pixel Art Style */}
      <div className="relative">
        {/* Shadow */}
        <div 
          className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-12 h-3 bg-black/40 rounded-full blur-sm"
          style={{
            transform: `scaleX(${frame === 1 || frame === 3 ? 0.8 : 1})`,
            opacity: frame === 1 || frame === 3 ? 0.3 : 0.5
          }}
        />
        
        {/* Character Body */}
        <div 
          className={`w-16 h-20 bg-gradient-to-b ${data.color} rounded-lg shadow-lg relative overflow-hidden`}
          style={{
            transform: `translateY(${frame === 1 || frame === 3 ? -2 : 0}px)`
          }}
        >
          {/* Pixel art details */}
          <div className="absolute inset-0 opacity-30">
            <div className="grid grid-cols-4 gap-px h-full">
              {Array(16).fill(0).map((_, i) => (
                <div key={i} className="bg-white/20"></div>
              ))}
            </div>
          </div>
          
          {/* Eyes */}
          <div className="absolute top-4 left-3 w-2 h-2 bg-white rounded-full"></div>
          <div className="absolute top-4 right-3 w-2 h-2 bg-white rounded-full"></div>
          
          {/* Feet */}
          <div 
            className="absolute bottom-1 left-2 w-4 h-3 bg-black/30 rounded"
            style={{ transform: frame === 1 ? 'translateX(-2px)' : frame === 3 ? 'translateX(2px)' : 'translateX(0)' }}
          />
          <div 
            className="absolute bottom-1 right-2 w-4 h-3 bg-black/30 rounded"
            style={{ transform: frame === 1 ? 'translateX(2px)' : frame === 3 ? 'translateX(-2px)' : 'translateX(0)' }}
          />
        </div>
        
        {/* Emoji on top */}
        <div 
          className="absolute -top-10 left-1/2 -translate-x-1/2 text-4xl drop-shadow-lg"
          style={{ filter: 'drop-shadow(0 4px 2px rgba(0,0,0,0.3))' }}
        >
          {data.emoji}
        </div>
      </div>

      {/* Tooltip */}
      {showTooltip && (
        <div 
          className="absolute -top-24 left-1/2 -translate-x-1/2 bg-slate-900/95 border-2 rounded-xl p-3 text-center min-w-[140px] z-50 animate-in fade-in zoom-in duration-200"
          style={{ borderColor: 'var(--sprite-color)' }}
        >
          <div 
            className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-4 h-4 bg-slate-900 border-r-2 border-b-2 rotate-45"
            style={{ borderColor: 'var(--sprite-color)' }}
          />
          <p className="font-bold text-white">{data.name}</p>
          <p className="text-xs text-slate-400">{data.role}</p>
          <p className="text-[10px] text-slate-500 mt-1">Click to {isPaused ? 'resume' : 'pause'}</p>
        </div>
      )}
    </div>
  );
}

export default function OfficeSprites() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <>
      {/* Office Environment */}
      <div className="fixed bottom-0 left-0 right-0 h-[30vh] pointer-events-none z-40">
        {/* Floor */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-800/50 to-transparent"></div>
        
        {/* Floor tiles pattern */}
        <div className="absolute inset-0 opacity-10">
          <div 
            className="w-full h-full"
            style={{
              backgroundImage: `
                linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px),
                linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px)
              `,
              backgroundSize: '40px 40px'
            }}
          />
        </div>

        {/* Office decorations */}
        <div className="absolute bottom-[20%] left-[5%] text-4xl opacity-50 hover:opacity-80 transition-opacity">🪴</div>
        <div className="absolute bottom-[18%] left-[25%] text-3xl opacity-50 hover:opacity-80 transition-opacity">🖥️</div>
        <div className="absolute bottom-[22%] left-[50%] text-3xl opacity-50 hover:opacity-80 transition-opacity">☕</div>
        <div className="absolute bottom-[19%] left-[75%] text-3xl opacity-50 hover:opacity-80 transition-opacity">📚</div>
        <div className="absolute bottom-[21%] left-[92%] text-4xl opacity-50 hover:opacity-80 transition-opacity">💡</div>

        {/* Floating decorations */}
        <div className="absolute top-4 left-[10%] text-2xl animate-pulse">✨</div>
        <div className="absolute top-8 left-[40%] text-xl animate-pulse delay-500">💜</div>
        <div className="absolute top-2 left-[70%] text-2xl animate-pulse delay-1000">⭐</div>
        <div className="absolute top-6 left-[88%] text-xl animate-pulse delay-700">🎵</div>
      </div>

      {/* Team Sprites */}
      <OfficeSprite data={sprites[0]} initialX={15} />
      <OfficeSprite data={sprites[1]} initialX={35} />
      <OfficeSprite data={sprites[2]} initialX={55} />
      <OfficeSprite data={sprites[3]} initialX={75} />
    </>
  );
}
