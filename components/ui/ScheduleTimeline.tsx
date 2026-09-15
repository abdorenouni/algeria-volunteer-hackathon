'use client';

import React from 'react';

interface TimelineStep {
  title: string;
  time: string;
  description: string;
}

export default function ScheduleTimeline() {
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
    <section id="schedule" className="relative py-20 scroll-mt-20 overflow-hidden bg-[#FBF9FC]">
      
      {/* Decorative Red Arrow from Figma */}
      <div className="absolute top-12 left-8 md:left-24 select-none pointer-events-none w-20 md:w-28 opacity-90">
        <img
          src="/figma-assets/13_6731.svg"
          alt="سهم توضيحي"
          className="w-full h-auto"
        />
      </div>

      {/* Section Header */}
      <div className="text-center mb-16 relative z-10">
        <h2 className="text-3xl sm:text-5xl font-black text-[#1F1A26] tracking-tight font-tajawal">
          الجدول الزمني للحدث
        </h2>
      </div>

      {/* Main Timeline Spine Container */}
      <div className="relative max-w-4xl mx-auto px-4">
        
        {/* Center Vertical Spine Line */}
        <div className="absolute left-1/2 top-4 bottom-4 w-[2px] bg-[#CBD5E1] -translate-x-1/2"></div>

        {/* ================= DAY 1: 19 سبتمبر 2026 ================= */}
        <div className="relative z-10 mb-10">
          <div className="flex items-center justify-center">
            <div className="bg-[#5FAE84] text-[#1F1A26] px-6 py-2 border-[1.5px] border-[#1F1A26] rounded-none font-bold text-sm shadow-[-2px_2px_0px_#1F1A26]">
              19 سبتمبر 2026
            </div>
          </div>
        </div>

        {/* Day 1 Steps */}
        <div className="space-y-12 mb-16">
          {day1Steps.map((step, idx) => (
            <div key={idx} className="relative grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              
              {/* Center Dot on Spine */}
              <div className="hidden md:block absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-[#5FAE84] border-2 border-[#FBF9FC] z-20"></div>

              {/* Right Side (in RTL): Title & Time */}
              <div className="text-right md:pr-10">
                <h3 className="text-xl sm:text-2xl font-black text-[#1F1A26]">
                  {step.title}
                </h3>
                <span className="inline-block mt-1 font-mono text-sm sm:text-base font-bold text-[#BE3943]">
                  {step.time}
                </span>
              </div>

              {/* Left Side (in RTL): Description Card */}
              <div className="md:pl-10">
                <div className="p-4 sm:p-5 bg-white border-[1.5px] border-[#1F1A26] text-xs sm:text-sm font-medium text-slate-700 leading-relaxed shadow-[-3px_3px_0px_#1F1A26]">
                  {step.description}
                </div>
              </div>

            </div>
          ))}
        </div>

        {/* ================= DAY 2: 20 سبتمبر 2026 ================= */}
        <div className="relative z-10 mb-10">
          <div className="flex items-center justify-center">
            <div className="bg-[#5FAE84] text-[#1F1A26] px-6 py-2 border-[1.5px] border-[#1F1A26] rounded-none font-bold text-sm shadow-[-2px_2px_0px_#1F1A26]">
              20 سبتمبر 2026
            </div>
          </div>
        </div>

        {/* Day 2 Steps */}
        <div className="space-y-12">
          {day2Steps.map((step, idx) => (
            <div key={idx} className="relative grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              
              {/* Center Dot on Spine */}
              <div className="hidden md:block absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-[#5FAE84] border-2 border-[#FBF9FC] z-20"></div>

              {/* Right Side (in RTL): Title & Time */}
              <div className="text-right md:pr-10">
                <h3 className="text-xl sm:text-2xl font-black text-[#1F1A26]">
                  {step.title}
                </h3>
                <span className="inline-block mt-1 font-mono text-sm sm:text-base font-bold text-[#BE3943]">
                  {step.time}
                </span>
              </div>

              {/* Left Side (in RTL): Description Card */}
              <div className="md:pl-10">
                <div className="p-4 sm:p-5 bg-white border-[1.5px] border-[#1F1A26] text-xs sm:text-sm font-medium text-slate-700 leading-relaxed shadow-[-3px_3px_0px_#1F1A26]">
                  {step.description}
                </div>
              </div>

            </div>
          ))}
        </div>

      </div>

    </section>
  );
}
