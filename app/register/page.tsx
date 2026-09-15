'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Link from 'next/link';
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
  TeamMember, 
  TargetCategory 
} from '@/types/hackathon';
import { 
  registrationFormSchema, 
  RegistrationFormData,
  TeamMemberData 
} from '@/lib/validations';
import { saveTeam } from '@/lib/storage';
import FigmaLogo from '@/components/ui/FigmaLogo';
import { 
  UserPlus, 
  Building2, 
  Users, 
  FileCheck2, 
  Plus, 
  Trash2, 
  ArrowLeft,
  ArrowRight,
  Printer, 
  Award, 
  Check, 
  Info,
  Calendar,
  MapPin,
  AlertCircle,
  HelpCircle
} from 'lucide-react';
import confetti from 'canvas-confetti';

function RegisterFormContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const initialTrackParam = searchParams.get('track');

  // Multi-step progress (1 to 4)
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const [showVoucher, setShowVoucher] = useState<boolean>(false);
  const [isErrorModalOpen, setIsErrorModalOpen] = useState<boolean>(false);
  const [registeredTeam, setRegisteredTeam] = useState<Team | null>(null);

  // Form State
  const [wilayaCode, setWilayaCode] = useState<number>(16); // Default: Alger
  const [facilityName, setFacilityName] = useState<string>('');
  const [category, setCategory] = useState<TargetCategory>('clubs');
  const [name, setName] = useState<string>('');
  const [projectTitle, setProjectTitle] = useState<string>('');
  const [projectSummary, setProjectSummary] = useState<string>('');
  const [trackId, setTrackId] = useState<number>(
    initialTrackParam ? parseInt(initialTrackParam, 10) || 1 : 1
  );

  // Leader / Representative Personal Info (Figma fields: الاسم الكامل، تاريخ الميلاد)
  const [leaderBirthDate, setLeaderBirthDate] = useState<string>('2004-05-15');

  // Members array (Strict 3 to 5 members)
  const [members, setMembers] = useState<TeamMemberData[]>([
    {
      id: 'm-1',
      fullName: '',
      phone: '',
      email: '',
      idCardNumber: '',
      role: 'قائد الفريق',
    },
    {
      id: 'm-2',
      fullName: '',
      phone: '',
      email: '',
      idCardNumber: '',
      role: 'مطور / مبرمج',
    },
    {
      id: 'm-3',
      fullName: '',
      phone: '',
      email: '',
      idCardNumber: '',
      role: 'مصمم / مسوق',
    },
  ]);

  const [agreement, setAgreement] = useState<boolean>(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Sync track param if it changes
  useEffect(() => {
    if (initialTrackParam) {
      const parsed = parseInt(initialTrackParam, 10);
      if (parsed >= 1 && parsed <= 5) {
        setTrackId(parsed);
      }
    }
  }, [initialTrackParam]);

  // Add Member handler (Max 5)
  const handleAddMember = () => {
    if (members.length >= 5) {
      setErrors((prev) => ({ ...prev, members: 'لا يمكن إضافة أكثر من 5 أعضاء في الفريق الواحد وفق اللائحة الوزارية' }));
      return;
    }
    const newId = `m-${Date.now().toString().slice(-4)}`;
    setMembers([
      ...members,
      {
        id: newId,
        fullName: '',
        phone: '',
        email: '',
        idCardNumber: '',
        role: 'منسق ميداني',
      },
    ]);
    setErrors((prev) => {
      const copy = { ...prev };
      delete copy.members;
      return copy;
    });
  };

  // Remove Member handler (Min 3)
  const handleRemoveMember = (index: number) => {
    if (members.length <= 3) {
      setErrors((prev) => ({ ...prev, members: 'يشترط القانون الداخلي للهاكاثون 3 أعضاء على الأقل في كل فريق' }));
      return;
    }
    const updated = members.filter((_, i) => i !== index);
    setMembers(updated);
    setErrors((prev) => {
      const copy = { ...prev };
      delete copy.members;
      return copy;
    });
  };

  // Update Member Field
  const handleMemberChange = (index: number, field: keyof TeamMemberData, value: string) => {
    const updated = [...members];
    updated[index] = {
      ...updated[index],
      [field]: value,
    };
    setMembers(updated);
  };

  // Validate current step
  const validateStep = (step: number): boolean => {
    const stepErrors: Record<string, string> = {};

    if (step === 1) {
      if (!name.trim() || name.trim().length < 3) {
        stepErrors.name = 'اسم الفريق مطلوب (3 أحرف على الأقل)';
      }
      if (!members[0]?.fullName?.trim() || members[0].fullName.trim().length < 3) {
        stepErrors.leaderName = 'الاسم واللقب لقائد الفريق مطلوب';
      }
      if (!wilayaCode || wilayaCode < 1 || wilayaCode > 58) {
        stepErrors.wilayaCode = 'يرجى اختيار الولاية من القائمة (1 - 58)';
      }
      if (!facilityName.trim() || facilityName.trim().length < 3) {
        stepErrors.facilityName = 'يرجى إدخال اسم مؤسسة أو دار الشباب (3 أحرف على الأقل)';
      }
      if (!category) {
        stepErrors.category = 'يرجى اختيار انتماء الفريق المشارك';
      }
    }

    if (step === 2) {
      if (!projectTitle.trim() || projectTitle.trim().length < 5) {
        stepErrors.projectTitle = 'عنوان المشروع مطلوب (5 أحرف على الأقل)';
      }
      if (!projectSummary.trim() || projectSummary.trim().length < 20) {
        stepErrors.projectSummary = 'يرجى تقديم ملخص وافٍ للمشروع وفكرته (20 حرفاً على الأقل)';
      }
      if (!trackId || trackId < 1 || trackId > 5) {
        stepErrors.trackId = 'يرجى اختيار أحد المجالات الخمسة';
      }
    }

    if (step === 3) {
      if (members.length < 3 || members.length > 5) {
        stepErrors.members = 'عدد أعضاء الفريق يجب أن يكون بين 3 و 5 أعضاء حصراً';
      }

      members.forEach((m, idx) => {
        if (!m.fullName.trim() || m.fullName.trim().length < 3) {
          stepErrors[`member_${idx}_fullName`] = `الاسم الكامل للعضو ${idx + 1} مطلوب (3 أحرف على الأقل)`;
        }
        if (!/^(05|06|07)[0-9]{8}$/.test(m.phone.trim())) {
          stepErrors[`member_${idx}_phone`] = `رقم هاتف العضو ${idx + 1} يجب أن يكون رقماً جزائرياً صالحاً (10 أرقام)`;
        }
        if (!m.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(m.email.trim())) {
          stepErrors[`member_${idx}_email`] = `البريد الإلكتروني للعضو ${idx + 1} غير صالح`;
        }
        if (!m.idCardNumber.trim() || m.idCardNumber.trim().length < 5) {
          stepErrors[`member_${idx}_idCardNumber`] = `رقم بطاقة التعريف أو الشاب للعضو ${idx + 1} إجباري`;
        }
      });
    }

    if (step === 4) {
      if (!agreement) {
        stepErrors.agreement = 'يجب الموافقة والتعهد بصحة البيانات المسجلة وفق اللائحة الوزارية';
      }
    }

    setErrors(stepErrors);
    return Object.keys(stepErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      setCurrentStep((prev) => prev + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleBack = () => {
    setCurrentStep((prev) => Math.max(1, prev - 1));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Final Submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateStep(4)) {
      setIsErrorModalOpen(true);
      return;
    }

    // Full Zod validation
    const formData = {
      wilayaCode,
      facilityName,
      category,
      name,
      projectTitle,
      projectSummary,
      trackId,
      members,
      agreement,
    };

    const result = registrationFormSchema.safeParse(formData);
    if (!result.success) {
      const zErrors: Record<string, string> = {};
      result.error.issues.forEach((err: any) => {
        zErrors[err.path.join('.')] = err.message;
      });
      setErrors(zErrors);
      setIsErrorModalOpen(true);
      return;
    }

    const currentWilaya = getWilayaByCode(wilayaCode);
    const wilayaStr = wilayaCode < 10 ? `0${wilayaCode}` : `${wilayaCode}`;
    const randomSuffix = Math.floor(100 + Math.random() * 900);
    const registrationNumber = `DZ-2026-${wilayaStr}-${randomSuffix}`;

    const newTeam: Team = {
      id: `team-${Date.now()}`,
      registrationNumber,
      name: name.trim(),
      projectTitle: projectTitle.trim(),
      projectSummary: projectSummary.trim(),
      trackId: trackId as 1 | 2 | 3 | 4 | 5,
      wilayaCode,
      wilayaName: currentWilaya ? currentWilaya.nameAr : `ولاية ${wilayaCode}`,
      facilityName: facilityName.trim(),
      category,
      categoryLabel: 
        category === 'clubs' ? 'نوادي التطوع والمواطنة بمؤسسات الشباب' :
        category === 'associations' ? 'الجمعيات الشبابية الشريكة' :
        'الشباب المنخرطون في مؤسسات الشباب',
      members: members.map((m) => ({
        id: m.id,
        fullName: m.fullName.trim(),
        phone: m.phone.trim(),
        email: m.email.trim(),
        idCardNumber: m.idCardNumber.trim(),
        role: m.role,
      })),
      createdAt: new Date().toISOString(),
      status: 'registered',
    };

    saveTeam(newTeam);
    setRegisteredTeam(newTeam);
    setIsSuccess(true);
    confetti({
      particleCount: 120,
      spread: 70,
      origin: { y: 0.6 }
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // ================= 1. FIGMA SUCCESS MODAL STATE =================
  if (isSuccess && registeredTeam && !showVoucher) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-16 text-center">
        <div className="flex justify-center mb-8">
          <FigmaLogo size="lg" />
        </div>

        <div className="neo-box p-8 sm:p-14 bg-white border-2 border-black shadow-[6px_6px_0px_#000] text-center space-y-6">
          <h2 className="text-3xl sm:text-5xl font-black text-[#2E7D5B] font-tajawal">
            تم التسجيل بنجاح
          </h2>

          <p className="text-base sm:text-lg text-black font-semibold max-w-md mx-auto leading-relaxed">
            سنرسل لك بريداً إلكترونياً فردنا قريباً، ترقبوا ذلك!
          </p>

          <div className="p-4 bg-slate-50 border-2 border-black max-w-sm mx-auto text-xs space-y-1">
            <span className="text-slate-500 font-bold block">الرقم التسلسلي الوطني:</span>
            <span className="text-lg font-mono font-black text-black">{registeredTeam.registrationNumber}</span>
          </div>

          <div className="pt-4 flex flex-wrap items-center justify-center gap-4">
            <button
              type="button"
              onClick={() => setShowVoucher(true)}
              className="neo-btn bg-[#2E7D5B] text-white px-8 py-3.5 font-black text-sm gap-2"
            >
              <span>معاينة وطباعة وصل التسجيل الرسمي</span>
              <Printer className="w-4 h-4" />
            </button>

            <Link
              href="/"
              className="neo-btn bg-white hover:bg-slate-100 text-black px-8 py-3.5 font-black text-sm"
            >
              العودة إلى الصفحة الرئيسية
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // ================= 2. OFFICIAL REGISTRATION VOUCHER (PRINTABLE) =================
  if (isSuccess && registeredTeam && showVoucher) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="neo-box bg-white p-6 sm:p-10 border-2 border-black shadow-[6px_6px_0px_#000] relative overflow-hidden print-card">
          
          {/* Header */}
          <div className="border-b-2 border-black pb-6 mb-6 text-center">
            <div className="text-xs font-bold text-slate-600 mb-1">
              الجمهورية الجزائرية الديمقراطية الشعبية — وزارة الشباب والرياضة
            </div>
            <div className="text-sm font-black text-[#2E7D5B] mb-2">
              الهاكاثون الوطني للابتكار في العمل التطوعي — دورة سبتمبر 2026
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-black">
              وصل التسجيل والمشاركة الرسمي
            </h2>
            <p className="text-xs text-slate-600 mt-1 font-bold">
              شعار الدورة: &ldquo;مؤسسات الشباب... فضاءات للابتكار و التطوع&rdquo;
            </p>
          </div>

          {/* Registration Code Badge */}
          <div className="bg-[#2E7D5B]/10 rounded-none p-6 border-2 border-black flex flex-col sm:flex-row items-center justify-between gap-6 mb-8">
            <div className="space-y-1 text-center sm:text-right">
              <span className="text-xs text-[#2E7D5B] font-black block">
                الرقم التسلسلي الوطني المعتمد:
              </span>
              <span className="text-2xl sm:text-3xl font-mono font-black text-black tracking-wider">
                {registeredTeam.registrationNumber}
              </span>
              <p className="text-xs text-slate-700">
                تاريخ التسجيل: {new Date(registeredTeam.createdAt).toLocaleDateString('ar-DZ')}
              </p>
            </div>

            <div className="flex items-center gap-3 bg-white p-3 border-2 border-black shadow-[2px_2px_0px_#000]">
              <div className="w-16 h-16 bg-black p-1 flex flex-col items-center justify-center text-white text-[10px] font-mono leading-none">
                <span>[QR-MJS]</span>
                <span className="text-[8px] text-emerald-400 mt-1">VERIFIED</span>
                <span className="text-[7px] text-slate-400">DZ-2026</span>
              </div>
              <div className="text-xs space-y-0.5 text-right">
                <div className="font-black text-[#2E7D5B]">تسجيل ولائي معتمد</div>
                <div className="text-slate-500 text-[10px]">المؤسسة الحاضنة:</div>
                <div className="text-black font-bold">{registeredTeam.facilityName}</div>
              </div>
            </div>
          </div>

          {/* Team Details Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8 text-sm">
            <div className="space-y-2.5 bg-slate-50 p-5 border-2 border-black text-right">
              <h4 className="font-black text-black border-b-2 border-black pb-2 flex items-center gap-2">
                <Users className="w-4 h-4 text-[#2E7D5B]" />
                بيانات الفريق والولاية
              </h4>
              <div className="text-xs space-y-2">
                <div><strong className="text-slate-600">اسم الفريق:</strong> <span className="font-bold text-black mr-1">{registeredTeam.name}</span></div>
                <div><strong className="text-slate-600">الولاية:</strong> <span className="font-bold text-black mr-1">{registeredTeam.wilayaName} (الرمز {registeredTeam.wilayaCode})</span></div>
                <div><strong className="text-slate-600">المؤسسة الشبانية:</strong> <span className="font-bold text-black mr-1">{registeredTeam.facilityName}</span></div>
                <div><strong className="text-slate-600">الفئة المشاركة:</strong> <span className="font-bold text-[#2E7D5B] mr-1">{registeredTeam.categoryLabel}</span></div>
              </div>
            </div>

            <div className="space-y-2.5 bg-slate-50 p-5 border-2 border-black text-right">
              <h4 className="font-black text-black border-b-2 border-black pb-2 flex items-center gap-2">
                <Award className="w-4 h-4 text-[#D9383A]" />
                بيانات المشروع والمسار
              </h4>
              <div className="text-xs space-y-2">
                <div><strong className="text-slate-600">عنوان المشروع:</strong> <span className="font-bold text-black mr-1">{registeredTeam.projectTitle}</span></div>
                <div><strong className="text-slate-600">المجال المختار:</strong> <span className="font-bold text-black mr-1">المجال {registeredTeam.trackId}: {getTrackById(registeredTeam.trackId)?.title}</span></div>
                <div><strong className="text-slate-600">الملخص:</strong> <p className="text-slate-800 mt-1 line-clamp-2">{registeredTeam.projectSummary}</p></div>
              </div>
            </div>
          </div>

          {/* Members Table */}
          <div className="mb-8 text-right">
            <h4 className="font-black text-black text-sm mb-3">
              قائمة أعضاء الفريق المعتمدين ({registeredTeam.members.length} أعضاء):
            </h4>
            <div className="overflow-x-auto">
              <table className="w-full text-xs text-right border-collapse border-2 border-black">
                <thead>
                  <tr className="bg-black text-white font-bold">
                    <th className="p-2.5 border border-black text-center">#</th>
                    <th className="p-2.5 border border-black">الاسم واللقب</th>
                    <th className="p-2.5 border border-black">الدور في الفريق</th>
                    <th className="p-2.5 border border-black">رقم الهاتف</th>
                    <th className="p-2.5 border border-black">رقم بطاقة التعريف / الشاب</th>
                  </tr>
                </thead>
                <tbody>
                  {registeredTeam.members.map((member, i) => (
                    <tr key={member.id} className={i % 2 === 0 ? 'bg-white' : 'bg-slate-100'}>
                      <td className="p-2.5 border border-black text-center font-bold">{i + 1}</td>
                      <td className="p-2.5 border border-black font-black text-black">{member.fullName}</td>
                      <td className="p-2.5 border border-black font-bold">{member.role}</td>
                      <td className="p-2.5 border border-black font-mono">{member.phone}</td>
                      <td className="p-2.5 border border-black font-mono">{member.idCardNumber}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Actions */}
          <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t-2 border-black no-print">
            <button
              onClick={() => window.print()}
              className="neo-btn bg-[#2E7D5B] text-white px-6 py-3 font-black text-xs gap-2"
            >
              <Printer className="w-4 h-4" />
              طباعة وصل التسجيل الرسمي
            </button>

            <button
              onClick={() => setShowVoucher(false)}
              className="neo-btn bg-white hover:bg-slate-100 text-black px-6 py-3 font-black text-xs"
            >
              العودة لشاشة التأكيد
            </button>
          </div>

        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      
      {/* Figma Top Logo */}
      <div className="flex justify-center mb-6">
        <FigmaLogo size="md" />
      </div>

      {/* Main Title matching Figma 'استمارة التسجيل' */}
      <div className="text-center max-w-2xl mx-auto mb-8">
        <h1 className="text-3xl sm:text-5xl font-black text-black font-tajawal tracking-tight">
          استمارة التسجيل
        </h1>
        <p className="text-xs sm:text-sm text-slate-700 mt-2 font-bold">
          مفتوح لنوادي التطوع والمواطنة، الجمعيات الشريكة، والشباب المبتكرين (من 3 إلى 5 أعضاء)
        </p>
      </div>

      {/* Step Wizard Buttons Bar */}
      <div className="mb-8 flex items-center justify-center gap-2 sm:gap-4 overflow-x-auto pb-2">
        {[
          { num: 1, label: '1. البيانات الأساسية' },
          { num: 2, label: '2. المشروع والتحدي' },
          { num: 3, label: '3. تشكيلة الفريق' },
          { num: 4, label: '4. المراجعة والتأكيد' },
        ].map((s) => (
          <button
            key={s.num}
            type="button"
            onClick={() => currentStep > s.num && setCurrentStep(s.num)}
            className={`px-3 sm:px-4 py-2 text-xs font-black border-2 border-black transition-all ${
              currentStep === s.num
                ? 'bg-[#2E7D5B] text-white shadow-[3px_3px_0px_#000]'
                : currentStep > s.num
                ? 'bg-emerald-100 text-[#1E4334] shadow-[2px_2px_0px_#000]'
                : 'bg-white text-slate-400 border-slate-300'
            }`}
          >
            {s.label}
          </button>
        ))}
      </div>

      {/* Main Form Container (Figma Boxed Frame) */}
      <form onSubmit={handleSubmit} className="neo-box p-6 sm:p-10 bg-white border-2 border-black shadow-[6px_6px_0px_#000]">
        
        {/* ================= STEP 1: LEAD & TEAM & WILAYA (MATCHING FIGMA FORM 1) ================= */}
        {currentStep === 1 && (
          <div className="space-y-6 animate-in fade-in duration-200">
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              {/* Field 1: الاسم الكامل (Full Name) */}
              <div>
                <label className="block text-sm font-black text-black mb-2 text-right">
                  الاسم الكامل (قائد الفريق) <span className="text-[#D9383A]">*</span>
                </label>
                <input
                  type="text"
                  placeholder="الاسم واللقب الكامل"
                  value={members[0]?.fullName || ''}
                  onChange={(e) => handleMemberChange(0, 'fullName', e.target.value)}
                  className="neo-input w-full px-4 py-3 text-sm text-black placeholder:text-slate-400 font-bold"
                />
                {errors.leaderName && (
                  <p className="text-xs text-[#D9383A] mt-1 font-bold flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" />
                    {errors.leaderName}
                  </p>
                )}
              </div>

              {/* Field 2: اسم الفريق (Team Name) */}
              <div>
                <label className="block text-sm font-black text-black mb-2 text-right">
                  اسم الفريق <span className="text-[#D9383A]">*</span>
                </label>
                <input
                  type="text"
                  placeholder="أدخل اسم الفريق"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="neo-input w-full px-4 py-3 text-sm text-black placeholder:text-slate-400 font-bold"
                />
                {errors.name && (
                  <p className="text-xs text-[#D9383A] mt-1 font-bold flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" />
                    {errors.name}
                  </p>
                )}
              </div>

              {/* Field 3: تاريخ الميلاد (Birth Date) */}
              <div>
                <label className="block text-sm font-black text-black mb-2 text-right">
                  تاريخ الميلاد <span className="text-[#D9383A]">*</span>
                </label>
                <input
                  type="text"
                  placeholder="مثال: 2004/08/21"
                  value={leaderBirthDate}
                  onChange={(e) => setLeaderBirthDate(e.target.value)}
                  className="neo-input w-full px-4 py-3 text-sm text-black placeholder:text-slate-400 font-bold"
                />
              </div>

              {/* Field 4: انتماء الفريق المشارك (Affiliation) */}
              <div>
                <label className="block text-sm font-black text-black mb-2 text-right">
                  انتماء الفريق المشارك <span className="text-[#D9383A]">*</span>
                </label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value as TargetCategory)}
                  className="neo-input w-full px-4 py-3 text-sm text-black font-bold"
                >
                  <option value="clubs">نوادي التطوع والمواطنة بمؤسسات الشباب</option>
                  <option value="associations">الجمعيات الشبابية الشريكة المعتمدة</option>
                  <option value="individuals">الشباب المنخرطون والمبتكرون</option>
                </select>
              </div>

              {/* Field 5: الولاية (Wilaya 01 to 58) */}
              <div>
                <label className="block text-sm font-black text-black mb-2 text-right">
                  الولاية المشاركة (من 01 إلى 58) <span className="text-[#D9383A]">*</span>
                </label>
                <select
                  value={wilayaCode}
                  onChange={(e) => setWilayaCode(Number(e.target.value))}
                  className="neo-input w-full px-4 py-3 text-sm text-black font-bold"
                >
                  {WILAYAS.map((w) => (
                    <option key={w.code} value={w.code}>
                      {w.codeString} — ولاية {w.nameAr} ({w.nameFr})
                    </option>
                  ))}
                </select>
                {errors.wilayaCode && (
                  <p className="text-xs text-[#D9383A] mt-1 font-bold">{errors.wilayaCode}</p>
                )}
              </div>

              {/* Field 6: المؤسسة الشبانية الحاضنة */}
              <div>
                <label className="block text-sm font-black text-black mb-2 text-right">
                  المؤسسة الشبانية الحاضنة <span className="text-[#D9383A]">*</span>
                </label>
                <input
                  type="text"
                  placeholder="مثال: دار الشباب الشهيد العربي بن مهيدي / المركب الجواري"
                  value={facilityName}
                  onChange={(e) => setFacilityName(e.target.value)}
                  className="neo-input w-full px-4 py-3 text-sm text-black placeholder:text-slate-400 font-bold"
                />
                {errors.facilityName && (
                  <p className="text-xs text-[#D9383A] mt-1 font-bold">{errors.facilityName}</p>
                )}
              </div>

            </div>

            {/* Navigation Buttons */}
            <div className="pt-6 border-t-2 border-black flex items-center justify-between">
              <button
                type="button"
                onClick={handleNext}
                className="neo-btn bg-[#2E7D5B] text-white px-8 py-3 font-black text-sm gap-2"
              >
                <span>التالي</span>
                <ArrowLeft className="w-4 h-4" />
              </button>

              <Link
                href="/"
                className="neo-btn bg-white hover:bg-slate-100 text-black px-6 py-3 font-black text-sm gap-2"
              >
                <span>إلغاء والعودة</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

          </div>
        )}

        {/* ================= STEP 2: PROJECT & 5 TRACKS ================= */}
        {currentStep === 2 && (
          <div className="space-y-6 animate-in fade-in duration-200">
            
            <div className="border-b-2 border-black pb-3 text-right">
              <h3 className="text-lg font-black text-black">بيانات المشروع والمجال التنافسي المختار</h3>
            </div>

            {/* Project Title */}
            <div>
              <label className="block text-sm font-black text-black mb-2 text-right">
                عنوان المشروع أو المبادرة التطوعية <span className="text-[#D9383A]">*</span>
              </label>
              <input
                type="text"
                placeholder="مثال: منصة التطوع الأخضر / بنك الساعات التطوعية بدار الشباب"
                value={projectTitle}
                onChange={(e) => setProjectTitle(e.target.value)}
                className="neo-input w-full px-4 py-3 text-sm text-black font-bold"
              />
              {errors.projectTitle && (
                <p className="text-xs text-[#D9383A] mt-1 font-bold">{errors.projectTitle}</p>
              )}
            </div>

            {/* 5 Tracks Radio Cards */}
            <div>
              <label className="block text-sm font-black text-black mb-3 text-right">
                المجال التنافسي (المحاور الخمسة الرسمية) <span className="text-[#D9383A]">*</span>
              </label>
              <div className="space-y-2.5">
                {TRACKS.map((t) => (
                  <label
                    key={t.id}
                    className={`neo-box p-3.5 flex items-center justify-between cursor-pointer transition-all ${
                      trackId === t.id
                        ? 'bg-emerald-50 border-2 border-[#2E7D5B] shadow-[4px_4px_0px_#2E7D5B]'
                        : 'bg-white hover:bg-slate-50 border-2 border-black'
                    }`}
                  >
                    <div className="flex items-center gap-3 text-right">
                      <div className={`w-5 h-5 rounded-full border-2 border-black flex items-center justify-center ${
                        trackId === t.id ? 'bg-[#2E7D5B]' : 'bg-white'
                      }`}>
                        {trackId === t.id && <div className="w-2 h-2 rounded-full bg-white"></div>}
                      </div>
                      <div>
                        <span className="text-xs font-black text-black block">
                          المجال {t.id}: {t.title}
                        </span>
                        <span className="text-[11px] text-slate-600 font-bold">{t.subtitle}</span>
                      </div>
                    </div>
                    <input
                      type="radio"
                      name="trackId"
                      value={t.id}
                      checked={trackId === t.id}
                      onChange={() => setTrackId(t.id)}
                      className="sr-only"
                    />
                  </label>
                ))}
              </div>
            </div>

            {/* Project Summary */}
            <div>
              <label className="block text-sm font-black text-black mb-2 text-right">
                ملخص الفكرة وحل التحدي الميداني <span className="text-[#D9383A]">*</span>
              </label>
              <textarea
                rows={4}
                placeholder="اشرح المشكلة المجتمعية أو الشبانية، وكيف يعالجها مشروعك التطوعي وما هي مخرجاته المتوقعة..."
                value={projectSummary}
                onChange={(e) => setProjectSummary(e.target.value)}
                className="neo-input w-full p-4 text-sm text-black font-bold"
              ></textarea>
              {errors.projectSummary && (
                <p className="text-xs text-[#D9383A] mt-1 font-bold">{errors.projectSummary}</p>
              )}
            </div>

            {/* Buttons */}
            <div className="pt-6 border-t-2 border-black flex items-center justify-between">
              <button
                type="button"
                onClick={handleNext}
                className="neo-btn bg-[#2E7D5B] text-white px-8 py-3 font-black text-sm gap-2"
              >
                <span>التالي (تشكيلة الفريق)</span>
                <ArrowLeft className="w-4 h-4" />
              </button>

              <button
                type="button"
                onClick={handleBack}
                className="neo-btn bg-white hover:bg-slate-100 text-black px-6 py-3 font-black text-sm gap-2"
              >
                <span>السابق</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

          </div>
        )}

        {/* ================= STEP 3: MEMBERS ROSTER (3 TO 5 MEMBERS) ================= */}
        {currentStep === 3 && (
          <div className="space-y-6 animate-in fade-in duration-200">
            
            <div className="border-b-2 border-black pb-3 flex items-center justify-between">
              <div className="text-right">
                <h3 className="text-lg font-black text-black">تشكيلة أعضاء الفريق (3 إلى 5 أعضاء)</h3>
                <p className="text-xs text-slate-600 font-bold">شرط إجباري في اللائحة الوزارية: الفريق يتكون من 3 إلى 5 مشاركين</p>
              </div>

              {members.length < 5 && (
                <button
                  type="button"
                  onClick={handleAddMember}
                  className="neo-btn bg-black text-white hover:bg-slate-800 text-xs font-black px-3.5 py-2 gap-1.5"
                >
                  <Plus className="w-4 h-4" />
                  إضافة عضو ({members.length}/5)
                </button>
              )}
            </div>

            {errors.members && (
              <div className="p-3 bg-red-100 border-2 border-[#D9383A] text-xs text-[#D9383A] font-black">
                {errors.members}
              </div>
            )}

            <div className="space-y-4">
              {members.map((m, idx) => (
                <div key={m.id} className="neo-box p-4 bg-slate-50 border-2 border-black">
                  <div className="flex items-center justify-between mb-3 border-b border-black/20 pb-2">
                    <span className="text-xs font-black text-black">
                      العضو {idx + 1} {idx === 0 && '(قائد الفريق)'}
                    </span>
                    {idx >= 3 && (
                      <button
                        type="button"
                        onClick={() => handleRemoveMember(idx)}
                        className="text-xs text-[#D9383A] font-black flex items-center gap-1 hover:underline"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                        حذف
                      </button>
                    )}
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                    <div>
                      <label className="text-[11px] font-black text-black block mb-1">الاسم واللقب</label>
                      <input
                        type="text"
                        placeholder="الاسم الكامل"
                        value={m.fullName}
                        onChange={(e) => handleMemberChange(idx, 'fullName', e.target.value)}
                        className="neo-input w-full p-2 text-xs font-bold text-black"
                      />
                      {errors[`member_${idx}_fullName`] && (
                        <p className="text-[10px] text-[#D9383A] font-bold mt-0.5">{errors[`member_${idx}_fullName`]}</p>
                      )}
                    </div>

                    <div>
                      <label className="text-[11px] font-black text-black block mb-1">الدور في الفريق</label>
                      <input
                        type="text"
                        placeholder="مثال: مطور، مصمم، منسق"
                        value={m.role}
                        onChange={(e) => handleMemberChange(idx, 'role', e.target.value)}
                        className="neo-input w-full p-2 text-xs font-bold text-black"
                      />
                    </div>

                    <div>
                      <label className="text-[11px] font-black text-black block mb-1">رقم الهاتف (10 أرقام)</label>
                      <input
                        type="tel"
                        placeholder="05 / 06 / 07 ..."
                        value={m.phone}
                        onChange={(e) => handleMemberChange(idx, 'phone', e.target.value)}
                        className="neo-input w-full p-2 text-xs font-mono font-bold text-black text-left"
                      />
                      {errors[`member_${idx}_phone`] && (
                        <p className="text-[10px] text-[#D9383A] font-bold mt-0.5">{errors[`member_${idx}_phone`]}</p>
                      )}
                    </div>

                    <div>
                      <label className="text-[11px] font-black text-black block mb-1">رقم بطاقة التعريف / الشاب</label>
                      <input
                        type="text"
                        placeholder="رقم البطاقة"
                        value={m.idCardNumber}
                        onChange={(e) => handleMemberChange(idx, 'idCardNumber', e.target.value)}
                        className="neo-input w-full p-2 text-xs font-mono font-bold text-black text-left"
                      />
                      {errors[`member_${idx}_idCardNumber`] && (
                        <p className="text-[10px] text-[#D9383A] font-bold mt-0.5">{errors[`member_${idx}_idCardNumber`]}</p>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Buttons */}
            <div className="pt-6 border-t-2 border-black flex items-center justify-between">
              <button
                type="button"
                onClick={handleNext}
                className="neo-btn bg-[#2E7D5B] text-white px-8 py-3 font-black text-sm gap-2"
              >
                <span>التالي (المراجعة والتأكيد)</span>
                <ArrowLeft className="w-4 h-4" />
              </button>

              <button
                type="button"
                onClick={handleBack}
                className="neo-btn bg-white hover:bg-slate-100 text-black px-6 py-3 font-black text-sm gap-2"
              >
                <span>السابق</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

          </div>
        )}

        {/* ================= STEP 4: REVIEW & SUBMIT ================= */}
        {currentStep === 4 && (
          <div className="space-y-6 animate-in fade-in duration-200">
            
            <div className="border-b-2 border-black pb-3 text-right">
              <h3 className="text-lg font-black text-black">المراجعة النهائية وتأكيد التسجيل</h3>
            </div>

            {/* Summary card */}
            <div className="neo-box p-5 bg-slate-50 border-2 border-black space-y-3 text-right text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div><span className="text-slate-500 font-bold">اسم الفريق:</span> <strong className="text-black">{name}</strong></div>
                <div><span className="text-slate-500 font-bold">الولاية:</span> <strong className="text-black">{getWilayaByCode(wilayaCode)?.nameAr} (رمز {wilayaCode})</strong></div>
                <div><span className="text-slate-500 font-bold">المؤسسة الشبانية:</span> <strong className="text-black">{facilityName}</strong></div>
                <div><span className="text-slate-500 font-bold">المجال المختار:</span> <strong className="text-[#2E7D5B]">المجال {trackId}: {getTrackById(trackId)?.title}</strong></div>
              </div>
              <div className="border-t border-black/20 pt-2">
                <span className="text-slate-500 font-bold">عنوان المشروع:</span> <strong className="text-black block mt-0.5">{projectTitle}</strong>
              </div>
              <div>
                <span className="text-slate-500 font-bold">عدد أعضاء الفريق:</span> <strong className="text-black mr-1">{members.length} أعضاء مسجلين ومستوفين للشروط</strong>
              </div>
            </div>

            {/* Pledge checkbox */}
            <label className="neo-box p-4 bg-white border-2 border-black flex items-start gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={agreement}
                onChange={(e) => setAgreement(e.target.checked)}
                className="mt-1 w-4 h-4 accent-[#2E7D5B]"
              />
              <span className="text-xs text-black font-bold leading-relaxed text-right">
                أتعهد بصفتي ممثلاً للفريق بصحة جميع البيانات المدونة أعلاه، وبالالتزام بالحضور والمشاركة الفاعلة طيلة يومي الهاكاثون الوطني (19 و 20 سبتمبر 2026) بمقر المؤسسة الشبانية الحاضنة.
              </span>
            </label>
            {errors.agreement && (
              <p className="text-xs text-[#D9383A] font-black">{errors.agreement}</p>
            )}

            {/* Buttons matching Figma: White 'السابق' on right, Green 'انتهى' on left */}
            <div className="pt-6 border-t-2 border-black flex items-center justify-between">
              <button
                type="submit"
                className="neo-btn bg-[#2E7D5B] text-white hover:bg-[#246448] px-10 py-3.5 font-black text-base gap-2"
              >
                <span>انتهى</span>
                <ArrowLeft className="w-4 h-4" />
              </button>

              <button
                type="button"
                onClick={handleBack}
                className="neo-btn bg-white hover:bg-slate-100 text-black px-8 py-3.5 font-black text-sm gap-2"
              >
                <span>السابق</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

          </div>
        )}

      </form>

      {/* ================= 3. FIGMA REGISTRATION ERROR MODAL ================= */}
      {isErrorModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div className="neo-box p-8 sm:p-12 bg-white border-2 border-black shadow-[8px_8px_0px_#000] max-w-lg w-full text-center space-y-6">
            <h3 className="text-3xl sm:text-4xl font-black text-[#BE3943] font-tajawal">
              فشل التسجيل
            </h3>

            <p className="text-sm sm:text-base text-black font-bold leading-relaxed">
              حدث خطأ غير متوقع أثناء معالجة طلب التسجيل الخاص بك. يرجى المحاولة مرة أخرى!
            </p>

            {Object.keys(errors).length > 0 && (
              <div className="p-3 bg-red-50 border-2 border-[#BE3943] text-right text-xs text-[#BE3943] font-bold space-y-1 max-h-32 overflow-y-auto">
                {Object.values(errors).slice(0, 4).map((err, i) => (
                  <div key={i}>• {err}</div>
                ))}
              </div>
            )}

            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
              <button
                type="button"
                onClick={() => setIsErrorModalOpen(false)}
                className="neo-btn bg-[#2E7D52] hover:bg-[#236341] text-white px-6 py-3 font-black text-xs w-full sm:w-auto"
              >
                الإبلاغ عن مشكلة
              </button>

              <Link
                href="/"
                className="neo-btn bg-white hover:bg-slate-100 text-black px-6 py-3 font-black text-xs w-full sm:w-auto border-2 border-black shadow-[3px_3px_0px_#000]"
              >
                العودة إلى الصفحة الرئيسية
              </Link>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}

export default function RegisterPage() {
  return (
    <Suspense fallback={<div className="p-12 text-center text-black font-bold">جاري تحميل استمارة التسجيل...</div>}>
      <RegisterFormContent />
    </Suspense>
  );
}
