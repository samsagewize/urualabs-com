"use client";

import { useState, useEffect, useRef } from "react";

// Pokemon for each team member
interface PokemonData {
  id: string;
  name: string;
  pokemon: string;
  sprite: string;
  backSprite: string;
  role: string;
  color: string;
  room: string;
  roomEmoji: string;
}

const pokemonTeam: PokemonData[] = [
  { 
    id: "kirbo", 
    name: "Kirbo", 
    pokemon: "Magnemite", 
    sprite: "https://play.pokemonshowdown.com/sprites/xy/magnemite.png",
    backSprite: "https://play.pokemonshowdown.com/sprites/xy-back/magnemite.png",
    role: "CEO & Business Dev", 
    color: "from-cyan-400 to-blue-600",
    room: "office",
    roomEmoji: "🏢"
  },
  { 
    id: "kitty", 
    name: "Kitty", 
    pokemon: "Meowth", 
    sprite: "https://play.pokemonshowdown.com/sprites/xy/meowth.png",
    backSprite: "https://play.pokemonshowdown.com/sprites/xy-back/meowth.png",
    role: "Creative Director", 
    color: "from-pink-400 to-purple-600",
    room: "studio",
    roomEmoji: "🎨"
  },
  { 
    id: "ralph", 
    name: "Ralph", 
    pokemon: "Ninetales", 
    sprite: "https://play.pokemonshowdown.com/sprites/xy/ninetales.png",
    backSprite: "https://play.pokemonshowdown.com/sprites/xy-back/ninetales.png",
    role: "Marketing Strategy", 
    color: "from-orange-400 to-red-600",
    room: "marketing",
    roomEmoji: "📈"
  },
  { 
    id: "max", 
    name: "Max", 
    pokemon: "Meloetta", 
    sprite: "https://play.pokemonshowdown.com/sprites/xy/meloetta.png",
    backSprite: "https://play.pokemonshowdown.com/sprites/xy-back/meloetta.png",
    role: "Music Grants Research", 
    color: "from-green-400 to-emerald-600",
    room: "music",
    roomEmoji: "🎵"
  },
];

interface Room {
  id: string;
  name: string;
  emoji: string;
  description: string;
  background: string;
  decorations: string[];
}

const rooms: Room[] = [
  {
    id: "office",
    name: "CEO Office",
    emoji: "🏢",
    description: "Where Kirbo manages business operations",
    background: "from-slate-800 to-slate-900",
    decorations: ["🖥️", "📊", "💼", "📞", "🖨️", "📁", "🗂️", "🔋"],
  },
  {
    id: "studio",
    name: "Creative Studio",
    emoji: "🎨",
    description: "Where Kitty brings ideas to life",
    background: "from-purple-900 to-pink-900",
    decorations: ["🎮", "💻", "🎨", "✏️", "🎬", "📱", "🎯", "💡"],
  },
  {
    id: "marketing",
    name: "Marketing Room",
    emoji: "📈",
    description: "Where Ralph crafts winning strategies",
    background: "from-orange-900 to-red-900",
    decorations: ["📧", "📊", "📢", "🎯", "📑", "📋", "📱", "🌐"],
  },
  {
    id: "music",
    name: "Music Room",
    emoji: "🎵",
    description: "Where Max researches music grants",
    background: "from-green-900 to-emerald-900",
    decorations: ["🎹", "🎸", "🎺", "🎻", "🎤", "🎧", "📻", "🎼"],
  },
];

interface PokemonSpriteProps {
  data: PokemonData;
  roomDecorations: string[];
}

