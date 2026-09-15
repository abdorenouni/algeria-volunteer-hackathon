'use client';

import React from 'react';
import Link from 'next/link';
import { Track } from '@/types/hackathon';
import { ArrowLeft, Sparkles, CheckCircle2 } from 'lucide-react';

interface TrackCardProps {
  track: Track;
  className?: string;
}

export default function TrackCard({ track, className = '' }: TrackCardProps) {
  // Custom tag details from Figma artboards
  const trackDetails: Record<number, { tag: string; tagType: 'outputs' | 'reminder' | 'model' }> = {
    1: { tag: 'المخرجات المستهدفة: ميثاق ولاء تطوعي، آليات حشد مبتكرة، استدامة نوادي الدور', tagType: 'outputs' },
    2: { tag: 'تذكير: التضامن والإسعاف المجتمعي', tagType: 'reminder' },
    3: { tag: 'تذكير: الاستدامة والعمل المناخي', tagType: 'reminder' },
    4: { tag: 'المخرجات المستهدفة: تطبيقات هاتف، منصات ويب، قياس رقمي لبنك الساعات', tagType: 'outputs' },
    5: { tag: 'نموذج تسيير مؤسساتي', tagType: 'model' },
  };

  const detail = trackDetails[track.id];

  return (
    <div
      className={`neo-box p-6 sm:p-7 flex flex-col justify-between hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[6px_6px_0px_#000] transition-all bg-white border-2 border-black shadow-[4px_4px_0px_#000] ${className}`}
    >
      <div>
        {/* Track Title */}
        <div className="flex items-start justify-between gap-3 mb-3">
          <h3 className="text-xl sm:text-2xl font-black text-black leading-tight font-tajawal">
            {track.title}
          </h3>
          <span className="flex-shrink-0 w-7 h-7 border border-black bg-[#2E7D5B] text-white rounded-full flex items-center justify-center font-bold text-xs">
            {track.id}
          </span>
        </div>

        {/* Subtitle / Description */}
        <p className="text-xs sm:text-sm text-slate-700 leading-relaxed mb-6 font-medium">
          {track.description}
        </p>
      </div>

      {/* Footer Tag & CTA */}
      <div className="pt-4 border-t border-slate-200 mt-2 space-y-3">
        {detail && (
          <div className="text-[11px] font-bold text-slate-600 bg-slate-50 border border-slate-300 px-3 py-1.5 rounded-sm">
            {detail.tag}
          </div>
        )}

        <div className="flex items-center justify-between pt-1">
          <Link
            href={`/register?track=${track.id}`}
            className="inline-flex items-center gap-1.5 text-xs font-black text-[#2E7D5B] hover:text-black group transition-colors"
          >
            <span>تسجيل فكرة في هذا التحدي</span>
            <ArrowLeft className="w-3.5 h-3.5 transition-transform group-hover:-translate-x-1" />
          </Link>
          <span className="text-[10px] text-slate-400 font-mono font-bold">المجال {track.id}/5</span>
        </div>
      </div>
    </div>
  );
}
