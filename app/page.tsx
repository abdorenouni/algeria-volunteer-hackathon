'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { TRACKS } from '@/data/tracks';
import TrackCard from '@/components/ui/TrackCard';
import ScheduleTimeline from '@/components/ui/ScheduleTimeline';
import CountdownTimer from '@/components/ui/CountdownTimer';
import HeroIsometricIllustration from '@/components/ui/HeroIsometricIllustration';
import FaqAccordion from '@/components/ui/FaqAccordion';
import { 
  MinistryEmblem, 
  WilayaAlgerEmblem, 
  AcsPartnerLogo, 
  MaisonJeunesLogo, 
  LjpePartnerLogo,
  TechPartnerDeployly,
  TechPartnerChiali,
  TechPartnerEsisba,
  TechClubNcs
} from '@/components/ui/InstitutionalEmblems';

export default function HomePage() {

  return (
    <div className="flex flex-col min-h-screen bg-[#FBF9FC] text-[#1F1A26]">
      
      {/* ================= SECTION 1: HERO SECTION (FIGMA PROTOTYPE) ================= */}
      <section className="relative overflow-hidden pt-10 sm:pt-16 pb-20 border-b-[1.5px] border-[#1F1A26]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            
            {/* Right Column (in RTL): Hero Typography, Slogan, Countdown Widget, and Seals */}
            <div className="lg:col-span-7 space-y-6 text-right order-1 lg:order-1">
              
              {/* Main Headline from Figma */}
              <div className="space-y-2">
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-[#1F1A26] tracking-tight leading-[1.2] font-tajawal">
                  مؤسسات الشباب... <br />
                  <span className="text-[#1F1A26] inline-block mt-1">
                    فضاءات للابتكار و التطوع.
                  </span>
                </h1>
              </div>

              {/* Subtitle from Figma */}
              <p className="text-base sm:text-lg text-slate-700 leading-relaxed font-medium max-w-xl">
                انضم إلى إيدياثون &ldquo;إبتكار - تطوع&rdquo; للشباب المبتكرين وصنّاع الأفكار.
                <br />
                حوّل فكرتك إلى حلّ حقيقي، وابتكر أثراً لمجتمعك.
              </p>

              {/* Integrated CTA Button + Live Countdown Box */}
              <div className="pt-2">
                <CountdownTimer />
              </div>

              {/* Official Ministerial & Wilaya Seals Row from Figma */}
              <div className="pt-4 flex items-center gap-6">
                <MinistryEmblem size={56} />
                <WilayaAlgerEmblem size={56} />
              </div>



            </div>

            {/* Left Column (in RTL): Isometric Illustration from Figma */}
            <div className="lg:col-span-5 flex justify-center order-2 lg:order-2">
              <HeroIsometricIllustration />
            </div>

          </div>

        </div>
      </section>

      {/* ================= SECTION 2: ABOUT IDEATHON & 4 STATS (FIGMA FRAME 26) ================= */}
      <section id="about" className="py-20 bg-white border-b-[1.5px] border-[#1F1A26] scroll-mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
            
            {/* Right Column (in RTL): Narrative Texts with hand-drawn red circle around 'حول' */}
            <div className="lg:col-span-6 space-y-6 text-right">
              
              <div className="relative inline-block">
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#1F1A26] tracking-tight font-tajawal relative z-10">
                  <span className="relative inline-block px-3 py-1">
                    حول
                    {/* Hand-drawn Red Oval SVG around 'حول' as in Figma */}
                    <svg
                      className="absolute inset-0 w-full h-full -z-10 pointer-events-none stroke-[#BE3943] fill-none"
                      viewBox="0 0 100 60"
                      preserveAspectRatio="none"
                    >
                      <ellipse
                        cx="50"
                        cy="30"
                        rx="45"
                        ry="25"
                        strokeWidth="3.5"
                        strokeLinecap="round"
                        transform="rotate(-5 50 30)"
                      />
                    </svg>
                  </span>
                  {' '}إيدياثون الابتكار والتطوع
                </h2>
              </div>

              <div className="space-y-4 text-slate-700 text-sm sm:text-base leading-relaxed font-medium">
                <p>
                  إيدياثون الابتكار والتطوع هو فعالية وطنية بتصفيات ولائية تجمع الشباب المبدعين والمبتكرين داخل دور الشباب، لابتكار حلول وأفكار جديدة تساهم في تطوير العمل التطوعي وخدمة المجتمع.
                </p>
                <p>
                  من خلال التعاون والإبداع، يحوّل المشاركون التحديات التي تواجه العمل التطوعي إلى حلول مبتكرة وقابلة للتطبيق، مستفيدين من التكنولوجيا والتصميم وريادة الأعمال لصناعة أثر إيجابي ومستدام.
                </p>
                <p className="font-bold text-[#1F1A26]">
                  الإيدياثون ليس مجرد منافسة، بل هو فضاء يلتقي فيه الشباب لتبادل الأفكار، بناء الحلول، وتحويل الابتكار إلى أثر حقيقي.
                </p>
              </div>

              <div className="pt-2">
                <Link
                  href="/register"
                  className="neo-btn bg-[#5FAE84] text-white px-8 py-3 font-bold text-sm gap-2 inline-flex group rounded-none border-[1.5px] border-[#1F1A26] shadow-[-3px_3px_0px_#1F1A26]"
                >
                  <span>شارك بفريقك الآن</span>
                  <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
                </Link>
              </div>

            </div>

            {/* Left Column (in RTL): 4 Neo-Brutalist Metric Boxes (Figma 4-grid) */}
            <div className="lg:col-span-6">
              <div className="grid grid-cols-2 gap-5">
                
                {/* Box 1: 48 ساعة لابتكار الحلول (Gradient Green) */}
                <div className="p-6 sm:p-8 bg-gradient-to-br from-[#5FAE84] to-[#4ADE80] text-[#1F1A26] border-[1.5px] border-[#1F1A26] shadow-[-4px_4px_0px_#1F1A26] text-center flex flex-col items-center justify-center">
                  <span className="text-4xl sm:text-5xl font-black font-mono block leading-none mb-2 text-[#1F1A26]">
                    48
                  </span>
                  <span className="text-xs sm:text-sm font-bold text-[#1F1A26]">
                    ساعة
                    <br />
                    لابتكار الحلول
                  </span>
                </div>

                {/* Box 2: 1 الطبعة الأولى */}
                <div className="p-6 sm:p-8 bg-white text-[#1F1A26] border-[1.5px] border-[#1F1A26] shadow-[-4px_4px_0px_#1F1A26] text-center flex flex-col items-center justify-center">
                  <span className="text-4xl sm:text-5xl font-black font-mono block leading-none mb-2 text-[#1F1A26]">
                    1
                  </span>
                  <span className="text-xs sm:text-sm font-bold text-[#1F1A26]">
                    الطبعة
                    <br />
                    الأولى
                  </span>
                </div>

                {/* Box 3: 60 شاباً مشاركاً وطموحاً */}
                <div className="p-6 sm:p-8 bg-white text-[#1F1A26] border-[1.5px] border-[#1F1A26] shadow-[-4px_4px_0px_#1F1A26] text-center flex flex-col items-center justify-center">
                  <span className="text-4xl sm:text-5xl font-black font-mono block leading-none mb-2 text-[#1F1A26]">
                    60
                  </span>
                  <span className="text-xs sm:text-sm font-bold text-[#1F1A26]">
                    شاباً
                    <br />
                    مشاركاً وطموحاً
                  </span>
                </div>

                {/* Box 4: 15 فريقاً متنافساً */}
                <div className="p-6 sm:p-8 bg-white text-[#1F1A26] border-[1.5px] border-[#1F1A26] shadow-[-4px_4px_0px_#1F1A26] text-center flex flex-col items-center justify-center">
                  <span className="text-4xl sm:text-5xl font-black font-mono block leading-none mb-2 text-[#1F1A26]">
                    15
                  </span>
                  <span className="text-xs sm:text-sm font-bold text-[#1F1A26]">
                    فريقاً
                    <br />
                    متنافساً
                  </span>
                </div>

              </div>
            </div>

          </div>

        </div>
      </section>

      {/* ================= SECTION 3: 2-DAY TIMELINE (FIGMA DESIGN) ================= */}
      <div className="border-b-[1.5px] border-[#1F1A26] bg-[#FBF9FC]">
        <ScheduleTimeline />
      </div>

      {/* ================= SECTION 4: 5 COMPETITION TRACKS (FIGMA ARTBOARDS) ================= */}
      <section id="tracks" className="py-20 bg-white border-b-[1.5px] border-[#1F1A26] scroll-mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl sm:text-5xl font-black text-[#1F1A26] tracking-tight font-tajawal">
              المحاور الخمسة للتحدي الولائي
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 mt-2 font-bold">
              تستجيب للأولويات الوطنية لقطاع الشباب والرياضة في تنظيم التطوع وحماية البيئة والرقمنة
            </p>
          </div>

          {/* Grid of 5 Cards matching Figma layout */}
          <div className="space-y-6 max-w-5xl mx-auto">
            
            {/* Row 1: Track 1 & Track 2 */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <TrackCard track={TRACKS[0]} />
              <TrackCard track={TRACKS[1]} />
            </div>

            {/* Row 2: Track 3 & Track 4 */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <TrackCard track={TRACKS[2]} />
              <TrackCard track={TRACKS[3]} />
            </div>

            {/* Row 3: Track 5 (Centered Box as in Figma) */}
            <div className="max-w-xl mx-auto">
              <TrackCard track={TRACKS[4]} />
            </div>

          </div>
        </div>
      </section>

      {/* ================= SECTION 5: ORGANIZERS & PARTNERS (FIGMA 'من تنظيم') ================= */}
      <section className="py-20 bg-[#FBF9FC] border-b-[1.5px] border-[#1F1A26] relative overflow-hidden">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative">
          
          {/* Red Sparkle Star Decoration Right */}
          <div className="absolute right-4 top-1/2 -translate-y-1/2 hidden md:block select-none pointer-events-none w-12 h-12">
            <img src="/figma-assets/13_6732.svg" alt="زخرفة" className="w-full h-auto" />
          </div>

          {/* Green Sparkle Star Decoration Left */}
          <div className="absolute left-4 top-1/2 -translate-y-1/2 hidden md:block select-none pointer-events-none w-12 h-12">
            <img src="/figma-assets/13_6739.svg" alt="زخرفة" className="w-full h-auto" />
          </div>

          <h3 className="text-3xl sm:text-4xl font-black text-[#1F1A26] mb-14 font-tajawal">
            من تنظيم
          </h3>

          {/* Partner Logos Row matching Figma Web App Design Frame 49 */}
          <div className="flex flex-wrap items-center justify-center gap-10 sm:gap-14">
            <AcsPartnerLogo />
            <MaisonJeunesLogo />
            <MinistryEmblem size={68} />
            <WilayaAlgerEmblem size={68} />
            <LjpePartnerLogo />
          </div>

          {/* Figma Brand Identity Frame 49: شركاؤنا */}
          <div className="mt-16 pt-12 border-t border-[#1F1A26]/10">
            <h4 className="text-xl sm:text-2xl font-bold text-slate-700 mb-8 font-tajawal">
              شركاؤنا ورعاة التكنولوجيا
            </h4>
            <div className="flex flex-wrap items-center justify-center gap-8 sm:gap-12 opacity-90 grayscale hover:grayscale-0 transition-all duration-300">
              <TechPartnerDeployly />
              <TechPartnerChiali />
              <TechPartnerEsisba />
              <TechClubNcs />
            </div>
          </div>

        </div>
      </section>

      {/* ================= SECTION 6: FAQ ACCORDION (FIGMA 'الأسئلة الشائعة') ================= */}
      <FaqAccordion />

    </div>
  );
}
