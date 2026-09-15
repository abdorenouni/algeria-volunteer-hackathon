'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Menu, X, ArrowLeft } from 'lucide-react';
import FigmaLogo from '@/components/ui/FigmaLogo';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { href: '/', label: 'الرئيسية' },
    { href: '/#about', label: 'من نحن' },
    { href: '/#schedule', label: 'الجدول الزمني' },
    { href: '/#tracks', label: 'المحاور الخمسة' },
    { href: '/#faq', label: 'الأسئلة الشائعة' },
  ];

  return (
    <header className="sticky top-0 z-50 bg-[#FBF9FC]/95 backdrop-blur-md border-b-2 border-black transition-all">
      {/* Main Navigation Header matching Figma web app design artboard */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Right (in RTL): Figma Logo & Brand */}
          <Link href="/" className="flex items-center group">
            <FigmaLogo size="md" />
          </Link>

          {/* Desktop Nav Links (Matching Figma Navbar) */}
          <nav className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm font-bold text-black hover:text-[#2E7D5B] transition-colors py-1 relative group font-tajawal"
              >
                <span>{link.label}</span>
                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#2E7D5B] scale-x-0 group-hover:scale-x-100 transition-transform origin-right"></span>
              </Link>
            ))}
          </nav>

          {/* Left (in RTL): Neo-Brutalist Register Button (Figma Outlined Arrow Button) */}
          <div className="hidden sm:flex items-center gap-3">
            <Link
              href="/register"
              className="neo-btn bg-white hover:bg-black hover:text-white text-black px-6 py-2.5 rounded-[4px] font-black text-sm gap-2.5 group border-2 border-black shadow-[3px_3px_0px_#000000] transition-all"
            >
              <span>سجل الآن</span>
              <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex lg:hidden items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 border-2 border-black bg-white shadow-[2px_2px_0px_#000] text-black focus:outline-none"
              aria-label="القائمة"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {isOpen && (
        <div className="lg:hidden border-t-2 border-black bg-[#FBF9FC] px-4 pt-4 pb-6 space-y-3 animate-in slide-in-from-top duration-200">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setIsOpen(false)}
              className="block px-4 py-2.5 border-2 border-black bg-white shadow-[2px_2px_0px_#000] text-sm font-black text-black hover:bg-emerald-50 font-tajawal"
            >
              {link.label}
            </Link>
          ))}

          <div className="pt-2">
            <Link
              href="/register"
              onClick={() => setIsOpen(false)}
              className="w-full flex items-center justify-center gap-2 py-3.5 bg-[#2E7D5B] text-white font-black text-sm border-2 border-black shadow-[4px_4px_0px_#000]"
            >
              <span>سجل الآن</span>
              <ArrowLeft className="w-4 h-4" />
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
