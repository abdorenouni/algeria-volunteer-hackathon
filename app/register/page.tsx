'use client';

import React, { useState, useEffect, Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import confetti from 'canvas-confetti';
import { 
  ArrowLeft, 
  ArrowRight, 
  Loader2, 
  Printer, 
  Users, 
  Award, 
  Plus, 
  Trash2, 
  AlertCircle, 
  Sparkles,
  ExternalLink,
  CheckCircle2
} from 'lucide-react';
import FigmaLogo from '@/components/ui/FigmaLogo';
import { TRACKS } from '@/data/tracks';
import { Team, TeamMember, TargetCategory } from '@/types/hackathon';
import { saveTeam } from '@/lib/storage';

function RegisterPageContent() {
  const searchParams = useSearchParams();
  const initialTrackParam = searchParams?.get('track');

  // Multi-step form step (1 = 1:4517, 2 = 1:4536, 3 = 26:2394)
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const [showVoucher, setShowVoucher] = useState<boolean>(false);
  const [isErrorModalOpen, setIsErrorModalOpen] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [registeredTeam, setRegisteredTeam] = useState<Team | null>(null);

  // Form State matching Figma Step 1
  const [wilayaCode, setWilayaCode] = useState<number>(16); // Default: Alger
  const [facilityName, setFacilityName] = useState<string>('دار الشباب أو المركب الرياضي الجواري');
  const [category, setCategory] = useState<TargetCategory>('clubs');
  const [name, setName] = useState<string>('رواد الأثر الإيجابي');
  const [projectTitle, setProjectTitle] = useState<string>("منصة 'تطوع-تك' لحملات الأحياء");
  const [projectSummary, setProjectSummary] = useState<string>('');
  const [trackId, setTrackId] = useState<number>(
    initialTrackParam ? parseInt(initialTrackParam, 10) || 1 : 1
  );

  // Leader Personal Info matching Figma Step 2
  const [leaderBirthDate, setLeaderBirthDate] = useState<string>('2006/08/21');
  const [leaderName, setLeaderName] = useState<string>('عبد الرحمن بن أحمد');
  const [leaderEmail, setLeaderEmail] = useState<string>('abdorenouni@gmail.com');

  // Members array (3 to 5 members)
  const [members, setMembers] = useState<TeamMember[]>([
    {
      id: 'm-1',
      fullName: 'عبد الرحمن بن أحمد',
      phone: '0555123456',
      email: 'abdorenouni@gmail.com',
      idCardNumber: '12345678',
      role: 'قائد الفريق',
    },
    {
      id: 'm-2',
      fullName: 'كريم عثمان',
      phone: '0666123456',
      email: 'karim@test.dz',
      idCardNumber: '12345679',
      role: 'مطور / مبرمج',
    },
    {
      id: 'm-3',
      fullName: 'سارة بلقاسم',
      phone: '0777123456',
      email: 'sara@test.dz',
      idCardNumber: '12345680',
      role: 'مصمم / مسوق',
    },
  ]);

  const [agreement, setAgreement] = useState<boolean>(true);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [showMemberDetails, setShowMemberDetails] = useState<boolean>(false);

  // Sync track param if it changes
  useEffect(() => {
    if (initialTrackParam) {
      const parsed = parseInt(initialTrackParam, 10);
      if (parsed >= 1 && parsed <= 5) {
        setTrackId(parsed);
      }
    }
  }, [initialTrackParam]);

  // Keep leader name and email in sync with members[0]
  useEffect(() => {
    setMembers((prev) => {
      const updated = [...prev];
      if (updated[0]) {
        updated[0].fullName = leaderName;
        updated[0].email = leaderEmail;
      }
      return updated;
    });
  }, [leaderName, leaderEmail]);

  // Add Member handler (Max 5)
  const handleAddMember = () => {
    if (members.length >= 5) {
      setErrors((prev) => ({ ...prev, members: 'لا يمكن إضافة أكثر من 5 أعضاء في الفريق الواحد' }));
      return;
    }
    const newId = `m-${Date.now().toString().slice(-4)}`;
    setMembers([
      ...members,
      {
        id: newId,
        fullName: `عضو الفريق ${members.length + 1}`,
        phone: '0555000000',
        email: `member${members.length + 1}@hackathon.dz`,
        idCardNumber: '00000000',
        role: 'منسق ميداني',
      },
    ]);
  };

  // Remove Member handler (Min 3)
  const handleRemoveMember = (index: number) => {
    if (members.length <= 3) {
      setErrors((prev) => ({ ...prev, members: 'يشترط 3 أعضاء على الأقل في كل فريق' }));
      return;
    }
    const updated = members.filter((_, i) => i !== index);
    setMembers(updated);
  };

  // Update Member Field
  const handleMemberChange = (index: number, field: keyof TeamMember, value: string) => {
    const updated = [...members];
    updated[index] = {
      ...updated[index],
      [field]: value,
    };
    setMembers(updated);
  };

  // Pre-fill Auto Test Data
  const handleAutoFill = () => {
    const randomSuffix = Math.floor(100 + Math.random() * 900);
    setName(`فريق رواد الابتكار #${randomSuffix}`);
    setFacilityName('دار الشباب المستقبل');
    setProjectTitle("منصة 'تطوع-تك' لإدارة الساعات والمهام");
    setLeaderName('عبد الرحمن رنوني');
    setLeaderEmail(`abdorenouni+${randomSuffix}@gmail.com`);
    setLeaderBirthDate('2004/05/12');
    setErrors({});
  };

  // Validate step
  const validateStep = (step: number): boolean => {
    const stepErrors: Record<string, string> = {};

    if (step === 1) {
      if (!name.trim()) {
        stepErrors.name = 'اسم الفريق المشارك مطلوب';
      }
      if (!facilityName.trim()) {
        stepErrors.facilityName = 'هيئة الإنتماء مطلوبة';
      }
      if (!projectTitle.trim()) {
        stepErrors.projectTitle = 'عنوان المبادرة / فكرة المشروع مطلوب';
      }
    }

    if (step === 2) {
      if (!leaderName.trim()) {
        stepErrors.leaderName = 'الاسم الكامل للقائد مطلوب';
      }
      if (!leaderEmail.trim() || !leaderEmail.includes('@')) {
        stepErrors.leaderEmail = 'يرجى إدخال بريد إلكتروني صالح';
      }
    }

    setErrors(stepErrors);
    return Object.keys(stepErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      setCurrentStep((prev) => Math.min(3, prev + 1));
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleBack = () => {
    setCurrentStep((prev) => Math.max(1, prev - 1));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Final Submission to REAL Backend API
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!agreement) {
      setErrors({ agreement: 'يرجى الموافقة والتعهد بصحة البيانات' });
      return;
    }

    setIsSubmitting(true);
    setErrors({});

    try {
      const payload = {
        name: name.trim() || 'فريق صناع الأثر',
        facilityName: facilityName.trim() || 'دار الشباب أو المركب الجواري',
        category,
        projectTitle: projectTitle.trim() || 'مشروع تطوعي مبتكر',
        projectSummary: projectSummary.trim() || projectTitle.trim(),
        trackId,
        wilayaCode,
        leaderBirthDate,
        leaderName: leaderName.trim() || 'قائد الفريق',
        leaderEmail: leaderEmail.trim() || 'leader@hackathon.dz',
        members: members.map((m, idx) => ({
          id: m.id,
          fullName: m.fullName.trim() || (idx === 0 ? leaderName : `عضو ${idx + 1}`),
          phone: m.phone || '0555000000',
          email: m.email || (idx === 0 ? leaderEmail : `member${idx + 1}@hackathon.dz`),
          idCardNumber: m.idCardNumber || '00000000',
          role: m.role || (idx === 0 ? 'قائد الفريق' : 'منسق ميداني'),
        })),
        agreement: true,
      };

      const res = await fetch('/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
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
        setErrors({ api: data.error || 'حدث خطأ أثناء معالجة طلب التسجيل' });
        setIsErrorModalOpen(true);
      }
    } catch (err: any) {
      console.error('Submission failed:', err);
      setErrors({ api: 'تعذر الاتصال بالخادم، يرجى المحاولة لاحقاً' });
      setIsErrorModalOpen(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  // ================= 1. FIGMA SUCCESS SCREEN (FRAME 1:4551) =================
  if (isSuccess && !showVoucher) {
    return (
      <div className="relative min-h-[90vh] flex items-center justify-center py-12 px-4 sm:px-6 overflow-hidden bg-[#FBF9FC]">
        {/* Soft Ambient Radial Blur Glows matching Figma */}
        <div className="absolute -right-24 top-1/4 w-[450px] h-[450px] bg-[#5FAE84]/15 rounded-full blur-3xl pointer-events-none -z-0"></div>
        <div className="absolute -left-24 bottom-1/4 w-[450px] h-[450px] bg-[#5FAE84]/15 rounded-full blur-3xl pointer-events-none -z-0"></div>

        <div className="relative z-10 max-w-2xl w-full mx-auto text-center space-y-6">
          
          {/* Top Brand Logo */}
          <div className="flex justify-center">
            <FigmaLogo size="sm" />
          </div>

          {/* Form Container Card matching Figma Frame 1:4551 */}
          <div className="bg-white border-[1.5px] border-[#1F1A26] shadow-[-8px_8px_4px_0px_#1F1A26] p-8 sm:p-14 space-y-6">
            <div className="w-16 h-16 bg-[#5FAE84]/10 rounded-full flex items-center justify-center mx-auto border-[1.5px] border-[#5FAE84]">
              <CheckCircle2 className="w-10 h-10 text-[#5FAE84]" />
            </div>

            <h1 className="text-3xl sm:text-5xl font-black text-[#5FAE84] font-tajawal tracking-tight">
              تم التســــجيـــل بنجـــــاح
            </h1>

            {registeredTeam && (
              <div className="inline-block px-4 py-2 bg-slate-50 border-[1.5px] border-[#1F1A26] shadow-[-2px_2px_0px_#1F1A26]">
                <span className="text-xs font-bold text-slate-500 block">رقم التسجيل المعتمد في الباك إند:</span>
                <span className="font-mono text-xl font-black text-[#BE3943]">
                  {registeredTeam.registrationNumber}
                </span>
              </div>
            )}

            <p className="text-sm sm:text-base text-slate-700 font-bold leading-relaxed">
              سنرسل لك بريداً إلكترونياً بردنا قريباً، ترقبوا ذلك!
            </p>

            <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/"
                className="w-full sm:w-auto px-8 py-3.5 bg-[#5FAE84] hover:bg-[#4B9A70] text-white border-[1.5px] border-[#1F1A26] shadow-[-4px_4px_0px_#000000] font-bold text-sm transition-all text-center"
              >
                العودة إلى الصفحة الرئيسية
              </Link>

              {registeredTeam && (
                <button
                  type="button"
                  onClick={() => setShowVoucher(true)}
                  className="w-full sm:w-auto px-6 py-3.5 bg-white hover:bg-slate-50 text-[#1F1A26] border-[1.5px] border-[#1F1A26] shadow-[-3px_3px_0px_#1F1A26] font-bold text-sm flex items-center justify-center gap-2 transition-all"
                >
                  <Printer className="w-4 h-4 text-[#5FAE84]" />
                  <span>معاينة وصل التسجيل (PDF)</span>
                </button>
              )}

              <Link
                href="/admin"
                className="w-full sm:w-auto px-6 py-3.5 bg-[#1E3A2B] hover:bg-[#15291E] text-white border-[1.5px] border-[#1F1A26] shadow-[-3px_3px_0px_#1F1A26] font-bold text-sm flex items-center justify-center gap-2 transition-all"
              >
                <ExternalLink className="w-4 h-4 text-[#5FAE84]" />
                <span>لوحة الفرق المسجلة</span>
              </Link>
            </div>
          </div>

        </div>
      </div>
    );
  }

  // ================= 2. OFFICIAL PRINTABLE RECEIPT / VOUCHER =================
  if (isSuccess && showVoucher && registeredTeam) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="bg-white p-8 sm:p-12 border-[1.5px] border-[#1F1A26] shadow-[-8px_8px_4px_0px_#1F1A26]">
          
          <div className="flex items-center justify-between border-b-[1.5px] border-[#1F1A26] pb-6 mb-8">
            <div className="text-right">
              <h2 className="text-2xl font-black text-[#1F1A26] font-tajawal">وصل إيداع الترشح الرسمي</h2>
              <p className="text-xs text-slate-500 font-bold mt-1">
                الهاكاثون الوطني للابتكار في العمل التطوعي • رقم التسجيل: {registeredTeam.registrationNumber}
              </p>
            </div>
            <FigmaLogo size="sm" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8 text-sm text-right">
            <div className="space-y-2 bg-slate-50 p-4 border-[1.5px] border-[#1F1A26]">
              <h4 className="font-bold text-[#1F1A26] border-b border-black/20 pb-1 flex items-center gap-2">
                <Users className="w-4 h-4 text-[#5FAE84]" />
                بيانات الفريق
              </h4>
              <div className="text-xs space-y-1 text-slate-700">
                <div><strong>اسم الفريق:</strong> {registeredTeam.name}</div>
                <div><strong>المؤسسة الشبانية:</strong> {registeredTeam.facilityName}</div>
                <div><strong>الولاية:</strong> {registeredTeam.wilayaName}</div>
                <div><strong>الفئة:</strong> {registeredTeam.categoryLabel}</div>
              </div>
            </div>

            <div className="space-y-2 bg-slate-50 p-4 border-[1.5px] border-[#1F1A26]">
              <h4 className="font-bold text-[#1F1A26] border-b border-black/20 pb-1 flex items-center gap-2">
                <Award className="w-4 h-4 text-[#BE3943]" />
                المشروع والمحور
              </h4>
              <div className="text-xs space-y-1 text-slate-700">
                <div><strong>عنوان المشروع:</strong> {registeredTeam.projectTitle}</div>
                <div><strong>المحور:</strong> محور رقم {registeredTeam.trackId}</div>
                <div><strong>تاريخ التسجيل:</strong> {new Date(registeredTeam.createdAt).toLocaleDateString('ar-DZ')}</div>
              </div>
            </div>
          </div>

          <div className="border-[1.5px] border-[#1F1A26] p-4 bg-white mb-8">
            <h4 className="font-bold text-[#1F1A26] text-xs mb-3 text-right">أعضاء الفريق المسجلين:</h4>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-right text-xs">
              {registeredTeam.members.map((m, idx) => (
                <div key={idx} className="p-2.5 bg-slate-50 border border-slate-300">
                  <div className="font-bold text-[#1F1A26]">{m.fullName}</div>
                  <div className="text-slate-500 text-[11px]">{m.role}</div>
                  <div className="text-slate-500 text-[10px] font-mono">{m.email}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="flex items-center justify-between pt-6 border-t-[1.5px] border-[#1F1A26]">
            <button
              onClick={() => window.print()}
              className="px-6 py-3 bg-[#5FAE84] text-white font-bold text-xs border-[1.5px] border-[#1F1A26] shadow-[-3px_3px_0px_#000] flex items-center gap-2"
            >
              <Printer className="w-4 h-4" />
              طباعة الوصل
            </button>

            <button
              onClick={() => setShowVoucher(false)}
              className="px-6 py-3 bg-white text-[#1F1A26] font-bold text-xs border-[1.5px] border-[#1F1A26] shadow-[-2px_2px_0px_#1F1A26]"
            >
              العودة لشاشة التأكيد
            </button>
          </div>

        </div>
      </div>
    );
  }

  // ================= 3. MULTI-STEP REGISTRATION FORM (MATCHING FIGMA EXACT FRAMES) =================
  return (
    <div className="relative min-h-screen bg-[#FBF9FC] py-10 px-4 sm:px-6 overflow-hidden flex flex-col justify-center">
      {/* Soft Ambient Radial Blur Glows (Figma Ellipse 2 & Ellipse 3) */}
      <div className="absolute -right-24 top-1/4 w-[450px] h-[450px] bg-[#5FAE84]/15 rounded-full blur-3xl pointer-events-none -z-0"></div>
      <div className="absolute -left-24 bottom-1/4 w-[450px] h-[450px] bg-[#5FAE84]/15 rounded-full blur-3xl pointer-events-none -z-0"></div>

      <div className="relative z-10 max-w-4xl w-full mx-auto">
        
        {/* Top Brand Logo matching Figma */}
        <div className="flex justify-between items-center mb-6">
          <Link href="/" className="hover:opacity-80 transition-opacity">
            <FigmaLogo size="sm" />
          </Link>

          {/* Quick Auto-Fill Demo Data Helper */}
          <button
            type="button"
            onClick={handleAutoFill}
            className="text-xs font-bold text-slate-600 hover:text-[#1F1A26] px-3 py-1.5 bg-white border border-[#1F1A26] shadow-[-2px_2px_0px_#1F1A26] flex items-center gap-1.5 transition-all"
            title="تعبئة تلقائية للبيانات لتسهيل التجربة السريعة"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#5FAE84]" />
            <span>تعبئة تلقائية للاختبار</span>
          </button>
        </div>

        {/* Main Boxed Frame Container matching Figma Frame 57 */}
        <form
          onSubmit={handleSubmit}
          className="bg-white border-[1.5px] border-[#1F1A26] shadow-[-8px_8px_4px_0px_#1F1A26] p-6 sm:p-12"
        >
          {/* Main Title matching Figma 'استمارة التسجيل' */}
          <div className="text-center mb-10">
            <h1 className="text-3xl sm:text-4xl font-black text-[#1F1A26] font-tajawal tracking-tight">
              استمــارة التسجــــيل
            </h1>
            <div className="flex items-center justify-center gap-2 mt-3">
              <span className={`w-3 h-3 border border-[#1F1A26] ${currentStep >= 1 ? 'bg-[#5FAE84]' : 'bg-slate-200'}`}></span>
              <span className="w-6 h-[1.5px] bg-[#1F1A26]"></span>
              <span className={`w-3 h-3 border border-[#1F1A26] ${currentStep >= 2 ? 'bg-[#5FAE84]' : 'bg-slate-200'}`}></span>
              <span className="w-6 h-[1.5px] bg-[#1F1A26]"></span>
              <span className={`w-3 h-3 border border-[#1F1A26] ${currentStep >= 3 ? 'bg-[#5FAE84]' : 'bg-slate-200'}`}></span>
            </div>
          </div>

          {/* ================= SCREEN 1: FRAME 1:4517 ================= */}
          {currentStep === 1 && (
            <div className="space-y-6 animate-in fade-in duration-200">
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                
                {/* Row 1, Right: انتماء الفريق المشارك */}
                <div>
                  <label className="block text-xs sm:text-sm font-bold text-[#1F1A26] mb-2 text-right">
                    انتماء الفريق المشارك <span className="text-[#BE3943]">*</span>
                  </label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value as TargetCategory)}
                    className="w-full px-4 py-3 bg-white border-[1.5px] border-[#1F1A26] text-sm text-[#1F1A26] font-bold focus:outline-none focus:shadow-[-3px_3px_0px_#5FAE84]"
                  >
                    <option value="clubs">نوادي التطوع والمواطنة</option>
                    <option value="associations">الجمعيات والمنظمات الشبابية الشريكة</option>
                    <option value="individuals">الشباب المنخرطون والمبتكرون</option>
                  </select>
                </div>

                {/* Row 1, Left: هيئة الإنتماء */}
                <div>
                  <label className="block text-xs sm:text-sm font-bold text-[#1F1A26] mb-2 text-right">
                    هيئة الإنتماء <span className="text-[#BE3943]">*</span>
                  </label>
                  <input
                    type="text"
                    placeholder="دار الشباب أو المركب الرياضي الجواري"
                    value={facilityName}
                    onChange={(e) => setFacilityName(e.target.value)}
                    className="w-full px-4 py-3 bg-white border-[1.5px] border-[#1F1A26] text-sm text-[#1F1A26] font-medium placeholder:text-slate-400 focus:outline-none focus:shadow-[-3px_3px_0px_#5FAE84]"
                  />
                  {errors.facilityName && (
                    <p className="text-xs text-[#BE3943] mt-1 font-bold">{errors.facilityName}</p>
                  )}
                </div>

                {/* Row 2, Right: اسم الفريق المشارك */}
                <div>
                  <label className="block text-xs sm:text-sm font-bold text-[#1F1A26] mb-2 text-right">
                    اسم الفريق المشارك <span className="text-[#BE3943]">*</span>
                  </label>
                  <input
                    type="text"
                    placeholder="مثال: رواد الأثر الإيجابي"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-4 py-3 bg-white border-[1.5px] border-[#1F1A26] text-sm text-[#1F1A26] font-medium placeholder:text-slate-400 focus:outline-none focus:shadow-[-3px_3px_0px_#5FAE84]"
                  />
                  {errors.name && (
                    <p className="text-xs text-[#BE3943] mt-1 font-bold">{errors.name}</p>
                  )}
                </div>

                {/* Row 2, Left: عنوان المبادرة / فكرة المشروع */}
                <div>
                  <label className="block text-xs sm:text-sm font-bold text-[#1F1A26] mb-2 text-right">
                    عنوان المبادرة / فكرة المشروع <span className="text-[#BE3943]">*</span>
                  </label>
                  <input
                    type="text"
                    placeholder="مثال: منصة 'تطوع-تك' لحملات الأحياء"
                    value={projectTitle}
                    onChange={(e) => setProjectTitle(e.target.value)}
                    className="w-full px-4 py-3 bg-white border-[1.5px] border-[#1F1A26] text-sm text-[#1F1A26] font-medium placeholder:text-slate-400 focus:outline-none focus:shadow-[-3px_3px_0px_#5FAE84]"
                  />
                  {errors.projectTitle && (
                    <p className="text-xs text-[#BE3943] mt-1 font-bold">{errors.projectTitle}</p>
                  )}
                </div>

                {/* Row 3, Right: المجال المشروع */}
                <div>
                  <label className="block text-xs sm:text-sm font-bold text-[#1F1A26] mb-2 text-right">
                    المجال المشروع <span className="text-[#BE3943]">*</span>
                  </label>
                  <select
                    value={trackId}
                    onChange={(e) => setTrackId(Number(e.target.value))}
                    className="w-full px-4 py-3 bg-white border-[1.5px] border-[#1F1A26] text-sm text-[#1F1A26] font-bold focus:outline-none focus:shadow-[-3px_3px_0px_#5FAE84]"
                  >
                    {TRACKS.map((t) => (
                      <option key={t.id} value={t.id}>
                        {t.title}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Row 3, Left: عدد أعضاء الفريق */}
                <div>
                  <label className="block text-xs sm:text-sm font-bold text-[#1F1A26] mb-2 text-right">
                    عدد أعضاء الفريق <span className="text-[#BE3943]">*</span>
                  </label>
                  <select
                    value={members.length}
                    onChange={(e) => {
                      const count = Number(e.target.value);
                      if (count > members.length) {
                        const needed = count - members.length;
                        const newMembers = [...members];
                        for (let i = 0; i < needed; i++) {
                          newMembers.push({
                            id: `m-${Date.now()}-${i}`,
                            fullName: `عضو الفريق ${newMembers.length + 1}`,
                            phone: '0555000000',
                            email: `member${newMembers.length + 1}@hackathon.dz`,
                            idCardNumber: '00000000',
                            role: 'منسق ميداني',
                          });
                        }
                        setMembers(newMembers);
                      } else if (count < members.length) {
                        setMembers(members.slice(0, count));
                      }
                    }}
                    className="w-full px-4 py-3 bg-white border-[1.5px] border-[#1F1A26] text-sm text-[#1F1A26] font-bold focus:outline-none focus:shadow-[-3px_3px_0px_#5FAE84]"
                  >
                    <option value={3}>من 3 الى 5 أعضاء (3 أعضاء)</option>
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
                  className="px-8 py-3.5 bg-[#5FAE84] hover:bg-[#4B9A70] text-white border-[1.5px] border-[#1F1A26] shadow-[-4px_4px_0px_#000000] font-bold text-sm flex items-center gap-2 transition-all cursor-pointer"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>القـــادم</span>
                </button>

                <button
                  type="button"
                  disabled
                  className="px-8 py-3.5 bg-white text-slate-300 border-[1.5px] border-slate-300 font-bold text-sm cursor-not-allowed flex items-center gap-2"
                >
                  <span>الســـابق</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

            </div>
          )}

          {/* ================= SCREEN 2: FRAME 1:4536 ================= */}
          {currentStep === 2 && (
            <div className="space-y-6 animate-in fade-in duration-200">
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                
                {/* Row 1, Right: الاسم الكامل للقائد */}
                <div>
                  <label className="block text-xs sm:text-sm font-bold text-[#1F1A26] mb-2 text-right">
                    الاسم الكامل للقائد <span className="text-[#BE3943]">*</span>
                  </label>
                  <input
                    type="text"
                    placeholder="الاسم واللقب الكامل"
                    value={leaderName}
                    onChange={(e) => setLeaderName(e.target.value)}
                    className="w-full px-4 py-3 bg-white border-[1.5px] border-[#1F1A26] text-sm text-[#1F1A26] font-medium placeholder:text-slate-400 focus:outline-none focus:shadow-[-3px_3px_0px_#5FAE84]"
                  />
                  {errors.leaderName && (
                    <p className="text-xs text-[#BE3943] mt-1 font-bold">{errors.leaderName}</p>
                  )}
                </div>

                {/* Row 1, Left: اسم الفريق */}
                <div>
                  <label className="block text-xs sm:text-sm font-bold text-[#1F1A26] mb-2 text-right">
                    اسم الفريق <span className="text-[#BE3943]">*</span>
                  </label>
                  <input
                    type="text"
                    placeholder="أدخل اسم الفريق"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-4 py-3 bg-white border-[1.5px] border-[#1F1A26] text-sm text-[#1F1A26] font-medium placeholder:text-slate-400 focus:outline-none focus:shadow-[-3px_3px_0px_#5FAE84]"
                  />
                </div>

                {/* Row 2, Right: تاريخ الميلاد */}
                <div>
                  <label className="block text-xs sm:text-sm font-bold text-[#1F1A26] mb-2 text-right">
                    تاريخ الميلاد <span className="text-[#BE3943]">*</span>
                  </label>
                  <input
                    type="text"
                    placeholder="مثال : 2006/08/21"
                    value={leaderBirthDate}
                    onChange={(e) => setLeaderBirthDate(e.target.value)}
                    className="w-full px-4 py-3 bg-white border-[1.5px] border-[#1F1A26] text-sm text-[#1F1A26] font-medium placeholder:text-slate-400 focus:outline-none focus:shadow-[-3px_3px_0px_#5FAE84]"
                  />
                </div>

                {/* Row 2, Left: البريد الالكتروني */}
                <div>
                  <label className="block text-xs sm:text-sm font-bold text-[#1F1A26] mb-2 text-right">
                    البريد الالكتروني <span className="text-[#BE3943]">*</span>
                  </label>
                  <input
                    type="email"
                    placeholder="أدخل بريدك الالكتروني"
                    value={leaderEmail}
                    onChange={(e) => setLeaderEmail(e.target.value)}
                    className="w-full px-4 py-3 bg-white border-[1.5px] border-[#1F1A26] text-sm text-[#1F1A26] font-medium placeholder:text-slate-400 focus:outline-none focus:shadow-[-3px_3px_0px_#5FAE84]"
                  />
                  {errors.leaderEmail && (
                    <p className="text-xs text-[#BE3943] mt-1 font-bold">{errors.leaderEmail}</p>
                  )}
                </div>

              </div>

              {/* Navigation Buttons: 'السابق' on right, 'القادم' with '1/5' indicator on left */}
              <div className="pt-8 flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <button
                    type="button"
                    onClick={handleNext}
                    className="px-8 py-3.5 bg-[#5FAE84] hover:bg-[#4B9A70] text-white border-[1.5px] border-[#1F1A26] shadow-[-4px_4px_0px_#000000] font-bold text-sm flex items-center gap-2 transition-all cursor-pointer"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    <span>القـــادم</span>
                  </button>
                  <span className="font-mono text-sm font-bold text-slate-700 select-none">
                    1/{members.length}
                  </span>
                </div>

                <button
                  type="button"
                  onClick={handleBack}
                  className="px-8 py-3.5 bg-white hover:bg-slate-50 text-[#1F1A26] border-[1.5px] border-[#1F1A26] shadow-[-3px_3px_0px_#1F1A26] font-bold text-sm flex items-center gap-2 transition-all cursor-pointer"
                >
                  <span>الســـابق</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

            </div>
          )}

          {/* ================= SCREEN 3: FRAME 26:2394 (CONFIRMATION & 'انتهى') ================= */}
          {currentStep === 3 && (
            <div className="space-y-6 animate-in fade-in duration-200">
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                
                {/* Right: الاسم الكامل */}
                <div>
                  <label className="block text-xs sm:text-sm font-bold text-[#1F1A26] mb-2 text-right">
                    الاسم الكامل
                  </label>
                  <input
                    type="text"
                    value={leaderName}
                    onChange={(e) => setLeaderName(e.target.value)}
                    className="w-full px-4 py-3 bg-slate-50 border-[1.5px] border-[#1F1A26] text-sm text-[#1F1A26] font-bold"
                  />
                </div>

                {/* Left: اسم الفريق */}
                <div>
                  <label className="block text-xs sm:text-sm font-bold text-[#1F1A26] mb-2 text-right">
                    اسم الفريق
                  </label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-4 py-3 bg-slate-50 border-[1.5px] border-[#1F1A26] text-sm text-[#1F1A26] font-bold"
                  />
                </div>

                {/* Right: تاريخ الميلاد */}
                <div>
                  <label className="block text-xs sm:text-sm font-bold text-[#1F1A26] mb-2 text-right">
                    تاريخ الميلاد
                  </label>
                  <input
                    type="text"
                    value={leaderBirthDate}
                    onChange={(e) => setLeaderBirthDate(e.target.value)}
                    className="w-full px-4 py-3 bg-slate-50 border-[1.5px] border-[#1F1A26] text-sm text-[#1F1A26] font-bold"
                  />
                </div>

                {/* Left: انتماء الفريق المشارك */}
                <div>
                  <label className="block text-xs sm:text-sm font-bold text-[#1F1A26] mb-2 text-right">
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
                    className="w-full px-4 py-3 bg-slate-50 border-[1.5px] border-[#1F1A26] text-sm text-[#1F1A26] font-bold"
                  />
                </div>

              </div>

              {/* Optional Expandable Team Members Section */}
              <div className="border border-slate-200 p-4 bg-slate-50">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-[#1F1A26]">
                    أعضاء الفريق المسجلين ({members.length} أعضاء)
                  </span>
                  <button
                    type="button"
                    onClick={() => setShowMemberDetails(!showMemberDetails)}
                    className="text-xs font-bold text-[#5FAE84] underline"
                  >
                    {showMemberDetails ? 'إخفاء التفاصيل' : 'تعديل أسماء الأعضاء'}
                  </button>
                </div>

                {showMemberDetails && (
                  <div className="mt-4 space-y-3 pt-3 border-t border-slate-200">
                    {members.map((m, idx) => (
                      <div key={m.id || idx} className="grid grid-cols-1 sm:grid-cols-2 gap-3 bg-white p-3 border border-slate-300">
                        <div>
                          <label className="text-[11px] font-bold text-slate-600 block mb-1">
                            {idx === 0 ? 'القائد' : `العضو ${idx + 1}`}
                          </label>
                          <input
                            type="text"
                            value={m.fullName}
                            onChange={(e) => handleMemberChange(idx, 'fullName', e.target.value)}
                            className="w-full px-2.5 py-1.5 text-xs border border-slate-300"
                          />
                        </div>
                        <div>
                          <label className="text-[11px] font-bold text-slate-600 block mb-1">البريد أو الهاتف</label>
                          <input
                            type="text"
                            value={m.email || m.phone}
                            onChange={(e) => handleMemberChange(idx, 'email', e.target.value)}
                            className="w-full px-2.5 py-1.5 text-xs border border-slate-300"
                          />
                        </div>
                      </div>
                    ))}
                    {members.length < 5 && (
                      <button
                        type="button"
                        onClick={handleAddMember}
                        className="text-xs font-bold px-3 py-1 bg-[#5FAE84] text-white border border-[#1F1A26] flex items-center gap-1"
                      >
                        <Plus className="w-3 h-3" />
                        <span>إضافة عضو</span>
                      </button>
                    )}
                  </div>
                )}
              </div>

              {/* Agreement Checkbox */}
              <label className="p-4 bg-white border-[1.5px] border-[#1F1A26] flex items-start gap-3 cursor-pointer shadow-[-2px_2px_0px_#1F1A26]">
                <input
                  type="checkbox"
                  checked={agreement}
                  onChange={(e) => setAgreement(e.target.checked)}
                  className="mt-1 w-4 h-4 accent-[#5FAE84]"
                />
                <span className="text-xs text-[#1F1A26] font-bold leading-relaxed text-right">
                  أتعهد بصفتي ممثلاً للفريق بصحة البيانات المدونة أعلاه، وبالمشاركة الفاعلة طيلة فعاليات الهاكاثون الوطني.
                </span>
              </label>
              {errors.agreement && (
                <p className="text-xs text-[#BE3943] font-bold">{errors.agreement}</p>
              )}

              {/* Buttons matching Figma Frame 26:2394: White 'السابق' on right, Green 'انتهى' on left */}
              <div className="pt-8 flex items-center justify-between">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-10 py-3.5 bg-[#5FAE84] hover:bg-[#4B9A70] text-white border-[1.5px] border-[#1F1A26] shadow-[-4px_4px_0px_#000000] font-bold text-base flex items-center gap-2 transition-all cursor-pointer disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      <span>جاري إرسال التسجيل...</span>
                    </>
                  ) : (
                    <>
                      <ArrowLeft className="w-4 h-4" />
                      <span>انتهــى</span>
                    </>
                  )}
                </button>

                <button
                  type="button"
                  onClick={handleBack}
                  disabled={isSubmitting}
                  className="px-8 py-3.5 bg-white hover:bg-slate-50 text-[#1F1A26] border-[1.5px] border-[#1F1A26] shadow-[-3px_3px_0px_#1F1A26] font-bold text-sm flex items-center gap-2 transition-all cursor-pointer"
                >
                  <span>الســـابق</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

            </div>
          )}

        </form>

        {/* ================= 4. FIGMA ERROR MODAL (FRAME 1:4561) ================= */}
        {isErrorModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in">
            <div className="bg-white border-[1.5px] border-[#1F1A26] shadow-[-8px_8px_4px_0px_#1F1A26] max-w-lg w-full p-8 sm:p-10 space-y-6 text-center">
              
              <div className="w-14 h-14 bg-red-100 rounded-full flex items-center justify-center mx-auto border-[1.5px] border-[#BE3943]">
                <AlertCircle className="w-8 h-8 text-[#BE3943]" />
              </div>

              <h2 className="text-2xl sm:text-3xl font-black text-[#BE3943] font-tajawal">
                فشــــل التسجيـــل
              </h2>

              <p className="text-xs sm:text-sm text-slate-700 font-medium leading-relaxed">
                {errors.api || 'حدث خطأ غير متوقع أثناء معالجة طلب التسجيل الخاص بك. يرجى المحاولة مرة أخرى!'}
              </p>

              <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-4">
                <button
                  type="button"
                  onClick={() => setIsErrorModalOpen(false)}
                  className="w-full sm:w-auto px-6 py-3 bg-[#BE3943] hover:bg-[#a52e37] text-white border-[1.5px] border-[#1F1A26] shadow-[-3px_3px_0px_#000] font-bold text-xs"
                >
                  المحاولة مرة أخرى
                </button>

                <Link
                  href="/"
                  className="w-full sm:w-auto px-6 py-3 bg-white hover:bg-slate-50 text-[#1F1A26] border-[1.5px] border-[#1F1A26] shadow-[-3px_3px_0px_#1F1A26] font-bold text-xs"
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
