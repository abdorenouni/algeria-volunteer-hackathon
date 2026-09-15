'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Footer() {
  const pathname = usePathname();
  if (pathname === '/register') return null;
  return (
    <footer className="mt-auto bg-[#FBF9FC]">
      
      {/* ================= PRE-FOOTER GREEN CTA CARD (FIGMA DESIGN) ================= */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="relative bg-[#3B7054] text-white p-8 sm:p-14 text-center border-[1.5px] border-[#1F1A26] shadow-[-6px_6px_0px_#000000] overflow-hidden">
          
          {/* Top-Right Decorative Red Star */}
          <div className="absolute top-4 right-4 sm:top-6 sm:right-6 select-none pointer-events-none">
            <svg width="40" height="40" viewBox="0 0 48 48" fill="none">
              <path
                d="M24 2 L26 18 L42 24 L26 30 L24 46 L22 30 L6 24 L22 18 Z"
                fill="#BE3943"
              />
            </svg>
          </div>

          {/* Bottom-Left Decorative Red Star */}
          <div className="absolute bottom-4 left-4 sm:bottom-6 sm:left-6 select-none pointer-events-none">
            <svg width="40" height="40" viewBox="0 0 48 48" fill="none">
              <path
                d="M24 2 L26 18 L42 24 L26 30 L24 46 L22 30 L6 24 L22 18 Z"
                fill="#BE3943"
              />
            </svg>
          </div>

          {/* Slogan Headline */}
          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-tight font-tajawal mb-4">
            مؤسسات الشباب... فضاءات للابتكار و التطوع.
          </h2>

          <p className="text-sm sm:text-base text-emerald-100 font-bold mb-8 max-w-xl mx-auto">
            حوّل فكرتك إلى حل، وحلّك إلى أثر.
          </p>

          {/* Neo-brutalist CTA Button */}
          <Link
            href="/register"
            className="neo-btn bg-white hover:bg-slate-100 text-[#1F1A26] px-10 py-3.5 font-bold text-base border-[1.5px] border-[#1F1A26] shadow-[-4.8px_4.8px_0px_#1F1A26] inline-flex items-center transition-all"
          >
            <span>سجل الآن</span>
          </Link>

        </div>
      </div>

      {/* ================= MAIN DARK FOREST GREEN FOOTER (FIGMA #1E3A2B) ================= */}
      <div className="bg-[#1E3A2B] text-white border-t-[1.5px] border-[#1F1A26] pt-14 pb-10">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Centered Brand Presentation */}
          <div className="flex flex-col items-center text-center space-y-4 mb-8">
            
            <div className="flex items-center justify-center">
              <img
                src="/figma-assets/footer-brand.svg"
                alt="شعار إيدياثون ابتكار وتطوع"
                className="h-16 w-auto object-contain"
              />
            </div>

            {/* Subtitle from Figma */}
            <p className="text-xs sm:text-sm text-emerald-200/90 max-w-lg font-medium leading-relaxed">
              نصنع المستقبل خطوة بخطوة...
              <br />
              انضم إلينا واختبر مهاراتك في تجربة الابتكار الاستثنائية
            </p>

          </div>

          {/* Navigation Links Row matching Figma */}
          <div className="pt-6 pb-6 border-t border-emerald-900/60">
            <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-10 text-xs sm:text-sm font-bold text-white/90">
              <Link href="/#faq" className="hover:text-[#5FAE84] transition-colors">
                المجتمع
              </Link>
              <a href="mailto:sd_ppmav@mjeunese.gov.dz" className="hover:text-[#5FAE84] transition-colors">
                اتصل بنا
              </a>
              <Link href="/register" className="hover:text-[#5FAE84] transition-colors">
                شارك معنا
              </Link>
              <Link href="/#tracks" className="hover:text-[#5FAE84] transition-colors">
                القواعد والضوابط
              </Link>
              <Link href="/#about" className="hover:text-[#5FAE84] transition-colors">
                من نحن
              </Link>
            </div>
          </div>

          {/* Bottom Notice */}
          <div className="pt-6 text-center text-xs text-emerald-400/80 font-medium">
            جميع الحقوق محفوظة © 2026 — ولاية الجزائر (الرمز 16) • مديرية الشباب والرياضة والترفيه
          </div>

        </div>
      </div>

    </footer>
  );
}
