'use client';

import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';

interface FaqItem {
  question: string;
  answer: string;
}

export default function FaqAccordion() {
  const [openIndices, setOpenIndices] = useState<number[]>([0, 1, 2]); // All open by default as in Figma or toggleable

  const faqs: FaqItem[] = [
    {
      question: 'ما هو إيدياثون الابتكار والتطوع؟',
      answer:
        'إيدياثون وطني يجمع الشباب لتطوير أفكار وحلول مبتكرة تساهم في تطوير العمل التطوعي وخدمة المجتمع، بتنظيم وإشراف قطاع الشباب والرياضة عبر 58 ولاية.',
    },
    {
      question: 'من يمكنه المشاركة؟',
      answer:
        'الإيدياثون مفتوح أمام الشباب الراغبين في الابتكار والعمل الجماعي وتقديم حلول جديدة تخدم المجتمع والعمل التطوعي، سواء ضمن نوادي التطوع والمواطنة، الجمعيات الشريكة، أو المبتكرين المنخرطين (من 3 إلى 5 أعضاء).',
    },
    {
      question: 'ما الذي يمكنني الفوز به؟',
      answer:
        'سيحصل أصحاب المشاريع والأفكار المتميزة على جوائز وفرص للتطوير والدعم والمرافقة لتجسيد مشاريعهم على أرض الواقع، بالإضافة إلى تجربة وطنية تجمعهم بشباب مبتكرين من مختلف أنحاء الجزائر والتأهل للمرحلة الوطنية.',
    },
    {
      question: 'هل يجب أن يكون المشروع تطبيقاً إلكترونياً حصراً؟',
      answer:
        'لا، تؤكد التوجيهات الوزارية على معيار الواقعية وتكافؤ الفرص؛ يمكن أن يكون المشروع حلاً إجرائياً ميدانياً، ميثاقاً تطوعياً، حقيبة تدريبية، أو تطبيقاً رقمياً ذكياً يخدم الفضاءات الشبانية.',
    },
  ];

  const toggle = (idx: number) => {
    if (openIndices.includes(idx)) {
      setOpenIndices(openIndices.filter((i) => i !== idx));
    } else {
      setOpenIndices([...openIndices, idx]);
    }
  };

  return (
    <section id="faq" className="py-16 scroll-mt-20">
      <div className="max-w-4xl mx-auto px-4">
        
        {/* Header matching Figma */}
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-black text-black tracking-tight font-tajawal">
            الأسئلة الشائعة
          </h2>
          <p className="text-xs sm:text-sm text-slate-700 mt-2 font-bold">
            كل ما تحتاج إلى معرفته حول الإيدياثون، المشاركة، الفرق، والتحديات.
          </p>
        </div>

        {/* FAQ Items */}
        <div className="space-y-4">
          {faqs.map((faq, idx) => {
            const isOpen = openIndices.includes(idx);
            return (
              <div
                key={idx}
                className="neo-box bg-white border-2 border-black shadow-[4px_4px_0px_#000] overflow-hidden transition-all"
              >
                <button
                  type="button"
                  onClick={() => toggle(idx)}
                  className="w-full p-5 sm:p-6 text-right flex items-center justify-between gap-4 font-black text-base sm:text-lg text-black hover:bg-slate-50 transition-colors"
                >
                  <span className="font-tajawal">{faq.question}</span>
                  <ChevronDown
                    className={`w-5 h-5 text-black transition-transform duration-200 flex-shrink-0 ${
                      isOpen ? 'rotate-180 text-[#2E7D5B]' : ''
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className="px-5 sm:px-6 pb-6 pt-1 border-t border-slate-100 text-slate-700 text-xs sm:text-sm leading-relaxed font-medium">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