function PokemonSprite({ data, roomDecorations }: PokemonSpriteProps) {
  const [position, setPosition] = useState({ x: Math.random() * 80 + 10, y: Math.random() * 40 + 30 });
  const [direction, setDirection] = useState(1);
  const [frame, setFrame] = useState(0);
  const [isWalking, setIsWalking] = useState(true);
  const [showTooltip, setShowTooltip] = useState(false);
  const [currentSprite, setCurrentSprite] = useState(data.sprite);
  const spriteRef = useRef<HTMLImageElement>(null);

  // Walking animation
  useEffect(() => {
    if (!isWalking) return;

    const walkInterval = setInterval(() => {
      setPosition((prev) => {
        // Random walk with smooth movement
        const moveX = (Math.random() - 0.5) * 4;
        const moveY = (Math.random() - 0.5) * 2;
        const clampedX = Math.max(10, Math.min(85, prev.x + moveX));
        const clampedY = Math.max(30, Math.min(65, prev.y + moveY));
        
        // Change direction based on movement
        if (moveX > 0.5) setDirection(1);
        if (moveX < -0.5) setDirection(-1);
        
        return { x: clampedX, y: clampedY };
      });
      
      setFrame((f) => (f + 1) % 2);
      setCurrentSprite(frame === 0 ? data.sprite : data.backSprite);
    }, 250);

    return () => clearInterval(walkInterval);
  }, [isWalking, frame, data.sprite, data.backSprite]);

  const handleClick = () => {
    setIsWalking(!isWalking);
    setShowTooltip(!showTooltip);
  };

  return (
    <div
      className="absolute cursor-pointer transition-all duration-300 hover:scale-125 hover:z-50"
      style={{
        left: `${position.x}%`,
        top: `${position.y}%`,
        transform: `translateX(-50%) scaleX(${direction})`,
        zIndex: Math.floor(position.y),
      }}
      onClick={handleClick}
      onMouseEnter={() => setShowTooltip(true)}
      onMouseLeave={() => setShowTooltip(false)}
    >
      {/* Pokemon Sprite */}
      <div className="relative">
        {/* Glow effect */}
        <div className={`absolute inset-0 bg-gradient-to-r ${data.color} opacity-30 blur-xl rounded-full`}></div>
        
        {/* Pokemon Image */}
        <img
          ref={spriteRef}
          src={currentSprite}
          alt={data.pokemon}
          className="w-20 h-20 object-contain drop-shadow-2xl"
          style={{ 
            imageRendering: 'pixelated',
            filter: 'drop-shadow(0 8px 4px rgba(0,0,0,0.4))'
          }}
          onError={(e) => {
            // Fallback to emoji if image fails
            (e.target as HTMLImageElement).style.display = 'none';
          }}
        />

        {/* Name tag */}
        <div className="absolute -bottom-8 left-1/2 -translate-x-1/2">
          <div className="px-3 py-1 bg-black/80 rounded-full text-xs font-bold text-white whitespace-nowrap border-2"
               style={{ borderColor: data.color.split(' ')[1].replace('to-', '') }}>
            {data.name} ({data.pokemon})
          </div>
        </div>
      </div>

      {/* Tooltip */}
      {showTooltip && (
        <div className="absolute -top-24 left-1/2 -translate-x-1/2 bg-slate-900/95 border-2 rounded-xl p-3 text-center min-w-[150px] z-50 animate-in fade-in zoom-in duration-200"
             style={{ borderColor: data.color.split(' ')[1].replace('to-', '') }}>
          <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-4 h-4 bg-slate-900 border-r-2 border-b-2 rotate-45"
               style={{ borderColor: data.color.split(' ')[1].replace('to-', '') }} />
          <p className="font-bold text-white">{data.name}</p>
          <p className="text-xs text-slate-400">{data.role}</p>
          <p className="text-[10px] text-slate-500 mt-1">★ {data.pokemon}</p>
          <p className="text-[10px] text-cyan-400 mt-1">{isWalking ? 'Click to pause' : 'Click to walk'}</p>
        </div>
      )}
    </div>
  );
}

