'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Track } from '@/types/hackathon';
import { 
  UsersRound, 
  HeartHandshake, 
  Sprout, 
  Smartphone, 
  Building2, 
  ChevronDown, 
  CheckCircle2, 
  Lightbulb, 
  ArrowLeft 
} from 'lucide-react';

interface TrackCardProps {
  track: Track;
}

const iconMap: Record<string, React.ElementType> = {
  UsersRound,
  HeartHandshake,
  Sprout,
  Smartphone,
  Building2,
};

export default function TrackCard({ track }: TrackCardProps) {
  const [expanded, setExpanded] = useState(false);
  const IconComponent = iconMap[track.iconName] || Lightbulb;

  // Color accents per track
  const colorStyles: Record<number, { border: string; bg: string; text: string; iconBg: string }> = {
    1: { border: 'hover:border-emerald-500', bg: 'bg-emerald-50/50', text: 'text-emerald-800', iconBg: 'bg-emerald-100 text-[#006233]' },
    2: { border: 'hover:border-rose-500', bg: 'bg-rose-50/50', text: 'text-rose-800', iconBg: 'bg-rose-100 text-[#D21034]' },
    3: { border: 'hover:border-green-600', bg: 'bg-green-50/50', text: 'text-green-800', iconBg: 'bg-green-100 text-green-700' },
    4: { border: 'hover:border-sky-500', bg: 'bg-sky-50/50', text: 'text-sky-800', iconBg: 'bg-sky-100 text-sky-700' },
    5: { border: 'hover:border-amber-500', bg: 'bg-amber-50/50', text: 'text-amber-800', iconBg: 'bg-amber-100 text-amber-700' },
  };

  const style = colorStyles[track.id] || colorStyles[1];

  return (
    <div
      className={`group relative bg-white rounded-2xl border border-slate-200/90 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col overflow-hidden ${style.border}`}
    >
      {/* Top Accent Stripe */}
      <div className={`h-1.5 w-full ${
        track.id === 1 ? 'bg-[#006233]' :
        track.id === 2 ? 'bg-[#D21034]' :
        track.id === 3 ? 'bg-green-600' :
        track.id === 4 ? 'bg-sky-600' : 'bg-amber-500'
      }`}></div>

      <div className="p-6 flex-1 flex flex-col justify-between">
        <div>
          {/* Header with Icon and Track Number Badge */}
          <div className="flex items-start justify-between gap-4 mb-4">
            <div className={`w-14 h-14 rounded-2xl flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform ${style.iconBg}`}>
              <IconComponent className="w-7 h-7" />
            </div>
            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-black bg-slate-100 text-slate-700 border border-slate-200">
              المجال {track.id} من 5
            </span>
          </div>

          {/* Titles */}
          <h3 className="text-lg font-black text-slate-900 leading-snug mb-2 group-hover:text-[#006233] transition-colors">
            {track.title}
          </h3>
          <p className="text-xs font-semibold text-slate-500 mb-3">
            {track.subtitle}
          </p>
          <p className="text-xs text-slate-600 leading-relaxed mb-4">
            {track.description}
          </p>
        </div>

        {/* Expandable Details (Objectives & Sample Ideas) */}
        <div className="pt-2 border-t border-slate-100">
          <button
            type="button"
            onClick={() => setExpanded(!expanded)}
            className="flex items-center justify-between w-full text-xs font-bold text-slate-700 hover:text-[#006233] py-2 transition-colors"
          >
            <span>{expanded ? 'إخفاء الأهداف والنماذج المقترحة' : 'عرض الأهداف ونماذج المشاريع'}</span>
            <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${expanded ? 'rotate-180 text-[#006233]' : ''}`} />
          </button>

          {expanded && (
            <div className="mt-3 pt-3 border-t border-slate-100 space-y-4 animate-in fade-in duration-200">
              {/* Objectives */}
              <div>
                <h4 className="text-[11px] font-bold text-slate-900 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#006233]" />
                  الأهداف المسطرة للمجال:
                </h4>
                <ul className="space-y-1.5 text-xs text-slate-600">
                  {track.objectives.map((obj, i) => (
                    <li key={i} className="flex items-start gap-1.5">
                      <span className="text-slate-400 mt-1">•</span>
                      <span>{obj}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Sample Projects */}
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/80">
                <h4 className="text-[11px] font-bold text-slate-900 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                  <Lightbulb className="w-3.5 h-3.5 text-amber-500" />
                  أفكار ونماذج مشاريع مقترحة:
                </h4>
                <ul className="space-y-1 text-xs text-slate-700">
                  {track.sampleProjects.map((sample, i) => (
                    <li key={i} className="flex items-center gap-1.5 text-slate-700">
                      <span className="w-1.5 h-1.5 rounded-full bg-amber-500"></span>
                      <span>{sample}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}
        </div>

        {/* Action Button */}
        <div className="mt-4 pt-4 border-t border-slate-100">
          <Link
            href={`/register?track=${track.id}`}
            className="w-full inline-flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl text-xs font-bold bg-slate-100 hover:bg-[#006233] text-slate-800 hover:text-white transition-all group-hover:bg-[#006233] group-hover:text-white"
          >
            <span>تسجيل مشروع في هذا المجال</span>
            <ArrowLeft className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </div>
  );
}
