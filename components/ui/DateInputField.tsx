'use client';

import React, { useRef } from 'react';
import { Calendar } from 'lucide-react';

interface DateInputFieldProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  id?: string;
  name?: string;
  required?: boolean;
}

/**
 * Smart Date Input Field for Hackathon Registration
 * - Allows typing numbers directly with auto-slash insertion (YYYY/MM/DD)
 * - Supports native calendar picker popup via calendar icon
 * - Supports pasting formats like YYYY-MM-DD, DD/MM/YYYY, or raw digits
 * - Handles backspacing smoothly
 */
export const DateInputField: React.FC<DateInputFieldProps> = ({
  value,
  onChange,
  placeholder = 'مثال : 2006/08/21',
  id,
  name,
  required,
}) => {
  const hiddenDateRef = useRef<HTMLInputElement>(null);

  // Auto-format digits as user types
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawVal = e.target.value;

    // Allow user to completely clear the field
    if (!rawVal) {
      onChange('');
      return;
    }

    // Extract only digits and slashes
    const cleaned = rawVal.replace(/[^\d/]/g, '');

    // If user is deleting, just update directly to avoid fighting backspace
    if (rawVal.length < value.length) {
      onChange(cleaned);
      return;
    }

    // Extract pure numbers
    const digitsOnly = cleaned.replace(/\D/g, '').slice(0, 8);

    // Auto-mask digits into YYYY/MM/DD
    let formatted = '';
    if (digitsOnly.length <= 4) {
      formatted = digitsOnly;
    } else if (digitsOnly.length <= 6) {
      formatted = `${digitsOnly.slice(0, 4)}/${digitsOnly.slice(4)}`;
    } else {
      formatted = `${digitsOnly.slice(0, 4)}/${digitsOnly.slice(4, 6)}/${digitsOnly.slice(6, 8)}`;
    }

    onChange(formatted);
  };

  // When a date is selected from the native HTML5 calendar picker (returns YYYY-MM-DD)
  const handleNativeDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const picked = e.target.value; // format: YYYY-MM-DD
    if (picked) {
      const parts = picked.split('-');
      if (parts.length === 3) {
        onChange(`${parts[0]}/${parts[1]}/${parts[2]}`);
      } else {
        onChange(picked);
      }
    }
  };

  const openCalendarPicker = () => {
    if (hiddenDateRef.current) {
      try {
        if ('showPicker' in HTMLInputElement.prototype) {
          hiddenDateRef.current.showPicker();
        } else {
          hiddenDateRef.current.focus();
          hiddenDateRef.current.click();
        }
      } catch {
        hiddenDateRef.current.focus();
        hiddenDateRef.current.click();
      }
    }
  };

  // Convert current value (YYYY/MM/DD) to native date format (YYYY-MM-DD) for hidden input
  const getNativeDateValue = () => {
    if (!value) return '';
    const parts = value.split('/');
    if (parts.length === 3 && parts[0].length === 4 && parts[1].length === 2 && parts[2].length === 2) {
      return `${parts[0]}-${parts[1]}-${parts[2]}`;
    }
    return '';
  };

  return (
    <div className="relative w-full">
      {/* Visual Text Input matching Figma */}
      <div className="relative flex items-center">
        <input
          type="text"
          inputMode="numeric"
          id={id}
          name={name}
          required={required}
          value={value}
          onChange={handleInputChange}
          placeholder={placeholder}
          className="w-full h-[66px] pr-6 pl-14 bg-[#FBF9FC] border-[1.5px] border-[#1F1A26] text-base text-[#213D2E] font-medium placeholder:text-slate-400 focus:outline-none focus:border-[#5FAE84] transition-colors"
          autoComplete="bday"
        />

        {/* Calendar Picker Trigger Button */}
        <button
          type="button"
          onClick={openCalendarPicker}
          title="فتح التقويم لاختيار التاريخ"
          className="absolute left-3 w-10 h-10 flex items-center justify-center rounded bg-slate-100 hover:bg-[#5FAE84]/15 text-[#213D2E] hover:text-[#5FAE84] border border-slate-300 transition-all cursor-pointer"
        >
          <Calendar className="w-5 h-5" />
        </button>
      </div>

      {/* Hidden native date input for browser calendar picker popup */}
      <input
        ref={hiddenDateRef}
        type="date"
        value={getNativeDateValue()}
        onChange={handleNativeDateChange}
        min="1990-01-01"
        max="2015-12-31"
        className="sr-only"
        tabIndex={-1}
        aria-hidden="true"
      />

      {/* Subtle Hint */}
      <p className="mt-1 text-xs text-slate-500 text-right">
        يمكنك كتابة الأرقام مباشرة (سنة / شهر / يوم) أو الضغط على أيقونة التقويم 📅
      </p>
    </div>
  );
};