export default function PokemonOffice() {
  const [mounted, setMounted] = useState(false);
  const [activeRoom, setActiveRoom] = useState("office");

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const currentRoom = rooms.find(r => r.id === activeRoom) || rooms[0];
  const roomPokemon = pokemonTeam.filter(p => p.room === activeRoom);

  return (
    <>
      {/* Room Tabs */}
      <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50">
        <div className="flex gap-2 p-2 bg-black/60 backdrop-blur-md rounded-2xl border border-white/10">
          {rooms.map((room) => (
            <button
              key={room.id}
              onClick={() => setActiveRoom(room.id)}
              className={`px-4 py-2 rounded-xl transition-all duration-300 flex items-center gap-2 ${
                activeRoom === room.id 
                  ? 'bg-white/20 text-white shadow-lg' 
                  : 'text-white/60 hover:text-white hover:bg-white/10'
              }`}
            >
              <span className="text-xl">{room.emoji}</span>
              <span className="font-bold text-sm hidden sm:inline">{room.name}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Room Environment */}
      <div 
        className="fixed inset-0 pointer-events-none transition-all duration-700"
        style={{
          background: `linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.3) 100%), 
                        linear-gradient(135deg, ${currentRoom.background.split(' ')[0].replace('from-', '')}20 0%, ${currentRoom.background.split(' ')[1].replace('to-', '')}20 100%)`,
        }}
      >
        {/* Room Header */}
        <div className="absolute top-4 left-1/2 -translate-x-1/2 text-center z-40">
          <div className="px-6 py-3 bg-black/50 backdrop-blur-md rounded-2xl border border-white/10">
            <div className="flex items-center gap-3">
              <span className="text-3xl">{currentRoom.emoji}</span>
              <div>
                <h3 className="text-white font-bold">{currentRoom.name}</h3>
                <p className="text-white/60 text-xs">{currentRoom.description}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Room Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          {/* Floor */}
          <div className="absolute bottom-0 left-0 right-0 h-[40%] bg-gradient-to-t from-black/40 to-transparent"></div>
          
          {/* Floor tiles */}
          <div 
            className="absolute bottom-0 left-0 right-0 h-[40%] opacity-20"
            style={{
              backgroundImage: `
                linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px),
                linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px)
              `,
              backgroundSize: '60px 30px'
            }}
          />

          {/* Wall decorations */}
          <div className="absolute top-20 left-8 text-4xl opacity-30 animate-pulse">✨</div>
          <div className="absolute top-32 right-12 text-3xl opacity-30 animate-pulse delay-500">💫</div>
          <div className="absolute top-24 left-1/3 text-2xl opacity-30 animate-pulse delay-1000">⭐</div>
        </div>

        {/* Room Decorations - Randomly placed */}
        {currentRoom.decorations.slice(0, 6).map((emoji, i) => (
          <div
            key={i}
            className="absolute text-4xl opacity-40 hover:opacity-70 transition-opacity cursor-default"
            style={{
              left: `${15 + i * 14}%`,
              bottom: `${10 + (i % 3) * 5}%`,
              animation: `float ${3 + i * 0.5}s ease-in-out infinite`,
              animationDelay: `${i * 0.3}s`,
            }}
          >
            {emoji}
          </div>
        ))}
      </div>

      {/* Pokemon Sprites in Room */}
      {roomPokemon.map((pokemon) => (
        <PokemonSprite 
          key={pokemon.id} 
          data={pokemon} 
          roomDecorations={currentRoom.decorations}
        />
      ))}

      {/* Team selector - show all Pokemon in a sidebar */}
      <div className="fixed top-20 right-4 z-40">
        <div className="p-3 bg-black/50 backdrop-blur-md rounded-2xl border border-white/10">
          <p className="text-white/60 text-xs mb-2 font-bold uppercase tracking-wider">Team</p>
          <div className="flex flex-col gap-2">
            {pokemonTeam.map((p) => (
              <button
                key={p.id}
                onClick={() => setActiveRoom(p.room)}
                className={`flex items-center gap-2 p-2 rounded-xl transition-all ${
                  activeRoom === p.room 
                    ? 'bg-white/20' 
                    : 'hover:bg-white/10'
                }`}
              >
                <img 
                  src={p.sprite} 
                  alt={p.pokemon}
                  className="w-10 h-10"
                  style={{ imageRendering: 'pixelated' }}
                />
                <div className="text-left">
                  <p className="text-white text-sm font-bold">{p.name}</p>
                  <p className="text-white/50 text-xs">{p.pokemon}</p>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
      `}</style>
    </>
  );
}
