'use client';

import React, { useRef, useState, useEffect } from 'react';
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
  LjpePartnerLogo
} from '@/components/ui/InstitutionalEmblems';

/* ============================================================
   Animated Counter Hook
   ============================================================ */
function useCountUp(target: number, duration = 1500) {
  const [count, setCount] = useState(0);
  const [started, setStarted] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setStarted(true); },
      { threshold: 0.3 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!started) return;
    let start = 0;
    const increment = target / (duration / 16);
    const timer = setInterval(() => {
      start += increment;
      if (start >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);
    return () => clearInterval(timer);
  }, [started, target, duration]);

  return { count, ref, started };
}

/* ============================================================
   Stat Box with animated counter
   ============================================================ */
function StatBox({ value, label, gradient }: { value: number; label: string; gradient?: boolean }) {
  const { count, ref, started } = useCountUp(value);
  return (
    <div
      ref={ref}
      className={`p-6 sm:p-8 text-center flex flex-col items-center justify-center border-[1.5px] border-[#1F1A26] shadow-[-4px_4px_0px_#1F1A26] hover:shadow-[-6px_6px_0px_#1F1A26] hover:-translate-y-[2px] transition-all duration-300 ${
        gradient
          ? 'bg-gradient-to-br from-[#5FAE84] to-[#4ADE80] text-[#1F1A26]'
          : 'bg-white text-[#1F1A26]'
      } ${started ? 'animate-counter' : 'opacity-0'}`}
    >
      <span className="text-4xl sm:text-5xl font-black font-mono block leading-none mb-2 text-[#1F1A26]">
        {count}
      </span>
      <span className="text-xs sm:text-sm font-bold text-[#1F1A26] whitespace-pre-line">
        {label}
      </span>
    </div>
  );
}

