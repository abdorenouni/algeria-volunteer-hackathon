'use client';

import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';

interface FaqItem {
  question: string;
  answer: string;
}

export default function FaqAccordion() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs: FaqItem[] = [
    {
      question: 'ما هو إيدياثون الابتكار والتطوع؟',
      answer:
        'إيدياثون وطني يجمع الشباب لتطوير أفكار وحلول مبتكرة تساهم في تطوير العمل التطوعي وخدمة المجتمع. يُنظّم على مستوى ولائي بتصفيات تؤهل الفرق المتميزة للمرحلة الوطنية.',
    },
    {
      question: 'من يمكنه المشاركة؟',
      answer:
        'الإيدياثون مفتوح أمام الشباب الراغبين في الابتكار والعمل الجماعي وتقديم حلول جديدة تخدم المجتمع والعمل التطوعي. يمكن المشاركة عبر نوادي التطوع والمواطنة، دور الشباب، المركبات الرياضية الجوارية، الجمعيات المحلية وأكثر.',
    },
    {
      question: 'كم عدد أعضاء الفريق المطلوب؟',
      answer:
        'يتكون كل فريق من 3 إلى 5 أعضاء، بقيادة قائد فريق واحد. يجب أن يكون جميع الأعضاء مسجلين في الاستمارة مع بياناتهم الكاملة.',
    },
    {
      question: 'ما هي المحاور المتاحة للمشاركة؟',
      answer:
        'يتضمن الإيدياثون 5 محاور: استقطاب الشباب وتعزيز مشاركتهم، المواطنة وخدمة المجتمع، التطوع لحماية البيئة، الرقمنة لتطوير العمل التطوعي، وتطوير العمل التطوعي داخل مؤسسات الشباب.',
    },
    {
      question: 'ما الذي يمكنني الفوز به؟',
      answer:
        'سيحصل أصحاب المشاريع والأفكار المتميزة على جوائز وفرص للتطوير والدعم، بالإضافة إلى تجربة وطنية تجمعهم بشباب مبتكرين من مختلف أنحاء الجزائر. الفرق الأولى تتأهل للمرحلة الوطنية.',
    },
    {
      question: 'ما هو الجدول الزمني للحدث؟',
      answer:
        'يمتد الإيدياثون على يومين: اليوم الأول (19 سبتمبر) للافتتاح وانطلاق الحدث وبلورة الأفكار، واليوم الثاني (20 سبتمبر) للمسات الأخيرة والعروض أمام لجنة التحكيم وإعلان النتائج.',
    },
  ];

  const toggle = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section id="faq" className="py-20 scroll-mt-20 bg-[#FBF9FC]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* 2-Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* Right Column (in RTL): Section Title & Subtitle */}
          <div className="lg:col-span-4 text-right space-y-3">
            <h2 className="text-3xl sm:text-5xl font-black text-[#1F1A26] tracking-tight font-tajawal">
              الأسئلة الشائعة
            </h2>
            <p className="text-xs sm:text-sm text-slate-700 font-bold leading-relaxed">
              كل ما تحتاج إلى معرفته حول الإيدياثون، المشاركة، الفِرق، والتحديات.
            </p>
          </div>

          {/* Left Column (in RTL): Accordion List */}
          <div className="lg:col-span-8 space-y-4">
            {faqs.map((faq, idx) => {
              const isOpen = openIndex === idx;
              return (
                <div
                  key={idx}
                  className={`bg-white border-[1.5px] border-[#1F1A26] transition-all duration-300 ${
                    isOpen ? 'shadow-[-4px_4px_0px_#1F1A26]' : 'shadow-[-2px_2px_0px_#1F1A26] hover:shadow-[-4px_4px_0px_#1F1A26]'
                  }`}
                >
                  <button
                    type="button"
                    onClick={() => toggle(idx)}
                    className="w-full p-5 text-right flex items-center justify-between gap-4 font-bold text-base sm:text-lg text-[#1F1A26] hover:bg-slate-50/50 transition-colors"
                  >
                    <span className="font-tajawal">{faq.question}</span>
                    <ChevronDown
                      className={`w-5 h-5 text-[#1F1A26] transition-transform duration-300 flex-shrink-0 ${
                        isOpen ? 'rotate-180' : ''
                      }`}
                    />
                  </button>

                  {/* Smooth accordion content */}
                  <div
                    className={`overflow-hidden transition-all duration-300 ease-out ${
                      isOpen ? 'max-h-[300px] opacity-100' : 'max-h-0 opacity-0'
                    }`}
                  >
                    <div className="px-5 pb-5 pt-1 border-t border-slate-100 text-slate-700 text-xs sm:text-sm leading-relaxed font-medium">
                      {faq.answer}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

        </div>

      </div>
    </section>
  );
}
