'use client';

import React, { useRef, useState, useEffect } from 'react';
import Link from 'next/link';
import { Track } from '@/types/hackathon';
import { ArrowLeft, UsersRound, HeartHandshake, Sprout, Smartphone, Building2 } from 'lucide-react';

const ICON_MAP: Record<string, React.ElementType> = {
  UsersRound,
  HeartHandshake,
  Sprout,
  Smartphone,
  Building2,
};

const BADGE_COLORS: Record<string, { bg: string; border: string; text: string; stripe: string }> = {
  emerald: { bg: 'bg-emerald-50', border: 'border-emerald-200', text: 'text-emerald-700', stripe: 'from-emerald-400 to-emerald-600' },
  rose: { bg: 'bg-rose-50', border: 'border-rose-200', text: 'text-rose-700', stripe: 'from-rose-400 to-rose-600' },
  green: { bg: 'bg-green-50', border: 'border-green-200', text: 'text-green-700', stripe: 'from-green-400 to-green-600' },
  sky: { bg: 'bg-sky-50', border: 'border-sky-200', text: 'text-sky-700', stripe: 'from-sky-400 to-sky-600' },
  amber: { bg: 'bg-amber-50', border: 'border-amber-200', text: 'text-amber-700', stripe: 'from-amber-400 to-amber-600' },
};

interface TrackCardProps {
  track: Track;
  className?: string;
}

export default function TrackCard({ track, className = '' }: TrackCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setInView(true); },
      { threshold: 0.15 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const IconComponent = ICON_MAP[track.iconName] || UsersRound;
  const colors = BADGE_COLORS[track.badgeColor] || BADGE_COLORS.emerald;

  return (
    <div
      ref={ref}
      className={`relative p-6 sm:p-7 flex flex-col justify-between transition-all duration-500 bg-white border-[1.5px] border-[#1F1A26] shadow-[-4px_4px_0px_#1F1A26] hover:shadow-[-6px_6px_0px_#1F1A26] hover:-translate-y-[2px] group ${
        inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      } ${className}`}
    >
      {/* Gradient accent stripe on the right edge (RTL) */}
      <div className={`absolute top-0 right-0 w-[4px] h-full bg-gradient-to-b ${colors.stripe} transition-all duration-300 group-hover:w-[6px]`} />

      <div>
        {/* Track Header with Icon */}
        <div className="flex items-start justify-between gap-3 mb-4">
          <div className="flex items-start gap-3 flex-1">
            {/* Icon badge */}
            <div className={`flex-shrink-0 w-10 h-10 ${colors.bg} border-[1.5px] ${colors.border} flex items-center justify-center transition-transform group-hover:scale-110 group-hover:rotate-3`}>
              <IconComponent className={`w-5 h-5 ${colors.text}`} />
            </div>
            <h3 className="text-lg sm:text-xl font-black text-[#1F1A26] leading-snug font-tajawal">
              {track.title}
            </h3>
          </div>
          <span className="flex-shrink-0 w-8 h-8 border-[1.5px] border-[#1F1A26] bg-[#5FAE84] text-white flex items-center justify-center font-black text-xs">
            {track.id}
          </span>
        </div>

        {/* Subtitle */}
        <p className="text-[11px] sm:text-xs text-[#5FAE84] font-bold mb-3">
          {track.subtitle}
        </p>

        {/* Description */}
        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-4 font-medium line-clamp-3">
          {track.description}
        </p>
      </div>

      {/* Footer */}
      <div className="pt-4 border-t border-slate-200 mt-2">
        <div className="flex items-center justify-between">
          <Link
            href={`/register?track=${track.id}`}
            className="inline-flex items-center gap-1.5 text-xs font-bold text-[#5FAE84] hover:text-[#1F1A26] group/link transition-colors"
          >
            <span>تسجيل فكرة في هذا المجال</span>
            <ArrowLeft className="w-3.5 h-3.5 transition-transform group-hover/link:-translate-x-1" />
          </Link>
          <span className="text-[10px] text-slate-400 font-mono font-bold">المجال {track.id}/5</span>
        </div>
      </div>
    </div>
  );
}
