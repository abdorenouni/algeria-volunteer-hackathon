import React from 'react';
import Link from 'next/link';
import { Mail, Calendar, MapPin, Building, ShieldCheck, ExternalLink } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-300 border-t-4 border-[#006233] mt-auto">
      {/* Upper Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          
          {/* Col 1: Patronage & Slogan */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-[#006233] flex items-center justify-center text-white font-black text-xs border border-emerald-500/30">
                DZ★
              </div>
              <div>
                <h4 className="text-white font-bold text-base leading-tight">
                  وزارة الشباب والرياضة
                </h4>
                <p className="text-xs text-emerald-400">الجمهورية الجزائرية الديمقراطية الشعبية</p>
              </div>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              تحت الرعاية السامية لوزارة الشباب والرياضة، تنظم الفعالية الوطنية الكبرى لكافة مؤسسات ودور الشباب عبر التراب الوطني.
            </p>
            <div className="p-3 rounded-lg bg-slate-800/80 border border-slate-700/60 text-xs text-emerald-300">
              <div className="font-bold text-white mb-1">شعار الدورة 2026:</div>
              &ldquo;مؤسسات الشباب... فضاءات للابتكار والتطوع&rdquo;
            </div>
          </div>

          {/* Col 2: Competition Tracks */}
          <div>
            <h4 className="text-white font-bold text-sm mb-4 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#D21034]"></span>
              المجالات الرسمية الخمسة
            </h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li className="hover:text-white transition-colors">• استقطاب ومشاركة الشباب</li>
              <li className="hover:text-white transition-colors">• المواطنة وخدمة المجتمع والتضامن</li>
              <li className="hover:text-white transition-colors">• التطوع لحماية البيئة والتشجير</li>
              <li className="hover:text-white transition-colors">• الرقمنة وتنظيم المتطوعين</li>
              <li className="hover:text-white transition-colors">• تنشيط العمل التطوعي بمؤسسات الشباب</li>
            </ul>
          </div>

          {/* Col 3: Key Links */}
          <div>
            <h4 className="text-white font-bold text-sm mb-4 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#006233]"></span>
              روابط المنصة
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/" className="text-slate-400 hover:text-white transition-colors">
                  الرئيسية وجدول التنفيذ الموحد
                </Link>
              </li>
              <li>
                <Link href="/register" className="text-slate-400 hover:text-white transition-colors">
                  بوابة تسجيل الفرق (3 إلى 5 أعضاء)
                </Link>
              </li>
              <li>
                <Link href="/jury" className="text-slate-400 hover:text-white transition-colors">
                  شبكة التقييم الموحدة (100 نقطة)
                </Link>
              </li>
              <li>
                <Link href="/admin/wilaya" className="text-slate-400 hover:text-white transition-colors">
                  البطاقة المختصرة والتقرير الوزاري
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Ministry Reporting Email & Contact */}
          <div className="space-y-3">
            <h4 className="text-white font-bold text-sm mb-3 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-amber-400"></span>
              إرسال التقارير الرسمية
            </h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              تُرسل البطاقة المختصرة والنتائج النهائية المعتمدة من اللجان الولائية حصراً إلى البريد الإلكتروني المركزي:
            </p>
            <a
              href="mailto:sd_ppmav@mjeunese.gov.dz"
              className="inline-flex items-center gap-2 bg-emerald-950/70 border border-emerald-600/40 text-emerald-300 px-3 py-2 rounded-lg text-xs font-mono font-bold hover:bg-emerald-900/80 transition-colors w-full break-all"
            >
              <Mail className="w-4 h-4 text-emerald-400 flex-shrink-0" />
              sd_ppmav@mjeunese.gov.dz
            </a>
            <div className="flex items-center gap-2 text-xs text-slate-400 pt-2">
              <Calendar className="w-4 h-4 text-slate-500" />
              <span>التنفيذ الوطني: 19 - 20 سبتمبر 2026</span>
            </div>
          </div>

        </div>
      </div>

      {/* Lower Bar */}
      <div className="bg-slate-950/80 border-t border-slate-800 py-4 px-4 text-center text-xs text-slate-500">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
          <div>
            جميع الحقوق محفوظة © 2026 — وزارة الشباب والرياضة، الجمهورية الجزائرية الديمقراطية الشعبية
          </div>
          <div className="flex items-center gap-2 text-slate-400 font-medium">
            <span>الهاكاثون الوطني للابتكار في العمل التطوعي</span>
            <span>•</span>
            <span className="text-emerald-400">نسخة وطنية موحدة 58 ولاية</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
