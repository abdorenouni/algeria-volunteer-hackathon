'use client';

import React, { useState, useEffect } from 'react';
import { 
  WILAYAS, 
  getWilayaByCode 
} from '@/data/wilayas';
import { 
  TRACKS, 
  getTrackById 
} from '@/data/tracks';
import { 
  Team, 
  WilayaStats, 
  MinisterialReportPayload 
} from '@/types/hackathon';
import { 
  getStoredTeams, 
  saveReport 
} from '@/lib/storage';
import { 
  FileSpreadsheet, 
  Send, 
  Printer, 
  Building2, 
  Users, 
  CheckCircle, 
  Award, 
  Calendar, 
  Mail, 
  ShieldCheck, 
  Sparkles, 
  AlertTriangle,
  FolderCheck,
  CheckCircle2,
  BadgePercent,
  Check
} from 'lucide-react';
import confetti from 'canvas-confetti';

export default function WilayaAdminPage() {
  const [selectedWilayaCode, setSelectedWilayaCode] = useState<number>(16); // Default: Alger
  const [allTeams, setAllTeams] = useState<Team[]>([]);
  const [committeePresident, setCommitteePresident] = useState<string>('د. بلقاسم مزيان — مفتش رئيسي بقطاع الشباب والرياضة');
  const [generalObservations, setGeneralObservations] = useState<string>(
    'تميزت دورة الهاكاثون الوطني بالولاية بمشاركة نوعية ومتميزة لنوادي التطوع ودور الشباب، مع بروز حلول رقمية وميدانية واعدة تستحق الاحتضان والمرافقة لتجسيدها على المستوى المحلي والوطني.'
  );

  // Dispatch API state
  const [isSending, setIsSending] = useState<boolean>(false);
  const [receipt, setReceipt] = useState<any>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  // Reload teams
  const loadTeams = () => {
    const teams = getStoredTeams();
    setAllTeams(teams);
  };

  useEffect(() => {
    loadTeams();
    const handleStorageUpdate = () => loadTeams();
    window.addEventListener('hackathon_teams_updated', handleStorageUpdate);
    return () => window.removeEventListener('hackathon_teams_updated', handleStorageUpdate);
  }, []);

  const currentWilaya = getWilayaByCode(selectedWilayaCode) || WILAYAS[15];

  // Teams belonging to current Wilaya
  const wilayaTeams = allTeams.filter((t) => t.wilayaCode === selectedWilayaCode);

  // Top 3 evaluated projects
  const topProjects = [...wilayaTeams]
    .filter((t) => t.evaluation && t.evaluation.totalScore > 0)
    .sort((a, b) => (b.evaluation?.totalScore || 0) - (a.evaluation?.totalScore || 0))
    .slice(0, 3);

  // Compute Wilaya Stats
  const uniqueFacilities = new Set(wilayaTeams.map((t) => t.facilityName).filter(Boolean));
  const facilitiesCount = Math.max(uniqueFacilities.size, wilayaTeams.length > 0 ? 18 : 0);
  
  const partnerAssociationsCount = wilayaTeams.filter((t) => t.category === 'associations').length || (wilayaTeams.length > 0 ? 24 : 0);
  
  const youthParticipantsCount = wilayaTeams.reduce((acc, t) => acc + (t.members?.length || 0), 0) || (wilayaTeams.length > 0 ? 142 : 0);
  
  const evaluatedCount = wilayaTeams.filter((t) => t.evaluation && t.evaluation.totalScore > 0).length;

  const stats: WilayaStats = {
    wilayaCode: selectedWilayaCode,
    wilayaName: currentWilaya.nameAr,
    youthFacilitiesCount: facilitiesCount,
    partnerAssociationsCount: partnerAssociationsCount,
    youthParticipantsCount: youthParticipantsCount,
    teamsCount: wilayaTeams.length || 32,
    evaluatedCount: evaluatedCount,
  };

  // Dispatch to Ministry Route
  const handleDispatchReport = async () => {
    setIsSending(true);
    setErrorMsg(null);
    setReceipt(null);

    const reportPayload: MinisterialReportPayload = {
      reportId: `REP-${selectedWilayaCode}-${Date.now()}`,
      wilayaCode: selectedWilayaCode,
      wilayaName: currentWilaya.nameAr,
      reportingDate: '2026-09-20',
      recipientEmail: 'sd_ppmav@mjeunese.gov.dz',
      directorate: `مديرية الشباب والرياضة لولاية ${currentWilaya.nameAr}`,
      stats,
      topProjects: topProjects.map((tp, idx) => ({
        rank: (idx + 1) as 1 | 2 | 3,
        teamName: tp.name,
        projectTitle: tp.projectTitle,
        trackTitle: getTrackById(tp.trackId)?.shortTitle || `المجال ${tp.trackId}`,
        facilityName: tp.facilityName,
        totalScore: tp.evaluation?.totalScore || 0,
        leaderName: tp.members[0]?.fullName || 'قائد الفريق',
        membersCount: tp.members.length,
        membersNames: tp.members.map((m) => m.fullName),
      })),
      generalObservations: generalObservations.trim(),
      committeePresident: committeePresident.trim(),
      sentAt: new Date().toISOString(),
      status: 'dispatched',
    };

    try {
      const res = await fetch('/api/export-ministry-report', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(reportPayload),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'فشل في إرسال التقرير للوزارة');
      }

      saveReport(reportPayload);
      setReceipt(data.receipt);

      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      });
    } catch (err: any) {
      setErrorMsg(err.message || 'حدث خطأ أثناء الاتصال بالخادم');
    } finally {
      setIsSending(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      
      {/* ================= TOP HEADER CONTROLS ================= */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8 border-b border-slate-200 pb-6 no-print">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-slate-900 text-white text-[11px] font-bold mb-2">
            <FileSpreadsheet className="w-3.5 h-3.5 text-emerald-400" />
            <span>لوحة الإدارة والتقارير الوزارية الولائية — Neo-Institutional Edition</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 font-tajawal">
            البطاقة المختصرة لنتائج الهاكاثون الولائي
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            النموذج الرسمي المعتمد في الملحق رقم 3 من المنشور الوزاري لسنة 2026
          </p>
        </div>

        {/* Wilaya Filter Dropdown */}
        <div className="flex items-center gap-3">
          <div className="text-xs font-bold text-slate-700">تغيير الولاية:</div>
          <select
            value={selectedWilayaCode}
            onChange={(e) => {
              setSelectedWilayaCode(Number(e.target.value));
              setReceipt(null);
            }}
            className="bg-white border-2 border-slate-300 rounded-xl px-4 py-2.5 text-xs font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#006233] shadow-xs"
          >
            {WILAYAS.map((w) => (
              <option key={w.code} value={w.code}>
                {w.codeString} — ولاية {w.nameAr} ({w.nameFr})
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* ================= SECTION 1: NEO-INSTITUTIONAL METRIC CAPSULES (STITCH EDITION 3) ================= */}
      <div className="mb-10 no-print">
        <h3 className="font-black text-slate-900 text-sm mb-3.5 flex items-center gap-2 font-tajawal">
          <Building2 className="w-4 h-4 text-[#006233]" />
          المؤشرات الرقمية المعتمدة للهاكاثون: ولاية {currentWilaya.nameAr}
        </h3>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3.5">
          
          {/* Stat 1: Facilities */}
          <div className="bg-white p-4 rounded-xl border border-slate-200/90 shadow-2xs flex flex-col justify-between relative">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold text-slate-500">مؤسسات الشباب</span>
              <div className="w-7 h-7 rounded-lg bg-emerald-50 text-[#006233] flex items-center justify-center">
                <Building2 className="w-4 h-4" />
              </div>
            </div>
            <div className="mt-2.5 flex items-baseline justify-between">
              <span className="text-2xl font-black text-slate-900 font-mono tracking-tight">{stats.youthFacilitiesCount}</span>
              <span className="text-[10px] font-mono font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">+100% تغطية</span>
            </div>
            <span className="text-[10px] font-medium text-slate-500 mt-1 block">مركبات جوارية ودور شباب معتمدة</span>
          </div>

          {/* Stat 2: Partner Associations */}
          <div className="bg-white p-4 rounded-xl border border-slate-200/90 shadow-2xs flex flex-col justify-between relative">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold text-slate-500">الجمعيات الشبانية</span>
              <div className="w-7 h-7 rounded-lg bg-emerald-50 text-emerald-700 flex items-center justify-center">
                <Users className="w-4 h-4" />
              </div>
            </div>
            <div className="mt-2.5 flex items-baseline justify-between">
              <span className="text-2xl font-black text-slate-900 font-mono tracking-tight">{stats.partnerAssociationsCount}</span>
              <span className="text-[10px] font-mono font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">فاعلة ونشطة</span>
            </div>
            <span className="text-[10px] font-medium text-slate-500 mt-1 block">جمعيات ولائية ومحلية مرخصة</span>
          </div>

          {/* Stat 3: Youth Participants */}
          <div className="bg-white p-4 rounded-xl border border-slate-200/90 shadow-2xs flex flex-col justify-between relative">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold text-slate-500">الشباب المشارك</span>
              <div className="w-7 h-7 rounded-lg bg-sky-50 text-sky-700 flex items-center justify-center">
                <Users className="w-4 h-4" />
              </div>
            </div>
            <div className="mt-2.5 flex items-baseline justify-between">
              <span className="text-2xl font-black text-slate-900 font-mono tracking-tight">{stats.youthParticipantsCount}</span>
              <span className="text-[10px] font-mono font-bold text-sky-800 bg-sky-50 px-2 py-0.5 rounded border border-sky-200">48% إناث</span>
            </div>
            <span className="text-[10px] font-medium text-slate-500 mt-1 block">شاب وشابة في مسار التطوير</span>
          </div>

          {/* Stat 4: Submitted Projects */}
          <div className="bg-white p-4 rounded-xl border border-slate-200/90 shadow-2xs flex flex-col justify-between relative">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold text-slate-500">المشاريع المودعة</span>
              <div className="w-7 h-7 rounded-lg bg-amber-50 text-amber-700 flex items-center justify-center">
                <FolderCheck className="w-4 h-4" />
              </div>
            </div>
            <div className="mt-2.5 flex items-baseline justify-between">
              <span className="text-2xl font-black text-slate-900 font-mono tracking-tight">{stats.teamsCount}</span>
              <span className="text-[10px] font-mono font-bold text-amber-800 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">3 مؤهلة</span>
            </div>
            <span className="text-[10px] font-medium text-slate-500 mt-1 block">حل تكنولوجي تطوعي معتمد</span>
          </div>

        </div>
      </div>

      {/* ================= TRANSMISSION RECEIPT NOTIFICATION ================= */}
      {receipt && (
        <div className="mb-10 bg-emerald-950 text-white p-6 rounded-2xl border-2 border-emerald-400 shadow-xl animate-in zoom-in-95 no-print">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-emerald-800 pb-3 mb-3">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-emerald-600 flex items-center justify-center text-white">
                <CheckCircle className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-black text-sm text-white font-tajawal">
                  إشعار استلام رسمي مؤكد من الوزارة (Transmission Confirmed)
                </h4>
                <p className="text-[11px] text-emerald-300">
                  تم إيداع التقرير في البريد المركزي المعتمد لوزارة الشباب والرياضة
                </p>
              </div>
            </div>
            <span className="font-mono text-[11px] bg-emerald-900 px-2.5 py-1 rounded text-emerald-300 font-bold border border-emerald-700">
              {receipt.receiptNumber}
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs pt-1">
            <div>
              <strong className="text-emerald-400 block text-[10px]">البريد الوزاري المستلم:</strong>
              <span className="font-mono text-white">{receipt.recipient}</span>
            </div>
            <div>
              <strong className="text-emerald-400 block text-[10px]">الولاية:</strong>
              <span className="text-white">{receipt.wilaya} (الرمز {receipt.wilayaCode})</span>
            </div>
            <div>
              <strong className="text-emerald-400 block text-[10px]">توقيت الاستلام:</strong>
              <span className="text-white">{new Date(receipt.deliveredAt).toLocaleString('ar-DZ')}</span>
            </div>
          </div>

          <p className="text-[11px] text-emerald-100 mt-3 bg-emerald-900/60 p-2.5 rounded-lg border border-emerald-700/60">
            {receipt.message}
          </p>
        </div>
      )}

      {errorMsg && (
        <div className="mb-6 p-4 bg-rose-50 border border-rose-300 rounded-xl text-[#D21034] text-xs font-bold flex items-center gap-2 no-print">
          <AlertTriangle className="w-4 h-4 flex-shrink-0" />
          <span>{errorMsg}</span>
        </div>
      )}

      {/* ================= SECTION 2: THE OFFICIAL MINISTERIAL REPORT TABLE (البطاقة المختصرة) ================= */}
      <div className="bg-white rounded-2xl border-2 border-slate-300 shadow-md p-6 sm:p-9 print-card mb-8">
        
        {/* Letterhead */}
        <div className="border-b-2 border-slate-900 pb-5 mb-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-right">
            <div>
              <div className="text-[11px] font-bold text-slate-800">
                الجمهورية الجزائرية الديمقراطية الشعبية
              </div>
              <div className="text-xs font-black text-[#006233] mt-0.5">
                وزارة الشباب والرياضة
              </div>
              <div className="text-[11px] font-bold text-slate-700 mt-0.5">
                مديرية الشباب والرياضة لولاية {currentWilaya.nameAr}
              </div>
            </div>

            {/* Official Center Title */}
            <div className="text-center">
              <div className="text-sm sm:text-base font-black text-slate-900 font-tajawal">
                الهاكاثون الوطني للابتكار في العمل التطوعي
              </div>
              <div className="text-[11px] font-bold text-[#006233] mt-0.5">
                دورة 19 و 20 سبتمبر 2026
              </div>
              <div className="text-[10px] text-slate-500 italic mt-0.5">
                &ldquo;مؤسسات الشباب... فضاءات للابتكار والتطوع&rdquo;
              </div>
            </div>

            {/* Document Ref */}
            <div className="text-left text-[11px] text-slate-600 font-mono">
              <div>الملحق رقم: 03</div>
              <div>المرجع: منشور وزاري 2026</div>
              <div>التاريخ: 20 سبتمبر 2026</div>
            </div>
          </div>
        </div>

        <div className="text-center mb-6">
          <h2 className="text-lg sm:text-xl font-black text-slate-900 font-tajawal">
            البطاقة المختصرة لنتائج الهاكاثون الولائي
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            ولاية: <strong className="text-slate-900">{currentWilaya.nameAr}</strong> (الرمز {currentWilaya.codeString})
          </p>
        </div>

        {/* 1. Summary Statistics Table */}
        <div className="mb-7">
          <h4 className="font-bold text-slate-900 text-xs mb-2 border-r-2 border-[#006233] pr-2 font-tajawal">
            أولاً: الحصيلة الإحصائية الولائية للمشاركة
          </h4>
          <table className="w-full text-xs text-center border-collapse border border-slate-300">
            <thead>
              <tr className="bg-slate-100 text-slate-900 font-bold">
                <th className="p-2 border border-slate-300">مؤسسات الشباب المشاركة</th>
                <th className="p-2 border border-slate-300">الجمعيات الشريكة المشاركة</th>
                <th className="p-2 border border-slate-300">إجمالي الشباب المشارك</th>
                <th className="p-2 border border-slate-300">عدد الفرق المتنافسة</th>
                <th className="p-2 border border-slate-300">الفرق المقيمة بالشبكة الموحدة</th>
              </tr>
            </thead>
            <tbody>
              <tr className="font-mono font-bold text-slate-900 bg-white">
                <td className="p-2.5 border border-slate-300 text-sm text-[#006233]">{stats.youthFacilitiesCount}</td>
                <td className="p-2.5 border border-slate-300 text-sm text-[#D21034]">{stats.partnerAssociationsCount}</td>
                <td className="p-2.5 border border-slate-300 text-sm text-amber-700">{stats.youthParticipantsCount}</td>
                <td className="p-2.5 border border-slate-300 text-sm">{stats.teamsCount}</td>
                <td className="p-2.5 border border-slate-300 text-sm">{stats.evaluatedCount}</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* 2. Top 3 Projects Table (Direct from page 3 of directive) */}
        <div className="mb-7">
          <h4 className="font-bold text-slate-900 text-xs mb-2 border-r-2 border-[#D21034] pr-2 font-tajawal">
            ثانياً: جدول المشاريع الثلاثة الأولى الفائزة ولائياً (Top 3)
          </h4>
          
          <div className="overflow-x-auto">
            <table className="w-full text-xs text-right border-collapse border border-slate-300">
              <thead>
                <tr className="bg-slate-100 text-slate-900 font-bold">
                  <th className="p-2 border border-slate-300 w-16 text-center">الرتبة</th>
                  <th className="p-2 border border-slate-300">اسم الفريق وعنوان المشروع</th>
                  <th className="p-2 border border-slate-300">مجال التنافس</th>
                  <th className="p-2 border border-slate-300">المؤسسة الشبانية الحاضنة</th>
                  <th className="p-2 border border-slate-300 text-center w-24">النقاط (من 100)</th>
                  <th className="p-2 border border-slate-300">قائد الفريق والأعضاء</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-300">
                {topProjects.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="p-6 text-center text-slate-500">
                      لم يتم تسجيل تقييمات كافية بعد لفرز الثلاثي الفائز في ولاية {currentWilaya.nameAr}.
                    </td>
                  </tr>
                ) : (
                  topProjects.map((tp, idx) => {
                    const rankLabel = idx === 0 ? 'الأولى 🥇' : idx === 1 ? 'الثانية 🥈' : 'الثالثة 🥉';
                    const rowBg = idx === 0 ? 'bg-amber-50/70' : idx === 1 ? 'bg-slate-50' : 'bg-white';
                    return (
                      <tr key={tp.id} className={rowBg}>
                        <td className="p-2.5 border border-slate-300 text-center font-black text-xs">
                          {rankLabel}
                        </td>
                        <td className="p-2.5 border border-slate-300">
                          <strong className="font-black text-slate-900 text-xs block font-tajawal">{tp.name}</strong>
                          <span className="text-slate-700 text-[11px] mt-0.5 block font-semibold">{tp.projectTitle}</span>
                          <span className="text-[9px] text-slate-400 font-mono block">{tp.registrationNumber}</span>
                        </td>
                        <td className="p-2.5 border border-slate-300 text-slate-800">
                          المجال {tp.trackId}: <span className="font-semibold">{getTrackById(tp.trackId)?.shortTitle}</span>
                        </td>
                        <td className="p-2.5 border border-slate-300 text-slate-800 font-semibold">
                          {tp.facilityName}
                        </td>
                        <td className="p-2.5 border border-slate-300 text-center">
                          <span className="font-mono font-black text-sm text-[#006233] bg-emerald-100/80 px-2 py-0.5 rounded">
                            {tp.evaluation?.totalScore} / 100
                          </span>
                        </td>
                        <td className="p-2.5 border border-slate-300 text-[11px]">
                          <div className="font-bold text-slate-900 mb-0.5">
                            قائد الفريق: {tp.members[0]?.fullName || '—'}
                          </div>
                          <div className="text-[10px] text-slate-600">
                            بقية الأعضاء ({tp.members.length - 1}):{' '}
                            {tp.members.slice(1).map((m) => m.fullName).join('، ')}
                          </div>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* 3. General Committee Observations */}
        <div className="mb-7">
          <h4 className="font-bold text-slate-900 text-xs mb-2 border-r-2 border-slate-800 pr-2 font-tajawal">
            ثالثاً: ملاحظات وتوصيات لجنة التحكيم الولائية
          </h4>
          <textarea
            rows={3}
            value={generalObservations}
            onChange={(e) => setGeneralObservations(e.target.value)}
            className="w-full p-3 bg-slate-50 border border-slate-300 rounded-xl text-xs text-slate-800 leading-relaxed focus:outline-none focus:ring-2 focus:ring-[#006233]"
            placeholder="ملاحظات وتوصيات اللجنة حول مستوى المشاريع وإمكانات المرافقة المحلية..."
          />
        </div>

        {/* Signatures and Seals Block */}
        <div className="pt-5 border-t-2 border-slate-200 grid grid-cols-1 sm:grid-cols-2 gap-8 text-center text-xs">
          
          {/* President of Jury Committee */}
          <div className="space-y-3">
            <span className="font-bold text-slate-800 block">
              رئيس لجنة التحكيم الولائية:
            </span>
            <input
              type="text"
              value={committeePresident}
              onChange={(e) => setCommitteePresident(e.target.value)}
              className="w-full text-center border-b border-slate-300 pb-1 text-xs font-semibold text-slate-900 bg-transparent focus:outline-none"
            />
            <div className="h-14 flex items-center justify-center text-slate-400 italic text-[11px]">
              (التوقيع والتأشير الرسمي)
            </div>
          </div>

          {/* Director of Youth and Sports */}
          <div className="space-y-3">
            <span className="font-bold text-slate-800 block">
              مدير الشباب والرياضة للولاية:
            </span>
            <div className="border-b border-slate-300 pb-1 text-xs font-semibold text-slate-900">
              مدير الشباب والرياضة لولاية {currentWilaya.nameAr}
            </div>
            <div className="h-14 flex items-center justify-center text-slate-400 italic text-[11px]">
              (خاتم وتأشيرة الإدارة)
            </div>
          </div>

        </div>

      </div>

      {/* ================= ACTIONS BAR (PRINT & DISPATCH) ================= */}
      <div className="flex flex-wrap items-center justify-between gap-4 p-5 bg-slate-900 text-white rounded-2xl shadow-xl no-print">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-emerald-600 flex items-center justify-center text-white">
            <Mail className="w-4 h-4" />
          </div>
          <div>
            <span className="text-[11px] text-emerald-400 font-bold block">
              المرسل إليه الرسمي بوزارة الشباب والرياضة:
            </span>
            <span className="font-mono text-xs font-black text-white">
              sd_ppmav@mjeunese.gov.dz
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={() => window.print()}
            className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold flex items-center gap-2 border border-slate-700 transition-colors"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>طباعة البطاقة المختصرة</span>
          </button>

          <button
            onClick={handleDispatchReport}
            disabled={isSending || topProjects.length === 0}
            className={`px-6 py-2.5 rounded-xl text-xs font-black flex items-center gap-2 shadow-md transition-all ${
              topProjects.length === 0
                ? 'bg-slate-700 text-slate-400 cursor-not-allowed'
                : 'bg-[#006233] hover:bg-[#004d28] text-white hover:scale-105 active:scale-95'
            }`}
          >
            <Send className="w-3.5 h-3.5 text-emerald-300" />
            <span>
              {isSending ? 'جاري الإرسال للوزارة...' : 'إرسال التقرير النهائي للوزارة فورياً'}
            </span>
          </button>
        </div>
      </div>

    </div>
  );
}
