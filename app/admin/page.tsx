'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  Users, 
  CheckCircle2, 
  RefreshCw, 
  PlusCircle, 
  Download, 
  ExternalLink, 
  Home, 
  UserPlus, 
  Layers, 
  MapPin, 
  Award, 
  Check, 
  X, 
  RotateCcw, 
  Loader2,
  Mail,
  Send,
  Inbox
} from 'lucide-react';
import { Team } from '@/types/hackathon';
import { TRACKS } from '@/data/tracks';
import FigmaLogo from '@/components/ui/FigmaLogo';

type DecisionStatus = 'registered' | 'accepted' | 'rejected';

const statusLabel = (s: string): string =>
  s === 'registered' ? 'بانتظار القرار'
  : s === 'accepted' ? 'مقبولة'
  : s === 'rejected' ? 'مرفوضة'
  : s;

export default function AdminDashboardPage() {
  const [teams, setTeams] = useState<Team[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [testingBackend, setTestingBackend] = useState<boolean>(false);
  const [testResult, setTestResult] = useState<any>(null);
  const [backendStatus, setBackendStatus] = useState<'online' | 'checking' | 'error'>('checking');
  const [actionTeamId, setActionTeamId] = useState<string | null>(null);
  const [exporting, setExporting] = useState<boolean>(false);
  const [filter, setFilter] = useState<'all' | 'pending' | 'accepted' | 'rejected'>('all');

  // Node Sender State
  const [emails, setEmails] = useState<any[]>([]);
  const [loadingEmails, setLoadingEmails] = useState<boolean>(false);
  const [senderInfo, setSenderInfo] = useState<any>(null);
  const [testEmailAddr, setTestEmailAddr] = useState<string>('participant@hackathon.dz');
  const [testingEmail, setTestingEmail] = useState<boolean>(false);
  const [testEmailStatus, setTestEmailStatus] = useState<any>(null);

  // Fetch teams from backend API
  const fetchTeams = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/register', { cache: 'no-store' });
      if (res.ok) {
        const data = await res.json();
        setTeams(data.teams || []);
        setBackendStatus('online');
      } else {
        setBackendStatus('error');
      }
    } catch (err) {
      console.error('Failed to fetch teams:', err);
      setBackendStatus('error');
    } finally {
      setLoading(false);
    }
  };

  // Fetch sent emails from Node Sender API
  const fetchEmails = async () => {
    setLoadingEmails(true);
    try {
      const res = await fetch('/api/send-email', { cache: 'no-store' });
      if (res.ok) {
        const data = await res.json();
        setEmails(data.emails || []);
        setSenderInfo({
          mode: data.mode,
          from: data.from,
          count: data.count,
        });
      }
    } catch (err) {
      console.error('Failed to fetch emails:', err);
    } finally {
      setLoadingEmails(false);
    }
  };

  useEffect(() => {
    fetchTeams();
    fetchEmails();
  }, []);

  // Quick Test Node Sender Email
  const handleSendTestEmail = async () => {
    if (!testEmailAddr || !testEmailAddr.includes('@')) {
      alert('يرجى إدخال بريد إلكتروني صالح');
      return;
    }
    setTestingEmail(true);
    setTestEmailStatus(null);
    try {
      const res = await fetch('/api/send-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          to: testEmailAddr,
          leaderName: 'مشارك تجريبي',
          teamName: 'فريق الابتكار والتطوع التجريبي',
          registrationNumber: `DZ-2026-16-${Math.floor(100 + Math.random() * 900)}`,
        }),
      });
      const data = await res.json();
      setTestEmailStatus({
        ok: res.ok,
        message: data.message || (res.ok ? 'تم الإرسال بنجاح' : 'تعذر الإرسال'),
        details: data.details,
      });
      await fetchEmails();
    } catch (err: any) {
      setTestEmailStatus({
        ok: false,
        message: 'خطأ في الاتصال بخادم البريد',
        error: err?.message,
      });
    } finally {
      setTestingEmail(false);
    }
  };

  // Quick Test Backend Submission
  const handleTestBackend = async () => {
    setTestingBackend(true);
    setTestResult(null);
    try {
      const randomSuffix = Math.floor(1000 + Math.random() * 9000);
      const testPayload = {
        name: `فريق تجريبي #${randomSuffix}`,
        facilityName: 'دار الشباب المستقبل',
        category: 'clubs',
        projectTitle: 'منصة رقمية لتطوع الشباب في الأحياء',
        projectSummary: 'نظام ذكي لتوثيق ساعات التطوع وربط المتطوعين باحتياجات البلدية',
        trackId: (randomSuffix % 5) + 1,
        wilayaCode: 16,
        leaderName: 'أحمد بن محمد',
        leaderEmail: `tester${randomSuffix}@hackathon.dz`,
        members: [
          { id: 'm-1', fullName: 'أحمد بن محمد', phone: '0555123456', email: `tester${randomSuffix}@hackathon.dz`, role: 'قائد الفريق' },
          { id: 'm-2', fullName: 'كريم عثمان', phone: '0666123456', email: 'karim@test.dz', role: 'مطور ويب' },
          { id: 'm-3', fullName: 'سارة بلقاسم', phone: '0777123456', email: 'sara@test.dz', role: 'مصممة واجهات' },
        ],
      };

      const res = await fetch('/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(testPayload),
      });

      const data = await res.json();
      setTestResult({
        status: res.status,
        ok: res.ok,
        data,
      });

      if (res.ok) {
        await fetchTeams();
        await fetchEmails();
      }
    } catch (err: any) {
      setTestResult({
        status: 500,
        ok: false,
        error: err?.message || 'Connection error',
      });
    } finally {
      setTestingBackend(false);
    }
  };

  // Admin decision: accept / reject / reopen a registration
  const handleDecision = async (teamId: string, status: DecisionStatus) => {
    setActionTeamId(teamId);
    try {
      const res = await fetch('/api/register', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ teamId, status }),
      });
      const data = await res.json();
      if (res.ok && data.success && data.team) {
        setTeams((prev) => prev.map((t) => (t.id === data.team.id ? data.team : t)));
      } else {
        console.error('Decision failed:', data?.error);
        await fetchTeams();
      }
    } catch (err) {
      console.error('Decision request error:', err);
      await fetchTeams();
    } finally {
      setActionTeamId(null);
    }
  };

  // Derived stats + filtered list
  const pendingCount = teams.filter((t) => t.status === 'registered').length;
  const acceptedCount = teams.filter((t) => t.status === 'accepted').length;
  const rejectedCount = teams.filter((t) => t.status === 'rejected').length;
  const filteredTeams = teams.filter((t) =>
    filter === 'all' ? true
    : filter === 'pending' ? t.status === 'registered'
    : filter === 'accepted' ? t.status === 'accepted'
    : t.status === 'rejected'
  );

  // Export PDF (Arabic-safe: browser-rendered offscreen report captured to image pages)
  const handleExportPDF = async () => {
    setExporting(true);
    let node: HTMLDivElement | null = null;
    try {
      const { jsPDF } = await import('jspdf');
      const html2canvas = (await import('html2canvas-pro')).default;

      node = document.createElement('div');
      node.setAttribute('dir', 'rtl');
      node.style.cssText =
        'position:fixed;left:-10000px;top:0;width:794px;background:#ffffff;padding:28px;font-family:Tahoma,Arial,sans-serif;color:#1F1A26;';

      const rows = filteredTeams
        .map(
          (t, idx) => `<tr>
            <td style="border:1px solid #1F1A26;padding:6px 8px;text-align:center;">${idx + 1}</td>
            <td style="border:1px solid #1F1A26;padding:6px 8px;font-family:monospace;">${t.registrationNumber}</td>
            <td style="border:1px solid #1F1A26;padding:6px 8px;">${t.name}</td>
            <td style="border:1px solid #1F1A26;padding:6px 8px;">${t.projectTitle}</td>
            <td style="border:1px solid #1F1A26;padding:6px 8px;">${t.wilayaName ?? t.wilayaCode}</td>
            <td style="border:1px solid #1F1A26;padding:6px 8px;">${t.facilityName}</td>
            <td style="border:1px solid #1F1A26;padding:6px 8px;text-align:center;">${t.members?.length ?? 0}</td>
            <td style="border:1px solid #1F1A26;padding:6px 8px;direction:ltr;text-align:right;">${t.members?.[0]?.email ?? '-'}</td>
            <td style="border:1px solid #1F1A26;padding:6px 8px;">${new Date(t.createdAt).toLocaleString('fr-FR', { dateStyle: 'short', timeStyle: 'short' })}</td>
            <td style="border:1px solid #1F1A26;padding:6px 8px;text-align:center;font-weight:bold;color:${t.status === 'accepted' ? '#047857' : t.status === 'rejected' ? '#BE3943' : '#B45309'};">${statusLabel(t.status)}</td>
          </tr>`
        )
        .join('');

      node.innerHTML = `
        <div style="border-bottom:3px solid #006233;padding-bottom:12px;margin-bottom:16px;">
          <h1 style="margin:0;font-size:20px;color:#006233;">قائمة الفرق المسجلة — هاكاثون التطوع الجزائر 2026</h1>
          <p style="margin:6px 0 0;font-size:12px;color:#475569;">تاريخ التصدير: ${new Date().toLocaleString('fr-FR')} —
            الإجمالي: ${filteredTeams.length} | مقبولة: ${filteredTeams.filter((t) => t.status === 'accepted').length} |
            مرفوضة: ${filteredTeams.filter((t) => t.status === 'rejected').length} |
            بانتظار القرار: ${filteredTeams.filter((t) => t.status === 'registered').length}
          </p>
        </div>
        <table style="width:100%;border-collapse:collapse;font-size:11px;">
          <thead><tr style="background:#006233;color:#ffffff;">
            ${['#', 'رقم التسجيل', 'اسم الفريق', 'عنوان المشروع', 'الولاية', 'المؤسسة', 'الأعضاء', 'بريد القائد', 'تاريخ التسجيل', 'الحالة']
              .map((h) => `<th style="border:1px solid #1F1A26;padding:6px 8px;">${h}</th>`)
              .join('')}
          </tr></thead>
          <tbody>${rows || '<tr><td colspan="10" style="border:1px solid #1F1A26;padding:12px;text-align:center;">لا توجد فرق</td></tr>'}</tbody>
        </table>`;

      document.body.appendChild(node);
      const canvas = await html2canvas(node, { scale: 2, backgroundColor: '#ffffff', useCORS: true });
      const img = canvas.toDataURL('image/png');

      const pdf = new jsPDF('p', 'mm', 'a4');
      const pageW = 210;
      const pageH = 297;
      const margin = 10;
      const contentW = pageW - 2 * margin;
      const sliceH = pageH - 2 * margin;
      const imgFullH = (canvas.height * contentW) / canvas.width;

      // Slice the tall image into page-height chunks so pagination is crisp
      const pxPerSlice = (sliceH * canvas.width) / contentW;
      let offsetPx = 0;
      let pageIndex = 0;
      while (offsetPx < canvas.height) {
        const slice = document.createElement('canvas');
        slice.width = canvas.width;
        slice.height = Math.min(pxPerSlice, canvas.height - offsetPx);
        const ctx = slice.getContext('2d');
        if (!ctx) throw new Error('canvas context unavailable');
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(0, 0, slice.width, slice.height);
        ctx.drawImage(canvas, 0, offsetPx, canvas.width, slice.height, 0, 0, canvas.width, slice.height);
        if (pageIndex > 0) pdf.addPage();
        pdf.addImage(
          slice.toDataURL('image/png'),
          'PNG',
          margin,
          margin,
          contentW,
          (slice.height * contentW) / canvas.width
        );
        offsetPx += slice.height;
        pageIndex += 1;
      }

      pdf.save(`hackathon-teams-${new Date().toISOString().slice(0, 10)}.pdf`);
    } catch (err) {
      console.error('PDF export failed:', err);
      alert('تعذر إنشاء ملف PDF، حاول مجددًا');
    } finally {
      node?.remove();
      setExporting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#FBF9FC] text-[#1F1A26] py-10 px-4 sm:px-6 lg:px-8 font-tajawal">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Top Header */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 bg-white p-6 border-[1.5px] border-[#1F1A26] shadow-[-4px_4px_0px_#1F1A26]">
          <div className="flex items-center gap-4">
            <FigmaLogo size="sm" />
            <div>
              <h1 className="text-2xl sm:text-3xl font-black text-[#1F1A26]">
                لوحة فحص الخادم والفرق المسجلة
              </h1>
              <p className="text-xs sm:text-sm text-slate-600 font-bold mt-1">
                Backend Status & Registered Teams Live Inspector
              </p>
            </div>
          </div>

          {/* Quick Nav Links */}
          <div className="flex flex-wrap items-center gap-3">
            <Link
              href="/"
              className="px-4 py-2 bg-white text-[#1F1A26] border-[1.5px] border-[#1F1A26] shadow-[-2px_2px_0px_#1F1A26] font-bold text-xs flex items-center gap-1.5 hover:bg-slate-50 transition-all"
            >
              <Home className="w-4 h-4 text-[#5FAE84]" />
              <span>الرئيسية (Front)</span>
            </Link>

            <Link
              href="/register"
              className="px-4 py-2 bg-[#5FAE84] text-white border-[1.5px] border-[#1F1A26] shadow-[-2px_2px_0px_#1F1A26] font-bold text-xs flex items-center gap-1.5 hover:bg-[#4B9A70] transition-all"
            >
              <UserPlus className="w-4 h-4" />
              <span>استمارة التسجيل (Register)</span>
            </Link>

            <a
              href="/api/register"
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 bg-[#1E3A2B] text-white border-[1.5px] border-[#1F1A26] shadow-[-2px_2px_0px_#1F1A26] font-bold text-xs flex items-center gap-1.5 hover:bg-[#15291E] transition-all"
            >
              <ExternalLink className="w-4 h-4 text-[#5FAE84]" />
              <span>API Endpoint (JSON)</span>
            </a>
          </div>
        </div>

        {/* Backend Health Status Card & Test Trigger */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Status Badge */}
          <div className="p-6 bg-white border-[1.5px] border-[#1F1A26] shadow-[-4px_4px_0px_#1F1A26] space-y-3">
            <span className="text-xs font-bold text-slate-500 block">حالة خادم البيانات (Backend API)</span>
            <div className="flex items-center gap-3">
              {backendStatus === 'online' && (
                <>
                  <span className="w-4 h-4 rounded-full bg-emerald-500 animate-pulse"></span>
                  <span className="text-lg font-black text-emerald-600">متصل ويعمل بكفاءة (200 OK)</span>
                </>
              )}
              {backendStatus === 'checking' && (
                <>
                  <Loader2 className="w-4 h-4 text-amber-500 animate-spin" />
                  <span className="text-lg font-black text-amber-600">جاري فحص الاتصال...</span>
                </>
              )}
              {backendStatus === 'error' && (
                <>
                  <span className="w-4 h-4 rounded-full bg-red-500"></span>
                  <span className="text-lg font-black text-red-600">خطأ في الاتصال بالخادم</span>
                </>
              )}
            </div>
            <p className="text-xs text-slate-600 font-medium">
              الخادم يستقبل طلبات التسجيل ويقوم بحفظها فوريًا في قاعدة البيانات والذاكرة السحابية.
            </p>
          </div>

          {/* Teams Count Card */}
          <div className="p-6 bg-[#5FAE84] text-white border-[1.5px] border-[#1F1A26] shadow-[-4px_4px_0px_#1F1A26] flex flex-col justify-between">
            <span className="text-xs font-bold text-white/90">إجمالي الفرق المسجلة رسميًا</span>
            <div className="flex items-baseline gap-3 my-2">
              <span className="text-5xl font-black font-mono">{teams.length}</span>
              <span className="text-base font-bold">فريقاً وطنياً</span>
            </div>
            <span className="text-xs text-white/80">موزعة عبر المحاور الخمسة للتحدي الولائي</span>
          </div>

          {/* Test Submission Button */}
          <div className="p-6 bg-white border-[1.5px] border-[#1F1A26] shadow-[-4px_4px_0px_#1F1A26] flex flex-col justify-between">
            <span className="text-xs font-bold text-slate-500">اختبار فوري للباك إند (Live Backend Test)</span>
            <div className="my-2">
              <button
                type="button"
                onClick={handleTestBackend}
                disabled={testingBackend}
                className="w-full py-3 bg-[#BE3943] hover:bg-[#a52e37] text-white border-[1.5px] border-[#1F1A26] shadow-[-3px_3px_0px_#1F1A26] font-bold text-sm flex items-center justify-center gap-2 transition-all disabled:opacity-70"
              >
                {testingBackend ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>جاري إرسال الطلب للخادم...</span>
                  </>
                ) : (
                  <>
                    <PlusCircle className="w-4 h-4" />
                    <span>إرسال فريق تجريبي للخادم الآن</span>
                  </>
                )}
              </button>
            </div>
            <span className="text-[11px] text-slate-500">يقوم بإرسال POST إلى /api/register للتحقق فوريًا</span>
          </div>

        </div>

        {/* Test Result Alert if executed */}
        {testResult && (
          <div className={`p-4 border-[1.5px] border-[#1F1A26] shadow-[-3px_3px_0px_#1F1A26] ${testResult.ok ? 'bg-emerald-50 text-emerald-900' : 'bg-red-50 text-red-900'} animate-in fade-in`}>
            <div className="flex items-start justify-between gap-4">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                  <span className="font-bold text-sm">
                    استجابة الباك إند: HTTP {testResult.status} {testResult.ok ? 'SUCCESS' : 'FAILED'}
                  </span>
                </div>
                {testResult.ok && testResult.data?.team && (
                  <p className="text-xs font-mono font-medium">
                    تم إنشاء الفريق بنجاح: <strong>{testResult.data.team.name}</strong> | رقم التسجيل: <strong>{testResult.data.team.registrationNumber}</strong>
                  </p>
                )}
              </div>
              <button
                onClick={() => setTestResult(null)}
                className="text-xs font-bold underline"
              >
                إغلاق
              </button>
            </div>
          </div>
        )}

        {/* Registered Teams Table */}
        <div className="bg-white border-[1.5px] border-[#1F1A26] shadow-[-6px_6px_0px_#1F1A26] p-6 space-y-6">
          
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-200 pb-4">
            <div>
              <h2 className="text-xl font-black text-[#1F1A26]">
                قائمة الفرق المسجلة في الباك إند ({filteredTeams.length}/{teams.length})
              </h2>
              <p className="text-xs text-slate-500 font-bold mt-0.5">
                تحديث تلقائي ومباشر من ملف البيانات registered-teams.json
              </p>
              <div className="flex flex-wrap items-center gap-2 mt-3">
                {([
                  ['all', `الكل (${teams.length})`],
                  ['pending', `⏳ بانتظار القرار (${pendingCount})`],
                  ['accepted', `✓ مقبولة (${acceptedCount})`],
                  ['rejected', `✗ مرفوضة (${rejectedCount})`],
                ] as const).map(([key, label]) => (
                  <button
                    key={key}
                    type="button"
                    onClick={() => setFilter(key)}
                    className={`px-3 py-1.5 border-[1.5px] border-[#1F1A26] shadow-[-2px_2px_0px_#1F1A26] text-[11px] font-bold transition-all ${
                      filter === key ? 'bg-[#1F1A26] text-white' : 'bg-white text-[#1F1A26] hover:bg-slate-50'
                    }`}
                  >
                    {label}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={fetchTeams}
                disabled={loading}
                className="px-3.5 py-2 bg-white text-[#1F1A26] border-[1.5px] border-[#1F1A26] shadow-[-2px_2px_0px_#1F1A26] text-xs font-bold flex items-center gap-1.5 hover:bg-slate-50"
              >
                <RefreshCw className={`w-3.5 h-3.5 text-[#5FAE84] ${loading ? 'animate-spin' : ''}`} />
                <span>تحديث</span>
              </button>

              <button
                type="button"
                onClick={handleExportPDF}
                disabled={teams.length === 0 || exporting}
                className="px-3.5 py-2 bg-[#5FAE84] text-white border-[1.5px] border-[#1F1A26] shadow-[-2px_2px_0px_#1F1A26] text-xs font-bold flex items-center gap-1.5 hover:bg-[#4B9A70] disabled:opacity-50"
              >
                {exporting ? (
                  <Loader2 className="w-3.5 h-3.5 animate-spin" />
                ) : (
                  <Download className="w-3.5 h-3.5" />
                )}
                <span>{exporting ? 'جاري إنشاء PDF...' : 'تصدير PDF'}</span>
              </button>
            </div>
          </div>

          {/* Table Container */}
          {loading ? (
            <div className="py-16 text-center space-y-3">
              <Loader2 className="w-8 h-8 text-[#5FAE84] animate-spin mx-auto" />
              <p className="text-sm font-bold text-slate-600">جاري تحميل الفرق من الباك إند...</p>
            </div>
          ) : teams.length === 0 ? (
            <div className="py-16 text-center space-y-4">
              <Users className="w-12 h-12 text-slate-300 mx-auto" />
              <p className="text-base font-bold text-slate-600">لا توجد فرق مسجلة بعد في قاعدة البيانات</p>
              <div className="flex justify-center gap-3">
                <Link
                  href="/register"
                  className="px-6 py-2.5 bg-[#5FAE84] text-white font-bold text-xs border-[1.5px] border-[#1F1A26] shadow-[-2px_2px_0px_#1F1A26]"
                >
                  سجل أول فريق الآن
                </Link>
                <button
                  onClick={handleTestBackend}
                  className="px-6 py-2.5 bg-white text-[#1F1A26] font-bold text-xs border-[1.5px] border-[#1F1A26] shadow-[-2px_2px_0px_#1F1A26]"
                >
                  إضافة فريق تجريبي
                </button>
              </div>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-right text-xs">
                <thead>
                  <tr className="bg-slate-100 border-b-[1.5px] border-[#1F1A26] text-[#1F1A26]">
                    <th className="p-3 font-black">#</th>
                    <th className="p-3 font-black">رقم التسجيل</th>
                    <th className="p-3 font-black">اسم الفريق</th>
                    <th className="p-3 font-black">عنوان المشروع</th>
                    <th className="p-3 font-black">المحور</th>
                    <th className="p-3 font-black">الهيئة / الفئة</th>
                    <th className="p-3 font-black">الأعضاء</th>
                    <th className="p-3 font-black">تاريخ التسجيل</th>
                    <th className="p-3 font-black">الحالة</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200">
                  {filteredTeams.length === 0 ? (
                    <tr>
                      <td colSpan={9} className="p-10 text-center text-sm font-bold text-slate-500">
                        لا توجد فرق ضمن هذا التصنيف حاليًا
                      </td>
                    </tr>
                  ) : filteredTeams.map((t, idx) => {
                    const track = TRACKS.find((tr) => tr.id === t.trackId);
                    const busy = actionTeamId === t.id;
                    return (
                      <tr key={t.id || idx} className="hover:bg-slate-50/80 transition-colors">
                        <td className="p-3 font-mono font-bold text-slate-400">{idx + 1}</td>
                        <td className="p-3 font-mono font-bold text-[#BE3943]">
                          <span className="px-2 py-0.5 bg-red-50 border border-[#BE3943]/30">
                            {t.registrationNumber}
                          </span>
                        </td>
                        <td className="p-3 font-bold text-[#1F1A26] text-sm">{t.name}</td>
                        <td className="p-3 text-slate-700 max-w-xs truncate" title={t.projectTitle}>
                          {t.projectTitle}
                        </td>
                        <td className="p-3">
                          <span className="px-2 py-0.5 bg-emerald-50 text-emerald-800 font-bold border border-emerald-200 text-[11px]">
                            {track ? track.title.slice(0, 30) + '...' : `محور ${t.trackId}`}
                          </span>
                        </td>
                        <td className="p-3 text-slate-600">
                          <div>{t.facilityName}</div>
                          <div className="text-[10px] text-slate-400 font-bold">{t.categoryLabel || t.category}</div>
                        </td>
                        <td className="p-3 text-slate-700 font-mono font-bold">
                          {t.members?.length || 3} أعضاء
                        </td>
                        <td className="p-3 text-slate-500 font-mono text-[11px]">
                          {new Date(t.createdAt).toLocaleString('fr-FR', {
                            dateStyle: 'short',
                            timeStyle: 'short',
                          })}
                        </td>
                        <td className="p-3">
                          <div className="flex flex-col items-start gap-1.5">
                            {t.status === 'registered' && (
                              <span className="px-2 py-0.5 bg-amber-100 text-amber-800 border border-amber-400 font-bold text-[10px]">
                                ⏳ بانتظار القرار
                              </span>
                            )}
                            {t.status === 'accepted' && (
                              <span className="px-2 py-0.5 bg-emerald-600 text-white font-bold text-[10px]">
                                ✓ تم القبول
                              </span>
                            )}
                            {t.status === 'rejected' && (
                              <span className="px-2 py-0.5 bg-[#BE3943] text-white font-bold text-[10px]">
                                ✗ تم الرفض
                              </span>
                            )}
                            {!['registered', 'accepted', 'rejected'].includes(t.status) && (
                              <span className="px-2 py-0.5 bg-slate-200 text-slate-700 border border-slate-300 font-bold text-[10px]">
                                {t.status}
                              </span>
                            )}

                            {t.status === 'registered' ? (
                              <div className="flex items-center gap-1.5">
                                <button
                                  type="button"
                                  onClick={() => handleDecision(t.id, 'accepted')}
                                  disabled={busy}
                                  title="قبول التسجيل"
                                  className="px-2 py-1 bg-[#5FAE84] text-white border-[1.5px] border-[#1F1A26] shadow-[-1px_1px_0px_#1F1A26] text-[10px] font-bold flex items-center gap-1 hover:bg-[#4B9A70] disabled:opacity-60"
                                >
                                  {busy ? <Loader2 className="w-3 h-3 animate-spin" /> : <Check className="w-3 h-3" />}
                                  <span>قبول</span>
                                </button>
                                <button
                                  type="button"
                                  onClick={() => handleDecision(t.id, 'rejected')}
                                  disabled={busy}
                                  title="رفض التسجيل"
                                  className="px-2 py-1 bg-[#BE3943] text-white border-[1.5px] border-[#1F1A26] shadow-[-1px_1px_0px_#1F1A26] text-[10px] font-bold flex items-center gap-1 hover:bg-[#a52e37] disabled:opacity-60"
                                >
                                  {busy ? <Loader2 className="w-3 h-3 animate-spin" /> : <X className="w-3 h-3" />}
                                  <span>رفض</span>
                                </button>
                              </div>
                            ) : (
                              <button
                                type="button"
                                onClick={() => handleDecision(t.id, 'registered')}
                                disabled={busy}
                                title="إعادة إلى قائمة الانتظار"
                                className="px-2 py-1 bg-white text-[#1F1A26] border-[1.5px] border-[#1F1A26] shadow-[-1px_1px_0px_#1F1A26] text-[10px] font-bold flex items-center gap-1 hover:bg-slate-50 disabled:opacity-60"
                              >
                                {busy ? <Loader2 className="w-3 h-3 animate-spin" /> : <RotateCcw className="w-3 h-3" />}
                                <span>تراجع</span>
                              </button>
                            )}
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}

        </div>

        {/* ================= NODE SENDER LIVE INSPECTOR ================= */}
        <div className="bg-white border-[1.5px] border-[#1F1A26] shadow-[-6px_6px_0px_#1F1A26] p-6 space-y-6">
          
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-200 pb-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded bg-[#5FAE84]/15 border border-[#5FAE84] flex items-center justify-center text-[#213D2E]">
                <Mail className="w-5 h-5 text-[#5FAE84]" />
              </div>
              <div>
                <h2 className="text-xl font-black text-[#1F1A26] flex items-center gap-2">
                  <span>مرسل البريد الإلكتروني للهاكاثون (Node Mail Sender)</span>
                  <span className="px-2 py-0.5 bg-emerald-100 text-emerald-800 text-[11px] font-bold border border-emerald-300">
                    نشط ومهيأ
                  </span>
                </h2>
                <p className="text-xs text-slate-500 font-bold mt-0.5">
                  إرسال تأكيدات التسجيل للمشاركين وتوثيقها في data/sent-emails.json (Nodemailer)
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="text-xs font-mono bg-slate-100 px-3 py-1.5 border border-slate-300 font-bold">
                النمط: <span className="text-[#BE3943]">{senderInfo?.mode === 'smtp' ? 'خادم SMTP حقيقي' : 'محاكاة وتوثيق آمن'}</span>
              </div>

              <button
                type="button"
                onClick={fetchEmails}
                disabled={loadingEmails}
                className="px-3.5 py-2 bg-white text-[#1F1A26] border-[1.5px] border-[#1F1A26] shadow-[-2px_2px_0px_#1F1A26] text-xs font-bold flex items-center gap-1.5 hover:bg-slate-50 cursor-pointer"
              >
                <RefreshCw className={`w-3.5 h-3.5 text-[#5FAE84] ${loadingEmails ? 'animate-spin' : ''}`} />
                <span>تحديث الرسائل</span>
              </button>
            </div>
          </div>

          {/* Direct Send Test Form */}
          <div className="p-4 bg-slate-50 border border-slate-300 space-y-3">
            <h3 className="text-xs font-black text-[#1F1A26] flex items-center gap-1.5">
              <Send className="w-3.5 h-3.5 text-[#5FAE84]" />
              <span>إرسال بريد تجريبي مباشر لاختبار Node Sender:</span>
            </h3>

            <div className="flex flex-col sm:flex-row items-center gap-3">
              <input
                type="email"
                value={testEmailAddr}
                onChange={(e) => setTestEmailAddr(e.target.value)}
                placeholder="أدخل بريدك لتلقي إشعار تجريبي..."
                className="w-full sm:flex-1 h-11 px-4 bg-white border-[1.5px] border-[#1F1A26] text-xs text-[#213D2E] font-medium focus:outline-none focus:border-[#5FAE84]"
              />

              <button
                type="button"
                onClick={handleSendTestEmail}
                disabled={testingEmail}
                className="w-full sm:w-auto h-11 px-6 bg-[#213D2E] hover:bg-[#15291E] text-white border-[1.5px] border-[#1F1A26] shadow-[-2px_2px_0px_#000000] font-bold text-xs flex items-center justify-center gap-2 cursor-pointer transition-all disabled:opacity-70"
              >
                {testingEmail ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>جاري الإرسال عبر Node...</span>
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    <span>إرسال بريد تجريبي الآن</span>
                  </>
                )}
              </button>
            </div>

            {testEmailStatus && (
              <div className={`p-3 text-xs font-bold border flex items-center justify-between ${
                testEmailStatus.ok 
                  ? 'bg-emerald-50 text-emerald-800 border-emerald-300' 
                  : 'bg-red-50 text-red-800 border-red-300'
              }`}>
                <span>{testEmailStatus.message}</span>
                <button
                  onClick={() => setTestEmailStatus(null)}
                  className="underline text-[11px]"
                >
                  إغلاق
                </button>
              </div>
            )}
          </div>

          {/* Dispatched Emails Table */}
          {loadingEmails ? (
            <div className="py-10 text-center space-y-2">
              <Loader2 className="w-6 h-6 text-[#5FAE84] animate-spin mx-auto" />
              <p className="text-xs font-bold text-slate-500">جاري تحميل سجل الرسائل المرسلة...</p>
            </div>
          ) : emails.length === 0 ? (
            <div className="py-12 text-center space-y-2">
              <Inbox className="w-10 h-10 text-slate-300 mx-auto" />
              <p className="text-sm font-bold text-slate-500">لا توجد رسائل بريد مسجلة بعد في Node Sender</p>
              <p className="text-xs text-slate-400">أي فريق يسجل في المنصة أو اختبار ترسله سيظهر هنا فوريًا</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-right text-xs">
                <thead>
                  <tr className="bg-slate-100 border-b-[1.5px] border-[#1F1A26] text-[#1F1A26]">
                    <th className="p-3 font-black">#</th>
                    <th className="p-3 font-black">المستلم (To)</th>
                    <th className="p-3 font-black">رقم التسجيل</th>
                    <th className="p-3 font-black">اسم الفريق</th>
                    <th className="p-3 font-black">طريقة الإرسال</th>
                    <th className="p-3 font-black">تاريخ ووقت الإرسال</th>
                    <th className="p-3 font-black">الحالة</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200">
                  {emails.map((m, idx) => (
                    <tr key={m.id || idx} className="hover:bg-slate-50/80 transition-colors">
                      <td className="p-3 font-mono font-bold text-slate-400">{idx + 1}</td>
                      <td className="p-3 font-mono font-bold text-[#1F1A26]">
                        {m.to}
                      </td>
                      <td className="p-3 font-mono font-bold text-[#BE3943]">
                        {m.registrationNumber || '-'}
                      </td>
                      <td className="p-3 font-bold text-slate-800">
                        {m.teamName || 'فريق تجريبي'}
                      </td>
                      <td className="p-3">
                        <span className="px-2 py-0.5 bg-slate-100 text-slate-700 font-mono text-[10px] border border-slate-300">
                          {m.mode === 'smtp' ? 'SMTP Server' : 'Simulated Dispatch'}
                        </span>
                      </td>
                      <td className="p-3 text-slate-500 font-mono text-[11px]">
                        {new Date(m.sentAt).toLocaleString('fr-FR', {
                          dateStyle: 'short',
                          timeStyle: 'medium',
                        })}
                      </td>
                      <td className="p-3">
                        <span className="px-2 py-0.5 bg-emerald-600 text-white font-bold text-[10px]">
                          {m.status === 'delivered_smtp' ? 'تم التسليم SMTP' : 'مؤكد بالخادم'}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

        </div>

      </div>
    </div>
  );
}
