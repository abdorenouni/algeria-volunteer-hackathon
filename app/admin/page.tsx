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
  Loader2 
} from 'lucide-react';
import { Team } from '@/types/hackathon';
import { TRACKS } from '@/data/tracks';
import FigmaLogo from '@/components/ui/FigmaLogo';

export default function AdminDashboardPage() {
  const [teams, setTeams] = useState<Team[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [testingBackend, setTestingBackend] = useState<boolean>(false);
  const [testResult, setTestResult] = useState<any>(null);
  const [backendStatus, setBackendStatus] = useState<'online' | 'checking' | 'error'>('checking');

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

  useEffect(() => {
    fetchTeams();
  }, []);

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

  // Export JSON
  const handleExportJSON = () => {
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(teams, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', `hackathon-registered-teams-${Date.now()}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
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
                قائمة الفرق المسجلة في الباك إند ({teams.length})
              </h2>
              <p className="text-xs text-slate-500 font-bold mt-0.5">
                تحديث تلقائي ومباشر من ملف البيانات registered-teams.json
              </p>
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
                onClick={handleExportJSON}
                disabled={teams.length === 0}
                className="px-3.5 py-2 bg-[#5FAE84] text-white border-[1.5px] border-[#1F1A26] shadow-[-2px_2px_0px_#1F1A26] text-xs font-bold flex items-center gap-1.5 hover:bg-[#4B9A70] disabled:opacity-50"
              >
                <Download className="w-3.5 h-3.5" />
                <span>تصدير JSON</span>
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
                  {teams.map((t, idx) => {
                    const track = TRACKS.find((tr) => tr.id === t.trackId);
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
                          <span className="px-2 py-0.5 bg-emerald-600 text-white font-bold text-[10px]">
                            مؤكد
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}

        </div>

      </div>
    </div>
  );
}
