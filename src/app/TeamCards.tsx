"use client";

import { useState, useEffect } from "react";

// Team member data with tasks
interface TeamMember {
  id: string;
  name: string;
  emoji: string;
  role: string;
  color: string;
  gradient: string;
  borderColor: string;
  pokemon: string;
  pokemonSprite: string;
  task: string;
  taskIcon: string;
  dailyGoal: string;
  hp: number;
  atk: number;
  spd: number;
  description: string;
}

const teamMembers: TeamMember[] = [
  {
    id: "kirbo",
    name: "Kirbo",
    emoji: "🤖",
    role: "CEO & Business Dev",
    color: "cyan",
    gradient: "from-cyan-400 to-blue-600",
    borderColor: "cyan-500",
    pokemon: "Magnemite",
    pokemonSprite: "https://play.pokemonshowdown.com/sprites/xy/magnemite.png",
    task: "Find 5 new clients this week",
    taskIcon: "🎯",
    dailyGoal: "5 clients → 2 closed",
    hp: 90,
    atk: 85,
    spd: 95,
    description: "Running outreach campaigns, finding leads, and closing deals!",
  },
  {
    id: "kitty",
    name: "Kitty",
    emoji: "🐱",
    role: "Creative Director",
    color: "pink",
    gradient: "from-pink-400 to-purple-600",
    borderColor: "pink-500",
    pokemon: "Meowth",
    pokemonSprite: "https://play.pokemonshowdown.com/sprites/xy/meowth.png",
    task: "Building apps & prototypes",
    taskIcon: "🛠️",
    dailyGoal: "2 features shipped",
    hp: 88,
    atk: 92,
    spd: 90,
    description: "Coding, GitHub projects, and bringing creative ideas to life!",
  },
  {
    id: "ralph",
    name: "Ralph",
    emoji: "🦊",
    role: "Marketing Strategy",
    color: "orange",
    gradient: "from-orange-400 to-red-600",
    borderColor: "orange-500",
    pokemon: "Ninetales",
    pokemonSprite: "https://play.pokemonshowdown.com/sprites/xy/ninetales.png",
    task: "Optimizing outreach emails",
    taskIcon: "📧",
    dailyGoal: "A/B test 3 subject lines",
    hp: 75,
    atk: 95,
    spd: 85,
    description: "Testing, analyzing, and making emails that convert!",
  },
  {
    id: "max",
    name: "Max",
    emoji: "🎵",
    role: "Music Grants Researcher",
    color: "green",
    gradient: "from-green-400 to-emerald-600",
    borderColor: "green-500",
    pokemon: "Meloetta",
    pokemonSprite: "https://play.pokemonshowdown.com/sprites/xy/meloetta.png",
    task: "Finding music grants worldwide",
    taskIcon: "💰",
    dailyGoal: "5 new grants found",
    hp: 80,
    atk: 70,
    spd: 88,
    description: "Researching funding opportunities for musicians everywhere!",
  },
];

interface StatBarProps {
  label: string;
  value: number;
  color: string;
}

function StatBar({ label, value, color }: StatBarProps) {
  const getColorClass = () => {
    if (value >= 90) return "from-green-400 to-green-600";
    if (value >= 75) return "from-yellow-400 to-yellow-600";
    return "from-red-400 to-red-600";
  };

  return (
    <div className="flex items-center gap-2">
      <span className="text-xs uppercase tracking-wider text-slate-400 w-8">{label}</span>
      <div className="flex-1 h-3 bg-slate-700 rounded-full overflow-hidden border border-slate-600">
        <div
          className={`h-full bg-gradient-to-r ${getColorClass()} rounded-full transition-all duration-1000`}
          style={{ width: `${value}%` }}
        />
      </div>
      <span className="text-xs font-bold text-slate-300 w-6">{value}</span>
    </div>
  );
}

interface PokemonCardProps {
  member: TeamMember;
  index: number;
}

