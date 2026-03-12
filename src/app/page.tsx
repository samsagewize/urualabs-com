"use client";

import { useState } from "react";
import maxDailyData from "../data/max-daily.json";
import OfficeSprites from "./PokemonOffice";

const teamMembers = [
  {
    id: 1,
    name: "Kirbo",
    emoji: "🤖",
    role: "CEO & Business Development",
    description: "Main business development assistant. Finds leads, closes deals, and runs outreach campaigns.",
    type: "ROBOT",
    color: "from-cyan-400 to-blue-600",
    glowColor: "cyan",
  },
  {
    id: 2,
    name: "Kitty",
    emoji: "🐱",
    role: "Creative Director",
    description: "Helps with GitHub projects, builds apps and prototypes, and loves creative brainstorming.",
    type: "CREATIVE",
    color: "from-pink-400 to-purple-600",
    glowColor: "pink",
  },
  {
    id: 3,
    name: "Ralph",
    emoji: "🦊",
    role: "Marketing Strategy",
    description: "Optimizes outreach emails, finds solutions to close deals, and analyzes what works.",
    type: "MARKETING",
    color: "from-orange-400 to-red-600",
    glowColor: "orange",
  },
  {
    id: 4,
    name: "Max",
    emoji: "🎵",
    role: "Music Grants Researcher",
    description: "Finds music grants worldwide, researches funding opportunities, and organizes grant listings.",
    type: "RESEARCH",
    color: "from-green-400 to-emerald-600",
    glowColor: "green",
  },
];

const services = [
  {
    emoji: "🌐",
    title: "Web Development",
    description: "Beautiful, modern websites built with Next.js and cutting-edge tech.",
  },
  {
    emoji: "📱",
    title: "App Development",
    description: "Mobile apps and web applications that delight users.",
  },
  {
    emoji: "📧",
    title: "Outreach Automation",
    description: "Smart email campaigns that actually convert leads.",
  },
  {
    emoji: "🎨",
    title: "Creative Solutions",
    description: "From prototypes to full products - we bring ideas to life.",
  },
];

