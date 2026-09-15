'use client';

import React, { useId } from 'react';

/* ============================================================
   Shared label renderer
   ============================================================ */
function FieldLabel({ label, required, htmlFor }: { label: string; required?: boolean; htmlFor?: string }) {
  return (
    <label
      htmlFor={htmlFor}
      className="flex w-full items-start justify-start gap-2 text-right font-medium leading-[1.2] text-[#0f172a] text-[18px] sm:text-[21px]"
      style={{ fontFamily: "'Bricolage Grotesque:Medium', var(--font-tajawal), sans-serif" }}
    >
      {required ? <span className="text-[#ff4d62]">*</span> : null}
      <span dir="auto">{label}</span>
    </label>
  );
}

/* ============================================================
   Error text
   ============================================================ */
function ErrorText({ message }: { message?: string }) {
  if (!message) return null;
  return (
    <p
      className="w-full text-right text-[14px] text-[#cc3e4e] animate-fade-in"
      dir="auto"
      style={{ fontFamily: "'Tajawal:Regular', var(--font-tajawal), sans-serif" }}
    >
      {message}
    </p>
  );
}

/* ============================================================
   BASE PROPS
   ============================================================ */
interface BaseProps {
  label: string;
  value: string;
  onChange: (v: string) => void;
  required?: boolean;
  error?: string;
  placeholder?: string;
}

/* ============================================================
   TEXT INPUT
   ============================================================ */
export function TextInput({
  label,
  value,
  onChange,
  required,
  error,
  placeholder,
  type = 'text',
}: BaseProps & { type?: string }) {
  const id = useId();
  return (
    <div className="flex w-full flex-col items-end gap-2">
      <FieldLabel label={label} required={required} htmlFor={id} />
      <div className={`relative w-full`}>
        <input
          id={id}
          type={type}
          dir="rtl"
          className={`neo-input ${error ? 'neo-input-error' : ''}`}
          value={value}
          placeholder={placeholder}
          aria-invalid={!!error}
          onChange={(e) => onChange(e.target.value)}
        />
      </div>
      <ErrorText message={error} />
    </div>
  );
}

/* ============================================================
   SELECT INPUT
   ============================================================ */
export function SelectInput({
  label,
  value,
  onChange,
  required,
  error,
  placeholder,
  options,
}: BaseProps & { options: string[] }) {
  const id = useId();
  return (
    <div className="flex w-full flex-col items-end gap-2">
      <FieldLabel label={label} required={required} htmlFor={id} />
      <div className={`relative w-full`}>
        <select
          id={id}
          dir="rtl"
          className={`neo-select ${value ? '' : 'neo-select-placeholder'} ${error ? 'neo-input-error' : ''}`}
          value={value}
          aria-invalid={!!error}
          onChange={(e) => onChange(e.target.value)}
        >
          <option value="" disabled>
            {placeholder ?? 'اختر...'}
          </option>
          {options.map((opt) => (
            <option key={opt} value={opt}>
              {opt}
            </option>
          ))}
        </select>
        {/* Custom chevron */}
        <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-[#292d32]" aria-hidden>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
            <path
              d="M6 9l6 6 6-6"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </span>
      </div>
      <ErrorText message={error} />
    </div>
  );
}

/* ============================================================
   DATE INPUT
   ============================================================ */
export function DateInput({ label, value, onChange, required, error }: BaseProps) {
  const id = useId();
  const today = new Date().toISOString().slice(0, 10);
  return (
    <div className="flex w-full flex-col items-end gap-2">
      <FieldLabel label={label} required={required} htmlFor={id} />
      <div className={`relative w-full`}>
        <input
          id={id}
          type="date"
          dir="rtl"
          max={today}
          className={`neo-input cursor-pointer [color-scheme:light] ${value ? '' : 'neo-select-placeholder'} ${error ? 'neo-input-error' : ''}`}
          value={value}
          aria-invalid={!!error}
          onChange={(e) => onChange(e.target.value)}
        />
      </div>
      <ErrorText message={error} />
    </div>
  );
}

/* ============================================================
   STEP PROGRESS BAR
   ============================================================ */
export function StepProgressBar({ currentStep, totalSteps }: { currentStep: number; totalSteps: number }) {
  const progress = ((currentStep + 1) / totalSteps) * 100;
  return (
    <div className="w-full mb-8">
      {/* Step indicators row */}
      <div className="flex items-center justify-between mb-4 px-2">
        {Array.from({ length: totalSteps }, (_, i) => (
          <React.Fragment key={i}>
            <div
              className={`step-indicator ${
                i < currentStep ? 'completed' : i === currentStep ? 'active' : ''
              }`}
            >
              {i < currentStep ? (
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                  <path d="M5 13l4 4L19 7" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              ) : (
                i + 1
              )}
            </div>
            {i < totalSteps - 1 && (
              <div className={`step-connector ${i < currentStep ? 'completed' : ''}`} />
            )}
          </React.Fragment>
        ))}
      </div>
      {/* Progress bar */}
      <div className="progress-bar-container">
        <div className="progress-bar-fill" style={{ width: `${progress}%` }} />
      </div>
    </div>
  );
}
