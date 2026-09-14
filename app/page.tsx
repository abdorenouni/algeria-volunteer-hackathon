'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { 
  Sparkles, 
  Calendar, 
  FileText, 
  UserPlus, 
  Award, 
  Building2, 
  Users, 
  CheckCircle2, 
  ShieldCheck, 
  ChevronLeft,
  BookOpen,
  Mail,
  Scale,
  MapPin,
  Flame,
  ArrowRight,
  TrendingUp,
  Layers
} from 'lucide-react';
import { TRACKS } from '@/data/tracks';
import TrackCard from '@/components/ui/TrackCard';
import ScheduleTimeline from '@/components/ui/ScheduleTimeline';
import TechnicalModal from '@/components/ui/TechnicalModal';

export default function HomePage() {
  const [isTechModalOpen, setIsTechModalOpen] = useState(false);

  return (
    <div className="flex flex-col min-h-screen bg-slate-50">
      
      {/* ================= HERO SECTION (NEO-INSTITUTIONAL EDITION) ================= */}
      <section className="relative overflow-hidden pt-6 pb-16 sm:py-20 bg-white border-b border-slate-200/80 geo-pattern">
        
        {/* Algerian National Ribbon Top Accent */}
        <div className="absolute top-0 left-0 right-0 h-1.5 algeria-ribbon"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4">
          
          <div className="max-w-4xl mx-auto text-center space-y-6">
            
            {/* Ministry & Programme Badges Row */}
            <div className="flex flex-wrap items-center justify-center gap-2.5">
              
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-800 text-[11px] font-bold shadow-2xs">
                <span className="w-2 h-2 rounded-full bg-[#D21034] animate-ping"></span>
                <span>تحت الرعاية السامية لوزارة الشباب والرياضة</span>
                <span className="text-emerald-300">•</span>
                <span>سنة 2026</span>
              </div>

              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-slate-100 border border-slate-200 text-slate-800 text-[11px] font-bold">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#006233] opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-[#006233]"></span>
                </span>
                <span>الموعد الوطني الموحد: 19 - 20 سبتمبر 2026</span>
              </div>

            </div>

            {/* Monumental Headline */}
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-slate-900 tracking-tight leading-[1.18] font-tajawal">
              الهاكاثون الوطني للابتكار <br className="hidden sm:inline" />
              <span className="text-[#006233] relative inline-block">
                في العمل التطوعي
                <span className="absolute bottom-1 left-0 right-0 h-2.5 bg-emerald-200/60 -z-10 rounded-full"></span>
              </span>
            </h1>

            {/* Neo-Institutional Slogan Banner */}
            <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-[#006233] via-emerald-800 to-[#004d28] text-white shadow-xl shadow-emerald-950/20 max-w-2xl mx-auto border border-emerald-500/40 relative overflow-hidden">
              <div className="absolute top-0 right-0 -mr-8 -mt-8 w-24 h-24 bg-white/10 rounded-full blur-xl pointer-events-none"></div>
              <div className="text-[11px] text-emerald-200 font-semibold mb-1 flex items-center justify-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                <span>الشعار المعتمد في المنشور الوزاري لسنة 2026</span>
              </div>
              <p className="text-lg sm:text-2xl font-black tracking-wide font-tajawal">
                &ldquo;مؤسسات الشباب... فضاءات للابتكار والتطوع&rdquo;
              </p>
            </div>

            {/* Subtext description */}
            <p className="text-xs sm:text-sm text-slate-600 max-w-2xl mx-auto leading-relaxed font-medium">
              المبادرة الوزارية الاستراتيجية لتنشيط فضاءات مؤسسات ودور الشباب عبر 58 ولاية، وبناء نماذج تشاركية رقمية وميدانية للتأثير المجتمعي المستدام.
            </p>

            {/* Primary & Secondary Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 pt-2">
              <Link
                href="/register"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-xl text-sm font-black bg-[#006233] hover:bg-[#004d28] text-white shadow-xl shadow-emerald-950/20 hover:scale-105 active:scale-95 transition-all"
              >
                <UserPlus className="w-4 h-4 text-emerald-300" />
                <span>تسجيل فريق جديد (3 إلى 5 أعضاء)</span>
                <ChevronLeft className="w-4 h-4" />
              </Link>
              
              <button
                type="button"
                onClick={() => setIsTechModalOpen(true)}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-4 rounded-xl text-sm font-bold bg-white hover:bg-slate-50 text-slate-800 border-2 border-slate-300 shadow-sm transition-all"
              >
                <FileText className="w-4 h-4 text-[#006233]" />
                <span>تحميل والاطلاع على البطاقة التقنية (PDF)</span>
              </button>
            </div>

          </div>

          {/* Quick Metrics Strip */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3.5 mt-14 max-w-4xl mx-auto">
            
            <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs text-center">
              <span className="text-2xl sm:text-3xl font-black text-[#006233] font-mono block">58</span>
              <span className="text-[11px] font-bold text-slate-600 mt-1 block">ولاية تنظم الفعالية بالتوازي</span>
            </div>

            <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs text-center">
              <span className="text-2xl sm:text-3xl font-black text-[#D21034] font-mono block">5</span>
              <span className="text-[11px] font-bold text-slate-600 mt-1 block">محاور ومسارات ابتكار معتمدة</span>
            </div>

            <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs text-center">
              <span className="text-2xl sm:text-3xl font-black text-amber-600 font-mono block">100</span>
              <span className="text-[11px] font-bold text-slate-600 mt-1 block">نقطة في شبكة التقييم الموحدة</span>
            </div>

            <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs text-center">
              <span className="text-2xl sm:text-3xl font-black text-slate-900 font-mono block">3 - 5</span>
              <span className="text-[11px] font-bold text-slate-600 mt-1 block">أعضاء في كل فريق متنافس</span>
            </div>

          </div>

        </div>
      </section>

      {/* ================= SECTION 2: 5 COMPETITION TRACKS ================= */}
      <section className="py-16 bg-slate-50 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="text-[11px] font-bold text-[#006233] bg-emerald-100 border border-emerald-200 px-3 py-1 rounded-full inline-block mb-2.5">
              محاور التنافس
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight font-tajawal">
              المجالات الخمسة المعتمدة للهاكاثون الوطني
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 mt-2 leading-relaxed">
              تم تحديد 5 مجالات استراتيجية تستجيب للأولويات الوطنية في تفعيل التطوع، حماية البيئة، التحول الرقمي، وتنشيط الفضاءات الشبانية.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {TRACKS.map((track) => (
              <TrackCard key={track.id} track={track} />
            ))}

            {/* 6th Card: Institutional Guarantee & Realism Rule */}
            <div className="bg-gradient-to-br from-slate-900 to-slate-800 text-white rounded-2xl p-6 flex flex-col justify-between border border-slate-700 shadow-lg">
              <div>
                <div className="w-12 h-12 rounded-xl bg-emerald-600/30 border border-emerald-500/40 flex items-center justify-center text-emerald-400 mb-4">
                  <Scale className="w-6 h-6" />
                </div>
                <h3 className="text-base font-black mb-2 text-white font-tajawal">
                  معيار الواقعية وتكافؤ الفرص
                </h3>
                <p className="text-xs text-slate-300 leading-relaxed mb-4">
                  تؤكد وزارة الشباب والرياضة على أن المشاريع المقترحة لا يُشترط أن تكون تطبيقات برمجية معقدة؛ بل يمكن أن تكون حلولاً عملية بسيطة قابلة للتجسيد السريع داخل مؤسسات ودور الشباب.
                </p>
                <div className="p-3 bg-slate-800/80 rounded-xl border border-slate-700 text-xs text-amber-300">
                  ⚡ التحكيم يعتمد 100 نقطة موحدة تضمن النزاهة والشفافية التامة عبر جميع اللجان الولائية.
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-700">
                <Link
                  href="/jury"
                  className="w-full inline-flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl text-xs font-bold bg-emerald-600 hover:bg-emerald-500 text-white transition-colors"
                >
                  <Award className="w-4 h-4" />
                  <span>معاينة شبكة التقييم الموحدة</span>
                </Link>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* ================= SECTION 3: 2-DAY SCHEDULE TIMELINE ================= */}
      <section className="py-16 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScheduleTimeline />
        </div>
      </section>

      {/* ================= SECTION 4: TARGET CATEGORIES ================= */}
      <section className="py-16 bg-slate-50 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-[11px] font-bold text-[#D21034] bg-rose-100 border border-rose-200 px-3 py-1 rounded-full inline-block mb-2.5">
              من يحق له المشاركة؟
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight font-tajawal">
              الفئات المستهدفة في المنافسة الوطنية
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 mt-2">
              وفقاً للمنشور الوزاري المنظم، يفتح الهاكاثون لكافة الفاعلين في الحقل الشبابي والتطوعي:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            <div className="bg-white p-7 rounded-2xl border border-slate-200 shadow-xs hover:border-[#006233] transition-all">
              <div className="w-12 h-12 rounded-xl bg-emerald-100 text-[#006233] flex items-center justify-center mb-5">
                <Building2 className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-slate-900 mb-2 font-tajawal">
                نوادي التطوع والمواطنة بمؤسسات الشباب
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed mb-4">
                النوادي المنشأة على مستوى دور الشباب، المركبات الرياضية الجوارية، وبيوت الشباب، والهادفة لتنشيط الحياة الجمعوية للمؤسسة.
              </p>
              <span className="text-[10px] font-bold text-[#006233] bg-emerald-50 px-2.5 py-1 rounded-md border border-emerald-200">
                الفئة الأساسية الحاضنة
              </span>
            </div>

            <div className="bg-white p-7 rounded-2xl border border-slate-200 shadow-xs hover:border-[#D21034] transition-all">
              <div className="w-12 h-12 rounded-xl bg-rose-100 text-[#D21034] flex items-center justify-center mb-5">
                <Users className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-slate-900 mb-2 font-tajawal">
                الجمعيات الشبابية الشريكة
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed mb-4">
                الجمعيات المحلية والوطنية المعتمدة الناشطة في مجالات العمل التطوعي، حماية البيئة، التضامن، وتأطير وترقية الشباب.
              </p>
              <span className="text-[10px] font-bold text-[#D21034] bg-rose-50 px-2.5 py-1 rounded-md border border-rose-200">
                شريك ميداني فاعل
              </span>
            </div>

            <div className="bg-white p-7 rounded-2xl border border-slate-200 shadow-xs hover:border-amber-500 transition-all">
              <div className="w-12 h-12 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center mb-5">
                <Sparkles className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-slate-900 mb-2 font-tajawal">
                الشباب المنخرطون والمبتكرون
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed mb-4">
                الشباب الحاملون لأفكار حلول ومبادرات من طلبة الجامعات، مراكز التكوين المهني، والمستفيدين من أنشطة مؤسسات الشباب.
              </p>
              <span className="text-[10px] font-bold text-amber-800 bg-amber-50 px-2.5 py-1 rounded-md border border-amber-200">
                طاقات وكفاءات شبانية
              </span>
            </div>

          </div>

        </div>
      </section>

      {/* ================= SECTION 5: CTA BANNER ================= */}
      <section className="py-14 bg-gradient-to-r from-[#006233] via-emerald-800 to-[#004d28] text-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-5">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/15 text-emerald-200 text-xs font-semibold">
            <span>التسجيل مفتوح عبر المنصة الرسمية</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-black max-w-2xl mx-auto leading-snug font-tajawal">
            شكل فريقك الآن واجعل مؤسسة شبابك فضاءً للإبداع والتطوع
          </h2>
          <p className="text-xs sm:text-sm text-emerald-100 max-w-xl mx-auto">
            تأكد من استيفاء شرط الفريق (من 3 إلى 5 أعضاء) وحضور اليومين التنفيذيين يومي 19 و 20 سبتمبر 2026.
          </p>
          <div className="pt-2 flex flex-wrap justify-center gap-3">
            <Link
              href="/register"
              className="inline-flex items-center gap-2 bg-white text-[#006233] hover:bg-emerald-50 px-7 py-3 rounded-xl font-black text-xs shadow-lg transition-all"
            >
              <UserPlus className="w-4 h-4" />
              تسجيل فريقك فوراً
            </Link>
            <Link
              href="/admin/wilaya"
              className="inline-flex items-center gap-2 bg-white/15 hover:bg-white/25 text-white px-6 py-3 rounded-xl font-bold text-xs border border-white/30 transition-all"
            >
              <BookOpen className="w-4 h-4" />
              لوحة الإدارة الولائية
            </Link>
          </div>
        </div>
      </section>

      {/* Technical Modal */}
      <TechnicalModal
        isOpen={isTechModalOpen}
        onClose={() => setIsTechModalOpen(false)}
      />

    </div>
  );
}
