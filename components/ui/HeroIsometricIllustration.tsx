'use client';

import React from 'react';

export default function HeroIsometricIllustration() {
  return (
    <div className="relative w-full max-w-[540px] flex items-center justify-center select-none">
      <img
        src="/figma-assets/hero-illustration.png"
        alt="فضاءات الابتكار والتطوع - رسم توضيحي"
        className="w-full h-auto object-contain drop-shadow-sm"
        priority-loader="true"
      />
    </div>
  );
}
