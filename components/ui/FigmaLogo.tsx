'use client';

import React from 'react';

interface FigmaLogoProps {
  variant?: 'light' | 'dark';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export default function FigmaLogo({
  variant = 'light',
  size = 'md',
  className = '',
}: FigmaLogoProps) {
  const isDark = variant === 'dark';

  const heights = {
    sm: 'h-10',
    md: 'h-14',
    lg: 'h-20',
  };

  const h = heights[size] || heights.md;

  if (isDark) {
    return (
      <div className={`inline-flex items-center select-none ${className}`}>
        <img
          src="/figma-assets/footer-brand.svg"
          alt="شعار إيدياثون ابتكار وتطوع"
          className={`${h} w-auto object-contain brightness-100`}
        />
      </div>
    );
  }

  return (
    <div className={`inline-flex items-center select-none ${className}`}>
      <img
        src="/figma-assets/brand-logo.svg"
        alt="شعار إيدياثون ابتكار وتطوع"
        className={`${h} w-auto object-contain`}
      />
    </div>
  );
}
