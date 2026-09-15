'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, ArrowRight } from 'lucide-react';
import FigmaLogo from '@/components/ui/FigmaLogo';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  if (pathname === '/register') return null;

  // eslint-disable-next-line react-hooks/rules-of-hooks
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { href: '/', label: 'الرئيسية' },
    { href: '/#about', label: 'من نحن' },
    { href: '/#schedule', label: 'الجدول الزمني' },
    { href: '/#tracks', label: 'المحاور' },
    { href: '/#faq', label: 'الأسئلة الشائعة' },
  ];

  return (
    <header
      className={`sticky top-0 z-50 bg-[#FBF9FC]/95 backdrop-blur-md border-b-[1.5px] border-[#1F1A26] transition-all duration-300 ${
        scrolled ? 'shadow-[0_4px_20px_rgba(31,26,38,0.1)]' : ''
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Left (in RTL): Neo-Brutalist Register Button */}
          <div className="hidden sm:flex items-center">
            <Link
              href="/register"
              className="neo-btn bg-white hover:bg-[#FBF9FC] text-[#1F1A26] px-6 py-2.5 rounded-none font-bold text-sm gap-2.5 group border-[1.5px] border-[#1F1A26] shadow-[-4.8px_4.8px_0px_#1F1A26] transition-all"
            >
              <span>سجل الآن</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>

          {/* Center: Desktop Nav Links */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm font-bold text-[#1F1A26] hover:text-[#5FAE84] transition-colors py-1 relative group font-tajawal"
              >
                <span>{link.label}</span>
                <span className="absolute -bottom-1 left-0 right-0 h-[2px] bg-[#5FAE84] scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-right" />
              </Link>
            ))}
          </nav>

          {/* Right (in RTL): Brand Logo */}
          <Link href="/" className="flex items-center group">
            <FigmaLogo size="sm" />
          </Link>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 border-[1.5px] border-[#1F1A26] bg-white shadow-[-2px_2px_0px_#1F1A26] text-[#1F1A26] focus:outline-none transition-transform active:translate-y-[1px] active:shadow-[-1px_1px_0px_#1F1A26]"
              aria-label="القائمة"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {isOpen && (
        <div className="md:hidden border-t-[1.5px] border-[#1F1A26] bg-[#FBF9FC]/98 backdrop-blur-lg px-4 pt-4 pb-6 space-y-3 animate-slide-down">
          {navLinks.map((link, idx) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setIsOpen(false)}
              className="block px-4 py-2.5 border-[1.5px] border-[#1F1A26] bg-white shadow-[-2px_2px_0px_#1F1A26] text-sm font-bold text-[#1F1A26] hover:bg-emerald-50 font-tajawal animate-fade-in-up"
              style={{ animationDelay: `${idx * 60}ms` }}
            >
              {link.label}
            </Link>
          ))}

          <div className="pt-2">
            <Link
              href="/register"
              onClick={() => setIsOpen(false)}
              className="w-full flex items-center justify-center gap-2 py-3 bg-[#5FAE84] text-white font-bold text-sm border-[1.5px] border-[#1F1A26] shadow-[-4px_4px_0px_#000000] animate-fade-in-up"
              style={{ animationDelay: `${navLinks.length * 60}ms` }}
            >
              <span>سجل الآن</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
