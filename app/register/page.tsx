'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
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
import { 
  UserPlus, 
  Building2, 
  Users, 
  FileCheck2, 
  Plus, 
  Trash2, 
  ChevronRight, 
  ChevronLeft, 
  CheckCircle, 
  AlertCircle, 
  Printer, 
  Share2, 
  Award, 
  Check, 
  Info,
  Calendar,
  MapPin
} from 'lucide-react';

function RegisterFormContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const initialTrackParam = searchParams.get('track');

  // Multi-step progress (1 to 4)
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
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
      if (!wilayaCode || wilayaCode < 1 || wilayaCode > 58) {
        stepErrors.wilayaCode = 'يرجى اختيار الولاية من القائمة (1 - 58)';
      }
      if (!facilityName.trim() || facilityName.trim().length < 3) {
        stepErrors.facilityName = 'يرجى إدخال اسم مؤسسة أو دار الشباب (3 أحرف على الأقل)';
      }
      if (!category) {
        stepErrors.category = 'يرجى اختيار الفئة المستهدفة';
      }
    }

    if (step === 2) {
      if (!name.trim() || name.trim().length < 3) {
        stepErrors.name = 'اسم الفريق مطلوب (3 أحرف على الأقل)';
      }
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
          stepErrors[`member_${idx}_idCardNumber`] = `رقم بطاقة التعريف أو بطاقة الشاب للعضو ${idx + 1} إجباري`;
        }
      });
    }

    if (step === 4) {
      if (!agreement) {
        stepErrors.agreement = 'يجب الموافقة والتعهد بصحة البيانات المسجلة';
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
    if (!validateStep(4)) return;

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
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const selectedTrack = getTrackById(trackId);
  const selectedWilaya = getWilayaByCode(wilayaCode);

  // Success Screen: Official Registration Voucher (وصل التسجيل الرقمي)
  if (isSuccess && registeredTeam) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-12">
        {/* Printable Card */}
        <div className="bg-white rounded-3xl border-2 border-emerald-600 shadow-2xl p-6 sm:p-10 relative overflow-hidden print-card">
          
          {/* Top National Header */}
          <div className="border-b-2 border-slate-200 pb-6 mb-6 text-center">
            <div className="text-xs font-bold text-slate-500 mb-1">
              الجمهورية الجزائرية الديمقراطية الشعبية — وزارة الشباب والرياضة
            </div>
            <div className="text-sm font-black text-[#006233] mb-2">
              الهاكاثون الوطني للابتكار في العمل التطوعي — دورة سبتمبر 2026
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900">
              وصل التسجيل والمشاركة الرسمي
            </h2>
            <p className="text-xs text-slate-500 mt-1">
              شعار الدورة: &ldquo;مؤسسات الشباب... فضاءات للابتكار والتطوع&rdquo;
            </p>
          </div>

          {/* Registration Code Badge & QR Representation */}
          <div className="bg-emerald-50 rounded-2xl p-6 border border-emerald-200 flex flex-col sm:flex-row items-center justify-between gap-6 mb-8">
            <div className="space-y-1 text-center sm:text-right">
              <span className="text-xs text-[#006233] font-bold block">
                الرقم التسلسلي الوطني المعتمد:
              </span>
              <span className="text-2xl sm:text-3xl font-mono font-black text-slate-900 tracking-wider">
                {registeredTeam.registrationNumber}
              </span>
              <p className="text-xs text-slate-600">
                تاريخ التسجيل: {new Date(registeredTeam.createdAt).toLocaleDateString('ar-DZ')}
              </p>
            </div>

            {/* QR Mock badge */}
            <div className="flex items-center gap-3 bg-white p-3 rounded-xl border border-emerald-300 shadow-sm">
              <div className="w-16 h-16 bg-slate-900 rounded-lg p-1 flex flex-col items-center justify-center text-white text-[10px] font-mono leading-none">
                <span>[QR-CODE]</span>
                <span className="text-[8px] text-emerald-400 mt-1">VERIFIED</span>
                <span className="text-[7px] text-slate-400">MJS-2026</span>
              </div>
              <div className="text-xs space-y-0.5">
                <div className="font-bold text-emerald-800 flex items-center gap-1">
                  <CheckCircle className="w-3.5 h-3.5 text-emerald-600" />
                  <span>تسجيل معتمد</span>
                </div>
                <div className="text-slate-500 text-[11px]">مؤسسة الشاب المضيفة</div>
                <div className="text-slate-800 font-semibold">{registeredTeam.facilityName}</div>
              </div>
            </div>
          </div>

          {/* Team Details Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8 text-sm">
            <div className="space-y-3 bg-slate-50 p-5 rounded-xl border border-slate-200">
              <h4 className="font-bold text-slate-900 border-b border-slate-200 pb-2 flex items-center gap-2">
                <Users className="w-4 h-4 text-[#006233]" />
                بيانات الفريق والولاية
              </h4>
              <div className="text-xs space-y-2">
                <div><strong className="text-slate-500">اسم الفريق:</strong> <span className="font-bold text-slate-900 mr-1">{registeredTeam.name}</span></div>
                <div><strong className="text-slate-500">الولاية:</strong> <span className="font-bold text-slate-900 mr-1">{registeredTeam.wilayaName} (الرمز {registeredTeam.wilayaCode})</span></div>
                <div><strong className="text-slate-500">المؤسسة الشبانية:</strong> <span className="font-bold text-slate-900 mr-1">{registeredTeam.facilityName}</span></div>
                <div><strong className="text-slate-500">الفئة:</strong> <span className="font-bold text-[#006233] mr-1">{registeredTeam.categoryLabel}</span></div>
              </div>
            </div>

            <div className="space-y-3 bg-slate-50 p-5 rounded-xl border border-slate-200">
              <h4 className="font-bold text-slate-900 border-b border-slate-200 pb-2 flex items-center gap-2">
                <Award className="w-4 h-4 text-[#D21034]" />
                بيانات المشروع والمسار
              </h4>
              <div className="text-xs space-y-2">
                <div><strong className="text-slate-500">عنوان المشروع:</strong> <span className="font-bold text-slate-900 mr-1">{registeredTeam.projectTitle}</span></div>
                <div><strong className="text-slate-500">المجال المختار:</strong> <span className="font-bold text-slate-900 mr-1">المجال {registeredTeam.trackId}: {getTrackById(registeredTeam.trackId)?.shortTitle}</span></div>
                <div><strong className="text-slate-500">الملخص:</strong> <p className="text-slate-700 mt-1 line-clamp-2">{registeredTeam.projectSummary}</p></div>
              </div>
            </div>
          </div>

          {/* Members Table */}
          <div className="mb-8">
            <h4 className="font-bold text-slate-900 text-sm mb-3 flex items-center justify-between">
              <span>قائمة أعضاء الفريق المعتمدين ({registeredTeam.members.length} أعضاء):</span>
              <span className="text-xs text-slate-500 font-normal">مطابق لشرط 3 إلى 5 أعضاء</span>
            </h4>
            <div className="overflow-x-auto">
              <table className="w-full text-xs text-right border-collapse border border-slate-200 rounded-lg overflow-hidden">
                <thead>
                  <tr className="bg-slate-100 text-slate-800 font-bold">
                    <th className="p-2.5 border border-slate-200 w-10 text-center">#</th>
                    <th className="p-2.5 border border-slate-200">الاسم واللقب</th>
                    <th className="p-2.5 border border-slate-200">الدور في الفريق</th>
                    <th className="p-2.5 border border-slate-200">رقم الهاتف</th>
                    <th className="p-2.5 border border-slate-200">رقم بطاقة التعريف / الشاب</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200">
                  {registeredTeam.members.map((member, i) => (
                    <tr key={member.id} className={i % 2 === 0 ? 'bg-white' : 'bg-slate-50/50'}>
                      <td className="p-2.5 border border-slate-200 text-center font-bold">{i + 1}</td>
                      <td className="p-2.5 border border-slate-200 font-bold text-slate-900">{member.fullName}</td>
                      <td className="p-2.5 border border-slate-200">
                        <span className={`px-2 py-0.5 rounded text-[11px] font-semibold ${
                          member.role === 'قائد الفريق' ? 'bg-emerald-100 text-[#006233]' : 'bg-slate-100 text-slate-700'
                        }`}>
                          {member.role}
                        </span>
                      </td>
                      <td className="p-2.5 border border-slate-200 font-mono">{member.phone}</td>
                      <td className="p-2.5 border border-slate-200 font-mono text-slate-700">{member.idCardNumber}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Guidelines for Execution Days */}
          <div className="p-4 rounded-xl bg-amber-50 border border-amber-200 text-xs text-amber-900 space-y-1 mb-8">
            <div className="font-bold flex items-center gap-1.5 text-amber-950">
              <Info className="w-4 h-4 text-amber-700" />
              تعليمات الحضور في اليومين التنفيذيين (19 و 20 سبتمبر 2026):
            </div>
            <p>
              • يجب على جميع أعضاء الفريق الحضور في تمام الساعة 08:30 صباحاً بمقر المؤسسة الشبانية: <strong>{registeredTeam.facilityName}</strong>.
            </p>
            <p>
              • يرجى الاستظهار بهذا الوصل (رقمياً أو ورقياً) وبطاقات التعريف الوطنية عند مكتب الاستقبال.
            </p>
          </div>

          {/* Actions */}
          <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-slate-200 no-print">
            <button
              onClick={() => window.print()}
              className="px-6 py-3 rounded-xl bg-[#006233] hover:bg-[#004d28] text-white font-bold text-xs flex items-center gap-2 shadow-md transition-all"
            >
              <Printer className="w-4 h-4" />
              طباعة وصل التسجيل الرسمي
            </button>

            <div className="flex items-center gap-2">
              <button
                onClick={() => {
                  setIsSuccess(false);
                  setRegisteredTeam(null);
                  setCurrentStep(1);
                }}
                className="px-4 py-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs transition-colors"
              >
                تسجيل فريق آخر
              </button>
              <button
                onClick={() => router.push('/jury')}
                className="px-5 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs flex items-center gap-1.5 transition-colors"
              >
                <span>الانتقال للوحة التحكيم</span>
                <ChevronLeft className="w-4 h-4" />
              </button>
            </div>
          </div>

        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto mb-10">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 text-[#006233] text-xs font-bold mb-3">
          <UserPlus className="w-3.5 h-3.5" />
          <span>استمارة المشاركة الرسمية</span>
        </div>
        <h1 className="text-3xl font-black text-slate-900">
          تسجيل فريق في الهاكاثون الوطني
        </h1>
        <p className="text-xs sm:text-sm text-slate-600 mt-2">
          مفتوح لنوادي التطوع والمواطنة بمؤسسات الشباب، الجمعيات الشبابية، والشباب المنخرطين (من 3 إلى 5 أعضاء).
        </p>
      </div>

      {/* Stepper Wizard Indicator */}
      <div className="mb-10">
        <div className="flex items-center justify-between max-w-2xl mx-auto relative">
          <div className="absolute top-1/2 left-4 right-4 h-1 bg-slate-200 -translate-y-1/2 -z-10"></div>
          <div 
            className="absolute top-1/2 right-4 h-1 bg-[#006233] -translate-y-1/2 -z-10 transition-all duration-300"
            style={{ width: `${((currentStep - 1) / 3) * 100}%` }}
          ></div>

          {[
            { num: 1, label: 'المؤسسة والولاية' },
            { num: 2, label: 'المشروع والمسار' },
            { num: 3, label: 'تشكيلة الفريق' },
            { num: 4, label: 'المراجعة والإرسال' },
          ].map((s) => {
            const isDone = currentStep > s.num;
            const isCurrent = currentStep === s.num;
            return (
              <div key={s.num} className="flex flex-col items-center">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center font-black text-xs transition-all ${
                    isDone
                      ? 'bg-[#006233] text-white shadow-md'
                      : isCurrent
                      ? 'bg-[#006233] text-white ring-4 ring-emerald-100 scale-110'
                      : 'bg-white border-2 border-slate-300 text-slate-400'
                  }`}
                >
                  {isDone ? <Check className="w-4 h-4" /> : s.num}
                </div>
                <span className={`text-[11px] font-bold mt-2 hidden sm:block ${
                  isCurrent ? 'text-[#006233]' : 'text-slate-500'
                }`}>
                  {s.label}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Main Form Container */}
      <form onSubmit={handleSubmit} className="bg-white rounded-3xl border border-slate-200/90 shadow-xl p-6 sm:p-10">
        
        {/* ================= STEP 1: WILAYA & FACILITY & CATEGORY ================= */}
        {currentStep === 1 && (
          <div className="space-y-6 animate-in fade-in duration-200">
            <div className="border-b border-slate-100 pb-4">
              <h3 className="text-lg font-black text-slate-900 flex items-center gap-2">
                <MapPin className="w-5 h-5 text-[#006233]" />
                الخطوة 1: تحديد الولاية والمؤسسة الشبانية الحاضنة
              </h3>
              <p className="text-xs text-slate-500 mt-1">
                حدد الولاية ومقر دار الشباب أو المؤسسة التي ستشارك تحت لوائها
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              {/* Wilaya Selector (1 to 58) */}
              <div>
                <label htmlFor="wilaya" className="block text-xs font-bold text-slate-800 mb-2">
                  الولاية المشاركة (من 01 إلى 58) <span className="text-[#D21034]">*</span>
                </label>
                <select
                  id="wilaya"
                  value={wilayaCode}
                  onChange={(e) => setWilayaCode(Number(e.target.value))}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-3 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#006233] focus:bg-white"
                >
                  {WILAYAS.map((w) => (
                    <option key={w.code} value={w.code}>
                      {w.codeString} — ولاية {w.nameAr} ({w.nameFr})
                    </option>
                  ))}
                </select>
                {errors.wilayaCode && (
                  <p className="text-xs text-[#D21034] mt-1 flex items-center gap-1">
                    <AlertCircle className="w-3.5 h-3.5" />
                    {errors.wilayaCode}
                  </p>
                )}
              </div>

              {/* Facility Name */}
              <div>
                <label htmlFor="facilityName" className="block text-xs font-bold text-slate-800 mb-2">
                  اسم المؤسسة الشبانية الحاضنة <span className="text-[#D21034]">*</span>
                </label>
                <input
                  type="text"
                  id="facilityName"
                  placeholder="مثال: دار الشباب الشهيد العربي بن مهيدي / المركب الرياضي الجواري"
                  value={facilityName}
                  onChange={(e) => setFacilityName(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#006233] focus:bg-white"
                />
                {errors.facilityName && (
                  <p className="text-xs text-[#D21034] mt-1 flex items-center gap-1">
                    <AlertCircle className="w-3.5 h-3.5" />
                    {errors.facilityName}
                  </p>
                )}
              </div>

            </div>

            {/* Target Category Selection */}
            <div>
              <label className="block text-xs font-bold text-slate-800 mb-3">
                الفئة المستهدفة المشاركة <span className="text-[#D21034]">*</span>
              </label>
              
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {[
                  {
                    id: 'clubs' as const,
                    title: 'نوادي التطوع والمواطنة',
                    desc: 'بمؤسسات ودور الشباب',
                    color: 'peer-checked:border-[#006233] peer-checked:bg-emerald-50/60',
                  },
                  {
                    id: 'associations' as const,
                    title: 'الجمعيات الشبابية الشريكة',
                    desc: 'المحلية والولائية المعتمدة',
                    color: 'peer-checked:border-[#D21034] peer-checked:bg-rose-50/60',
                  },
                  {
                    id: 'individuals' as const,
                    title: 'الشباب المنخرطون والمبتكرون',
                    desc: 'طلبة، متطوعون، ومبدعون',
                    color: 'peer-checked:border-amber-600 peer-checked:bg-amber-50/60',
                  },
                ].map((item) => (
                  <label
                    key={item.id}
                    className="relative flex flex-col p-4 rounded-xl border-2 border-slate-200 cursor-pointer hover:border-slate-300 transition-all text-right"
                  >
                    <input
                      type="radio"
                      name="targetCategory"
                      value={item.id}
                      checked={category === item.id}
                      onChange={() => setCategory(item.id)}
                      className="sr-only"
                    />
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs font-bold text-slate-900">{item.title}</span>
                      <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                        category === item.id ? 'border-[#006233] bg-[#006233]' : 'border-slate-300'
                      }`}>
                        {category === item.id && <div className="w-1.5 h-1.5 rounded-full bg-white"></div>}
                      </div>
                    </div>
                    <span className="text-[11px] text-slate-500">{item.desc}</span>
                  </label>
                ))}
              </div>
              {errors.category && (
                <p className="text-xs text-[#D21034] mt-1 flex items-center gap-1">
                  <AlertCircle className="w-3.5 h-3.5" />
                  {errors.category}
                </p>
              )}
            </div>

          </div>
        )}

        {/* ================= STEP 2: PROJECT & TRACK ================= */}
        {currentStep === 2 && (
          <div className="space-y-6 animate-in fade-in duration-200">
            <div className="border-b border-slate-100 pb-4">
              <h3 className="text-lg font-black text-slate-900 flex items-center gap-2">
                <FileCheck2 className="w-5 h-5 text-[#006233]" />
                الخطوة 2: بيانات المشروع والمجال التنافسي
              </h3>
              <p className="text-xs text-slate-500 mt-1">
                اختر مسار التنافس المناسب وقدم عنواناً وملخصاً واضحاً لفكرة مشروعك
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              {/* Team Name */}
              <div>
                <label htmlFor="teamName" className="block text-xs font-bold text-slate-800 mb-2">
                  اسم الفريق <span className="text-[#D21034]">*</span>
                </label>
                <input
                  type="text"
                  id="teamName"
                  placeholder="مثال: رواد الأمل / فرسان التطوع / بصمة خير"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#006233] focus:bg-white"
                />
                {errors.name && (
                  <p className="text-xs text-[#D21034] mt-1 flex items-center gap-1">
                    <AlertCircle className="w-3.5 h-3.5" />
                    {errors.name}
                  </p>
                )}
              </div>

              {/* Project Title */}
              <div>
                <label htmlFor="projectTitle" className="block text-xs font-bold text-slate-800 mb-2">
                  عنوان المشروع أو المبادرة <span className="text-[#D21034]">*</span>
                </label>
                <input
                  type="text"
                  id="projectTitle"
                  placeholder="مثال: منصة التطوع الأخضر / جواز الشاب المتطوع"
                  value={projectTitle}
                  onChange={(e) => setProjectTitle(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#006233] focus:bg-white"
                />
                {errors.projectTitle && (
                  <p className="text-xs text-[#D21034] mt-1 flex items-center gap-1">
                    <AlertCircle className="w-3.5 h-3.5" />
                    {errors.projectTitle}
                  </p>
                )}
              </div>

            </div>

            {/* Track Selector (1 to 5) */}
            <div>
              <label className="block text-xs font-bold text-slate-800 mb-2">
                المجال التنافسي المختار (1 من 5) <span className="text-[#D21034]">*</span>
              </label>
              <div className="space-y-2">
                {TRACKS.map((t) => (
                  <label
                    key={t.id}
                    className={`flex items-center justify-between p-3.5 rounded-xl border-2 cursor-pointer transition-all ${
                      trackId === t.id
                        ? 'border-[#006233] bg-emerald-50/50 shadow-sm'
                        : 'border-slate-200 hover:border-slate-300 bg-white'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                        trackId === t.id ? 'border-[#006233] bg-[#006233]' : 'border-slate-300'
                      }`}>
                        {trackId === t.id && <div className="w-2 h-2 rounded-full bg-white"></div>}
                      </div>
                      <div>
                        <span className="text-xs font-bold text-slate-900 block">
                          المجال {t.id}: {t.title}
                        </span>
                        <span className="text-[11px] text-slate-500">{t.subtitle}</span>
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
              {errors.trackId && (
                <p className="text-xs text-[#D21034] mt-1 flex items-center gap-1">
                  <AlertCircle className="w-3.5 h-3.5" />
                  {errors.trackId}
                </p>
              )}
            </div>

            {/* Project Summary */}
            <div>
              <label htmlFor="summary" className="block text-xs font-bold text-slate-800 mb-2">
                ملخص الفكرة وحل المشكلة المحلية المطروحة <span className="text-[#D21034]">*</span>
              </label>
              <textarea
                id="summary"
                rows={4}
                placeholder="اشرح المشكلة المجتمعية أو الشبانية وكيف يعالجها مشروعك التطوعي، وما هي الأدوات أو النماذج المستخدمة..."
                value={projectSummary}
                onChange={(e) => setProjectSummary(e.target.value)}
                className="w-full bg-slate-50 border border-slate-300 rounded-xl p-4 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#006233] focus:bg-white leading-relaxed"
              ></textarea>
              <div className="flex justify-between text-[11px] text-slate-400 mt-1">
                <span>يُفضل أن يبرز الأثر على العمل التطوعي وقابلية التطبيق.</span>
                <span>{projectSummary.length} حرفاً</span>
              </div>
              {errors.projectSummary && (
                <p className="text-xs text-[#D21034] mt-1 flex items-center gap-1">
                  <AlertCircle className="w-3.5 h-3.5" />
                  {errors.projectSummary}
                </p>
              )}
            </div>

          </div>
        )}

        {/* ================= STEP 3: TEAM MEMBERS (STRICT 3 TO 5) ================= */}
        {currentStep === 3 && (
          <div className="space-y-6 animate-in fade-in duration-200">
            <div className="border-b border-slate-100 pb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <h3 className="text-lg font-black text-slate-900 flex items-center gap-2">
                  <Users className="w-5 h-5 text-[#006233]" />
                  الخطوة 3: تشكيلة أعضاء الفريق (3 إلى 5 أعضاء)
                </h3>
                <p className="text-xs text-slate-500 mt-1">
                  يشترط القانون الداخلي للهاكاثون ما بين 3 و 5 أعضاء فقط في كل فريق
                </p>
              </div>

              {/* Members Counter Badge */}
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-100 border border-slate-200 text-xs font-bold self-start sm:self-auto">
                <span className="text-slate-600">العدد الحالي:</span>
                <span className={`text-sm font-black ${
                  members.length >= 3 && members.length <= 5 ? 'text-[#006233]' : 'text-[#D21034]'
                }`}>
                  {members.length} من 5
                </span>
              </div>
            </div>

            {errors.members && (
              <div className="p-3 bg-rose-50 border border-rose-200 rounded-xl text-xs text-[#D21034] font-bold flex items-center gap-2">
                <AlertCircle className="w-4 h-4 flex-shrink-0" />
                <span>{errors.members}</span>
              </div>
            )}

            {/* Member Cards */}
            <div className="space-y-4">
              {members.map((member, index) => (
                <div
                  key={member.id || index}
                  className="p-5 rounded-2xl bg-slate-50/80 border border-slate-200 relative transition-all hover:border-slate-300"
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                      <span className="w-7 h-7 rounded-lg bg-[#006233] text-white flex items-center justify-center font-black text-xs">
                        {index + 1}
                      </span>
                      <span className="text-xs font-bold text-slate-900">
                        {index === 0 ? 'قائد الفريق (الممثل الرسمي)' : `عضو الفريق ${index + 1}`}
                      </span>
                    </div>

                    {members.length > 3 && (
                      <button
                        type="button"
                        onClick={() => handleRemoveMember(index)}
                        className="p-1.5 text-slate-400 hover:text-[#D21034] hover:bg-rose-50 rounded-lg transition-colors"
                        title="حذف العضو"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    )}
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    
                    {/* Full Name */}
                    <div>
                      <label className="block text-[11px] font-bold text-slate-700 mb-1">
                        الاسم واللقب <span className="text-[#D21034]">*</span>
                      </label>
                      <input
                        type="text"
                        placeholder="الاسم الكامل"
                        value={member.fullName}
                        onChange={(e) => handleMemberChange(index, 'fullName', e.target.value)}
                        className="w-full bg-white border border-slate-300 rounded-lg px-3 py-2 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#006233]"
                      />
                      {errors[`member_${index}_fullName`] && (
                        <p className="text-[10px] text-[#D21034] mt-1">{errors[`member_${index}_fullName`]}</p>
                      )}
                    </div>

                    {/* Phone */}
                    <div>
                      <label className="block text-[11px] font-bold text-slate-700 mb-1">
                        رقم الهاتف (05/06/07) <span className="text-[#D21034]">*</span>
                      </label>
                      <input
                        type="text"
                        placeholder="05XXXXXXXX"
                        value={member.phone}
                        onChange={(e) => handleMemberChange(index, 'phone', e.target.value)}
                        className="w-full bg-white border border-slate-300 rounded-lg px-3 py-2 text-xs font-mono text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#006233]"
                      />
                      {errors[`member_${index}_phone`] && (
                        <p className="text-[10px] text-[#D21034] mt-1">{errors[`member_${index}_phone`]}</p>
                      )}
                    </div>

                    {/* Email */}
                    <div>
                      <label className="block text-[11px] font-bold text-slate-700 mb-1">
                        البريد الإلكتروني <span className="text-[#D21034]">*</span>
                      </label>
                      <input
                        type="email"
                        placeholder="example@mail.dz"
                        value={member.email}
                        onChange={(e) => handleMemberChange(index, 'email', e.target.value)}
                        className="w-full bg-white border border-slate-300 rounded-lg px-3 py-2 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#006233]"
                      />
                      {errors[`member_${index}_email`] && (
                        <p className="text-[10px] text-[#D21034] mt-1">{errors[`member_${index}_email`]}</p>
                      )}
                    </div>

                    {/* ID Card / Youth Card Number */}
                    <div>
                      <label className="block text-[11px] font-bold text-slate-700 mb-1">
                        رقم بطاقة التعريف / بطاقة الشاب <span className="text-[#D21034]">*</span>
                      </label>
                      <input
                        type="text"
                        placeholder="رقم بطاقة التعريف الوطنية"
                        value={member.idCardNumber}
                        onChange={(e) => handleMemberChange(index, 'idCardNumber', e.target.value)}
                        className="w-full bg-white border border-slate-300 rounded-lg px-3 py-2 text-xs font-mono text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#006233]"
                      />
                      {errors[`member_${index}_idCardNumber`] && (
                        <p className="text-[10px] text-[#D21034] mt-1">{errors[`member_${index}_idCardNumber`]}</p>
                      )}
                    </div>

                    {/* Member Role */}
                    <div className="sm:col-span-2 lg:col-span-2">
                      <label className="block text-[11px] font-bold text-slate-700 mb-1">
                        الدور في الفريق <span className="text-[#D21034]">*</span>
                      </label>
                      <select
                        value={member.role}
                        onChange={(e) => handleMemberChange(index, 'role', e.target.value as any)}
                        className="w-full bg-white border border-slate-300 rounded-lg px-3 py-2 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#006233]"
                      >
                        <option value="قائد الفريق">قائد الفريق (منسق ومتحدث رسمي)</option>
                        <option value="مطور / مبرمج">مطور / مبرمج (تقني وبناء الحل)</option>
                        <option value="مصمم / مسوق">مصمم / مسوق (تصميم الواجهات والهوية)</option>
                        <option value="منسق ميداني">منسق ميداني (علاقات مع المجتمع والتطوع)</option>
                        <option value="عضو باحث">عضو باحث (تحليل التحدي والبيانات)</option>
                      </select>
                    </div>

                  </div>
                </div>
              ))}
            </div>

            {/* Add Member Button (if < 5) */}
            {members.length < 5 && (
              <button
                type="button"
                onClick={handleAddMember}
                className="w-full py-3 border-2 border-dashed border-emerald-300 hover:border-[#006233] bg-emerald-50/50 hover:bg-emerald-50 rounded-2xl text-xs font-bold text-[#006233] flex items-center justify-center gap-2 transition-colors"
              >
                <Plus className="w-4 h-4" />
                <span>إضافة عضو جديد في الفريق (متبقي {5 - members.length} أماكن)</span>
              </button>
            )}

          </div>
        )}

        {/* ================= STEP 4: REVIEW & CONFIRM ================= */}
        {currentStep === 4 && (
          <div className="space-y-6 animate-in fade-in duration-200">
            <div className="border-b border-slate-100 pb-4">
              <h3 className="text-lg font-black text-slate-900 flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-[#006233]" />
                الخطوة 4: مراجعة البيانات وتأكيد التسجيل
              </h3>
              <p className="text-xs text-slate-500 mt-1">
                تأكد من دقة المعلومات المدخلة قبل اعتماد استمارة المشاركة الولائية
              </p>
            </div>

            {/* Summary Cards */}
            <div className="space-y-4">
              
              {/* Location & Facility Card */}
              <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 text-xs space-y-2">
                <div className="font-bold text-slate-900 flex items-center justify-between">
                  <span className="flex items-center gap-1.5 text-[#006233]">
                    <Building2 className="w-4 h-4" />
                    الموقع والمؤسسة الشبانية:
                  </span>
                  <button type="button" onClick={() => setCurrentStep(1)} className="text-emerald-700 underline text-[11px]">تعديل</button>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 pt-1 text-slate-700">
                  <div><strong>الولاية:</strong> {selectedWilaya?.nameAr} ({selectedWilaya?.codeString})</div>
                  <div><strong>دار / مؤسسة الشباب:</strong> {facilityName}</div>
                  <div><strong>الفئة:</strong> {category === 'clubs' ? 'نوادي التطوع والمواطنة' : category === 'associations' ? 'الجمعيات الشريكة' : 'الشباب المنخرطون'}</div>
                </div>
              </div>

              {/* Project & Track Card */}
              <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 text-xs space-y-2">
                <div className="font-bold text-slate-900 flex items-center justify-between">
                  <span className="flex items-center gap-1.5 text-[#006233]">
                    <Award className="w-4 h-4" />
                    المشروع والمسار:
                  </span>
                  <button type="button" onClick={() => setCurrentStep(2)} className="text-emerald-700 underline text-[11px]">تعديل</button>
                </div>
                <div className="space-y-1 pt-1 text-slate-700">
                  <div><strong>اسم الفريق:</strong> {name}</div>
                  <div><strong>عنوان المشروع:</strong> {projectTitle}</div>
                  <div><strong>المسار المعتمد:</strong> المجال {trackId}: {selectedTrack?.title}</div>
                  <div><strong>الملخص:</strong> <span className="text-slate-600 leading-relaxed block mt-1">{projectSummary}</span></div>
                </div>
              </div>

              {/* Members Card */}
              <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 text-xs space-y-2">
                <div className="font-bold text-slate-900 flex items-center justify-between">
                  <span className="flex items-center gap-1.5 text-[#006233]">
                    <Users className="w-4 h-4" />
                    أعضاء الفريق ({members.length} أعضاء):
                  </span>
                  <button type="button" onClick={() => setCurrentStep(3)} className="text-emerald-700 underline text-[11px]">تعديل</button>
                </div>
                <div className="space-y-1.5 pt-1">
                  {members.map((m, i) => (
                    <div key={i} className="flex flex-wrap items-center justify-between bg-white p-2 rounded-lg border border-slate-200 text-[11px]">
                      <span className="font-bold text-slate-900">{i + 1}. {m.fullName} ({m.role})</span>
                      <span className="text-slate-500 font-mono">{m.phone} | {m.idCardNumber}</span>
                    </div>
                  ))}
                </div>
              </div>

            </div>

            {/* Official Agreement Checkbox */}
            <div className="pt-2">
              <label className="flex items-start gap-3 p-4 rounded-xl bg-emerald-50/70 border border-emerald-200 cursor-pointer">
                <input
                  type="checkbox"
                  checked={agreement}
                  onChange={(e) => setAgreement(e.target.checked)}
                  className="mt-0.5 w-4 h-4 rounded text-[#006233] focus:ring-[#006233] border-slate-300"
                />
                <span className="text-xs text-slate-800 leading-relaxed">
                  أتعهد بصفتي ممثلاً للفريق بصحة كافة البيانات والمعلومات الواردة في هذه الاستمارة، وبالالتزام بالقواعد المنظمة للهاكاثون الوطني للابتكار في العمل التطوعي والحضور في المواعيد المحددة يومي 19 و 20 سبتمبر 2026.
                </span>
              </label>
              {errors.agreement && (
                <p className="text-xs text-[#D21034] mt-2 flex items-center gap-1 font-bold">
                  <AlertCircle className="w-3.5 h-3.5" />
                  {errors.agreement}
                </p>
              )}
            </div>

          </div>
        )}

        {/* Navigation Buttons (Back & Next / Submit) */}
        <div className="flex items-center justify-between pt-8 border-t border-slate-100 mt-8">
          {currentStep > 1 ? (
            <button
              type="button"
              onClick={handleBack}
              className="px-5 py-2.5 rounded-xl border border-slate-300 hover:bg-slate-100 text-slate-700 text-xs font-bold flex items-center gap-1.5 transition-colors"
            >
              <ChevronRight className="w-4 h-4" />
              <span>الخطوة السابقة</span>
            </button>
          ) : (
            <div></div>
          )}

          {currentStep < 4 ? (
            <button
              type="button"
              onClick={handleNext}
              className="px-6 py-2.5 rounded-xl bg-[#006233] hover:bg-[#004d28] text-white text-xs font-bold flex items-center gap-1.5 shadow-md hover:shadow-lg transition-all"
            >
              <span>متابعة</span>
              <ChevronLeft className="w-4 h-4" />
            </button>
          ) : (
            <button
              type="submit"
              className="px-8 py-3 rounded-xl bg-[#006233] hover:bg-[#004d28] text-white text-sm font-black flex items-center gap-2 shadow-xl shadow-emerald-950/20 hover:scale-105 active:scale-95 transition-all"
            >
              <CheckCircle className="w-4 h-4 text-emerald-300" />
              <span>تأكيد التسجيل وإصدار وصل المشاركة</span>
            </button>
          )}
        </div>

      </form>

    </div>
  );
}

export default function RegisterPage() {
  return (
    <Suspense fallback={
      <div className="p-12 text-center text-slate-500 text-sm">
        جاري تحميل استمارة التسجيل...
      </div>
    }>
      <RegisterFormContent />
    </Suspense>
  );
}
