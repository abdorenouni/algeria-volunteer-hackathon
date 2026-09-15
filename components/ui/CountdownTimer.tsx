'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';

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
    <div className="relative z-20 inline-flex flex-row items-stretch border-[1.5px] border-[#1F1A26] bg-white shadow-[-4.8px_4.8px_0px_#1F1A26] overflow-hidden transition-all">
      
      {/* Register CTA Button in Figma Green (#5FAE84) */}
      <Link
        href="/register"
        className="flex items-center justify-center bg-[#5FAE84] hover:bg-[#4B9A70] text-white px-7 py-3 font-bold text-sm transition-colors border-l-[1.5px] border-[#1F1A26] flex-shrink-0"
      >
        <span>سجل الآن</span>
      </Link>

      {/* 4 Countdown Boxes matching Figma Desktop - 3 */}
      <div className="flex items-center divide-x divide-x-reverse divide-[#1F1A26] bg-white">
        
        {/* Days */}
        <div className="flex flex-col items-center justify-center px-4 py-2 min-w-[56px]">
          <span className="text-lg sm:text-xl font-bold font-mono text-[#1F1A26] leading-tight" suppressHydrationWarning>
            {formatNumber(timeLeft.days)}
          </span>
          <span className="text-[11px] font-medium text-[#1F1A26] mt-0.5">أيام</span>
        </div>

        {/* Hours */}
        <div className="flex flex-col items-center justify-center px-4 py-2 min-w-[56px]">
          <span className="text-lg sm:text-xl font-bold font-mono text-[#1F1A26] leading-tight" suppressHydrationWarning>
            {formatNumber(timeLeft.hours)}
          </span>
          <span className="text-[11px] font-medium text-[#1F1A26] mt-0.5">ساعة</span>
        </div>

        {/* Minutes */}
        <div className="flex flex-col items-center justify-center px-4 py-2 min-w-[56px]">
          <span className="text-lg sm:text-xl font-bold font-mono text-[#1F1A26] leading-tight" suppressHydrationWarning>
            {formatNumber(timeLeft.minutes)}
          </span>
          <span className="text-[11px] font-medium text-[#1F1A26] mt-0.5">دقيقة</span>
        </div>

        {/* Seconds */}
        <div className="flex flex-col items-center justify-center px-4 py-2 min-w-[56px]">
          <span 
            className="text-lg sm:text-xl font-bold font-mono text-[#1F1A26] leading-tight"
            suppressHydrationWarning
          >
            {formatNumber(timeLeft.seconds)}
          </span>
          <span className="text-[11px] font-medium text-[#1F1A26] mt-0.5">ثانية</span>
        </div>

      </div>

    </div>
  );
}
