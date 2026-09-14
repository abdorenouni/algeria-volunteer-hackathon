'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { 
  Calendar, 
  Menu, 
  X, 
  UserPlus, 
  Award, 
  FileSpreadsheet, 
  Home, 
  Sparkles,
  ShieldCheck,
  Building2
} from 'lucide-react';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const navLinks = [
    { href: '/', label: 'الرئيسية والمحاور', icon: Home },
    { href: '/register', label: 'تسجيل فريق', icon: UserPlus },
    { href: '/jury', label: 'شبكة التقييم (100 ن)', icon: Award },
    { href: '/admin/wilaya', label: 'الإدارة والتقرير الوزاري', icon: FileSpreadsheet },
  ];

  const isActive = (path: string) => {
    if (path === '/' && pathname === '/') return true;
    if (path !== '/' && pathname?.startsWith(path)) return true;
    return false;
  };

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-xs transition-all">
      
      {/* Top Administrative Bar (Stitch Neo-Institutional Style) */}
      <div className="bg-[#006233] text-white text-[11px] py-1.5 px-4">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          
          <div className="flex items-center gap-2 font-bold">
            <span className="w-2 h-2 rounded-full bg-[#D21034] animate-pulse"></span>
            <span>الجمهورية الجزائرية الديمقراطية الشعبية — وزارة الشباب والرياضة</span>
          </div>

          <div className="flex items-center gap-4 text-emerald-100 font-medium">
            <span className="hidden sm:inline-flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-amber-300" />
              مؤسسات الشباب... فضاءات للابتكار والتطوع
            </span>
            <span className="hidden md:inline text-emerald-400">|</span>
            <span className="bg-white/15 px-2.5 py-0.5 rounded text-[10px] font-bold text-white tracking-wide">
              برنامج عمل وزارة الشباب - سنة 2026
            </span>
          </div>

        </div>
      </div>

      {/* Main Navigation Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo & Ministerial Branding */}
          <Link href="/" className="flex items-center gap-3.5 group">
            
            {/* National Coat of Arms / Emblem Box */}
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#006233] to-[#004d28] p-1 flex items-center justify-center shadow-md shadow-emerald-900/15 group-hover:scale-105 transition-transform flex-shrink-0">
              <div className="w-full h-full rounded-lg bg-white flex flex-col items-center justify-center p-1 relative overflow-hidden">
                <div className="flex items-center justify-center gap-0.5">
                  <span className="text-[#006233] font-black text-xs">DZ</span>
                  <span className="text-[#D21034] font-bold text-xs">★</span>
                </div>
                <div className="w-full h-0.5 bg-[#006233] mt-1 rounded-full"></div>
              </div>
            </div>

            <div>
              <div className="flex items-center gap-2">
                <span className="text-base sm:text-lg font-black text-slate-900 tracking-tight font-tajawal">
                  الهاكاثون الوطني للابتكار
                </span>
                <span className="bg-emerald-50 text-[#006233] border border-emerald-200 text-[10px] font-bold px-2 py-0.5 rounded-md hidden sm:inline-block">
                  في العمل التطوعي
                </span>
              </div>
              <div className="flex items-center gap-2 text-[11px] text-slate-500 font-medium">
                <span className="inline-flex items-center gap-1 text-[#006233] font-bold">
                  <Calendar className="w-3.5 h-3.5" />
                  19 و 20 سبتمبر 2026
                </span>
                <span>•</span>
                <span className="text-slate-600">58 ولاية</span>
              </div>
            </div>

          </Link>

          {/* Desktop Nav Links */}
          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => {
              const Icon = link.icon;
              const active = isActive(link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`flex items-center gap-2 px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all ${
                    active
                      ? 'bg-[#006233] text-white shadow-sm shadow-emerald-900/20'
                      : 'text-slate-700 hover:text-[#006233] hover:bg-emerald-50/70'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${active ? 'text-white' : 'text-slate-500'}`} />
                  {link.label}
                </Link>
              );
            })}
          </nav>

          {/* Action CTAs */}
          <div className="hidden sm:flex items-center gap-2.5">
            <Link
              href="/jury"
              className="inline-flex items-center gap-1.5 h-10 px-3.5 rounded-xl bg-slate-900 hover:bg-black text-white text-xs font-bold transition-all border border-slate-800 shadow-xs"
            >
              <Award className="w-3.5 h-3.5 text-emerald-400" />
              <span>دخول اللجان</span>
            </Link>

            <Link
              href="/register"
              className="inline-flex items-center gap-1.5 h-10 px-4 rounded-xl bg-[#006233] hover:bg-[#004d28] text-white text-xs font-bold transition-all shadow-md shadow-emerald-900/20 hover:scale-105 active:scale-95"
            >
              <UserPlus className="w-3.5 h-3.5 text-emerald-300" />
              <span>تسجيل فريق</span>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex lg:hidden items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-xl text-slate-700 hover:bg-slate-100 focus:outline-none"
              aria-label="القائمة"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer */}
      {isOpen && (
        <div className="lg:hidden border-t border-slate-200 bg-white px-4 pt-3 pb-6 space-y-2 animate-in slide-in-from-top duration-200">
          <div className="py-2 px-3 bg-emerald-50 rounded-xl text-xs text-[#006233] font-bold flex items-center justify-between mb-3">
            <span>برنامج عمل وزارة الشباب 2026</span>
            <span className="font-mono">19-20 سبتمبر 2026</span>
          </div>

          {navLinks.map((link) => {
            const Icon = link.icon;
            const active = isActive(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-bold ${
                  active
                    ? 'bg-[#006233] text-white'
                    : 'text-slate-700 hover:bg-slate-100'
                }`}
              >
                <Icon className="w-4 h-4" />
                {link.label}
              </Link>
            );
          })}

          <div className="pt-3 grid grid-cols-2 gap-2">
            <Link
              href="/jury"
              onClick={() => setIsOpen(false)}
              className="flex items-center justify-center gap-1.5 py-3 rounded-xl bg-slate-900 text-white text-xs font-bold"
            >
              <Award className="w-3.5 h-3.5 text-emerald-400" />
              دخول اللجان
            </Link>

            <Link
              href="/register"
              onClick={() => setIsOpen(false)}
              className="flex items-center justify-center gap-1.5 py-3 rounded-xl bg-[#006233] text-white text-xs font-bold"
            >
              <UserPlus className="w-3.5 h-3.5 text-emerald-300" />
              تسجيل فريق
            </Link>
          </div>
        </div>
      )}

    </header>
  );
}
