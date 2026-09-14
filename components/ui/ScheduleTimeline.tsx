'use client';

import React, { useState } from 'react';
import { Calendar, Clock, CheckCircle, Flag, Award, Send, Users, Sparkles } from 'lucide-react';

export default function ScheduleTimeline() {
  const [activeDay, setActiveDay] = useState<1 | 2>(1);

  const day1Events = [
    {
      time: '08:30 - 09:30',
      title: 'استقبال الفرق وتأكيد التسجيل',
      description: 'استقبال الفرق المسجلة بمؤسسات ودور الشباب، التحقق من القوائم (3 إلى 5 أعضاء)، وتوزيع الشارات التقنية.',
      icon: Users,
      tag: 'تنظيمي',
      tagColor: 'bg-slate-100 text-slate-700'
    },
    {
      time: '09:30 - 10:30',
      title: 'مراسم الافتتاح الرسمي وإطلاق التحديات',
      description: 'كلمة افتتاحية بحضور ممثلي قطاع الشباب والرياضة، تقديم توجيهات الهاكاثون، وعرض التحديات المحلية المقترحة.',
      icon: Flag,
      tag: 'افتتاح رسمي',
      tagColor: 'bg-emerald-100 text-[#006233]'
    },
    {
      time: '10:30 - 13:00',
      title: 'جلسات العصف الذهني وتأطير الأفكار',
      description: 'انطلاق عمل الفرق ضمن ورشات عمل تفاعلية، تحديد المشكلة بدقة، وصياغة الحل الأولي بمرافقة مؤطري الشباب.',
      icon: Sparkles,
      tag: 'ورشات عمل',
      tagColor: 'bg-amber-100 text-amber-800'
    },
    {
      time: '14:00 - 18:00',
      title: 'تطوير الحل والنمذجة السريعة (Prototyping)',
      description: 'بناء النموذج الأولي للحل التطوعي (منصة رقمية، مبادرة ميدانية، أو حقيبة تدريبية مجتمعية) وتوجيه المؤطرين.',
      icon: CheckCircle,
      tag: 'تطوير مكثف',
      tagColor: 'bg-sky-100 text-sky-800'
    },
    {
      time: '18:00 - 19:30',
      title: 'مراجعة التقدم وتجهيز العرض التقديمي (Pitching)',
      description: 'محاكاة العروض وتدريب الفرق على الإلقاء وتجهيز الملفات الفنية للعرض أمام لجنة التحكيم لليوم الموالي.',
      icon: Clock,
      tag: 'تدريب وإرشاد',
      tagColor: 'bg-purple-100 text-purple-800'
    }
  ];

  const day2Events = [
    {
      time: '08:30 - 10:00',
      title: 'استكمال اللمسات الأخيرة على النماذج',
      description: 'وضع اللمسات الفنية الأخيرة على النماذج الأولية والعروض التقديمية وتجهيز منصة العرض.',
      icon: Sparkles,
      tag: 'إعداد نهائي',
      tagColor: 'bg-slate-100 text-slate-700'
    },
    {
      time: '10:00 - 13:30',
      title: 'جلسة تقديم المشاريع أمام لجنة التحكيم (Pitch)',
      description: 'عرض الفرق لمشاريعها أمام لجنة التحكيم الولائية (5 دقائق لكل فريق + 3 دقائق لأسئلة ومناقشة اللجنة).',
      icon: Award,
      tag: 'جلسة العروض',
      tagColor: 'bg-rose-100 text-[#D21034]'
    },
    {
      time: '14:30 - 16:00',
      title: 'المداولات وتطبيق شبكة التقييم الموحدة (100 نقطة)',
      description: 'اجتماع مغلق للجنة التحكيم لرصد الدرجات وفق المعايير الخمسة الرسمية وفرز أفضل 3 مشاريع ولائية.',
      icon: CheckCircle,
      tag: 'مداولات سرية',
      tagColor: 'bg-amber-100 text-amber-800'
    },
    {
      time: '16:30 - 18:00',
      title: 'الحفل الختامي، إعلان النتائج وتكريم الفائزين',
      description: 'إعلان الفائزين بالمراكز الثلاثة الأولى، توزيع الشهادات والجوائز التكريمية وتكريم كافة المشاركين والشركاء.',
      icon: Award,
      tag: 'تتويج رسمي',
      tagColor: 'bg-emerald-100 text-[#006233]'
    },
    {
      time: '18:30',
      title: 'إرسال التقرير النهائي للوزارة',
      description: 'اعتماد المحضر الرسمي والبطاقة المختصرة وإرسال التقرير فورياً إلى: sd_ppmav@mjeunese.gov.dz.',
      icon: Send,
      tag: 'إرسال وزاري',
      tagColor: 'bg-emerald-600 text-white font-bold'
    }
  ];

  const events = activeDay === 1 ? day1Events : day2Events;

  return (
    <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200/80 shadow-md">
      
      {/* Tab Switcher */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 border-b border-slate-100 pb-6">
        <div>
          <span className="text-xs font-bold text-[#006233] bg-emerald-50 border border-emerald-200 px-3 py-1 rounded-full inline-block mb-2">
            الرزنامة الزمنية الموحدة
          </span>
          <h3 className="text-2xl font-black text-slate-900">
            برنامج التنفيذ الميداني للهاكاثون عبر 58 ولاية
          </h3>
          <p className="text-xs text-slate-500 mt-1">
            جدول زمني تنفيذي موحد يُطبق بالتوازي في جميع مؤسسات ودور الشباب المنظمة
          </p>
        </div>

        <div className="flex items-center gap-2 p-1.5 bg-slate-100 rounded-2xl self-start sm:self-auto">
          <button
            onClick={() => setActiveDay(1)}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold transition-all ${
              activeDay === 1
                ? 'bg-[#006233] text-white shadow-md'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Calendar className="w-4 h-4" />
            <span>اليوم الأول: 19 سبتمبر 2026</span>
          </button>
          <button
            onClick={() => setActiveDay(2)}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold transition-all ${
              activeDay === 2
                ? 'bg-[#006233] text-white shadow-md'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Award className="w-4 h-4" />
            <span>اليوم الثاني: 20 سبتمبر 2026</span>
          </button>
        </div>
      </div>

      {/* Timeline List */}
      <div className="relative pl-2 pr-4 sm:pr-8">
        {/* Continuous vertical line */}
        <div className="absolute right-7 sm:right-11 top-4 bottom-4 w-0.5 bg-slate-200"></div>

        <div className="space-y-6">
          {events.map((ev, index) => {
            const Icon = ev.icon;
            return (
              <div key={index} className="relative flex items-start gap-4 sm:gap-6 group">
                {/* Node icon */}
                <div className="relative z-10 w-9 h-9 sm:w-11 sm:h-11 rounded-xl bg-white border-2 border-[#006233] flex items-center justify-center text-[#006233] group-hover:bg-[#006233] group-hover:text-white transition-colors shadow-sm flex-shrink-0">
                  <Icon className="w-4 h-4 sm:w-5 sm:h-5" />
                </div>

                {/* Event Card */}
                <div className="flex-1 bg-slate-50/70 hover:bg-slate-50 rounded-2xl p-4 sm:p-5 border border-slate-200/80 transition-all hover:shadow-sm">
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-mono font-black text-emerald-800 bg-emerald-100/70 px-2.5 py-1 rounded-lg">
                        {ev.time}
                      </span>
                      <span className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full ${ev.tagColor}`}>
                        {ev.tag}
                      </span>
                    </div>
                  </div>

                  <h4 className="text-base font-bold text-slate-900 mb-1.5">
                    {ev.title}
                  </h4>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {ev.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

    </div>
  );
}