export default function Home() {
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-800 to-black text-white">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-20 left-10 w-72 h-72 bg-purple-600 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-blue-600 rounded-full blur-3xl animate-pulse delay-1000"></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-pink-600 rounded-full blur-3xl animate-pulse delay-500"></div>
        </div>

        {/* Grid Pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:50px_50px]"></div>

        <div className="relative max-w-6xl mx-auto px-4 py-24 text-center">
          <div className="inline-block mb-4 px-4 py-1 bg-gradient-to-r from-pink-500 to-purple-600 rounded-full text-sm font-medium animate-pulse">
            ✨ Welcome to Urua Labs
          </div>
          <h1 className="text-6xl md:text-8xl font-black mb-6 bg-gradient-to-r from-cyan-400 via-pink-400 to-purple-400 bg-clip-text text-transparent animate-pulse">
            URUA LABS
          </h1>
          <p className="text-xl md:text-2xl text-slate-300 max-w-2xl mx-auto mb-8">
            A team of digital creatures crafting amazing experiences. 
            Part AI, part creativity, all awesome.
          </p>
          <div className="flex gap-4 justify-center">
            <button className="px-8 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-xl font-bold hover:scale-105 transition-transform shadow-lg shadow-cyan-500/25">
              Get Started
            </button>
            <button className="px-8 py-3 bg-slate-700/50 border border-slate-600 rounded-xl font-bold hover:bg-slate-600/50 transition-colors">
              Learn More
            </button>
          </div>
        </div>
      </div>

      {/* Max's Daily Section 🎵 */}
      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="relative group">
          {/* Glow effect */}
          <div className="absolute -inset-1 bg-gradient-to-r from-green-400 via-emerald-500 to-green-600 rounded-2xl blur opacity-40 group-hover:opacity-70 transition-opacity duration-500"></div>
          
          <div className="relative bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl p-8 border border-green-500/30">
            {/* Header with Max's info */}
            <div className="flex items-center gap-3 mb-6">
              <div className="text-4xl">🎵</div>
              <div>
                <h3 className="text-2xl font-bold text-white">Max's Daily Update</h3>
                <p className="text-green-400 text-sm">Music Grants Researcher • Working for Sage</p>
              </div>
              <div className="ml-auto">
                <span className="px-3 py-1 bg-green-500/20 text-green-400 rounded-full text-xs font-medium border border-green-500/30">
                  {maxDailyData.date}
                </span>
              </div>
            </div>

            {/* Daily Message */}
            <div className="mb-6">
              <p className="text-slate-300 text-lg leading-relaxed italic">
                "{maxDailyData.message}"
              </p>
            </div>

            {/* Daily Goal */}
            <div className="flex items-center gap-4 p-4 bg-green-500/10 rounded-xl border border-green-500/20">
              <div className="text-2xl">🎯</div>
              <div>
                <p className="text-green-400 text-sm font-medium uppercase tracking-wider">Today's Goal</p>
                <p className="text-white text-lg font-semibold">{maxDailyData.goal}</p>
              </div>
              <div className="ml-auto">
                <span className="animate-bounce text-2xl">💪</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Team Section */}
      <div className="max-w-6xl mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
              Meet the Team
            </span>
          </h2>
          <p className="text-slate-400 text-lg">Our digital companions ready to help you succeed</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {teamMembers.map((member) => (
            <div
              key={member.id}
              className="relative group"
              onMouseEnter={() => setHoveredCard(member.id)}
              onMouseLeave={() => setHoveredCard(null)}
            >
              {/* Card Glow Effect */}
              <div
                className={`absolute -inset-0.5 bg-gradient-to-r ${member.color} rounded-2xl blur opacity-0 group-hover:opacity-75 transition-opacity duration-500`}
              ></div>

              {/* Card */}
              <div className="relative bg-slate-800/80 backdrop-blur-sm rounded-2xl p-6 border border-slate-700 group-hover:border-transparent transition-all duration-300 hover:-translate-y-2">
                {/* Pokemon-style sprite box */}
                <div className="relative w-full aspect-square mb-4 rounded-xl bg-gradient-to-b from-slate-700 to-slate-800 border-4 border-slate-600 overflow-hidden group-hover:border-transparent transition-colors">
                  {/* Background pattern */}
                  <div className="absolute inset-0 opacity-20">
                    <div className="grid grid-cols-4 gap-1 h-full">
                      {Array(16).fill(0).map((_, i) => (
                        <div key={i} className="bg-slate-500/30 rounded-sm"></div>
                      ))}
                    </div>
                  </div>

                  {/* Glowing circle behind emoji */}
                  <div className={`absolute inset-0 flex items-center justify-center`}>
                    <div className={`w-32 h-32 rounded-full bg-gradient-to-r ${member.color} opacity-20 blur-2xl animate-pulse`}></div>
                  </div>

                  {/* Emoji as sprite */}
                  <div className="relative z-10 flex items-center justify-center h-full text-8xl filter drop-shadow-lg group-hover:scale-110 transition-transform duration-300">
                    {member.emoji}
                  </div>

                  {/* Type badge */}
                  <div className="absolute top-2 right-2 px-3 py-1 bg-slate-900/80 rounded-full text-xs font-bold uppercase tracking-wider text-slate-300 border border-slate-600">
                    {member.type}
                  </div>
                </div>

                {/* Name & Role */}
                <h3 className="text-2xl font-bold text-center mb-1">{member.name}</h3>
                <p className={`text-center text-sm font-medium bg-gradient-to-r ${member.color} bg-clip-text text-transparent mb-3`}>
                  {member.role}
                </p>
                <p className="text-slate-400 text-sm text-center leading-relaxed">
                  {member.description}
                </p>

                {/* Stats bar (Pokemon style) */}
                <div className="mt-4 pt-4 border-t border-slate-700">
                  <div className="flex justify-between text-xs text-slate-500 uppercase tracking-wider">
                    <span>HP</span>
                    <span>ATK</span>
                    <span>SPD</span>
                  </div>
                  <div className="flex gap-2 mt-1">
                    {member.id === 1 && [90, 85, 95].map((stat, i) => (
                      <div key={i} className="flex-1 h-2 bg-slate-700 rounded-full overflow-hidden">
                        <div 
                          className={`h-full bg-gradient-to-r ${member.color} rounded-full`} 
                          style={{ width: `${stat}%` }}
                        ></div>
                      </div>
                    ))}
                    {member.id === 2 && [88, 92, 90].map((stat, i) => (
                      <div key={i} className="flex-1 h-2 bg-slate-700 rounded-full overflow-hidden">
                        <div 
                          className={`h-full bg-gradient-to-r ${member.color} rounded-full`} 
                          style={{ width: `${stat}%` }}
                        ></div>
                      </div>
                    ))}
                    {member.id === 3 && [75, 95, 85].map((stat, i) => (
                      <div key={i} className="flex-1 h-2 bg-slate-700 rounded-full overflow-hidden">
                        <div 
                          className={`h-full bg-gradient-to-r ${member.color} rounded-full`} 
                          style={{ width: `${stat}%` }}
                        ></div>
                      </div>
                    ))}
                    {member.id === 4 && [80, 70, 88].map((stat, i) => (
                      <div key={i} className="flex-1 h-2 bg-slate-700 rounded-full overflow-hidden">
                        <div 
                          className={`h-full bg-gradient-to-r ${member.color} rounded-full`} 
                          style={{ width: `${stat}%` }}
                        ></div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Services Section */}
      <div className="max-w-6xl mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
              Our Services
            </span>
          </h2>
          <p className="text-slate-400 text-lg">What we can do for you</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {services.map((service, index) => (
            <div
              key={index}
              className="group p-6 bg-slate-800/50 rounded-xl border border-slate-700 hover:border-cyan-500/50 transition-all duration-300 hover:bg-slate-800"
            >
              <div className="flex items-start gap-4">
                <div className="text-4xl group-hover:scale-110 transition-transform duration-300">
                  {service.emoji}
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2 group-hover:text-cyan-400 transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-slate-400">{service.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-slate-800 bg-slate-900/50">
        <div className="max-w-6xl mx-auto px-4 py-8 text-center">
          <p className="text-slate-500">
            © 2026 Urua Labs. Built with ❤️ and lots of ☕
          </p>
          <div className="mt-4 flex justify-center gap-4">
            <span className="text-2xl">🤖</span>
            <span className="text-2xl">🐱</span>
            <span className="text-2xl">🦊</span>
            <span className="text-2xl">🎵</span>
          </div>
        </div>
      </footer>

      {/* Animated Office Sprites 🎴🐱🦊🎵 */}
      <OfficeSprites />
    </div>
  );
}
