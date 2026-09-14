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
    if (percentage >= 80) return 'bg-emerald-100 text-emerald-800 border-emerald-300';
    if (percentage >= 50) return 'bg-amber-100 text-amber-800 border-amber-300';
    return 'bg-rose-100 text-rose-800 border-rose-300';
  };

  return (
    <div className="bg-slate-50/80 rounded-2xl p-4 sm:p-5 border border-slate-200/90 hover:border-slate-300 transition-all">
      {/* Title & Current Value */}
      <div className="flex items-start justify-between gap-3 mb-2">
        <div>
          <label htmlFor={id} className="font-bold text-slate-900 text-sm block">
            {label}
          </label>
          {sublabel && (
            <p className="text-xs text-slate-500 mt-0.5">{sublabel}</p>
          )}
        </div>
        <div className="flex items-center gap-1.5 flex-shrink-0">
          <span className={`text-base font-black px-2.5 py-1 rounded-lg border ${getScoreBadgeColor()}`}>
            {value} <span className="text-xs font-semibold text-slate-500">/ {max}</span>
          </span>
        </div>
      </div>

      {/* Helper Note if present (especially for criterion 3) */}
      {helperNote && (
        <div className="mb-3 p-2.5 rounded-xl bg-amber-50/90 border border-amber-200/80 text-[11px] text-amber-900 flex items-start gap-2 leading-relaxed">
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
          className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-[#006233] focus:outline-none"
        />

        {/* Min / Mid / Max markers */}
        <div className="flex justify-between text-[10px] text-slate-400 font-mono pt-1">
          <span>0 (ضعيف)</span>
          <span>{Math.floor(max / 2)} (متوسط)</span>
          <span>{max} (ممتاز)</span>
        </div>
      </div>

      {/* Quick Click Buttons for fast scoring */}
      <div className="flex items-center gap-1.5 mt-3 pt-3 border-t border-slate-200/60 overflow-x-auto">
        <span className="text-[10px] text-slate-400 ml-2">تقييم سريع:</span>
        {[0.25, 0.5, 0.75, 1].map((pct) => {
          const targetVal = Math.round(max * pct);
          const isSelected = value === targetVal;
          return (
            <button
              key={pct}
              type="button"
              onClick={() => onChange(targetVal)}
              className={`px-2 py-0.5 rounded text-[11px] font-bold transition-all ${
                isSelected
                  ? 'bg-[#006233] text-white'
                  : 'bg-white text-slate-600 hover:bg-slate-200 border border-slate-200'
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
