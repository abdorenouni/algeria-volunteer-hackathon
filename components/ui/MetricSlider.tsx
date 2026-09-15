'use client';

import React from 'react';
import { Info } from 'lucide-react';

interface MetricSliderProps {
  id: string;
  label: string;
  sublabel?: string;
  value: number;
  max: number;
  helperNote?: string;
  onChange: (val: number) => void;
  accentColor?: 'green' | 'rose' | 'amber' | 'blue';
}

export default function MetricSlider({
  id,
  label,
  sublabel,
  value,
  max,
  helperNote,
  onChange,
  accentColor = 'green',
}: MetricSliderProps) {
  const percentage = Math.round((value / max) * 100);

  const getScoreBadgeColor = () => {
    if (percentage >= 80) return 'bg-[#2E7D5B] text-white';
    if (percentage >= 50) return 'bg-amber-300 text-black';
    return 'bg-[#D9383A] text-white';
  };

  return (
    <div className="neo-box p-4 sm:p-5 bg-white border-2 border-black shadow-[3px_3px_0px_#000] text-right">
      {/* Title & Current Value */}
      <div className="flex items-start justify-between gap-3 mb-2">
        <div>
          <label htmlFor={id} className="font-black text-black text-sm block">
            {label}
          </label>
          {sublabel && (
            <p className="text-xs text-slate-600 font-bold mt-0.5">{sublabel}</p>
          )}
        </div>
        <div className="flex items-center gap-1.5 flex-shrink-0">
          <span className={`text-base font-black px-3 py-1 border-2 border-black ${getScoreBadgeColor()}`}>
            {value} <span className="text-xs opacity-80">/ {max}</span>
          </span>
        </div>
      </div>

      {/* Helper Note if present */}
      {helperNote && (
        <div className="mb-3 p-2.5 bg-amber-50 border border-black text-[11px] text-black font-bold flex items-start gap-2 leading-relaxed">
          <Info className="w-4 h-4 text-amber-700 flex-shrink-0 mt-0.5" />
          <span>{helperNote}</span>
        </div>
      )}

      {/* Interactive Range Slider */}
      <div className="space-y-1">
        <input
          type="range"
          id={id}
          min={0}
          max={max}
          step={1}
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
          className="w-full h-2.5 bg-slate-200 border border-black appearance-none cursor-pointer accent-[#2E7D5B] focus:outline-none"
        />

        {/* Min / Mid / Max markers */}
        <div className="flex justify-between text-[10px] text-slate-600 font-mono font-bold pt-1">
          <span>0 (ضعيف)</span>
          <span>{Math.floor(max / 2)} (متوسط)</span>
          <span>{max} (ممتاز)</span>
        </div>
      </div>

      {/* Quick Click Buttons for fast scoring */}
      <div className="flex items-center gap-1.5 mt-3 pt-3 border-t border-black/10 overflow-x-auto">
        <span className="text-[10px] text-slate-600 font-bold ml-2">تقييم سريع:</span>
        {[0.25, 0.5, 0.75, 1].map((pct) => {
          const targetVal = Math.round(max * pct);
          const isSelected = value === targetVal;
          return (
            <button
              key={pct}
              type="button"
              onClick={() => onChange(targetVal)}
              className={`px-2.5 py-0.5 text-[11px] font-black border-2 border-black transition-all ${
                isSelected
                  ? 'bg-black text-white shadow-[2px_2px_0px_#2E7D5B]'
                  : 'bg-white text-black hover:bg-slate-100 shadow-[1px_1px_0px_#000]'
              }`}
            >
              {targetVal} ن
            </button>
          );
        })}
      </div>
    </div>
  );
}
