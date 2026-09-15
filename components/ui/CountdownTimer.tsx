'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

const INITIAL_SECONDS = 4 * 86400 + 12 * 3600 + 53 * 60 + 2; // 04d 12h 53m 02s

export default function CountdownTimer() {
  const [totalSeconds, setTotalSeconds] = useState<number>(INITIAL_SECONDS);
  const [mounted, setMounted] = useState<boolean>(false);

  useEffect(() => {
    setMounted(true);

    // Initialize from sessionStorage or start fresh from INITIAL_SECONDS
    const STORAGE_KEY = 'dz_hackathon_remaining_seconds_v2';
    try {
      const stored = sessionStorage.getItem(STORAGE_KEY);
      if (stored) {
        const val = parseInt(stored, 10);
        if (!isNaN(val) && val > 0) {
          setTotalSeconds(val);
        }
      }
    } catch {
      // ignore
    }

    const interval = setInterval(() => {
      setTotalSeconds((prev) => {
        const next = prev > 0 ? prev - 1 : 0;
        try {
          sessionStorage.setItem(STORAGE_KEY, next.toString());
        } catch {
          // ignore
        }
        return next;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const days = Math.floor(totalSeconds / 86400);
  const hours = Math.floor((totalSeconds % 86400) / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

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

      {/* 4 Countdown Boxes (From Right to Left in RTL: Days, Hours, Minutes, Seconds) */}
      <div className="flex items-center divide-x divide-x-reverse divide-black bg-white">
        
        {/* Days Box */}
        <div className="flex flex-col items-center justify-center px-4 sm:px-5 py-2 min-w-[64px]">
          <span className="text-xl sm:text-2xl font-black font-mono text-black leading-tight">
            {mounted ? formatNumber(days) : '--'}
          </span>
          <span className="text-[11px] font-bold text-black mt-0.5">أيام</span>
        </div>

        {/* Hours Box */}
        <div className="flex flex-col items-center justify-center px-4 sm:px-5 py-2 min-w-[64px]">
          <span className="text-xl sm:text-2xl font-black font-mono text-black leading-tight">
            {mounted ? formatNumber(hours) : '--'}
          </span>
          <span className="text-[11px] font-bold text-black mt-0.5">ساعة</span>
        </div>

        {/* Minutes Box */}
        <div className="flex flex-col items-center justify-center px-4 sm:px-5 py-2 min-w-[64px]">
          <span className="text-xl sm:text-2xl font-black font-mono text-black leading-tight">
            {mounted ? formatNumber(minutes) : '--'}
          </span>
          <span className="text-[11px] font-bold text-black mt-0.5">دقيقة</span>
        </div>

        {/* Seconds Box (Active live ticker in Crimson Red #D9383A) */}
        <div className="flex flex-col items-center justify-center px-4 sm:px-5 py-2 min-w-[64px] bg-red-50/30">
          <span 
            className="text-xl sm:text-2xl font-black font-mono text-[#D9383A] leading-tight"
          >
            {mounted ? formatNumber(seconds) : '--'}
          </span>
          <span className="text-[11px] font-bold text-black mt-0.5">ثانية</span>
        </div>

      </div>

    </div>
  );
}
