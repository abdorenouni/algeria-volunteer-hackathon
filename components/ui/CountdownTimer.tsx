'use client';

import React, { useState, useEffect, useRef } from 'react';
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

function FlipDigit({ value, label }: { value: string; label: string }) {
  const [prevValue, setPrevValue] = useState(value);
  const [isFlipping, setIsFlipping] = useState(false);

  useEffect(() => {
    if (value !== prevValue) {
      setIsFlipping(true);
      const timer = setTimeout(() => {
        setPrevValue(value);
        setIsFlipping(false);
      }, 350);
      return () => clearTimeout(timer);
    }
  }, [value, prevValue]);

  return (
    <div className="flex flex-col items-center justify-center px-4 py-2.5 min-w-[56px] sm:min-w-[64px]">
      <div className="countdown-digit relative">
        <span
          className={`text-xl sm:text-2xl font-black font-mono text-[#1F1A26] leading-tight tabular-nums ${
            isFlipping ? 'flip-enter' : ''
          }`}
          suppressHydrationWarning
        >
          {value}
        </span>
      </div>
      <span className="text-[10px] sm:text-[11px] font-bold text-[#1F1A26]/70 mt-1">{label}</span>
    </div>
  );
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
    <div className="relative z-20 inline-flex flex-row items-stretch border-[1.5px] border-[#1F1A26] bg-white shadow-[-4.8px_4.8px_0px_#1F1A26] overflow-hidden transition-all hover:shadow-[-6px_6px_0px_#1F1A26]">
      
      {/* Register CTA Button — with pulse glow */}
      <Link
        href="/register"
        className="flex items-center justify-center bg-[#5FAE84] hover:bg-[#4B9A70] text-white px-7 py-3 font-bold text-sm transition-all border-l-[1.5px] border-[#1F1A26] flex-shrink-0 animate-pulse-glow"
      >
        <span>سجل الآن</span>
      </Link>

      {/* 4 Countdown Boxes with flip animation */}
      <div className="flex items-center divide-x divide-x-reverse divide-[#1F1A26]/20 bg-white">
        <FlipDigit value={formatNumber(timeLeft.days)} label="أيام" />
        <FlipDigit value={formatNumber(timeLeft.hours)} label="ساعة" />
        <FlipDigit value={formatNumber(timeLeft.minutes)} label="دقيقة" />
        <FlipDigit value={formatNumber(timeLeft.seconds)} label="ثانية" />
      </div>

    </div>
  );
}