function PokemonCard({ member, index }: PokemonCardProps) {
  const [isFlipped, setIsFlipped] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [pokeLoaded, setPokeLoaded] = useState(false);

  return (
    <div
      className="relative group cursor-pointer perspective-1000"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => setIsFlipped(!isFlipped)}
      style={{ animationDelay: `${index * 100}ms` }}
    >
      {/* Card Glow */}
      <div
        className={`absolute -inset-1 bg-gradient-to-r ${member.gradient} rounded-2xl blur opacity-0 group-hover:opacity-60 transition-all duration-500`}
      />

      {/* Card Container */}
      <div
        className={`relative bg-slate-800/90 backdrop-blur-sm rounded-2xl border-4 overflow-hidden transition-all duration-500 group-hover:-translate-y-2`}
        style={{ borderColor: `var(--${member.color})` }}
      >
        {/* Card Header - Pokemon Style */}
        <div className={`bg-gradient-to-r ${member.gradient} p-4 relative overflow-hidden`}>
          {/* Background pattern */}
          <div className="absolute inset-0 opacity-20">
            <div className="grid grid-cols-8 gap-1 h-full">
              {Array(32).fill(0).map((_, i) => (
                <div key={i} className="bg-white/30 rounded-sm"></div>
              ))}
            </div>
          </div>

          {/* Pokédex number */}
          <div className="absolute top-2 right-2 text-xs font-bold text-white/60">
            #{String(index + 1).padStart(3, "0")}
          </div>

          {/* Character & Pokemon info */}
          <div className="relative z-10 flex items-center gap-3">
            <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center text-4xl backdrop-blur-sm">
              {member.emoji}
            </div>
            <div>
              <h3 className="text-2xl font-black text-white drop-shadow-lg">{member.name}</h3>
              <p className="text-white/80 text-sm font-medium">{member.pokemon}</p>
            </div>
          </div>

          {/* Type badge */}
          <div className="absolute top-2 left-2 px-2 py-1 bg-black/30 rounded-lg text-xs font-bold uppercase tracking-wider text-white">
            {member.color} Type
          </div>
        </div>

        {/* Pokemon Sprite Area */}
        <div className="relative h-32 bg-gradient-to-b from-slate-700 to-slate-800 flex items-center justify-center">
          {/* Glowing circle */}
          <div className={`absolute w-24 h-24 rounded-full bg-gradient-to-r ${member.gradient} opacity-30 blur-xl`} />

          {/* Pokemon image */}
          <img
            src={member.pokemonSprite}
            alt={member.pokemon}
            className={`w-24 h-24 object-contain transition-all duration-500 ${pokeLoaded ? '' : 'hidden'}`}
            style={{ imageRendering: "pixelated", filter: "drop-shadow(0 8px 4px rgba(0,0,0,0.4))" }}
            onLoad={() => setPokeLoaded(true)}
            onError={(e) => {
              (e.target as HTMLImageElement).style.display = "none";
            }}
          />

          {/* Fallback emoji if image fails */}
          <div className={`absolute text-6xl transition-opacity duration-300 ${pokeLoaded ? 'opacity-0' : 'opacity-100'}`}>
            {member.emoji}
          </div>

          {/* HP Bar */}
          <div className="absolute bottom-2 left-2 right-2">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-red-400">HP</span>
              <div className="flex-1 h-2 bg-slate-900 rounded-full overflow-hidden border border-slate-600">
                <div
                  className="h-full bg-gradient-to-r from-green-500 to-green-400 rounded-full"
                  style={{ width: `${member.hp}%` }}
                />
              </div>
              <span className="text-xs font-bold text-white">{member.hp}</span>
            </div>
          </div>
        </div>

        {/* Card Body - Task Section */}
        <div className="p-4">
          {/* Role */}
          <p className={`text-center text-sm font-bold bg-gradient-to-r ${member.gradient} bg-clip-text text-transparent mb-4 uppercase tracking-wider`}>
            {member.role}
          </p>

          {/* Current Task - Pokemon Style */}
          <div className={`bg-gradient-to-br from-slate-700 to-slate-800 rounded-xl p-3 mb-4 border-2`}
               style={{ borderColor: `var(--${member.color})` }}>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-lg">{member.taskIcon}</span>
              <span className="text-xs uppercase tracking-wider text-slate-400">Current Task</span>
            </div>
            <p className="text-white font-semibold text-sm">{member.task}</p>
          </div>

          {/* Daily Goal Progress */}
          <div className="flex items-center justify-between p-3 bg-black/30 rounded-xl mb-4">
            <div className="flex items-center gap-2">
              <span className="text-lg">🎯</span>
              <span className="text-xs text-slate-400">Daily Goal</span>
            </div>
            <span className="text-sm font-bold text-white">{member.dailyGoal}</span>
          </div>

          {/* Stats */}
          <div className="space-y-2 mb-4">
            <StatBar label="HP" value={member.hp} color={member.color} />
            <StatBar label="ATK" value={member.atk} color={member.color} />
            <StatBar label="SPD" value={member.spd} color={member.color} />
          </div>

          {/* Description */}
          <p className="text-slate-400 text-xs text-center italic">
            {member.description}
          </p>
        </div>

        {/* Card Footer */}
        <div className="px-4 pb-4 flex justify-center">
          <span className="text-xs text-slate-500 flex items-center gap-1">
            Click to flip • {member.name}'s Card #{String(index + 1).padStart(3, "0")}
          </span>
        </div>
      </div>
    </div>
  );
}

export default function TeamCards() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-800 to-black text-white py-16 px-4">
      {/* Header */}
      <div className="text-center mb-16 max-w-4xl mx-auto">
        <div className="inline-block mb-4 px-4 py-1 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full text-sm font-bold animate-pulse">
          🎴 Collect & Trade • Team Cards
        </div>
        <h1 className="text-5xl md:text-7xl font-black mb-6 bg-gradient-to-r from-yellow-400 via-pink-400 to-purple-400 bg-clip-text text-transparent">
          TEAM CARDS
        </h1>
        <p className="text-xl text-slate-300 max-w-2xl mx-auto">
          Meet your team in <span className="text-yellow-400 font-bold">Pokémon-style character cards</span>! 
          Each card shows their current tasks, daily goals, and stats. Click to flip! 🎯
        </p>
      </div>

      {/* Cards Grid */}
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {teamMembers.map((member, index) => (
            <div
              key={member.id}
              className="animate-in fade-in slide-in-from-bottom-8 duration-700"
              style={{ animationFillMode: "backwards" }}
            >
              <PokemonCard member={member} index={index} />
            </div>
          ))}
        </div>
      </div>

      {/* Bottom CTA */}
      <div className="text-center mt-16">
        <p className="text-slate-400 mb-4">Ready to work with our team?</p>
        <button className="px-8 py-3 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-xl font-bold hover:scale-105 transition-transform shadow-lg shadow-yellow-500/25">
          Start a Project 🚀
        </button>
      </div>

      {/* Decorative Elements */}
      <div className="fixed top-20 left-10 text-4xl opacity-20 animate-pulse">✨</div>
      <div className="fixed top-40 right-20 text-3xl opacity-20 animate-pulse delay-500">💫</div>
      <div className="fixed bottom-40 left-20 text-3xl opacity-20 animate-pulse delay-1000">⭐</div>
      <div className="fixed bottom-20 right-10 text-4xl opacity-20 animate-pulse delay-700">🎵</div>

      <style jsx>{`
        .perspective-1000 {
          perspective: 1000px;
        }
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
      `}</style>
    </div>
  );
}
