'use client';

import React, { useState, useEffect, useMemo, Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import confetti from 'canvas-confetti';
import { ArrowLeft, ArrowRight, Loader2 } from 'lucide-react';
import FigmaLogo from '@/components/ui/FigmaLogo';
import { TextInput, SelectInput, DateInput, StepProgressBar } from '@/components/ui/FormFields';
import { TRACKS } from '@/data/tracks';
import { saveTeam } from '@/lib/storage';
import type { Team } from '@/types/hackathon';

/* ============================================================
   TYPES
   ============================================================ */
type Member = { fullName: string; affiliation: string; birthday: string };

type FormState = {
  teamName: string;
  leaderName: string;
  email: string;
  birthday: string;
  affiliationBody: string;
  affiliationType: string;
  projectTitle: string;
  participantTeamName: string;
  teamSize: string;
  projectField: string;
  members: Member[];
};

const emptyMember = (): Member => ({ fullName: '', affiliation: '', birthday: '' });

const initialState: FormState = {
  teamName: '',
  leaderName: '',
  email: '',
  birthday: '',
  affiliationBody: '',
  affiliationType: '',
  projectTitle: '',
  participantTeamName: '',
  teamSize: '',
  projectField: '',
  members: [emptyMember(), emptyMember(), emptyMember()],
};

const AFFILIATION_OPTIONS = [
  'نوادي التطوع والمواطنة',
  'دار الشباب',
  'المركب الرياضي الجواري',
  'جمعية محلية',
  'أخرى',
];

const FIELD_OPTIONS = TRACKS.map((t) => t.title);

const TEAM_SIZE_OPTIONS = ['3', '4', '5'];

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const today = () => new Date().toISOString().slice(0, 10);

type Errors = Record<string, string>;
type Status = 'form' | 'submitting' | 'success' | 'failure';

const SESSION_KEY = 'hackathon_registration_form';

/* ============================================================
   BACKGROUND BLOBS
   ============================================================ */
function BackgroundBlobs() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
      <div className="absolute -left-[240px] -top-[120px] size-[620px] rounded-full bg-[#5fae84] opacity-[0.08] blur-[175px] animate-blob-float" />
      <div className="absolute -right-[240px] top-1/2 size-[620px] rounded-full bg-[#5fae84] opacity-[0.08] blur-[175px] animate-blob-float" style={{ animationDelay: '3s' }} />
    </div>
  );
}

/* ============================================================
   SUCCESS SCREEN
   ============================================================ */
function SuccessScreen({ onHome }: { onHome: () => void }) {
  return (
    <div className="flex flex-col items-center gap-12 text-center sm:gap-16 animate-fade-in-up">
      <div className="flex flex-col items-center gap-6">
        {/* Success checkmark */}
        <div className="w-20 h-20 rounded-full bg-[#5FAE84]/10 flex items-center justify-center mb-2 animate-counter">
          <svg width="40" height="40" viewBox="0 0 24 24" fill="none">
            <path d="M5 13l4 4L19 7" stroke="#5FAE84" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
        <h2
          className="font-black leading-[1.2] text-[#478363] text-[36px] sm:text-[48px] lg:text-[56px]"
          style={{ fontFamily: "'Tajawal:ExtraBold', var(--font-tajawal), sans-serif" }}
          dir="auto"
        >
          تم التســــجيـــل بنجـــــاح
        </h2>
        <p
          className="font-medium leading-[1.6] text-black text-[16px] sm:text-[20px] max-w-lg"
          style={{ fontFamily: "'Tajawal:Medium', var(--font-tajawal), sans-serif" }}
          dir="auto"
        >
          سنرسل لك بريداً إلكترونياً بردنا قريباً، ترقبوا ذلك!
        </p>
      </div>
      <button
        type="button"
        onClick={onHome}
        className="neo-btn bg-[#5FAE84] text-white border-[1.5px] border-[#1F1A26] shadow-[-4px_4px_0px_#000000] px-8 py-4 sm:px-10 sm:py-5 font-bold text-[16px] sm:text-[20px] gap-3"
        style={{ fontFamily: "'Tajawal:Medium', var(--font-tajawal), sans-serif" }}
      >
        <ArrowLeft className="w-5 h-5" />
        <span>العودة إلى الصفحة الرئيسية</span>
      </button>
    </div>
  );
}