export default function HomePage() {

  return (
    <div className="flex flex-col min-h-screen bg-[#FBF9FC] text-[#1F1A26]">
      
      {/* ================= SECTION 1: HERO ================= */}
      <section className="relative overflow-hidden pt-10 sm:pt-16 pb-20 border-b-[1.5px] border-[#1F1A26]">
        {/* Animated background blobs */}
        <div className="bg-blob bg-blob-1" />
        <div className="bg-blob bg-blob-2" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            
            {/* Right Column (in RTL): Hero Typography */}
            <div className="lg:col-span-7 space-y-6 text-right order-1 lg:order-1">
              
              <div className="space-y-2">
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-[#1F1A26] tracking-tight leading-[1.2] font-tajawal animate-fade-in-up">
                  مؤسسات الشباب... <br />
                  <span className="text-[#1F1A26] inline-block mt-1 animate-fade-in-up delay-200">
                    فضاءات للابتكار و التطوع.
                  </span>
                </h1>
              </div>

              <p className="text-base sm:text-lg text-slate-700 leading-relaxed font-medium max-w-xl animate-fade-in-up delay-300">
                انضم إلى إيدياثون &ldquo;إبتكار - تطوع&rdquo; للشباب المبتكرين وصنّاع الأفكار.
                <br />
                حوّل فكرتك إلى حلّ حقيقي، وابتكر أثراً لمجتمعك.
              </p>

              <div className="pt-2 animate-fade-in-up delay-400">
                <CountdownTimer />
              </div>

              <div className="pt-4 flex items-center gap-6 animate-fade-in-up delay-500">
                <div className="animate-logo-float">
                  <MinistryEmblem size={74} />
                </div>
                <div className="animate-logo-float-reverse">
                  <WilayaAlgerEmblem size={74} />
                </div>
              </div>

            </div>

            {/* Left Column (in RTL): Illustration */}
            <div className="lg:col-span-5 flex justify-center order-2 lg:order-2 animate-fade-in delay-300">
              <HeroIsometricIllustration />
            </div>

          </div>

        </div>
      </section>

      {/* ================= SECTION 2: ABOUT ================= */}
      <section id="about" className="py-20 bg-white border-b-[1.5px] border-[#1F1A26] scroll-mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
            
            {/* Right Column: Narrative Texts */}
            <div className="lg:col-span-6 space-y-6 text-right">
              
              <div className="relative inline-block">
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#1F1A26] tracking-tight font-tajawal relative z-10">
                  <span className="relative inline-block px-3 py-1">
                    حول
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

            {/* Left Column: 4 Animated Metric Boxes */}
            <div className="lg:col-span-6">
              <div className="grid grid-cols-2 gap-5">
                <StatBox value={48} label={"ساعة\nلابتكار الحلول"} gradient />
                <StatBox value={1} label={"الطبعة\nالأولى"} />
                <StatBox value={60} label={"شاباً\nمشاركاً وطموحاً"} />
                <StatBox value={15} label={"فريقاً\nمتنافساً"} />
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* ================= SECTION 3: TIMELINE ================= */}
      <div className="border-b-[1.5px] border-[#1F1A26] bg-[#FBF9FC]">
        <ScheduleTimeline />
      </div>

      {/* ================= SECTION 4: TRACKS ================= */}
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

          <div className="space-y-6 max-w-5xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <TrackCard track={TRACKS[0]} />
              <TrackCard track={TRACKS[1]} />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <TrackCard track={TRACKS[2]} />
              <TrackCard track={TRACKS[3]} />
            </div>
            <div className="max-w-xl mx-auto">
              <TrackCard track={TRACKS[4]} />
            </div>
          </div>
        </div>
      </section>

      {/* ================= SECTION 5: ORGANIZERS ================= */}
      <section className="py-20 bg-[#FBF9FC] border-b-[1.5px] border-[#1F1A26] relative overflow-hidden">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative">
          
          {/* Decorative Stars */}
          <div className="absolute right-4 top-1/2 -translate-y-1/2 hidden md:block select-none pointer-events-none w-12 h-12 animate-sparkle">
            <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
              <path d="M24 2 L26 18 L42 24 L26 30 L24 46 L22 30 L6 24 L22 18 Z" fill="#BE3943" />
            </svg>
          </div>
          <div className="absolute left-4 top-1/2 -translate-y-1/2 hidden md:block select-none pointer-events-none w-12 h-12 animate-sparkle" style={{ animationDelay: '1.5s' }}>
            <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
              <path d="M24 2 L26 18 L42 24 L26 30 L24 46 L22 30 L6 24 L22 18 Z" fill="#5FAE84" />
            </svg>
          </div>

          <h3 className="text-3xl sm:text-4xl font-black text-[#1F1A26] mb-14 font-tajawal">
            من تنظيم
          </h3>

          <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-10 md:gap-12 max-w-5xl mx-auto">
            
            {/* ACS Logo */}
            <div className="animate-logo-float transition-all duration-300" style={{ animationDelay: '0s' }}>
              <div className="bg-white/95 backdrop-blur-sm border-[1.5px] border-[#1F1A26] px-6 py-4 shadow-[-4px_4px_0px_#1F1A26] hover:shadow-[-8px_8px_0px_#5FAE84] hover:-translate-y-2.5 transition-all duration-300 rounded-2xl flex items-center justify-center min-w-[150px] sm:min-w-[170px] h-28 sm:h-32">
                <AcsPartnerLogo imgClassName="h-16 sm:h-20 md:h-24" />
              </div>
            </div>

            {/* Maison de Jeunes Abderrahmane Laala */}
            <div className="animate-logo-float-reverse transition-all duration-300" style={{ animationDelay: '0.6s' }}>
              <div className="bg-white/95 backdrop-blur-sm border-[1.5px] border-[#1F1A26] px-6 py-4 shadow-[-4px_4px_0px_#1F1A26] hover:shadow-[-8px_8px_0px_#5FAE84] hover:-translate-y-2.5 transition-all duration-300 rounded-2xl flex items-center justify-center min-w-[220px] sm:min-w-[270px] h-28 sm:h-32">
                <MaisonJeunesLogo imgClassName="h-16 sm:h-20 md:h-24" />
              </div>
            </div>

            {/* Ministry of Youth & Sports Emblem */}
            <div className="animate-logo-float transition-all duration-300" style={{ animationDelay: '1.2s' }}>
              <div className="bg-white/95 backdrop-blur-sm border-[1.5px] border-[#1F1A26] p-4 shadow-[-4px_4px_0px_#1F1A26] hover:shadow-[-8px_8px_0px_#5FAE84] hover:-translate-y-2.5 transition-all duration-300 rounded-2xl flex items-center justify-center w-28 h-28 sm:w-32 sm:h-32">
                <MinistryEmblem size={96} />
              </div>
            </div>

            {/* Wilaya of Algiers Emblem */}
            <div className="animate-logo-float-reverse transition-all duration-300" style={{ animationDelay: '1.8s' }}>
              <div className="bg-white/95 backdrop-blur-sm border-[1.5px] border-[#1F1A26] p-4 shadow-[-4px_4px_0px_#1F1A26] hover:shadow-[-8px_8px_0px_#5FAE84] hover:-translate-y-2.5 transition-all duration-300 rounded-2xl flex items-center justify-center w-28 h-28 sm:w-32 sm:h-32">
                <WilayaAlgerEmblem size={96} />
              </div>
            </div>

            {/* LJPE Logo */}
            <div className="animate-logo-float transition-all duration-300" style={{ animationDelay: '2.4s' }}>
              <div className="bg-white/95 backdrop-blur-sm border-[1.5px] border-[#1F1A26] px-6 py-4 shadow-[-4px_4px_0px_#1F1A26] hover:shadow-[-8px_8px_0px_#5FAE84] hover:-translate-y-2.5 transition-all duration-300 rounded-2xl flex items-center justify-center min-w-[150px] sm:min-w-[170px] h-28 sm:h-32">
                <LjpePartnerLogo imgClassName="h-16 sm:h-20 md:h-24" />
              </div>
            </div>

          </div>


        </div>
      </section>

      {/* ================= SECTION 6: FAQ ================= */}
      <FaqAccordion />

    </div>
  );
}
