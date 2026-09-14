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
  JuryEvaluation, 
  JuryRubricCriteria 
} from '@/types/hackathon';
import { 
  getStoredTeams, 
  saveEvaluation, 
  resetToDefaultTeams 
} from '@/lib/storage';
import confetti from 'canvas-confetti';
import { 
  Award, 
  Scale, 
  CheckCircle2, 
  Star, 
  Trophy, 
  Medal, 
  Building2, 
  Users, 
  Send, 
  RotateCcw, 
  Sparkles, 
  Search, 
  Info,
  ChevronLeft,
  Sliders,
  Plus,
  Minus
} from 'lucide-react';

export default function JuryPage() {
  const [allTeams, setAllTeams] = useState<Team[]>([]);
  const [selectedWilayaCode, setSelectedWilayaCode] = useState<number>(16); // Default: Alger
  const [selectedTeam, setSelectedTeam] = useState<Team | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Jury Scoring Rubric State (100 Points Total)
  const [juryName, setJuryName] = useState<string>('لجنة التحكيم الولائية');
  const [criteria, setCriteria] = useState<JuryRubricCriteria>({
    innovation: 21,       // 0 - 25
    relevance: 22,        // 0 - 25
    feasibility: 22,      // 0 - 25
    impact: 13,           // 0 - 15
    teamworkPitch: 8,     // 0 - 10
  });
  const [notes, setNotes] = useState<string>('');
  const [saveSuccessMsg, setSaveSuccessMsg] = useState<string | null>(null);

  // Load teams from storage
  const reloadTeams = () => {
    const teams = getStoredTeams();
    setAllTeams(teams);
    if (!selectedTeam && teams.length > 0) {
      const wilayaTeams = teams.filter((t) => t.wilayaCode === selectedWilayaCode);
      if (wilayaTeams.length > 0) {
        handleSelectTeam(wilayaTeams[0]);
      }
    }
  };

  useEffect(() => {
    reloadTeams();
    const handleStorageUpdate = () => reloadTeams();
    window.addEventListener('hackathon_teams_updated', handleStorageUpdate);
    return () => window.removeEventListener('hackathon_teams_updated', handleStorageUpdate);
  }, [selectedWilayaCode]);

  // Filtered teams by Wilaya
  const wilayaTeams = allTeams.filter((t) => t.wilayaCode === selectedWilayaCode);

  // Filter by search query
  const displayedTeams = wilayaTeams.filter((t) => {
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase();
    return (
      t.name.toLowerCase().includes(q) ||
      t.projectTitle.toLowerCase().includes(q) ||
      t.facilityName.toLowerCase().includes(q)
    );
  });

  // Top 3 ranked projects in this Wilaya
  const topProjects = [...wilayaTeams]
    .filter((t) => t.evaluation && t.evaluation.totalScore > 0)
    .sort((a, b) => (b.evaluation?.totalScore || 0) - (a.evaluation?.totalScore || 0))
    .slice(0, 3);

  // Set active team for evaluation
  const handleSelectTeam = (team: Team) => {
    setSelectedTeam(team);
    if (team.evaluation) {
      setCriteria(team.evaluation.criteria);
      setNotes(team.evaluation.notes || '');
      setJuryName(team.evaluation.juryName || 'لجنة التحكيم الولائية');
    } else {
      setCriteria({
        innovation: 18,
        relevance: 18,
        feasibility: 18,
        impact: 10,
        teamworkPitch: 7,
      });
      setNotes('');
    }
    setSaveSuccessMsg(null);
  };

  // Real-time Sum Calculation
  const totalScore = 
    Number(criteria.innovation) +
    Number(criteria.relevance) +
    Number(criteria.feasibility) +
    Number(criteria.impact) +
    Number(criteria.teamworkPitch);

  // SVG Radial Gauge Calculations
  const radius = 54;
  const circumference = 2 * Math.PI * radius; // 339.29
  const strokeDashoffset = circumference - (Math.min(100, Math.max(0, totalScore)) / 100) * circumference;

  // Qualification Status Badge
  const isQualified = totalScore >= 70;
  const qualificationRank = totalScore >= 85 ? 'RANK A' : totalScore >= 70 ? 'RANK B' : 'RANK C';
  const qualificationLabel = totalScore >= 70 
    ? 'مشروع مؤهل للنهائيات الولائية' 
    : 'مشروع دون عتبة التأهيل (أقل من 70)';

  // Handle Save Evaluation
  const handleSaveEvaluation = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedTeam) return;

    const evaluation: JuryEvaluation = {
      id: `eval-${selectedTeam.id}`,
      teamId: selectedTeam.id,
      juryName: juryName.trim() || 'لجنة التحكيم الولائية',
      criteria,
      totalScore,
      notes: notes.trim(),
      evaluatedAt: new Date().toISOString(),
    };

    saveEvaluation(selectedTeam.id, evaluation);
    reloadTeams();

    setSaveSuccessMsg(`تم بنجاح اعتماد تقييم فريق "${selectedTeam.name}" بمجموع ${totalScore}/100`);

    if (totalScore >= 85) {
      confetti({
        particleCount: 80,
        spread: 60,
        origin: { y: 0.6 }
      });
    }

    setTimeout(() => {
      setSaveSuccessMsg(null);
    }, 4000);
  };

  // Helper stepper mutator
  const adjustCriteria = (key: keyof JuryRubricCriteria, delta: number, max: number) => {
    setCriteria((prev) => {
      const current = prev[key];
      const next = Math.max(0, Math.min(max, current + delta));
      return { ...prev, [key]: next };
    });
  };

  const currentWilaya = getWilayaByCode(selectedWilayaCode);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      
      {/* ================= TOP HEADER ================= */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8 border-b border-slate-200 pb-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-emerald-50 border border-emerald-200 text-[#006233] text-[11px] font-bold mb-2">
            <Scale className="w-3.5 h-3.5 text-[#006233]" />
            <span>شبكة التقييم الموحدة للجنة التحكيم — Neo-Institutional Edition</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 font-tajawal">
            لوحة تقييم لجنة التحكيم الولائية
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            صيغة الـ 100 نقطة المعتمدة في المنشور الوزاري لسنة 2026 لفرز وتتويج أفضل 3 مشاريع ولائياً
          </p>
        </div>

        {/* Wilaya Filter Dropdown */}
        <div className="flex items-center gap-3 self-start md:self-auto">
          <div className="text-xs font-bold text-slate-700">اختر الولاية:</div>
          <select
            value={selectedWilayaCode}
            onChange={(e) => {
              setSelectedWilayaCode(Number(e.target.value));
              setSelectedTeam(null);
            }}
            className="bg-white border-2 border-slate-300 rounded-xl px-4 py-2.5 text-xs font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#006233] shadow-xs"
          >
            {WILAYAS.map((w) => (
              <option key={w.code} value={w.code}>
                {w.codeString} — ولاية {w.nameAr}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* ================= TOP 3 PODIUM (EXECUTIVE METADATA CAPSULES) ================= */}
      <div className="mb-10">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Trophy className="w-5 h-5 text-amber-500" />
            <h2 className="text-base sm:text-lg font-black text-slate-900 font-tajawal">
              المشاريع الثلاثة المتوجة والمؤهلة للنهائيات: ولاية {currentWilaya?.nameAr}
            </h2>
          </div>
          <span className="text-[10px] font-mono font-bold bg-slate-900 text-white px-2.5 py-1 rounded">
            صفوة الولاية
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          
          {/* Rank 1: Gold */}
          <div className="bg-gradient-to-br from-amber-50/80 via-white to-amber-50/30 border-2 border-amber-400/80 rounded-2xl p-5 shadow-xs flex flex-col justify-between relative overflow-hidden">
            <div className="absolute top-0 right-0 left-0 h-1 bg-amber-400"></div>
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="inline-flex items-center gap-1.5 bg-amber-500 text-white font-black text-[11px] px-3 py-1 rounded-full shadow-2xs">
                  <Medal className="w-3.5 h-3.5 text-white" />
                  المركز الأول (بطل الولاية) 🥇
                </span>
                {topProjects[0] && (
                  <span className="text-xl font-black text-amber-900 font-mono">
                    {topProjects[0].evaluation?.totalScore} <span className="text-xs font-semibold text-slate-500">/100</span>
                  </span>
                )}
              </div>

              {topProjects[0] ? (
                <div className="space-y-1">
                  <h3 className="font-black text-slate-900 text-sm font-tajawal">
                    {topProjects[0].name}
                  </h3>
                  <p className="text-xs text-slate-700 font-medium line-clamp-1">
                    {topProjects[0].projectTitle}
                  </p>
                  <div className="text-[10px] text-slate-500 space-y-0.5 pt-1 border-t border-slate-100">
                    <div>المؤسسة: {topProjects[0].facilityName}</div>
                    <div>المسار: المجال {topProjects[0].trackId} ({getTrackById(topProjects[0].trackId)?.shortTitle})</div>
                  </div>
                </div>
              ) : (
                <div className="py-6 text-center text-xs text-slate-400">
                  بانتظار تقييم الفرق لتحديد بطل الولاية
                </div>
              )}
            </div>

            {topProjects[0] && (
              <button
                type="button"
                onClick={() => handleSelectTeam(topProjects[0])}
                className="mt-4 w-full py-1.5 bg-amber-100 hover:bg-amber-200 text-amber-900 text-xs font-bold rounded-lg transition-colors"
              >
                معاينة / تعديل التقييم
              </button>
            )}
          </div>

          {/* Rank 2: Silver */}
          <div className="bg-gradient-to-br from-slate-50 via-white to-slate-100/50 border-2 border-slate-300 rounded-2xl p-5 shadow-xs flex flex-col justify-between relative overflow-hidden">
            <div className="absolute top-0 right-0 left-0 h-1 bg-slate-400"></div>
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="inline-flex items-center gap-1.5 bg-slate-500 text-white font-black text-[11px] px-3 py-1 rounded-full shadow-2xs">
                  <Medal className="w-3.5 h-3.5 text-white" />
                  المركز الثاني 🥈
                </span>
                {topProjects[1] && (
                  <span className="text-xl font-black text-slate-800 font-mono">
                    {topProjects[1].evaluation?.totalScore} <span className="text-xs font-semibold text-slate-500">/100</span>
                  </span>
                )}
              </div>

              {topProjects[1] ? (
                <div className="space-y-1">
                  <h3 className="font-black text-slate-900 text-sm font-tajawal">
                    {topProjects[1].name}
                  </h3>
                  <p className="text-xs text-slate-700 font-medium line-clamp-1">
                    {topProjects[1].projectTitle}
                  </p>
                  <div className="text-[10px] text-slate-500 space-y-0.5 pt-1 border-t border-slate-100">
                    <div>المؤسسة: {topProjects[1].facilityName}</div>
                    <div>المسار: المجال {topProjects[1].trackId} ({getTrackById(topProjects[1].trackId)?.shortTitle})</div>
                  </div>
                </div>
              ) : (
                <div className="py-6 text-center text-xs text-slate-400">
                  بانتظار تقييم الفرق لتحديد المركز الثاني
                </div>
              )}
            </div>

            {topProjects[1] && (
              <button
                type="button"
                onClick={() => handleSelectTeam(topProjects[1])}
                className="mt-4 w-full py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold rounded-lg transition-colors"
              >
                معاينة / تعديل التقييم
              </button>
            )}
          </div>

          {/* Rank 3: Bronze */}
          <div className="bg-gradient-to-br from-amber-950/5 via-white to-amber-900/10 border-2 border-amber-600/50 rounded-2xl p-5 shadow-xs flex flex-col justify-between relative overflow-hidden">
            <div className="absolute top-0 right-0 left-0 h-1 bg-amber-700"></div>
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="inline-flex items-center gap-1.5 bg-amber-700 text-white font-black text-[11px] px-3 py-1 rounded-full shadow-2xs">
                  <Medal className="w-3.5 h-3.5 text-white" />
                  المركز الثالث 🥉
                </span>
                {topProjects[2] && (
                  <span className="text-xl font-black text-amber-900 font-mono">
                    {topProjects[2].evaluation?.totalScore} <span className="text-xs font-semibold text-slate-500">/100</span>
                  </span>
                )}
              </div>

              {topProjects[2] ? (
                <div className="space-y-1">
                  <h3 className="font-black text-slate-900 text-sm font-tajawal">
                    {topProjects[2].name}
                  </h3>
                  <p className="text-xs text-slate-700 font-medium line-clamp-1">
                    {topProjects[2].projectTitle}
                  </p>
                  <div className="text-[10px] text-slate-500 space-y-0.5 pt-1 border-t border-slate-100">
                    <div>المؤسسة: {topProjects[2].facilityName}</div>
                    <div>المسار: المجال {topProjects[2].trackId} ({getTrackById(topProjects[2].trackId)?.shortTitle})</div>
                  </div>
                </div>
              ) : (
                <div className="py-6 text-center text-xs text-slate-400">
                  بانتظار تقييم الفرق لتحديد المركز الثالث
                </div>
              )}
            </div>

            {topProjects[2] && (
              <button
                type="button"
                onClick={() => handleSelectTeam(topProjects[2])}
                className="mt-4 w-full py-1.5 bg-amber-50 hover:bg-amber-100 text-amber-900 text-xs font-bold rounded-lg transition-colors"
              >
                معاينة / تعديل التقييم
              </button>
            )}
          </div>

        </div>
      </div>

      {/* ================= MAIN INTERFACE: TEAMS LIST + NEO-INSTITUTIONAL RUBRIC ================= */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Column (5 Cols): Wilaya Teams */}
        <div className="lg:col-span-5 space-y-4">
          <div className="bg-white rounded-2xl border border-slate-200 shadow-xs p-5">
            
            <div className="flex items-center justify-between mb-3.5">
              <h3 className="font-black text-slate-900 text-sm flex items-center gap-2 font-tajawal">
                <Users className="w-4 h-4 text-[#006233]" />
                فرق ولاية {currentWilaya?.nameAr} ({displayedTeams.length})
              </h3>
              <span className="text-[10px] font-bold bg-slate-100 text-slate-700 px-2 py-0.5 rounded">
                الرمز {currentWilaya?.codeString}
              </span>
            </div>

            {/* Search Input */}
            <div className="relative mb-3.5">
              <Search className="w-3.5 h-3.5 text-slate-400 absolute right-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="البحث باسم الفريق أو المشروع..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl pr-9 pl-3 py-2 text-xs text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#006233]"
              />
            </div>

            {/* Teams List */}
            <div className="space-y-2.5 max-h-[560px] overflow-y-auto pr-1">
              {displayedTeams.length === 0 ? (
                <div className="p-8 text-center text-xs text-slate-500 bg-slate-50 rounded-xl border border-dashed border-slate-200">
                  لا توجد فرق مسجلة في هذه الولاية حالياً. يمكنك تغيير الولاية أو تسجيل فريق جديد.
                </div>
              ) : (
                displayedTeams.map((team) => {
                  const isSelected = selectedTeam?.id === team.id;
                  const isEvaluated = team.evaluation && team.evaluation.totalScore > 0;
                  return (
                    <div
                      key={team.id}
                      onClick={() => handleSelectTeam(team)}
                      className={`p-3.5 rounded-xl border-2 cursor-pointer transition-all ${
                        isSelected
                          ? 'border-[#006233] bg-emerald-50/50 shadow-xs'
                          : 'border-slate-200 hover:border-slate-300 bg-white'
                      }`}
                    >
                      <div className="flex items-start justify-between gap-2 mb-1">
                        <span className="font-mono text-[10px] text-slate-400 bg-slate-100 px-1.5 py-0.2 rounded">
                          {team.registrationNumber}
                        </span>
                        {isEvaluated ? (
                          <span className="inline-flex items-center gap-1 text-[10px] font-black text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded-full">
                            <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                            {team.evaluation?.totalScore} / 100
                          </span>
                        ) : (
                          <span className="text-[9px] font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded-full border border-amber-200">
                            بانتظار التحكيم
                          </span>
                        )}
                      </div>

                      <h4 className="font-bold text-slate-900 text-xs mb-0.5 font-tajawal">
                        {team.name}
                      </h4>
                      <p className="text-[11px] text-slate-600 line-clamp-1 mb-1.5">
                        {team.projectTitle}
                      </p>

                      <div className="flex items-center justify-between text-[10px] text-slate-400 border-t border-slate-100 pt-1.5">
                        <span>المجال {team.trackId}</span>
                        <span>{team.facilityName}</span>
                      </div>
                    </div>
                  );
                })
              )}
            </div>

            {/* Reset Seed Teams */}
            <div className="pt-3 border-t border-slate-100 mt-3">
              <button
                type="button"
                onClick={() => {
                  resetToDefaultTeams();
                  reloadTeams();
                }}
                className="text-[10px] text-slate-500 hover:text-slate-800 flex items-center gap-1 transition-colors"
              >
                <RotateCcw className="w-3 h-3" />
                <span>إعادة تعيين البيانات النموذجية للفرق</span>
              </button>
            </div>

          </div>
        </div>

        {/* Right Column (7 Cols): Neo-Institutional Telemetry & Scoring Stack */}
        <div className="lg:col-span-7">
          {selectedTeam ? (
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5 sm:p-7 space-y-6">
              
              {/* ================= OBSIDIAN TELEMETRY RADIAL CARD (STITCH EDITION 2) ================= */}
              <div className="bg-[#0F172A] text-white rounded-2xl p-5 border border-slate-800 relative overflow-hidden shadow-md">
                
                {/* Header of Active Team */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-3 mb-4">
                  <div>
                    <span className="font-mono text-[10px] text-emerald-400 bg-emerald-950/80 px-2 py-0.5 rounded border border-emerald-500/30">
                      {selectedTeam.registrationNumber}
                    </span>
                    <h3 className="text-base font-black text-white mt-1 font-tajawal">
                      {selectedTeam.name}
                    </h3>
                    <p className="text-xs text-slate-300 line-clamp-1">
                      {selectedTeam.projectTitle}
                    </p>
                  </div>
                  <span className="text-[11px] font-bold text-slate-400 self-start sm:self-auto">
                    {selectedTeam.facilityName}
                  </span>
                </div>

                {/* Radial Gauge & Telemetry Readout */}
                <div className="flex flex-col sm:flex-row items-center justify-around gap-6 py-2">
                  
                  {/* SVG Telemetry Radial */}
                  <div className="relative flex items-center justify-center w-36 h-36 shrink-0">
                    <svg className="absolute inset-0 w-full h-full transform -rotate-90 pointer-events-none" viewBox="0 0 130 130">
                      {/* Calibrated Background Circle */}
                      <circle cx="65" cy="65" fill="none" r="54" stroke="#1E293B" strokeLinecap="round" strokeWidth="7" />
                      {/* Analytical Ticks */}
                      <circle cx="65" cy="65" fill="none" r="46" stroke="#334155" strokeDasharray="2 6" strokeWidth="1.5" />
                      {/* Glowing Emerald Primary Arc */}
                      <circle 
                        className="transition-all duration-300 ease-out" 
                        cx="65" 
                        cy="65" 
                        fill="none" 
                        r="54" 
                        stroke="#10B981" 
                        strokeDasharray={circumference} 
                        strokeDashoffset={strokeDashoffset} 
                        strokeLinecap="round" 
                        strokeWidth="8" 
                        style={{ filter: 'drop-shadow(0 0 8px rgba(16, 185, 129, 0.55))' }} 
                      />
                    </svg>

                    {/* Center Display */}
                    <div className="relative flex flex-col items-center justify-center text-center">
                      <div className="flex items-baseline font-mono">
                        <span className="text-4xl font-black text-white tracking-tighter leading-none">
                          {totalScore}
                        </span>
                        <span className="text-xs font-bold text-slate-400 mr-0.5">/100</span>
                      </div>
                      <span className="text-[9px] font-bold text-emerald-400 uppercase tracking-wider mt-1">نقطة وزارية</span>
                    </div>
                  </div>

                  {/* Telemetry Breakdown */}
                  <div className="flex flex-col gap-2 min-w-0 flex-1 pr-2 border-r border-slate-800 text-xs">
                    <div className="flex items-center justify-between">
                      <span className="text-slate-400 text-[11px]">عتبة التأهل الأدنى:</span>
                      <span className="font-mono font-bold text-slate-200">70.00 / 100</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-slate-400 text-[11px]">نسبة الإنجاز المحققة:</span>
                      <span className="font-mono font-black text-emerald-400">{totalScore}.0%</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-slate-400 text-[11px]">حالة إدخال المعايير:</span>
                      <span className="text-slate-300 font-bold">5 من 5 معايير مدخلة</span>
                    </div>
                  </div>

                </div>

                {/* Live Qualification Status Chip */}
                <div className="mt-3 pt-3 border-t border-slate-800">
                  <div className={`w-full flex items-center justify-between p-2.5 rounded-lg border text-xs font-bold ${
                    isQualified 
                      ? 'bg-emerald-950/70 border-emerald-500/40 text-emerald-200'
                      : 'bg-rose-950/60 border-rose-500/40 text-rose-200'
                  }`}>
                    <div className="flex items-center gap-2">
                      <Award className="w-4 h-4 text-emerald-400" />
                      <span>{qualificationLabel}</span>
                    </div>
                    <span className="font-mono text-[10px] px-2 py-0.5 rounded bg-emerald-500/20 border border-emerald-500/30">
                      {qualificationRank}
                    </span>
                  </div>
                </div>

              </div>

              {/* Success Notification Alert */}
              {saveSuccessMsg && (
                <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-300 text-emerald-900 text-xs font-bold flex items-center gap-2 animate-in fade-in">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                  <span>{saveSuccessMsg}</span>
                </div>
              )}

              {/* ================= TACTILE STEPPERS & METRIC BARS ================= */}
              <form onSubmit={handleSaveEvaluation} className="space-y-4">
                
                {/* Metric 1: الابتكار والإبداع (Max: 25) */}
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
                  <div className="flex items-center justify-between">
                    <div>
                      <label className="text-xs font-bold text-slate-900 block font-tajawal">
                        1. الابتكار والإبداع (Innovation & Creativity)
                      </label>
                      <span className="text-[10px] text-slate-500">أصالة الفكرة والحل وتميزه عن الطرق التقليدية</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <button 
                        type="button" 
                        onClick={() => adjustCriteria('innovation', -1, 25)}
                        className="w-7 h-7 rounded-lg bg-white border border-slate-300 text-slate-700 hover:bg-slate-100 flex items-center justify-center font-bold"
                      >
                        <Minus className="w-3.5 h-3.5" />
                      </button>
                      <span className="font-mono font-black text-sm w-8 text-center text-slate-900">{criteria.innovation}</span>
                      <button 
                        type="button" 
                        onClick={() => adjustCriteria('innovation', 1, 25)}
                        className="w-7 h-7 rounded-lg bg-white border border-slate-300 text-slate-700 hover:bg-slate-100 flex items-center justify-center font-bold"
                      >
                        <Plus className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                  <input
                    type="range"
                    min={0}
                    max={25}
                    value={criteria.innovation}
                    onChange={(e) => setCriteria({ ...criteria, innovation: Number(e.target.value) })}
                    className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-[#006233]"
                  />
                </div>

                {/* Metric 2: ملاءمة الحل للتحدي (Max: 25) */}
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
                  <div className="flex items-center justify-between">
                    <div>
                      <label className="text-xs font-bold text-slate-900 block font-tajawal">
                        2. ملاءمة الحل للتحدي المطروح (Relevance to Challenge)
                      </label>
                      <span className="text-[10px] text-slate-500">استجابة الحل لمشكلة محلية ومجتمعية واقعية</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <button 
                        type="button" 
                        onClick={() => adjustCriteria('relevance', -1, 25)}
                        className="w-7 h-7 rounded-lg bg-white border border-slate-300 text-slate-700 hover:bg-slate-100 flex items-center justify-center font-bold"
                      >
                        <Minus className="w-3.5 h-3.5" />
                      </button>
                      <span className="font-mono font-black text-sm w-8 text-center text-slate-900">{criteria.relevance}</span>
                      <button 
                        type="button" 
                        onClick={() => adjustCriteria('relevance', 1, 25)}
                        className="w-7 h-7 rounded-lg bg-white border border-slate-300 text-slate-700 hover:bg-slate-100 flex items-center justify-center font-bold"
                      >
                        <Plus className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                  <input
                    type="range"
                    min={0}
                    max={25}
                    value={criteria.relevance}
                    onChange={(e) => setCriteria({ ...criteria, relevance: Number(e.target.value) })}
                    className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-[#006233]"
                  />
                </div>

                {/* Metric 3: قابلية التطبيق والواقعية (Max: 25) WITH CRITICAL DIRECTIVE NOTE */}
                <div className="p-4 rounded-xl bg-amber-50/70 border border-amber-200/90 space-y-2">
                  <div className="flex items-center justify-between">
                    <div>
                      <label className="text-xs font-bold text-amber-950 block font-tajawal">
                        3. قابلية التطبيق والواقعية (Feasibility & Applicability)
                      </label>
                      <span className="text-[10px] text-amber-800">إمكانية التجسيد الميداني بموارد معقولة واستدامة</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <button 
                        type="button" 
                        onClick={() => adjustCriteria('feasibility', -1, 25)}
                        className="w-7 h-7 rounded-lg bg-white border border-amber-300 text-amber-900 hover:bg-amber-100 flex items-center justify-center font-bold"
                      >
                        <Minus className="w-3.5 h-3.5" />
                      </button>
                      <span className="font-mono font-black text-sm w-8 text-center text-amber-950">{criteria.feasibility}</span>
                      <button 
                        type="button" 
                        onClick={() => adjustCriteria('feasibility', 1, 25)}
                        className="w-7 h-7 rounded-lg bg-white border border-amber-300 text-amber-900 hover:bg-amber-100 flex items-center justify-center font-bold"
                      >
                        <Plus className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                  
                  {/* Official Directive Guidance Note */}
                  <div className="p-2.5 bg-white rounded-lg border border-amber-200 text-[11px] text-amber-900 flex items-start gap-1.5 leading-relaxed">
                    <Info className="w-3.5 h-3.5 text-amber-700 flex-shrink-0 mt-0.5" />
                    <span><strong>ملاحظة توجيهية رسمية معتمدة:</strong> لا يشترط أن يكون المشروع تطبيقاً تقنياً معقداً؛ يمكن أن يكون أداة بسيطة، منصة، أو نموذج عمل قابل للتطبيق في مؤسسات الشباب.</span>
                  </div>

                  <input
                    type="range"
                    min={0}
                    max={25}
                    value={criteria.feasibility}
                    onChange={(e) => setCriteria({ ...criteria, feasibility: Number(e.target.value) })}
                    className="w-full h-1.5 bg-amber-200 rounded-lg appearance-none cursor-pointer accent-amber-600"
                  />
                </div>

                {/* Metric 4: الأثر على العمل التطوعي (Max: 15) */}
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
                  <div className="flex items-center justify-between">
                    <div>
                      <label className="text-xs font-bold text-slate-900 block font-tajawal">
                        4. الأثر على العمل التطوعي (Impact on Volunteering)
                      </label>
                      <span className="text-[10px] text-slate-500">استقطاب متطوعين جدد وتوسيع قاعدة المشاركة الشبانية</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <button 
                        type="button" 
                        onClick={() => adjustCriteria('impact', -1, 15)}
                        className="w-7 h-7 rounded-lg bg-white border border-slate-300 text-slate-700 hover:bg-slate-100 flex items-center justify-center font-bold"
                      >
                        <Minus className="w-3.5 h-3.5" />
                      </button>
                      <span className="font-mono font-black text-sm w-8 text-center text-slate-900">{criteria.impact}</span>
                      <button 
                        type="button" 
                        onClick={() => adjustCriteria('impact', 1, 15)}
                        className="w-7 h-7 rounded-lg bg-white border border-slate-300 text-slate-700 hover:bg-slate-100 flex items-center justify-center font-bold"
                      >
                        <Plus className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                  <input
                    type="range"
                    min={0}
                    max={15}
                    value={criteria.impact}
                    onChange={(e) => setCriteria({ ...criteria, impact: Number(e.target.value) })}
                    className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-[#006233]"
                  />
                </div>

                {/* Metric 5: العمل الجماعي وطريقة العرض (Max: 10) */}
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
                  <div className="flex items-center justify-between">
                    <div>
                      <label className="text-xs font-bold text-slate-900 block font-tajawal">
                        5. العمل الجماعي وطريقة العرض (Teamwork & Pitch)
                      </label>
                      <span className="text-[10px] text-slate-500">انسجام أدوار الفريق وجودة الإلقاء والنموذج المعروض</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <button 
                        type="button" 
                        onClick={() => adjustCriteria('teamworkPitch', -1, 10)}
                        className="w-7 h-7 rounded-lg bg-white border border-slate-300 text-slate-700 hover:bg-slate-100 flex items-center justify-center font-bold"
                      >
                        <Minus className="w-3.5 h-3.5" />
                      </button>
                      <span className="font-mono font-black text-sm w-8 text-center text-slate-900">{criteria.teamworkPitch}</span>
                      <button 
                        type="button" 
                        onClick={() => adjustCriteria('teamworkPitch', 1, 10)}
                        className="w-7 h-7 rounded-lg bg-white border border-slate-300 text-slate-700 hover:bg-slate-100 flex items-center justify-center font-bold"
                      >
                        <Plus className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                  <input
                    type="range"
                    min={0}
                    max={10}
                    value={criteria.teamworkPitch}
                    onChange={(e) => setCriteria({ ...criteria, teamworkPitch: Number(e.target.value) })}
                    className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-[#006233]"
                  />
                </div>

                {/* Jury Feedback */}
                <div className="pt-2 space-y-1">
                  <label className="text-xs font-bold text-slate-800 block">
                    ملاحظات وتوصيات لجنة التحكيم:
                  </label>
                  <textarea
                    rows={3}
                    placeholder="سجل نقاط القوة، التوصيات، وفرص احتضان المشروع داخل دور الشباب..."
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#006233]"
                  />
                </div>

                {/* Save Button */}
                <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-xs text-slate-500">
                    المجموع المرصود: <strong className="text-emerald-800 text-sm font-bold font-mono">{totalScore} / 100</strong>
                  </span>
                  <button
                    type="submit"
                    className="px-6 py-3 rounded-xl bg-[#006233] hover:bg-[#004d28] text-white text-xs font-black flex items-center gap-2 shadow-md hover:shadow-lg transition-all active:scale-95"
                  >
                    <Send className="w-4 h-4 text-emerald-300" />
                    <span>اعتماد وحفظ تقييم الفريق</span>
                  </button>
                </div>

              </form>

            </div>
          ) : (
            <div className="p-12 text-center text-slate-500 bg-white rounded-2xl border border-dashed border-slate-300">
              اختر فريقاً من القائمة لبدء التحكيم وتطبيق شبكة الـ 100 نقطة.
            </div>
          )}
        </div>

      </div>

    </div>
  );
}