/* ============================================================
   FAILURE SCREEN
   ============================================================ */
function FailureScreen({ onHome, onRetry }: { onHome: () => void; onRetry: () => void }) {
  return (
    <div className="flex flex-col items-center gap-12 text-center sm:gap-16 animate-fade-in-up">
      <div className="flex flex-col items-center gap-6">
        <div className="w-20 h-20 rounded-full bg-[#CC3E4E]/10 flex items-center justify-center mb-2 animate-shake">
          <svg width="40" height="40" viewBox="0 0 24 24" fill="none">
            <path d="M18 6L6 18M6 6l12 12" stroke="#CC3E4E" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
        <h2
          className="font-black leading-[1.2] text-[#bf3a4a] text-[36px] sm:text-[48px] lg:text-[56px]"
          style={{ fontFamily: "'Tajawal:ExtraBold', var(--font-tajawal), sans-serif" }}
          dir="auto"
        >
          فشــــل التسجيـــل
        </h2>
        <p
          className="max-w-[800px] font-medium leading-[1.6] text-black text-[16px] sm:text-[20px]"
          style={{ fontFamily: "'Tajawal:Medium', var(--font-tajawal), sans-serif" }}
          dir="auto"
        >
          حدث خطأ غير متوقع أثناء معالجة طلب التسجيل الخاص بك. يرجى المحاولة مرة أخرى!
        </p>
      </div>
      <div className="flex flex-col items-center gap-4 sm:flex-row-reverse sm:gap-6">
        <button
          type="button"
          onClick={onRetry}
          className="neo-btn bg-[#5FAE84] text-white border-[1.5px] border-[#1F1A26] shadow-[-4px_4px_0px_#000000] px-8 py-4 font-bold text-[16px] sm:text-[20px]"
        >
          إعادة المحاولة
        </button>
        <button
          type="button"
          onClick={onHome}
          className="neo-btn bg-[#FBF9FC] text-[#1F1A26] border-[1.5px] border-[#1F1A26] shadow-[-4px_4px_0px_#000000] px-8 py-4 font-bold text-[16px] sm:text-[20px]"
        >
          العودة إلى الصفحة الرئيسية
        </button>
      </div>
    </div>
  );
}

/* ============================================================
   NAV BUTTONS
   ============================================================ */
function NextButton({ label, onClick, disabled }: { label: string; onClick: () => void; disabled?: boolean }) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className="group relative shrink-0 bg-[#5fae84] border-[1.5px] border-[#1F1A26] shadow-[-4px_4px_0px_0px_black] transition-all enabled:hover:-translate-y-[1px] enabled:hover:shadow-[-5px_5px_0px_0px_black] enabled:active:translate-x-[-2px] enabled:active:translate-y-[2px] enabled:active:shadow-[-2px_2px_0px_0px_black] disabled:cursor-not-allowed disabled:opacity-70 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1f1a26]"
    >
      <span className="flex items-center justify-center gap-2 px-6 py-4 sm:px-8 sm:py-5">
        <span className="rotate-180" aria-hidden>
          <svg width="22" height="22" viewBox="0 0 32 32" fill="none">
            <path d="M5 16h22M22 9l7 7-7 7" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </span>
        <span className="font-bold text-[#fbf9fc] text-[16px] sm:text-[20px]" dir="auto">
          {label}
        </span>
      </span>
    </button>
  );
}

function PrevButton({ label, onClick, disabled }: { label: string; onClick: () => void; disabled?: boolean }) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className="relative shrink-0 bg-[#fbf9fc] border-[1.5px] border-[#1F1A26] transition-all enabled:hover:-translate-y-[1px] enabled:hover:shadow-[-3px_3px_0px_#1F1A26] disabled:cursor-not-allowed disabled:opacity-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1f1a26]"
    >
      <span className="flex items-center justify-center gap-2 px-6 py-4 sm:px-8 sm:py-5">
        <span className="font-bold text-[#1f1a26] text-[14px] sm:text-[16px]" dir="auto">
          {label}
        </span>
        <span className="rotate-180" aria-hidden>
          <svg width="16" height="16" viewBox="0 0 32 32" fill="none">
            <path d="M27 16H5M12 9l-7 7 7 7" stroke="#1F1A26" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </span>
      </span>
    </button>
  );
}

