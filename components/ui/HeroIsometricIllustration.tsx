'use client';

import React from 'react';
import { 
  Rocket, 
  TrendingUp, 
  Code2, 
  Database, 
  Lightbulb, 
  Flag, 
  Sparkles, 
  User, 
  Layers,
  Network
} from 'lucide-react';

export default function HeroIsometricIllustration() {
  return (
    <div className="relative w-full max-w-[540px] aspect-[1/0.95] flex items-center justify-center select-none">
      
      {/* Background mint glow */}
      <div className="absolute inset-0 bg-gradient-to-tr from-emerald-100/50 via-teal-50/40 to-transparent rounded-full blur-3xl -z-10 pointer-events-none"></div>

      {/* Isometric Canvas Container */}
      <div className="relative w-full h-full">
        
        {/* --- Card 1: Mountain Summit with Flag (Top-Left) --- */}
        <div className="absolute top-[8%] left-[6%] w-28 sm:w-36 bg-[#E6F4EA] border-2 border-black p-3 shadow-[4px_4px_0px_#000] rotate-[-6deg] hover:rotate-0 transition-transform duration-300">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[10px] font-bold text-emerald-800">القمة والتحدي</span>
            <Flag className="w-4 h-4 text-[#D9383A]" />
          </div>
          <div className="h-12 flex items-end justify-center">
            {/* Minimal Mountain SVG */}
            <svg viewBox="0 0 100 60" className="w-full h-full fill-emerald-600">
              <polygon points="10,55 50,15 90,55" fill="#2E7D5B" />
              <polygon points="50,15 62,30 38,30" fill="#FFFFFF" />
              <line x1="50" y1="15" x2="50" y2="5" stroke="#000" strokeWidth="2" />
              <polygon points="50,5 62,9 50,13" fill="#D9383A" />
            </svg>
          </div>
        </div>

        {/* --- Card 2: Chart & Metrics (Center-Left) --- */}
        <div className="absolute top-[32%] left-[10%] w-36 sm:w-44 bg-white border-2 border-black p-3 shadow-[4px_4px_0px_#000] rotate-[3deg] hover:rotate-0 transition-transform duration-300">
          <div className="flex items-center justify-between mb-2 border-b border-black pb-1">
            <span className="text-[10px] font-black">أثر مجتمعي</span>
            <TrendingUp className="w-3.5 h-3.5 text-[#2E7D5B]" />
          </div>
          {/* Chart SVG */}
          <div className="space-y-1">
            <svg viewBox="0 0 100 45" className="w-full h-10 stroke-black stroke-2 fill-none">
              <polyline points="5,38 30,22 60,30 95,8" stroke="#2E7D5B" strokeWidth="3" />
              <circle cx="30" cy="22" r="3" fill="#000" />
              <circle cx="60" cy="30" r="3" fill="#000" />
              <circle cx="95" cy="8" r="4" fill="#D9383A" />
            </svg>
            <div className="flex items-center justify-between text-[9px] font-mono text-slate-500">
              <span>0%</span>
              <span>100% تطوع</span>
            </div>
          </div>
        </div>

        {/* --- Card 3: Code & Cloud Platform (Top-Right) --- */}
        <div className="absolute top-[14%] right-[10%] w-32 sm:w-40 bg-white border-2 border-black p-3 shadow-[4px_4px_0px_#000] rotate-[4deg] hover:rotate-0 transition-transform duration-300">
          <div className="flex items-center justify-between mb-2 bg-[#2E7D5B] text-white px-2 py-1 border border-black">
            <span className="text-[10px] font-mono font-bold">&lt;/&gt; منصة</span>
            <Database className="w-3 h-3 text-amber-300" />
          </div>
          <div className="space-y-1.5 font-mono text-[10px] text-slate-800">
            <div className="h-1.5 bg-black rounded w-3/4"></div>
            <div className="h-1.5 bg-slate-300 rounded w-full"></div>
            <div className="h-1.5 bg-emerald-600 rounded w-1/2"></div>
          </div>
        </div>

        {/* --- Card 4: Main Innovation & Team Structure (Bottom-Right) --- */}
        <div className="absolute bottom-[8%] right-[8%] w-44 sm:w-56 bg-white border-2 border-black p-3.5 shadow-[5px_5px_0px_#000] rotate-[-2deg] hover:rotate-0 transition-transform duration-300">
          <div className="flex items-center gap-1.5 mb-2">
            <Lightbulb className="w-4 h-4 text-[#F4B41A] fill-[#F4B41A]" />
            <span className="text-[11px] font-black">هندسة الحلول التطوعية</span>
          </div>
          {/* Org / Architecture diagram */}
          <div className="flex flex-col items-center">
            <div className="w-6 h-6 border-2 border-black bg-amber-100 flex items-center justify-center font-bold text-[10px]">
              فكرة
            </div>
            <div className="w-0.5 h-3 bg-black"></div>
            <div className="w-24 h-0.5 bg-black"></div>
            <div className="w-24 flex justify-between">
              <div className="w-0.5 h-2.5 bg-black"></div>
              <div className="w-0.5 h-2.5 bg-black"></div>
              <div className="w-0.5 h-2.5 bg-black"></div>
            </div>
            <div className="w-28 flex justify-between">
              <div className="px-1.5 py-0.5 text-[8px] font-bold border border-black bg-emerald-50">تخطيط</div>
              <div className="px-1.5 py-0.5 text-[8px] font-bold border border-black bg-emerald-50">نمذجة</div>
              <div className="px-1.5 py-0.5 text-[8px] font-bold border border-black bg-rose-50 text-[#D9383A]">تطبيق</div>
            </div>
          </div>
        </div>

        {/* --- Rocket Takeoff Visual (Center-Left) --- */}
        <div className="absolute top-[38%] left-[26%] z-20 pointer-events-none">
          <div className="relative rotate-[-35deg] animate-bounce duration-1000">
            {/* Speed lines */}
            <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 opacity-70">
              <div className="w-0.5 h-8 bg-black"></div>
              <div className="w-0.5 h-6 bg-[#D9383A]"></div>
            </div>
            {/* Rocket badge */}
            <div className="w-16 h-16 sm:w-20 sm:h-20 bg-white border-2 border-black rounded-2xl flex items-center justify-center shadow-[4px_4px_0px_#000]">
              <Rocket className="w-10 h-10 sm:w-12 sm:h-12 text-[#D9383A] fill-[#D9383A]/10 stroke-[2.2]" />
            </div>
          </div>
        </div>

        {/* --- Floating Tag 1: شاب مبتكر (Innovator Youth) --- */}
        <div className="absolute top-[58%] right-[32%] z-30 bg-white border-2 border-black px-3 py-1.5 rounded-full shadow-[3px_3px_0px_#000] flex items-center gap-2 hover:scale-105 transition-transform">
          <div className="w-5 h-5 rounded-full bg-[#2E7D5B] text-white flex items-center justify-center text-[10px]">
            <User className="w-3 h-3" />
          </div>
          <span className="text-xs font-black text-black">شاب مبتكر</span>
        </div>

        {/* --- Floating Tag 2: صانع أفكار (Idea Creator) --- */}
        <div className="absolute bottom-[20%] left-[14%] z-30 bg-white border-2 border-black px-3 py-1.5 rounded-full shadow-[3px_3px_0px_#000] flex items-center gap-2 hover:scale-105 transition-transform">
          <div className="w-5 h-5 rounded-full bg-[#D9383A] text-white flex items-center justify-center text-[10px]">
            <Sparkles className="w-3 h-3" />
          </div>
          <span className="text-xs font-black text-black">صانع أفكار</span>
        </div>

      </div>

    </div>
  );
}
