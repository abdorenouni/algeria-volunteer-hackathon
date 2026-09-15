'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import FigmaLogo from '@/components/ui/FigmaLogo';
import { WilayaAlgerEmblemWhite } from '@/components/ui/InstitutionalEmblems';

export default function Footer() {
  return (
    <footer className="mt-auto bg-[#FBF9FC]">
      
      {/* ================= PRE-FOOTER GREEN CTA CARD (FIGMA DESIGN) ================= */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="relative bg-[#3B7054] text-white p-8 sm:p-14 text-center border-2 border-black shadow-[6px_6px_0px_#000000] rounded-[4px] overflow-hidden">
          
          {/* Top-Right Decorative Red Star / Sparkle */}
          <div className="absolute top-4 right-4 sm:top-6 sm:right-6 select-none pointer-events-none">
            <svg width="42" height="42" viewBox="0 0 48 48" fill="none">
              <path
                d="M24 2 L26 18 L42 24 L26 30 L24 46 L22 30 L6 24 L22 18 Z"
                fill="#BE3943"
              />
            </svg>
          </div>

          {/* Bottom-Left Decorative Red Star */}
          <div className="absolute bottom-4 left-4 sm:bottom-6 sm:left-6 select-none pointer-events-none">
            <svg width="42" height="42" viewBox="0 0 48 48" fill="none">
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
            className="neo-btn bg-white hover:bg-slate-100 text-black px-10 py-3.5 font-black text-base border-2 border-black shadow-[4px_4px_0px_#000] rounded-[4px] gap-2.5 inline-flex items-center group transition-all"
          >
            <span>سجل الآن</span>
            <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1 text-black" />
          </Link>

        </div>
      </div>

      {/* ================= MAIN DARK FOREST GREEN FOOTER (FIGMA #1E3A2B) ================= */}
      <div className="bg-[#1E3A2B] text-white border-t-2 border-black pt-14 pb-10">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Centered Brand & Emblem Presentation */}
          <div className="flex flex-col items-center text-center space-y-4 mb-8">
            
            {/* Logos Row: Wilaya DJS White Seal + Figma Logo */}
            <div className="flex items-center justify-center gap-6">
              <WilayaAlgerEmblemWhite size={56} />
              <FigmaLogo variant="dark" size="md" />
            </div>

            {/* Subtitle from Figma */}
            <p className="text-xs sm:text-sm text-emerald-200/90 max-w-lg font-medium leading-relaxed">
              نصنع المستقبل خطوة بخطوة..
              <br />
              انضم إلينا واختبر مهاراتك في تجربة الابتكار الاستثنائية
            </p>

          </div>

          {/* Navigation Links Row matching Figma */}
          <div className="pt-6 pb-6">
            <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-10 text-xs sm:text-sm font-bold text-white/90">
              <Link href="/#about" className="hover:text-[#F4B41A] transition-colors">
                من نحن
              </Link>
              <Link href="/#tracks" className="hover:text-[#F4B41A] transition-colors">
                القواعد والضوابط
              </Link>
              <Link href="/register" className="hover:text-[#F4B41A] transition-colors">
                شارك معنا
              </Link>
              <a href="mailto:sd_ppmav@mjeunese.gov.dz" className="hover:text-[#F4B41A] transition-colors">
                اتصل بنا
              </a>
              <Link href="/#faq" className="hover:text-[#F4B41A] transition-colors">
                المجتمع
              </Link>
            </div>
          </div>

          {/* Bottom Copyright & National Notice */}
          <div className="border-t border-emerald-900/90 pt-6 text-center text-xs text-emerald-400/80 font-medium">
            جميع الحقوق محفوظة © 2026 — ولاية الجزائر (الرمز 16) • مديرية الشباب والرياضة والترفيه
          </div>

        </div>
      </div>

    </footer>
  );
}
