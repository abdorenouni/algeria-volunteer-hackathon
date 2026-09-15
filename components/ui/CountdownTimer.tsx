'use client';

import React, { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

// Target date: September 19, 2026 at 08:30 AM (Algeria time, UTC+1)
const TARGET_DATE = new Date('2026-09-19T08:30:00+01:00').getTime();

function getTimeLeft() {
  const now = Date.now();
  const diff = TARGET_DATE - now;
  if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 };

  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
    minutes: Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)),
    seconds: Math.floor((diff % (1000 * 60)) / 1000),
  };
}

export default function CountdownTimer() {
  const [timeLeft, setTimeLeft] = useState(getTimeLeft);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft(getTimeLeft());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const formatNumber = (num: number) => {
    return num < 10 ? `0${num}` : `${num}`;
  };

  return (
    <div className="relative z-20 inline-flex flex-col sm:flex-row items-stretch border-2 border-black bg-white shadow-[5px_5px_0px_#000000] overflow-hidden transition-all">
      
      {/* Register CTA Box (Figma Green #2E7D5B) on the RIGHT in RTL */}
      <Link
        href="/register"
        className="flex items-center justify-center gap-2 bg-[#2E7D5B] hover:bg-[#246448] text-white px-8 py-3.5 font-black text-base transition-colors border-b-2 sm:border-b-0 sm:border-l-2 border-black group flex-shrink-0"
      >
        <span>سجل الآن</span>
        <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
      </Link>

      {/* 4 Countdown Boxes */}
      <div className="flex items-center divide-x divide-x-reverse divide-black bg-white">
        
        {/* Days */}
        <div className="flex flex-col items-center justify-center px-4 sm:px-5 py-2 min-w-[64px]">
          <span className="text-xl sm:text-2xl font-black font-mono text-black leading-tight" suppressHydrationWarning>
            {formatNumber(timeLeft.days)}
          </span>
          <span className="text-[11px] font-bold text-black mt-0.5">أيام</span>
        </div>

        {/* Hours */}
        <div className="flex flex-col items-center justify-center px-4 sm:px-5 py-2 min-w-[64px]">
          <span className="text-xl sm:text-2xl font-black font-mono text-black leading-tight" suppressHydrationWarning>
            {formatNumber(timeLeft.hours)}
          </span>
          <span className="text-[11px] font-bold text-black mt-0.5">ساعة</span>
        </div>

        {/* Minutes */}
        <div className="flex flex-col items-center justify-center px-4 sm:px-5 py-2 min-w-[64px]">
          <span className="text-xl sm:text-2xl font-black font-mono text-black leading-tight" suppressHydrationWarning>
            {formatNumber(timeLeft.minutes)}
          </span>
          <span className="text-[11px] font-bold text-black mt-0.5">دقيقة</span>
        </div>

        {/* Seconds (live ticker in red) */}
        <div className="flex flex-col items-center justify-center px-4 sm:px-5 py-2 min-w-[64px] bg-red-50/30">
          <span 
            className="text-xl sm:text-2xl font-black font-mono text-[#D9383A] leading-tight"
            suppressHydrationWarning
          >
            {formatNumber(timeLeft.seconds)}
          </span>
          <span className="text-[11px] font-bold text-black mt-0.5">ثانية</span>
        </div>

      </div>

    </div>
  );
}
