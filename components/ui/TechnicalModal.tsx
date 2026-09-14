'use client';

import React from 'react';
import { 
  X, 
  Printer, 
  FileText, 
  CheckCircle2, 
  Calendar, 
  Award, 
  Mail, 
  Users, 
  Building2,
  Sparkles
} from 'lucide-react';

interface TechnicalModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function TechnicalModal({ isOpen, onClose }: TechnicalModalProps) {
  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-sm overflow-y-auto">
      <div className="relative w-full max-w-4xl bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden my-8 max-h-[90vh] flex flex-col animate-in fade-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="bg-gradient-to-r from-[#006233] to-[#004d28] text-white p-6 flex items-start justify-between">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center border border-white/20">
              <FileText className="w-6 h-6 text-emerald-200" />
            </div>
            <div>
              <div className="text-xs text-emerald-200 font-semibold mb-1 flex items-center gap-2">
                <span>الجمهورية الجزائرية الديمقراطية الشعبية — وزارة الشباب والرياضة</span>
              </div>
              <h3 className="text-xl font-black text-white">
                البطاقة التقنية الرسمية للهاكاثون الوطني للابتكار في العمل التطوعي
              </h3>
              <p className="text-xs text-emerald-100 mt-1">
                برنامج عمل وزارة الشباب - سنة 2026 • المرجع التنفيذي: المنشور الوزاري لسنة 2026
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="p-2 rounded-lg bg-white/15 hover:bg-white/25 text-white text-xs font-bold inline-flex items-center gap-1.5 transition-colors"
              title="طباعة البطاقة التقنية"
            >
              <Printer className="w-4 h-4" />
              <span className="hidden sm:inline">طباعة</span>
            </button>
            <button
              onClick={onClose}
              className="p-2 rounded-lg bg-white/15 hover:bg-white/25 text-white transition-colors"
              aria-label="إغلاق"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-8 space-y-6 overflow-y-auto flex-1 text-slate-800 text-sm leading-relaxed">
          
          {/* Official Banner / Slogan */}
          <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <Sparkles className="w-5 h-5 text-[#006233] flex-shrink-0" />
              <div>
                <span className="font-bold text-[#006233] block">الشعار الرسمي للدورة:</span>
                <span className="text-slate-700 font-medium">&ldquo;مؤسسات الشباب... فضاءات للابتكار والتطوع&rdquo;</span>
              </div>
            </div>
            <div className="text-xs bg-[#006233] text-white px-3 py-1.5 rounded-full font-bold whitespace-nowrap">
              التنفيذ: 19 و 20 سبتمبر 2026
            </div>
          </div>

          {/* Section 1: Objectives */}
          <div className="space-y-3">
            <h4 className="font-black text-slate-900 text-base border-r-4 border-[#006233] pr-3">
              1. أهداف الهاكاثون الوطني
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs text-slate-700">
              <div className="p-3 bg-slate-50 rounded-lg border border-slate-200 flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#006233] flex-shrink-0 mt-0.5" />
                <span>إعادة بعث ديناميكية العمل التطوعي والمواطنة داخل مؤسسات ودور الشباب عبر 58 ولاية.</span>
              </div>
              <div className="p-3 bg-slate-50 rounded-lg border border-slate-200 flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#006233] flex-shrink-0 mt-0.5" />
                <span>تمكين الشباب من ابتكار حلول ونماذج عملية قابلة للتجسيد لمعالجة المشكلات المحلية.</span>
              </div>
              <div className="p-3 bg-slate-50 rounded-lg border border-slate-200 flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#006233] flex-shrink-0 mt-0.5" />
                <span>الارتقاء بالعمل التطوعي من المبادرات التقليدية إلى مشاريع نوعية مستدامة ومؤطرة رقمياً.</span>
              </div>
              <div className="p-3 bg-slate-50 rounded-lg border border-slate-200 flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#006233] flex-shrink-0 mt-0.5" />
                <span>تثمين الكفاءات الشبانية وخلق فضاء تنافسي ولائي إيجابي بين نوادي وجمعيات الشباب.</span>
              </div>
            </div>
          </div>

          {/* Section 2: Target Audience & Rules */}
          <div className="space-y-3">
            <h4 className="font-black text-slate-900 text-base border-r-4 border-[#D21034] pr-3">
              2. الفئات المستهدفة وشروط المشاركة
            </h4>
            <ul className="space-y-2 text-xs text-slate-700 bg-rose-50/50 p-4 rounded-xl border border-rose-100">
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#D21034]"></span>
                <strong>نوادي التطوع والمواطنة بمؤسسات الشباب:</strong> تفعيل دورها الريادي داخل مقرات دور الشباب والمركبات الرياضية الجوارية.
              </li>
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#D21034]"></span>
                <strong>الجمعيات الشبابية الشريكة:</strong> الجمعيات المعتمدة والناشطة في المجال التنموي والبيئي والتطوعي.
              </li>
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#D21034]"></span>
                <strong>الشباب المنخرطون والمبتكرون:</strong> الطلبة، المطورون، والمصممون الراغبون في تشكيل فرق وتطوير حلول.
              </li>
              <li className="mt-2 pt-2 border-t border-rose-200 text-rose-900 font-bold">
                ⚠️ شرط تشكيلة الفريق: يتكون كل فريق من 3 إلى 5 أعضاء كحد أقصى، مع تعيين قائد للفريق.
              </li>
            </ul>
          </div>

          {/* Section 3: The 100-Point Scoring Rubric */}
          <div className="space-y-3">
            <h4 className="font-black text-slate-900 text-base border-r-4 border-amber-500 pr-3">
              3. شبكة التقييم الموحدة (100 نقطة كاملة)
            </h4>
            <div className="overflow-x-auto">
              <table className="w-full text-xs text-right border-collapse border border-slate-200">
                <thead>
                  <tr className="bg-slate-100 text-slate-900 font-bold">
                    <th className="p-2.5 border border-slate-200 w-12 text-center">#</th>
                    <th className="p-2.5 border border-slate-200">المعيار الوزاري المعتمد</th>
                    <th className="p-2.5 border border-slate-200 w-24 text-center">النقاط</th>
                    <th className="p-2.5 border border-slate-200">مؤشرات التقييم والتوجيهات الرسمية</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200">
                  <tr>
                    <td className="p-2 border border-slate-200 text-center font-bold">01</td>
                    <td className="p-2 border border-slate-200 font-bold text-[#006233]">الابتكار والإبداع</td>
                    <td className="p-2 border border-slate-200 text-center font-bold text-[#006233]">25 نقطة</td>
                    <td className="p-2 border border-slate-200 text-slate-600">أصالة الفكرة، التميز عن الطرق التقليدية، واستخدام أساليب عصرية في المعالجة.</td>
                  </tr>
                  <tr>
                    <td className="p-2 border border-slate-200 text-center font-bold">02</td>
                    <td className="p-2 border border-slate-200 font-bold text-slate-800">ملاءمة الحل للتحدي المطروح</td>
                    <td className="p-2 border border-slate-200 text-center font-bold text-slate-800">25 نقطة</td>
                    <td className="p-2 border border-slate-200 text-slate-600">تطابق الحل مع الواقع المحلي وتقديم إجابة مباشرة لاحتياج مجتمعي أو شباني فعلي.</td>
                  </tr>
                  <tr>
                    <td className="p-2 border border-slate-200 text-center font-bold">03</td>
                    <td className="p-2 border border-slate-200 font-bold text-amber-700">قابلية التطبيق والواقعية</td>
                    <td className="p-2 border border-slate-200 text-center font-bold text-amber-700">25 نقطة</td>
                    <td className="p-2 border border-slate-200 text-slate-600">
                      <strong>ملاحظة توجيهية:</strong> لا يشترط أن يكون المشروع تطبيقاً تقنياً معقداً؛ يمكن أن يكون أداة بسيطة، منصة، أو نموذج عمل قابل للتطبيق في مؤسسات الشباب.
                    </td>
                  </tr>
                  <tr>
                    <td className="p-2 border border-slate-200 text-center font-bold">04</td>
                    <td className="p-2 border border-slate-200 font-bold text-slate-800">الأثر على العمل التطوعي</td>
                    <td className="p-2 border border-slate-200 text-center font-bold text-slate-800">15 نقطة</td>
                    <td className="p-2 border border-slate-200 text-slate-600">قدرة المشروع على زيادة عدد المتطوعين، الاستدامة الزمنية، وخلق أثر إيجابي ملموس.</td>
                  </tr>
                  <tr>
                    <td className="p-2 border border-slate-200 text-center font-bold">05</td>
                    <td className="p-2 border border-slate-200 font-bold text-slate-800">العمل الجماعي وطريقة العرض</td>
                    <td className="p-2 border border-slate-200 text-center font-bold text-slate-800">10 نقاط</td>
                    <td className="p-2 border border-slate-200 text-slate-600">تكامل أدوار الفريق، جودة الإلقاء، ووضوح النموذج الأولي أمام لجنة التحكيم.</td>
                  </tr>
                  <tr className="bg-emerald-50 font-bold text-[#006233]">
                    <td colSpan={2} className="p-2.5 border border-slate-200 text-left pl-4 font-black">المجموع الإجمالي الكامل</td>
                    <td className="p-2.5 border border-slate-200 text-center text-sm font-black">100 / 100</td>
                    <td className="p-2.5 border border-slate-200 text-xs">ترتيب آلي موحد لاختيار الثلاثي الفائز ولائياً.</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Section 4: Ministry Reporting */}
          <div className="p-4 rounded-xl bg-slate-100 border border-slate-300 space-y-2 text-xs">
            <div className="font-bold text-slate-900 flex items-center gap-2">
              <Mail className="w-4 h-4 text-[#006233]" />
              آلية إرسال النتائج والبطاقة المختصرة المركزية
            </div>
            <p className="text-slate-600">
              عقب اختتام فعاليات اليوم الثاني (20 سبتمبر 2026)، تلتئم لجنة التحكيم الولائية لاعتماد المحضر الرسمي والبطاقة المختصرة، وترسل الوثيقة فورياً إلى البريد الإلكتروني المركزي المعتمد بالوزارة:
            </p>
            <span className="inline-block font-mono font-bold text-[#006233] bg-white px-3 py-1 rounded border border-emerald-300">
              sd_ppmav@mjeunese.gov.dz
            </span>
          </div>

        </div>

        {/* Modal Footer */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between">
          <div className="text-xs text-slate-500 font-medium">
            وثيقة مرجعية صادرة بموجب برنامج عمل وزارة الشباب والرياضة 2026
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="px-4 py-2 bg-slate-200 hover:bg-slate-300 text-slate-800 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-colors"
            >
              <Printer className="w-4 h-4" />
              طباعة البطاقة التقنية
            </button>
            <button
              onClick={onClose}
              className="px-4 py-2 bg-[#006233] hover:bg-[#004d28] text-white rounded-lg text-xs font-bold transition-colors"
            >
              إغلاق
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
