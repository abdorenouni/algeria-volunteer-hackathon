'use client';

import React, { useState, useEffect, Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import confetti from 'canvas-confetti';
import { ArrowLeft, ArrowRight, Loader2 } from 'lucide-react';
import FigmaLogo from '@/components/ui/FigmaLogo';
import { TRACKS } from '@/data/tracks';
import { Team, TeamMember, TargetCategory } from '@/types/hackathon';
import { saveTeam } from '@/lib/storage';

function RegisterPageContent() {
  const searchParams = useSearchParams();
  const initialTrackParam = searchParams?.get('track');

  // Multi-step form step: 1 = Frame 1:4517, 2 = Frame 1:4536, 3 = Frame 26:2394
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const [isErrorModalOpen, setIsErrorModalOpen] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [registeredTeam, setRegisteredTeam] = useState<Team | null>(null);

  // Form State: Initialized with Figma's exact default values / placeholders
  const [wilayaCode, setWilayaCode] = useState<number>(16);
  const [category, setCategory] = useState<TargetCategory>('clubs');
  const [facilityName, setFacilityName] = useState<string>('دار الشباب أو المركب الرياضي الجواري');
  const [name, setName] = useState<string>('رواد الأثر الإيجابي');
  const [projectTitle, setProjectTitle] = useState<string>("منصة 'تطوع-تك' لحملات الأحياء");
  const [trackId, setTrackId] = useState<number>(
    initialTrackParam ? parseInt(initialTrackParam, 10) || 1 : 1
  );
  const [membersCount, setMembersCount] = useState<number>(3);

  // Step 2 & 3 State
  const [leaderName, setLeaderName] = useState<string>('الاسم واللقب الكامل');
  const [leaderEmail, setLeaderEmail] = useState<string>('أدخل بريدك الالكتروني');
  const [leaderBirthDate, setLeaderBirthDate] = useState<string>('2006/08/21');

  // Sync track param if it changes
  useEffect(() => {
    if (initialTrackParam) {
      const parsed = parseInt(initialTrackParam, 10);
      if (parsed >= 1 && parsed <= 5) {
        setTrackId(parsed);
      }
    }
  }, [initialTrackParam]);

  const handleNext = () => {
    setCurrentStep((prev) => Math.min(3, prev + 1));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBack = () => {
    setCurrentStep((prev) => Math.max(1, prev - 1));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Final Submission to Backend API
  const handleSubmit = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setIsSubmitting(true);

    try {
      const sanitizedLeaderEmail = leaderEmail.includes('@') ? leaderEmail.trim() : 'leader@hackathon.dz';
      const payload = {
        name: name.trim() || 'فريق رواد الأثر الإيجابي',
        facilityName: facilityName.trim() || 'دار الشباب أو المركب الرياضي الجواري',
        category,
        projectTitle: projectTitle.trim() || "منصة 'تطوع-تك' لحملات الأحياء",
        projectSummary: projectTitle.trim() || "منصة 'تطوع-تك' لحملات الأحياء",
        trackId,
        wilayaCode,
        leaderBirthDate,
        leaderName: leaderName.trim() || 'قائد الفريق',
        leaderEmail: sanitizedLeaderEmail,
        members: [
          { id: 'm-1', fullName: leaderName.trim() || 'قائد الفريق', phone: '0555000000', email: sanitizedLeaderEmail, role: 'قائد الفريق' },
          { id: 'm-2', fullName: 'عضو الفريق 2', phone: '0666000000', email: 'member2@hackathon.dz', role: 'مطور / مبرمج' },
          { id: 'm-3', fullName: 'عضو الفريق 3', phone: '0777000000', email: 'member3@hackathon.dz', role: 'مصمم / مسوق' },
        ],
        agreement: true,
      };

      const res = await fetch('/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (res.ok && data.success && data.team) {
        setRegisteredTeam(data.team);
        saveTeam(data.team);
        setIsSuccess(true);
        confetti({
          particleCount: 120,
          spread: 70,
          origin: { y: 0.6 },
        });
      } else {
        setIsErrorModalOpen(true);
      }
    } catch (err) {
      console.error('Submission failed:', err);
      setIsErrorModalOpen(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  // ================= 1. FIGMA SUCCESS SCREEN (FRAME 1:4551) =================
  if (isSuccess) {
    return (
      <div className="relative min-h-screen bg-[#FBF9FC] py-12 px-4 sm:px-6 overflow-hidden flex flex-col items-center justify-center font-tajawal">
        {/* Figma Ambient Radial Blurs */}
        <div className="absolute -right-32 top-10 w-[482px] h-[487px] bg-[#5FAE84]/20 rounded-full blur-[160px] pointer-events-none -z-0"></div>
        <div className="absolute -left-32 bottom-10 w-[482px] h-[487px] bg-[#5FAE84]/20 rounded-full blur-[160px] pointer-events-none -z-0"></div>

        <div className="relative z-10 max-w-[1218px] w-full mx-auto flex flex-col items-center">
          
          {/* Top Brand Logo matching Figma Group 68 */}
          <div className="mb-8">
            <Link href="/">
              <FigmaLogo size="sm" />
            </Link>
          </div>

          {/* Frame 57 Container (1218x678 in Figma) */}
          <div className="w-full bg-[#FBF9FC] border-[1.5px] border-[#1F1A26] shadow-[-8px_8px_4px_0px_#1F1A26] p-8 sm:p-20 text-center flex flex-col items-center justify-center min-h-[500px]">
            <div className="max-w-[783px] mx-auto space-y-6">
              
              <h1 className="text-4xl sm:text-5xl lg:text-[56px] font-black text-[#5FAE84] tracking-tight leading-tight">
                تم التســــجيـــل بنجـــــاح
              </h1>

              <p className="text-lg sm:text-xl text-[#000000] font-medium leading-relaxed">
                سنرسل لك بريداً إلكترونياً بردنا قريباً، ترقبوا ذلك!
              </p>

              <div className="pt-8 flex justify-center">
                <Link
                  href="/"
                  className="inline-flex items-center justify-center gap-3 px-10 py-5 bg-[#5FAE84] hover:bg-[#4B9A70] text-white border-[1.5px] border-[#1F1A26] shadow-[-4px_4px_0px_#000000] font-bold text-lg sm:text-xl transition-all"
                >
                  <ArrowLeft className="w-6 h-6" />
                  <span>العودة إلى الصفحة الرئيسية</span>
                </Link>
              </div>

            </div>
          </div>

        </div>
      </div>
    );
  }

  // ================= 2. MULTI-STEP REGISTRATION FORM (FRAMES 1:4517, 1:4536, 26:2394) =================
  return (
    <div className="relative min-h-screen bg-[#FBF9FC] py-12 px-4 sm:px-6 overflow-hidden flex flex-col items-center justify-center font-tajawal">
      {/* Figma Ambient Radial Blurs */}
      <div className="absolute -right-32 top-10 w-[482px] h-[487px] bg-[#5FAE84]/20 rounded-full blur-[160px] pointer-events-none -z-0"></div>
      <div className="absolute -left-32 bottom-10 w-[482px] h-[487px] bg-[#5FAE84]/20 rounded-full blur-[160px] pointer-events-none -z-0"></div>

      <div className="relative z-10 max-w-[1218px] w-full mx-auto flex flex-col items-center">
        
        {/* Top Brand Logo matching Figma Group 68 */}
        <div className="mb-6">
          <Link href="/">
            <FigmaLogo size="sm" />
          </Link>
        </div>

        {/* Frame 57 Container (1218px x 678px in Figma) */}
        <div className="w-full bg-[#FBF9FC] border-[1.5px] border-[#1F1A26] shadow-[-8px_8px_4px_0px_#1F1A26] p-6 sm:p-12 lg:p-16">
          
          {/* Main Title: استمــارة التسجــــيل (Figma 48px font-black text-black) */}
          <div className="text-center mb-10 sm:mb-12">
            <h1 className="text-3xl sm:text-5xl font-black text-black tracking-tight leading-tight">
              استمــارة التسجــــيل
            </h1>
          </div>

          {/* ================= STEP 1: FIGMA FRAME 1:4517 ================= */}
          {currentStep === 1 && (
            <div className="space-y-8 animate-in fade-in duration-200">
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
                
                {/* Row 1, Right (in RTL): انتماء الفريق المشارك */}
                <div className="space-y-2 text-right">
                  <label className="block text-lg sm:text-[21px] font-medium text-[#0F172A]">
                    انتماء الفريق المشارك <span className="text-[#FF4D62]">*</span>
                  </label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value as TargetCategory)}
                    className="w-full h-[66px] px-6 bg-[#FBF9FC] border-[1.5px] border-[#1F1A26] text-base text-[#213D2E] font-medium focus:outline-none focus:border-[#5FAE84]"
                  >
                    <option value="clubs">نوادي التطوع والمواطنة</option>
                    <option value="associations">الجمعيات والمنظمات الشبابية</option>
                    <option value="individuals">الشباب المنخرطون والمبتكرون</option>
                  </select>
                </div>

                {/* Row 1, Left (in RTL): هيئة الإنتماء */}
                <div className="space-y-2 text-right">
                  <label className="block text-lg sm:text-[21px] font-medium text-[#0F172A]">
                    هيئة الإنتماء
                  </label>
                  <input
                    type="text"
                    value={facilityName}
                    onChange={(e) => setFacilityName(e.target.value)}
                    placeholder="دار الشباب أو المركب الرياضي الجواري"
                    className="w-full h-[66px] px-6 bg-[#FBF9FC] border-[1.5px] border-[#1F1A26] text-base text-[#213D2E] font-medium placeholder:text-slate-400 focus:outline-none focus:border-[#5FAE84]"
                  />
                </div>

                {/* Row 2, Right (in RTL): اسم الفريق المشارك */}
                <div className="space-y-2 text-right">
                  <label className="block text-lg sm:text-[21px] font-medium text-[#0F172A]">
                    اسم الفريق المشارك <span className="text-[#FF4D62]">*</span>
                  </label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="مثال: رواد الأثر الإيجابي"
                    className="w-full h-[66px] px-6 bg-[#FBF9FC] border-[1.5px] border-[#1F1A26] text-base text-[#213D2E] font-medium placeholder:text-slate-400 focus:outline-none focus:border-[#5FAE84]"
                  />
                </div>

                {/* Row 2, Left (in RTL): عنوان المبادرة / فكرة المشروع */}
                <div className="space-y-2 text-right">
                  <label className="block text-lg sm:text-[21px] font-medium text-[#0F172A]">
                    عنوان المبادرة / فكرة المشروع <span className="text-[#FF4D62]">*</span>
                  </label>
                  <input
                    type="text"
                    value={projectTitle}
                    onChange={(e) => setProjectTitle(e.target.value)}
                    placeholder="مثال: منصة 'تطوع-تك' لحملات الأحياء"
                    className="w-full h-[66px] px-6 bg-[#FBF9FC] border-[1.5px] border-[#1F1A26] text-base text-[#213D2E] font-medium placeholder:text-slate-400 focus:outline-none focus:border-[#5FAE84]"
                  />
                </div>

                {/* Row 3, Right (in RTL): المجال المشروع */}
                <div className="space-y-2 text-right">
                  <label className="block text-lg sm:text-[21px] font-medium text-[#0F172A]">
                    المجال المشروع <span className="text-[#FF4D62]">*</span>
                  </label>
                  <select
                    value={trackId}
                    onChange={(e) => setTrackId(Number(e.target.value))}
                    className="w-full h-[66px] px-6 bg-[#FBF9FC] border-[1.5px] border-[#1F1A26] text-base text-[#213D2E] font-medium focus:outline-none focus:border-[#5FAE84]"
                  >
                    {TRACKS.map((t) => (
                      <option key={t.id} value={t.id}>
                        {t.title}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Row 3, Left (in RTL): عدد أعضاء الفريق */}
                <div className="space-y-2 text-right">
                  <label className="block text-lg sm:text-[21px] font-medium text-[#0F172A]">
                    عدد أعضاء الفريق <span className="text-[#FF4D62]">*</span>
                  </label>
                  <select
                    value={membersCount}
                    onChange={(e) => setMembersCount(Number(e.target.value))}
                    className="w-full h-[66px] px-6 bg-[#FBF9FC] border-[1.5px] border-[#1F1A26] text-base text-[#213D2E] font-medium focus:outline-none focus:border-[#5FAE84]"
                  >
                    <option value={3}>من 3 الى 5 أعضاء</option>
                    <option value={4}>4 أعضاء</option>
                    <option value={5}>5 أعضاء</option>
                  </select>
                </div>

              </div>

              {/* Navigation Buttons: 'السابق' disabled on right, 'القادم' on left */}
              <div className="pt-8 flex items-center justify-between">
                <button
                  type="button"
                  onClick={handleNext}
                  className="h-[68px] sm:h-[80px] px-8 sm:px-12 bg-[#5FAE84] hover:bg-[#4B9A70] text-[#FBF9FC] border-[1.5px] border-[#1F1A26] shadow-[-4px_4px_0px_#000000] font-bold text-lg sm:text-xl flex items-center gap-3 transition-all cursor-pointer"
                >
                  <ArrowLeft className="w-6 h-6" />
                  <span>القادم</span>
                </button>

                <button
                  type="button"
                  disabled
                  className="h-[68px] px-8 sm:px-10 bg-[#FBF9FC] text-[#B3B3B3] border-[1.5px] border-[#1F1A26]/30 font-bold text-base cursor-not-allowed flex items-center gap-3"
                >
                  <span>الســابق</span>
                  <ArrowRight className="w-5 h-5 text-[#B3B3B3]" />
                </button>
              </div>

            </div>
          )}

          {/* ================= STEP 2: FIGMA FRAME 1:4536 ================= */}
          {currentStep === 2 && (
            <div className="space-y-8 animate-in fade-in duration-200">
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
                
                {/* Row 1, Right (in RTL): الاسم الكامل للقائد */}
                <div className="space-y-2 text-right">
                  <label className="block text-lg sm:text-[21px] font-medium text-[#0F172A]">
                    الاسم الكامل للقائد
                  </label>
                  <input
                    type="text"
                    value={leaderName}
                    onChange={(e) => setLeaderName(e.target.value)}
                    placeholder="الاسم واللقب الكامل"
                    className="w-full h-[66px] px-6 bg-[#FBF9FC] border-[1.5px] border-[#1F1A26] text-base text-[#213D2E] font-medium placeholder:text-slate-400 focus:outline-none focus:border-[#5FAE84]"
                  />
                </div>

                {/* Row 1, Left (in RTL): اسم الفريق */}
                <div className="space-y-2 text-right">
                  <label className="block text-lg sm:text-[21px] font-medium text-[#0F172A]">
                    اسم الفريق
                  </label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="أدخل اسم الفريق"
                    className="w-full h-[66px] px-6 bg-[#FBF9FC] border-[1.5px] border-[#1F1A26] text-base text-[#213D2E] font-medium placeholder:text-slate-400 focus:outline-none focus:border-[#5FAE84]"
                  />
                </div>

                {/* Row 2, Right (in RTL): تاريخ الميلاد */}
                <div className="space-y-2 text-right">
                  <label className="block text-lg sm:text-[21px] font-medium text-[#0F172A]">
                    تاريخ الميلاد
                  </label>
                  <input
                    type="text"
                    value={leaderBirthDate}
                    onChange={(e) => setLeaderBirthDate(e.target.value)}
                    placeholder="مثال : 2006/08/21"
                    className="w-full h-[66px] px-6 bg-[#FBF9FC] border-[1.5px] border-[#1F1A26] text-base text-[#213D2E] font-medium placeholder:text-slate-400 focus:outline-none focus:border-[#5FAE84]"
                  />
                </div>

                {/* Row 2, Left (in RTL): البريد الالكتروني */}
                <div className="space-y-2 text-right">
                  <label className="block text-lg sm:text-[21px] font-medium text-[#0F172A]">
                    البريد الالكتروني
                  </label>
                  <input
                    type="email"
                    value={leaderEmail}
                    onChange={(e) => setLeaderEmail(e.target.value)}
                    placeholder="أدخل بريدك الالكتروني"
                    className="w-full h-[66px] px-6 bg-[#FBF9FC] border-[1.5px] border-[#1F1A26] text-base text-[#213D2E] font-medium placeholder:text-slate-400 focus:outline-none focus:border-[#5FAE84]"
                  />
                </div>

              </div>

              {/* Navigation Buttons matching Figma Frame 1:4536: '1/5' + 'القـــادم' on left, 'الســابق' on right */}
              <div className="pt-8 flex items-center justify-between">
                <div className="flex items-center gap-6">
                  <button
                    type="button"
                    onClick={handleNext}
                    className="h-[68px] sm:h-[80px] px-8 sm:px-12 bg-[#5FAE84] hover:bg-[#4B9A70] text-[#FBF9FC] border-[1.5px] border-[#1F1A26] shadow-[-4px_4px_0px_#000000] font-bold text-lg sm:text-xl flex items-center gap-3 transition-all cursor-pointer"
                  >
                    <ArrowLeft className="w-6 h-6" />
                    <span>القـــادم</span>
                  </button>

                  <span className="font-tajawal text-2xl font-bold text-[#1F1A26] select-none">
                    1/5
                  </span>
                </div>

                <button
                  type="button"
                  onClick={handleBack}
                  className="h-[68px] px-8 sm:px-10 bg-[#FBF9FC] hover:bg-slate-100 text-[#1F1A26] border-[1.5px] border-[#1F1A26] shadow-[-4px_4px_0px_#000000] font-bold text-base flex items-center gap-3 transition-all cursor-pointer"
                >
                  <span>الســابق</span>
                  <ArrowRight className="w-5 h-5 text-[#1F1A26]" />
                </button>
              </div>

            </div>
          )}

          {/* ================= STEP 3: FIGMA FRAME 26:2394 ================= */}
          {currentStep === 3 && (
            <div className="space-y-8 animate-in fade-in duration-200">
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
                
                {/* Row 1, Right (in RTL): الاسم الكامل */}
                <div className="space-y-2 text-right">
                  <label className="block text-lg sm:text-[21px] font-medium text-[#0F172A]">
                    الاسم الكامل
                  </label>
                  <input
                    type="text"
                    value={leaderName}
                    onChange={(e) => setLeaderName(e.target.value)}
                    placeholder="الاسم واللقب الكامل"
                    className="w-full h-[66px] px-6 bg-[#FBF9FC] border-[1.5px] border-[#1F1A26] text-base text-[#213D2E] font-medium focus:outline-none focus:border-[#5FAE84]"
                  />
                </div>

                {/* Row 1, Left (in RTL): اسم الفريق */}
                <div className="space-y-2 text-right">
                  <label className="block text-lg sm:text-[21px] font-medium text-[#0F172A]">
                    اسم الفريق
                  </label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="أدخل اسم الفريق"
                    className="w-full h-[66px] px-6 bg-[#FBF9FC] border-[1.5px] border-[#1F1A26] text-base text-[#213D2E] font-medium focus:outline-none focus:border-[#5FAE84]"
                  />
                </div>

                {/* Row 2, Right (in RTL): تاريخ الميلاد */}
                <div className="space-y-2 text-right">
                  <label className="block text-lg sm:text-[21px] font-medium text-[#0F172A]">
                    تاريخ الميلاد
                  </label>
                  <input
                    type="text"
                    value={leaderBirthDate}
                    onChange={(e) => setLeaderBirthDate(e.target.value)}
                    placeholder="مثال : 2006/08/21"
                    className="w-full h-[66px] px-6 bg-[#FBF9FC] border-[1.5px] border-[#1F1A26] text-base text-[#213D2E] font-medium focus:outline-none focus:border-[#5FAE84]"
                  />
                </div>

                {/* Row 2, Left (in RTL): انتماء الفريق المشارك */}
                <div className="space-y-2 text-right">
                  <label className="block text-lg sm:text-[21px] font-medium text-[#0F172A]">
                    انتماء الفريق المشارك
                  </label>
                  <input
                    type="text"
                    disabled
                    value={
                      category === 'clubs' 
                        ? 'نوادي التطوع والمواطنة' 
                        : category === 'associations'
                        ? 'الجمعيات والمنظمات الشبابية'
                        : 'الشباب المنخرطون والمبتكرون'
                    }
                    className="w-full h-[66px] px-6 bg-[#FBF9FC] border-[1.5px] border-[#1F1A26] text-base text-[#213D2E] font-medium focus:outline-none"
                  />
                </div>

              </div>

              {/* Navigation Buttons matching Figma Frame 26:2394: 'انتهــى' on left, 'الســابق' on right */}
              <div className="pt-8 flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => handleSubmit()}
                  disabled={isSubmitting}
                  className="h-[68px] sm:h-[80px] px-10 sm:px-14 bg-[#5FAE84] hover:bg-[#4B9A70] text-[#FBF9FC] border-[1.5px] border-[#1F1A26] shadow-[-4px_4px_0px_#000000] font-bold text-lg sm:text-xl flex items-center gap-3 transition-all cursor-pointer disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-6 h-6 animate-spin" />
                      <span>جاري التسجيل...</span>
                    </>
                  ) : (
                    <>
                      <ArrowLeft className="w-6 h-6" />
                      <span>انتهــى</span>
                    </>
                  )}
                </button>

                <button
                  type="button"
                  onClick={handleBack}
                  disabled={isSubmitting}
                  className="h-[68px] px-8 sm:px-10 bg-[#FBF9FC] hover:bg-slate-100 text-[#1F1A26] border-[1.5px] border-[#1F1A26] shadow-[-4px_4px_0px_#000000] font-bold text-base flex items-center gap-3 transition-all cursor-pointer"
                >
                  <span>الســابق</span>
                  <ArrowRight className="w-5 h-5 text-[#1F1A26]" />
                </button>
              </div>

            </div>
          )}

        </div>

        {/* ================= 4. FIGMA ERROR MODAL (FRAME 1:4561) ================= */}
        {isErrorModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in font-tajawal">
            <div className="bg-[#FBF9FC] border-[1.5px] border-[#1F1A26] shadow-[-8px_8px_4px_0px_#1F1A26] max-w-xl w-full p-8 sm:p-12 space-y-6 text-center">
              
              <h2 className="text-3xl sm:text-4xl font-black text-[#BE3943]">
                فشــــل التسجيـــل
              </h2>

              <p className="text-sm sm:text-base text-slate-700 font-medium leading-relaxed">
                حدث خطأ غير متوقع أثناء معالجة طلب التسجيل الخاص بك. يرجى المحاولة مرة أخرى!
              </p>

              <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
                <button
                  type="button"
                  onClick={() => setIsErrorModalOpen(false)}
                  className="w-full sm:w-auto px-8 py-4 bg-[#5FAE84] hover:bg-[#4B9A70] text-[#FBF9FC] border-[1.5px] border-[#1F1A26] shadow-[-4px_4px_0px_#000000] font-bold text-base"
                >
                  الإبلاغ عن مشكلة
                </button>

                <Link
                  href="/"
                  className="w-full sm:w-auto px-8 py-4 bg-[#FBF9FC] hover:bg-slate-100 text-[#1F1A26] border-[1.5px] border-[#1F1A26] shadow-[-4px_4px_0px_#000000] font-bold text-base"
                >
                  العودة إلى الصفحة الرئيسية
                </Link>
              </div>

            </div>
          </div>
        )}

      </div>
    </div>
  );
}

export default function RegisterPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-[#FBF9FC] flex items-center justify-center">
        <Loader2 className="w-8 h-8 text-[#5FAE84] animate-spin" />
      </div>
    }>
      <RegisterPageContent />
    </Suspense>
  );
}
