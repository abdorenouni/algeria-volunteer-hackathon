'use client';

import React from 'react';
import Link from 'next/link';
import { Track } from '@/types/hackathon';
import { ArrowLeft } from 'lucide-react';

interface TrackCardProps {
  track: Track;
  className?: string;
}

export default function TrackCard({ track, className = '' }: TrackCardProps) {
  const trackDetails: Record<number, { tag: string }> = {
    1: { tag: 'المخرجات المستهدفة: ميثاق ولاء تطوعي، آليات حشد مبتكرة، استدامة نوادي الدور' },
    2: { tag: 'تذكير: التضامن والإسعاف المجتمعي' },
    3: { tag: 'تذكير: الاستدامة والعمل المناخي' },
    4: { tag: 'المخرجات المستهدفة: تطبيقات هاتف، منصات ويب، قياس رقمي لبنك الساعات' },
    5: { tag: 'نموذج تسيير مؤسساتي' },
  };

  const detail = trackDetails[track.id];

  return (
    <div
      className={`p-6 sm:p-7 flex flex-col justify-between transition-all bg-white border-[1.5px] border-[#1F1A26] shadow-[-4px_4px_0px_#1F1A26] hover:shadow-[-6px_6px_0px_#1F1A26] ${className}`}
    >
      <div>
        {/* Track Title */}
        <div className="flex items-start justify-between gap-3 mb-3">
          <h3 className="text-xl sm:text-2xl font-black text-[#1F1A26] leading-snug font-tajawal">
            {track.title}
          </h3>
          <span className="flex-shrink-0 w-7 h-7 border-[1.5px] border-[#1F1A26] bg-[#5FAE84] text-[#1F1A26] flex items-center justify-center font-bold text-xs">
            {track.id}
          </span>
        </div>

        {/* Subtitle / Description */}
        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-6 font-medium">
          {track.description}
        </p>
      </div>

      {/* Footer Tag & Registration Link */}
      <div className="pt-4 border-t border-slate-200 mt-2 space-y-3">
        {detail && (
          <div className="text-[11px] font-bold text-slate-700 bg-[#FBF9FC] border border-[#1F1A26]/30 px-3 py-1.5">
            {detail.tag}
          </div>
        )}

        <div className="flex items-center justify-between pt-1">
          <Link
            href={`/register?track=${track.id}`}
            className="inline-flex items-center gap-1.5 text-xs font-bold text-[#5FAE84] hover:text-[#1F1A26] group transition-colors"
          >
            <span>تسجيل فكرة في هذا المجال</span>
            <ArrowLeft className="w-3.5 h-3.5 transition-transform group-hover:-translate-x-1" />
          </Link>
          <span className="text-[10px] text-slate-400 font-mono font-bold">المجال {track.id}/5</span>
        </div>
      </div>
    </div>
  );
}
