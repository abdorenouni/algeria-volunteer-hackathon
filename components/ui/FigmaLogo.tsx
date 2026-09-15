'use client';

import React from 'react';

interface FigmaLogoProps {
  variant?: 'light' | 'dark';
  size?: 'sm' | 'md' | 'lg';
  showText?: boolean;
  className?: string;
}

export default function FigmaLogo({
  variant = 'light',
  size = 'md',
  showText = true,
  className = '',
}: FigmaLogoProps) {
  const isDark = variant === 'dark';

  const markSizes = {
    sm: 'h-8',
    md: 'h-11',
    lg: 'h-14',
  };

  const textSizes = {
    sm: { title: 'text-sm', sub: 'text-[11px]' },
    md: { title: 'text-base', sub: 'text-xs' },
    lg: { title: 'text-xl', sub: 'text-sm' },
  };

  const currentSize = markSizes[size] || markSizes.md;
  const currentText = textSizes[size] || textSizes.md;

  if (isDark) {
    return (
      <div className={`inline-flex items-center gap-3 select-none ${className}`}>
        {showText ? (
          <div className="flex items-center gap-2.5">
            <div className="flex flex-col text-right leading-none font-tajawal">
              <span className={`font-black text-white tracking-tight ${currentText.title}`}>
                ابتكار - تطوع
              </span>
              <span className={`font-extrabold text-emerald-400 tracking-wider mt-0.5 ${currentText.sub}`}>
                إيدياثون
              </span>
            </div>
            <img
              src="/logos/figma_mark_transparent.png"
              alt="شعار إيدياثون ابتكار وتطوع"
              className={`${currentSize} w-auto object-contain`}
            />
          </div>
        ) : (
          <img
            src="/logos/figma_mark_transparent.png"
            alt="شعار إيدياثون"
            className={`${currentSize} w-auto object-contain`}
          />
        )}
      </div>
    );
  }

  return (
    <div className={`inline-flex items-center gap-3 select-none ${className}`}>
      {showText && (
        <div className="flex flex-col text-right leading-none font-tajawal">
          <span className={`font-black text-black tracking-tight ${currentText.title}`}>
            ابتكار - تطوع
          </span>
          <span className={`font-extrabold text-slate-800 tracking-wider mt-0.5 ${currentText.sub}`}>
            إيدياثون
          </span>
        </div>
      )}
      <img
        src="/logos/figma_mark_transparent.png"
        alt="شعار إيدياثون ابتكار وتطوع"
        className={`${currentSize} w-auto object-contain`}
      />
    </div>
  );
}