/* ============================================================
   MAIN REGISTRATION FLOW
   ============================================================ */
function RegistrationFlowContent() {
  const searchParams = useSearchParams();
  const initialTrackParam = searchParams?.get('track');

  const [form, setForm] = useState<FormState>(() => {
    // Restore from sessionStorage
    if (typeof window !== 'undefined') {
      try {
        const saved = sessionStorage.getItem(SESSION_KEY);
        if (saved) return JSON.parse(saved);
      } catch { /* ignore */ }
    }
    return initialState;
  });

  const [step, setStep] = useState(0);
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<Status>('form');
  const [slideDirection, setSlideDirection] = useState<'left' | 'right'>('left');

  // Pre-fill track if provided
  useEffect(() => {
    if (initialTrackParam) {
      const track = TRACKS.find((t) => t.id === Number(initialTrackParam));
      if (track) {
        setForm((f) => ({ ...f, projectField: track.title }));
      }
    }
  }, [initialTrackParam]);

  // Persist form state to sessionStorage
  useEffect(() => {
    if (typeof window !== 'undefined') {
      try { sessionStorage.setItem(SESSION_KEY, JSON.stringify(form)); } catch { /* ignore */ }
    }
  }, [form]);

  const teamSizeNum = useMemo(() => {
    const n = parseInt(form.teamSize, 10);
    return Number.isFinite(n) ? n : 3;
  }, [form.teamSize]);

  // Total steps: Step 0 (project/team), Step 1 (leader), Steps 2...(1+teamSize) (members)
  const totalSteps = 2 + teamSizeNum;

  const set = <K extends keyof FormState>(key: K, value: FormState[K]) => {
    setForm((f) => ({ ...f, [key]: value }));
    setErrors((e) => (e[key as string] ? { ...e, [key as string]: '' } : e));
  };

  const setMember = (index: number, key: keyof Member, value: string) => {
    setForm((f) => {
      const members = f.members.map((m, i) => (i === index ? { ...m, [key]: value } : m));
      return { ...f, members };
    });
    setErrors((e) => {
      const k = `member_${index}_${key}`;
      return e[k] ? { ...e, [k]: '' } : e;
    });
  };

  const changeTeamSize = (value: string) => {
    const n = parseInt(value, 10);
    setForm((f) => {
      const members = [...f.members];
      if (n > members.length) {
        while (members.length < n) members.push(emptyMember());
      } else if (n < members.length) {
        members.length = n;
      }
      return { ...f, teamSize: value, members };
    });
    setErrors((e) => (e.teamSize ? { ...e, teamSize: '' } : e));
  };

  const validateStep = (s: number): Errors => {
    const e: Errors = {};
    if (s === 0) {
      if (!form.affiliationBody.trim()) e.affiliationBody = 'هذا الحقل مطلوب';
      if (!form.affiliationType) e.affiliationType = 'يرجى الاختيار';
      if (!form.projectTitle.trim()) e.projectTitle = 'هذا الحقل مطلوب';
      if (!form.participantTeamName.trim()) e.participantTeamName = 'هذا الحقل مطلوب';
      if (!form.teamSize) e.teamSize = 'يرجى الاختيار';
      if (!form.projectField) e.projectField = 'يرجى الاختيار';
    } else if (s === 1) {
      if (!form.teamName.trim()) e.teamName = 'هذا الحقل مطلوب';
      if (!form.leaderName.trim()) e.leaderName = 'هذا الحقل مطلوب';
      if (!form.email.trim()) e.email = 'هذا الحقل مطلوب';
      else if (!EMAIL_RE.test(form.email.trim())) e.email = 'يرجى إدخال بريد إلكتروني صحيح';
      if (!form.birthday) e.birthday = 'هذا الحقل مطلوب';
      else if (form.birthday > today()) e.birthday = 'لا يمكن اختيار تاريخ في المستقبل';
    } else {
      const i = s - 2;
      const m = form.members[i];
      if (!m?.fullName.trim()) e[`member_${i}_fullName`] = 'هذا الحقل مطلوب';
      if (!m?.affiliation) e[`member_${i}_affiliation`] = 'يرجى الاختيار';
      if (!m?.birthday) e[`member_${i}_birthday`] = 'هذا الحقل مطلوب';
      else if (m.birthday > today()) e[`member_${i}_birthday`] = 'لا يمكن اختيار تاريخ في المستقبل';
    }
    return e;
  };

  const isLastStep = step === totalSteps - 1;

  const goNext = () => {
    const e = validateStep(step);
    if (Object.keys(e).length) {
      setErrors(e);
      return;
    }
    if (isLastStep) {
      void submit();
    } else {
      setSlideDirection('left');
      setStep((s) => s + 1);
      setErrors({});
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const goPrev = () => {
    if (step === 0) {
      // Go home
      window.location.href = '/';
      return;
    }
    setSlideDirection('right');
    setStep((s) => s - 1);
    setErrors({});
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const submit = async () => {
    if (status === 'submitting') return;
    setStatus('submitting');

    // Map form field to track ID
    const trackIndex = TRACKS.findIndex((t) => t.title === form.projectField);
    const trackId = trackIndex >= 0 ? TRACKS[trackIndex].id : 1;

    const categoryMap: Record<string, string> = {
      'نوادي التطوع والمواطنة': 'clubs',
      'دار الشباب': 'clubs',
      'المركب الرياضي الجواري': 'clubs',
      'جمعية محلية': 'associations',
      'أخرى': 'individuals',
    };

    const payload = {
      name: form.participantTeamName || form.teamName,
      facilityName: form.affiliationBody,
      category: categoryMap[form.affiliationType] || 'clubs',
      projectTitle: form.projectTitle,
      projectSummary: form.projectTitle,
      trackId,
      wilayaCode: 16,
      leaderBirthDate: form.birthday,
      leaderName: form.leaderName,
      leaderEmail: form.email,
      members: [
        {
          id: 'm-1',
          fullName: form.leaderName,
          phone: '0555000000',
          email: form.email,
          role: 'قائد الفريق',
        },
        ...form.members.slice(0, teamSizeNum).map((m, idx) => ({
          id: `m-${idx + 2}`,
          fullName: m.fullName,
          phone: '0555000000',
          email: `member${idx + 2}@hackathon.dz`,
          role: idx === 0 ? 'مطور / مبرمج' : idx === 1 ? 'مصمم / مسوق' : 'منسق ميداني',
        })),
      ],
      agreement: true,
    };

    try {
      const controller = new AbortController();
      const timeout = setTimeout(() => controller.abort(), 15000);
      const res = await fetch('/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
        signal: controller.signal,
      });
      clearTimeout(timeout);

      const data = await res.json();

      if (res.ok && data.success && data.team) {
        saveTeam(data.team);
        setStatus('success');
        // Clear session storage
        if (typeof window !== 'undefined') {
          try { sessionStorage.removeItem(SESSION_KEY); } catch { /* ignore */ }
        }
        // Confetti!
        confetti({
          particleCount: 150,
          spread: 80,
          origin: { y: 0.6 },
          colors: ['#5FAE84', '#4ADE80', '#BE3943', '#F4B41A', '#FBF9FC'],
        });
      } else {
        setStatus('failure');
      }
    } catch {
      setStatus('failure');
    }
  };

  const resetAndHome = () => {
    setForm(initialState);
    setStep(0);
    setErrors({});
    setStatus('form');
    if (typeof window !== 'undefined') {
      try { sessionStorage.removeItem(SESSION_KEY); } catch { /* ignore */ }
    }
    window.location.href = '/';
  };

  /* ============================================================
     RENDER STEP CONTENT
     ============================================================ */
  const renderStep = () => {
    if (step === 0) {
      return (
        <div className="grid grid-cols-1 gap-x-10 gap-y-6 md:grid-cols-2">
          <SelectInput
            label="انتماء الفريق المشارك"
            required
            value={form.affiliationType}
            onChange={(v) => set('affiliationType', v)}
            options={AFFILIATION_OPTIONS}
            error={errors.affiliationType}
            placeholder="نوادي التطوع والمواطنة"
          />
          <TextInput
            label="هيئة الإنتماء"
            required
            value={form.affiliationBody}
            onChange={(v) => set('affiliationBody', v)}
            error={errors.affiliationBody}
            placeholder="دار الشباب أو المركب الرياضي الجواري"
          />
          <TextInput
            label="اسم الفريق المشارك"
            required
            value={form.participantTeamName}
            onChange={(v) => set('participantTeamName', v)}
            error={errors.participantTeamName}
            placeholder="مثال: رواد الأثر الإيجابي"
          />
          <TextInput
            label="عنوان المبادرة / فكرة المشروع"
            required
            value={form.projectTitle}
            onChange={(v) => set('projectTitle', v)}
            error={errors.projectTitle}
            placeholder="مثال: منصة 'تطوع-تك' لحملات الأحياء"
          />
          <SelectInput
            label="المجال المشروع"
            required
            value={form.projectField}
            onChange={(v) => set('projectField', v)}
            options={FIELD_OPTIONS}
            error={errors.projectField}
            placeholder="اختر مجال المشروع"
          />
          <SelectInput
            label="عدد أعضاء الفريق"
            required
            value={form.teamSize}
            onChange={changeTeamSize}
            options={TEAM_SIZE_OPTIONS}
            error={errors.teamSize}
            placeholder="من 3 الى 5 أعضاء"
          />
        </div>
      );
    }
    if (step === 1) {
      return (
        <div className="grid grid-cols-1 gap-x-10 gap-y-6 md:grid-cols-2">
          <TextInput
            label="الاسم الكامل للقائد"
            required
            value={form.leaderName}
            onChange={(v) => set('leaderName', v)}
            error={errors.leaderName}
            placeholder="الاسم واللقب الكامل"
          />
          <TextInput
            label="اسم الفريق"
            required
            value={form.teamName}
            onChange={(v) => set('teamName', v)}
            error={errors.teamName}
            placeholder="أدخل اسم الفريق"
          />
          <DateInput
            label="تاريخ الميلاد"
            required
            value={form.birthday}
            onChange={(v) => set('birthday', v)}
            error={errors.birthday}
          />
          <TextInput
            label="البريد الالكتروني"
            required
            type="email"
            value={form.email}
            onChange={(v) => set('email', v)}
            error={errors.email}
            placeholder="أدخل بريدك الالكتروني"
          />
        </div>
      );
    }
    // Member steps
    const i = step - 2;
    const m = form.members[i];
    if (!m) return null;
    return (
      <div className="flex flex-col gap-6">
        <p
          className="text-right text-[18px] sm:text-[22px] text-[#478363] font-bold"
          style={{ fontFamily: "'Tajawal:Bold', var(--font-tajawal), sans-serif" }}
          dir="auto"
        >
          {`بيانات العضو ${i + 1}`}
        </p>
        <div className="grid grid-cols-1 gap-x-10 gap-y-6 md:grid-cols-2">
          <TextInput
            label="الاسم الكامل"
            required
            value={m.fullName}
            onChange={(v) => setMember(i, 'fullName', v)}
            error={errors[`member_${i}_fullName`]}
            placeholder="الاسم واللقب الكامل"
          />
          <SelectInput
            label="انتماء العضو"
            required
            value={m.affiliation}
            onChange={(v) => setMember(i, 'affiliation', v)}
            options={AFFILIATION_OPTIONS}
            error={errors[`member_${i}_affiliation`]}
            placeholder="نوادي التطوع والمواطنة"
          />
          <div className="md:col-span-2 md:max-w-[calc(50%-1.25rem)]">
            <DateInput
              label="تاريخ الميلاد"
              required
              value={m.birthday}
              onChange={(v) => setMember(i, 'birthday', v)}
              error={errors[`member_${i}_birthday`]}
            />
          </div>
        </div>
      </div>
    );
  };

  /* ============================================================
     STEP LABELS for progress bar
     ============================================================ */
  const stepLabels = useMemo(() => {
    const labels = ['معلومات المشروع', 'بيانات القائد'];
    for (let i = 0; i < teamSizeNum; i++) {
      labels.push(`العضو ${i + 1}`);
    }
    return labels;
  }, [teamSizeNum]);

  /* ============================================================
     MAIN RENDER
     ============================================================ */
  return (
    <div dir="rtl" className="relative min-h-screen w-full overflow-hidden bg-[#fbf9fc] px-4 py-8 sm:px-6 lg:py-12">
      <BackgroundBlobs />
      <div className="relative mx-auto flex w-full max-w-[1280px] flex-col items-center gap-8 z-10">
        
        {/* Logo */}
        <Link href="/" className="transition-transform hover:scale-105">
          <FigmaLogo size="sm" />
        </Link>

        {status === 'success' || status === 'failure' ? (
          <div className="w-full border-[2px] border-solid border-[#1f1a26] bg-[#fbf9fc] px-6 py-16 shadow-[-8px_8px_4px_0px_#1f1a26] sm:px-12 sm:py-24">
            {status === 'success' ? (
              <SuccessScreen onHome={resetAndHome} />
            ) : (
              <FailureScreen onHome={resetAndHome} onRetry={() => setStatus('form')} />
            )}
          </div>
        ) : (
          <div className="w-full border-[2px] border-solid border-[#1f1a26] bg-[#fbf9fc] px-6 py-10 shadow-[-8px_8px_4px_0px_#1f1a26] sm:px-10 sm:py-12 lg:px-16">
            
            {/* Title */}
            <h1
              className="mb-6 text-center leading-[1.2] text-black text-[28px] sm:text-[36px] lg:text-[44px] font-black"
              style={{ fontFamily: "'Tajawal:ExtraBold', var(--font-tajawal), sans-serif" }}
              dir="auto"
            >
              استمــارة التسجــــيل
            </h1>

            {/* Progress bar */}
            <StepProgressBar currentStep={step} totalSteps={totalSteps} />

            {/* Step content with slide animation */}
            <div
              className={`min-h-[300px] ${
                slideDirection === 'left' ? 'animate-slide-in-left' : 'animate-slide-in-right'
              }`}
              key={step}
            >
              {renderStep()}
            </div>

            {/* Loading overlay */}
            {status === 'submitting' && (
              <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm animate-fade-in">
                <div className="bg-white border-[1.5px] border-[#1F1A26] shadow-[-4px_4px_0px_#1F1A26] px-10 py-8 flex flex-col items-center gap-4">
                  <Loader2 className="w-10 h-10 text-[#5FAE84] animate-spin" />
                  <p className="font-bold text-[#1F1A26] text-lg">جاري التسجيل...</p>
                </div>
              </div>
            )}

            {/* Navigation */}
            <div className="mt-12 flex items-center justify-between gap-4">
              <PrevButton label="الســابق" onClick={goPrev} disabled={status === 'submitting'} />
              <div className="flex items-center gap-4">
                <span
                  className="text-[#1f1a26] text-[18px] sm:text-[28px] font-bold tabular-nums"
                  dir="ltr"
                  style={{ fontFamily: "'Inter:Regular', sans-serif" }}
                >
                  {step + 1}/{totalSteps}
                </span>
                <NextButton
                  label={status === 'submitting' ? 'جاري الإرسال...' : isLastStep ? 'انتهــى' : 'القادم'}
                  onClick={goNext}
                  disabled={status === 'submitting'}
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

/* ============================================================
   PAGE EXPORT WITH SUSPENSE
   ============================================================ */
export default function RegisterPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-[#FBF9FC] flex items-center justify-center">
          <Loader2 className="w-8 h-8 text-[#5FAE84] animate-spin" />
        </div>
      }
    >
      <RegistrationFlowContent />
    </Suspense>
  );
}
