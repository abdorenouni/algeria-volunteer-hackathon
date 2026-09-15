'use client';

import React, { useState } from 'react';
import { Calendar, Clock, CheckCircle2, Award, Users, Flag, Sparkles } from 'lucide-react';

interface TimelineEvent {
  day: 1 | 2;
  side: 'right' | 'left';
  time: string;
  title: string;
  description: string;
}

export default function ScheduleTimeline() {
  const events: TimelineEvent[] = [
    // Day 1
    {
      day: 1,
      side: 'right',
      time: '08:30 - 10:00',
      title: 'الافتتاح الرسمي',
      description: 'استقبال الفرق وتوزيع بطاقات الاعتماد وتوضيح الشروط المرجعية للإيدياثون.',
    },
    {
      day: 1,
      side: 'left',
      time: '10:30 - 13:00',
      title: 'انطلاق الحدث',
      description: 'جلسات تفكيك المعطيات، تحديد الفئات المستهدفة، وحصر الاحتياج الميداني المحلي.',
    },
    {
      day: 1,
      side: 'right',
      time: '14:00 - 18:00',
      title: 'حصر التحدي وبلورة الافكار',
      description: 'جلسات مرافقة مع مؤطري دار الشباب لبلورة الحل في مخطط تنفيذي متكامل.',
    },
    // Day 2
    {
      day: 2,
      side: 'left',
      time: '08:30 - 11:30',
      title: 'اللمسات الأخيرة وتجهيز العروض',
      description: 'صياغة وثيقة العرض ومخطط الاستدامة الميداني وتجربة الإلقاء أمام المرشدين.',
    },
    {
      day: 2,
      side: 'right',
      time: '13:00 - 16:00',
      title: 'العرض أمام لجنة التحكيم',
      description: 'تقديم العرض في 5 دقائق مع 3 دقائق مناقشة وتقييم دقيق حسب شبكة 100 نقطة.',
    },
    {
      day: 2,
      side: 'left',
      time: '16:30 - 18:00',
      title: 'إعلان النتائج وتتويج الفائزين',
      description: 'المصادقة على محضر النتائج وتأهيل المراتب الأولى للمرحلة الوطنية.',
    },
  ];

  return (
    <section id="schedule" className="relative py-16 scroll-mt-20">
      
      {/* Decorative Red Arrow (From Figma top corner) */}
      <div className="absolute top-6 right-6 sm:right-16 hidden md:block select-none pointer-events-none">
        <svg width="90" height="90" viewBox="0 0 100 100" fill="none">
          <path
            d="M85 85 C60 50, 45 40, 20 20"
            stroke="#D9383A"
            strokeWidth="5"
            strokeLinecap="round"
          />
          <polygon points="12,15 32,15 25,32" fill="#D9383A" />
        </svg>
      </div>

      {/* Section Header */}
      <div className="text-center mb-16">
        <h2 className="text-3xl sm:text-4xl font-black text-black tracking-tight font-tajawal">
          الجدول الزمني للحدث
        </h2>
        <p className="text-xs sm:text-sm text-slate-600 mt-2 font-bold">
          البرنامج الميداني الموحد المنفذ عبر مؤسسات ودور الشباب بولاية الجزائر (19 - 20 سبتمبر 2026)
        </p>
      </div>

      {/* Main Alternating Timeline Spine */}
      <div className="relative max-w-5xl mx-auto px-4">
        
        {/* Center Vertical Spine Line (Desktop) */}
        <div className="hidden md:block absolute left-1/2 top-4 bottom-4 w-1 bg-black -translate-x-1/2 -z-0"></div>

        {/* ================= DAY 1 BADGE ================= */}
        <div className="flex justify-center mb-12 relative z-10">
          <div className="neo-box bg-[#2E7D5B] text-white px-6 py-2.5 font-black text-sm sm:text-base border-2 border-black shadow-[4px_4px_0px_#000]">
            19 سبتمبر 2026 — اليوم الأول
          </div>
        </div>

        {/* DAY 1 EVENTS */}
        <div className="space-y-12 mb-16">
          {events.filter((e) => e.day === 1).map((ev, idx) => (
            <div
              key={idx}
              className={`relative flex flex-col md:flex-row items-center ${
                ev.side === 'right' ? 'md:flex-row-reverse' : ''
              } gap-6 md:gap-12`}
            >
              {/* Event Card */}
              <div className="w-full md:w-[46%]">
                <div
                  className={`flex flex-col text-right ${
                    ev.side === 'right' ? 'md:items-start' : 'md:items-end'
                  }`}
                >
                  <h3 className="text-xl sm:text-2xl font-black text-black mb-1 font-tajawal">
                    {ev.title}
                  </h3>
                  <span className="text-sm font-black font-mono text-[#D9383A] mb-3">
                    {ev.time}
                  </span>

                  {/* Neo-brutalist Content Box */}
                  <div className="neo-box p-5 w-full bg-white border-2 border-black shadow-[4px_4px_0px_#000]">
                    <p className="text-xs sm:text-sm text-black font-medium leading-relaxed">
                      {ev.description}
                    </p>
                  </div>
                </div>
              </div>

              {/* Center Marker Dot (Desktop) */}
              <div className="hidden md:flex absolute left-1/2 top-6 -translate-x-1/2 z-10 w-7 h-7 rounded-full bg-[#2E7D5B] border-2 border-black items-center justify-center shadow-[2px_2px_0px_#000]">
                <div className="w-2.5 h-2.5 rounded-full bg-white"></div>
              </div>

              {/* Empty Spacer Column for Desktop alternating */}
              <div className="hidden md:block w-[46%]"></div>
            </div>
          ))}
        </div>

        {/* ================= DAY 2 BADGE ================= */}
        <div className="flex justify-center mb-12 relative z-10">
          <div className="neo-box bg-[#2E7D5B] text-white px-6 py-2.5 font-black text-sm sm:text-base border-2 border-black shadow-[4px_4px_0px_#000]">
            20 سبتمبر 2026 — اليوم الثاني
          </div>
        </div>

        {/* DAY 2 EVENTS */}
        <div className="space-y-12">
          {events.filter((e) => e.day === 2).map((ev, idx) => (
            <div
              key={idx}
              className={`relative flex flex-col md:flex-row items-center ${
                ev.side === 'right' ? 'md:flex-row-reverse' : ''
              } gap-6 md:gap-12`}
            >
              {/* Event Card */}
              <div className="w-full md:w-[46%]">
                <div
                  className={`flex flex-col text-right ${
                    ev.side === 'right' ? 'md:items-start' : 'md:items-end'
                  }`}
                >
                  <h3 className="text-xl sm:text-2xl font-black text-black mb-1 font-tajawal">
                    {ev.title}
                  </h3>
                  <span className="text-sm font-black font-mono text-[#D9383A] mb-3">
                    {ev.time}
                  </span>

                  {/* Neo-brutalist Content Box */}
                  <div className="neo-box p-5 w-full bg-white border-2 border-black shadow-[4px_4px_0px_#000]">
                    <p className="text-xs sm:text-sm text-black font-medium leading-relaxed">
                      {ev.description}
                    </p>
                  </div>
                </div>
              </div>

              {/* Center Marker Dot (Desktop) */}
              <div className="hidden md:flex absolute left-1/2 top-6 -translate-x-1/2 z-10 w-7 h-7 rounded-full bg-[#2E7D5B] border-2 border-black items-center justify-center shadow-[2px_2px_0px_#000]">
                <div className="w-2.5 h-2.5 rounded-full bg-white"></div>
              </div>

              {/* Empty Spacer Column for Desktop alternating */}
              <div className="hidden md:block w-[46%]"></div>
            </div>
          ))}
        </div>

      </div>

    </section>
  );
}
