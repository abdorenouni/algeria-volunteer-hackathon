'use client';

import React, { useRef, useEffect, useState } from 'react';

interface TimelineStep {
  title: string;
  time: string;
  description: string;
}

function useInView(ref: React.RefObject<HTMLElement | null>, threshold = 0.2) {
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setInView(true); },
      { threshold }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [ref, threshold]);
  return inView;
}

function TimelineItem({ step, idx, side }: { step: TimelineStep; idx: number; side: 'right' | 'left' }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref);

  return (
    <div
      ref={ref}
      className={`relative grid grid-cols-1 md:grid-cols-2 gap-8 items-center transition-all duration-700 ${
        inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      }`}
      style={{ transitionDelay: `${idx * 150}ms` }}
    >
      {/* Center Dot on Spine */}
      <div className={`hidden md:block absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-20 transition-all duration-500 ${
        inView ? 'scale-100' : 'scale-0'
      }`}>
        <div className="w-4 h-4 rounded-full bg-[#5FAE84] border-[3px] border-[#FBF9FC] shadow-[0_0_0_2px_#5FAE84]" />
      </div>

      {/* Right Side (in RTL): Title & Time */}
      <div className="text-right md:pr-10">
        <h3 className="text-xl sm:text-2xl font-black text-[#1F1A26]">
          {step.title}
        </h3>
        <span className="inline-block mt-1.5 font-mono text-sm sm:text-base font-bold text-[#BE3943] bg-[#BE3943]/5 px-2 py-0.5">
          {step.time}
        </span>
      </div>

      {/* Left Side (in RTL): Description Card */}
      <div className="md:pl-10">
        <div className="p-4 sm:p-5 bg-white border-[1.5px] border-[#1F1A26] text-xs sm:text-sm font-medium text-slate-700 leading-relaxed shadow-[-3px_3px_0px_#1F1A26] hover:shadow-[-4px_4px_0px_#1F1A26] transition-shadow duration-300">
          {step.description}
        </div>
      </div>
    </div>
  );
}

export default function ScheduleTimeline() {
  const sectionRef = useRef<HTMLElement>(null);
  const sectionInView = useInView(sectionRef, 0.1);

  const day1Steps: TimelineStep[] = [
    {
      title: 'الافتتاح الرسمي',
      time: '08:30 - 10:00',
      description: 'استقبال الفرق وتوزيع بطاقات الاعتماد وتوضيح الشروط المرجعية للإيدياثون',
    },
    {
      title: 'انطلاق الحدث',
      time: '10:30 - 13:00',
      description: 'جلسات تفكيك المعطيات، تحديد الفئات المستهدفة، وحصر الاحتياج الميداني المحلي.',
    },
    {
      title: 'حصر التحدي وبلورة الأفكار',
      time: '14:00 - 18:00',
      description: 'جلسات مرافقة مع مؤطري دار الشباب لبلورة الحل في مخطط تنفيذي متكامل.',
    },
  ];

  const day2Steps: TimelineStep[] = [
    {
      title: 'اللمسات الأخيرة وتجهيز العروض',
      time: '08:30 - 11:30',
      description: 'صياغة وثيقة العرض ومخطط الاستدامة الميداني وتجربة الإلقاء أمام المرشدين.',
    },
    {
      title: 'العرض أمام لجنة التحكيم',
      time: '13:00 - 16:00',
      description: 'تقديم العرض في 5 دقائق مع 3 دقائق مناقشة وتقييم دقيق حسب شبكة 100 نقطة.',
    },
    {
      title: 'إعلان النتائج وتتويج الفائزين',
      time: '16:30 - 18:00',
      description: 'المصادقة على محضر النتائج وتأهيل المراتب الأولى للمرحلة الوطنية.',
    },
  ];

  return (
    <section ref={sectionRef} id="schedule" className="relative py-20 scroll-mt-20 overflow-hidden bg-[#FBF9FC]">
      
      {/* Section Header */}
      <div className={`text-center mb-16 relative z-10 transition-all duration-700 ${
        sectionInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
      }`}>
        <h2 className="text-3xl sm:text-5xl font-black text-[#1F1A26] tracking-tight font-tajawal">
          الجدول الزمني للحدث
        </h2>
        <p className="text-xs sm:text-sm text-slate-500 mt-2 font-bold">
          يومان من الابتكار والعمل الجماعي
        </p>
      </div>

      {/* Main Timeline Spine Container */}
      <div className="relative max-w-4xl mx-auto px-4">
        
        {/* Center Vertical Spine Line — animated fill */}
        <div className="absolute left-1/2 top-4 bottom-4 w-[2px] bg-[#CBD5E1]/50 -translate-x-1/2">
          <div
            className="w-full bg-gradient-to-b from-[#5FAE84] to-[#5FAE84]/30 transition-all duration-1000 ease-out"
            style={{ height: sectionInView ? '100%' : '0%' }}
          />
        </div>

        {/* ================= DAY 1 ================= */}
        <div className={`relative z-10 mb-10 transition-all duration-500 ${sectionInView ? 'opacity-100 scale-100' : 'opacity-0 scale-90'}`}>
          <div className="flex items-center justify-center">
            <div className="bg-[#5FAE84] text-white px-8 py-2.5 border-[1.5px] border-[#1F1A26] rounded-none font-black text-sm shadow-[-3px_3px_0px_#1F1A26]">
              اليوم الأول — 19 سبتمبر 2026
            </div>
          </div>
        </div>

        <div className="space-y-12 mb-16">
          {day1Steps.map((step, idx) => (
            <TimelineItem key={idx} step={step} idx={idx} side={idx % 2 === 0 ? 'right' : 'left'} />
          ))}
        </div>

        {/* ================= DAY 2 ================= */}
        <div className={`relative z-10 mb-10 transition-all duration-500 delay-300 ${sectionInView ? 'opacity-100 scale-100' : 'opacity-0 scale-90'}`}>
          <div className="flex items-center justify-center">
            <div className="bg-[#5FAE84] text-white px-8 py-2.5 border-[1.5px] border-[#1F1A26] rounded-none font-black text-sm shadow-[-3px_3px_0px_#1F1A26]">
              اليوم الثاني — 20 سبتمبر 2026
            </div>
          </div>
        </div>

        <div className="space-y-12">
          {day2Steps.map((step, idx) => (
            <TimelineItem key={idx} step={step} idx={idx + 3} side={idx % 2 === 0 ? 'right' : 'left'} />
          ))}
        </div>

      </div>

    </section>
  );
}
