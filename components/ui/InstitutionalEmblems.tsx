'use client';

import React from 'react';

/* ============================================================
   Official Circular Algerian Ministry of Youth and Sports Emblem
   ============================================================ */
export function MinistryEmblem({ 
  size = 85, 
  className = '' 
}: { 
  size?: number; 
  className?: string 
}) {
  return (
    <div
      className={`relative inline-flex items-center justify-center flex-shrink-0 select-none transition-all duration-300 hover:scale-110 hover:rotate-3 cursor-pointer ${className}`}
      style={{ width: size, height: size }}
      title="وزارة الشباب والرياضة — الجمهورية الجزائرية الديمقراطية الشعبية"
    >
      <img
        src="/figma-assets/organizer-mjs.png"
        alt="شعار وزارة الشباب والرياضة"
        width={size}
        height={size}
        className="w-full h-full object-contain filter drop-shadow-[0_4px_12px_rgba(0,0,0,0.08)] hover:drop-shadow-[0_8px_20px_rgba(33,61,46,0.25)] transition-all duration-300"
      />
    </div>
  );
}

/* ============================================================
   Official Wilaya Emblem (ولاية الجزائر / مديرية الشباب والرياضة)
   ============================================================ */
export function WilayaAlgerEmblem({ 
  size = 85, 
  className = '' 
}: { 
  size?: number; 
  className?: string 
}) {
  return (
    <div
      className={`relative inline-flex items-center justify-center flex-shrink-0 select-none transition-all duration-300 hover:scale-110 hover:-rotate-3 cursor-pointer ${className}`}
      style={{ width: size, height: size }}
      title="ولاية الجزائر — مديرية الشباب والرياضة والترفيه"
    >
      <img
        src="/figma-assets/organizer-wilaya.png"
        alt="شعار ولاية الجزائر"
        width={size}
        height={size}
        className="w-full h-full object-contain filter drop-shadow-[0_4px_12px_rgba(0,0,0,0.08)] hover:drop-shadow-[0_8px_20px_rgba(33,61,46,0.25)] transition-all duration-300"
      />
    </div>
  );
}

/* ============================================================
   White Monochrome Wilaya Emblem for Dark Footers
   ============================================================ */
export function WilayaAlgerEmblemWhite({ 
  size = 64, 
  className = '' 
}: { 
  size?: number; 
  className?: string 
}) {
  return (
    <div
      className={`relative inline-flex items-center justify-center flex-shrink-0 select-none transition-transform duration-300 hover:scale-110 cursor-pointer ${className}`}
      style={{ width: size, height: size }}
      title="ولاية الجزائر"
    >
      <img
        src="/figma-assets/organizer-wilaya.png"
        alt="شعار ولاية الجزائر"
        width={size}
        height={size}
        className="w-full h-full object-contain brightness-0 invert opacity-90 hover:opacity-100 transition-opacity"
      />
    </div>
  );
}

/* ============================================================
   ACS Association Partner Logo
   ============================================================ */
export function AcsPartnerLogo({ 
  className = '',
  imgClassName = 'h-20 sm:h-24 md:h-28'
}: { 
  className?: string;
  imgClassName?: string;
}) {
  return (
    <div 
      className={`flex items-center justify-center select-none transition-all duration-300 hover:scale-110 cursor-pointer ${className}`} 
      title="الرابطة الولائية للأنشطة الثقافية والعلمية للشباب (ACS)"
    >
      <img
        src="/figma-assets/organizer-acs.png"
        alt="ACS - الرابطة الولائية للأنشطة الثقافية والعلمية للشباب"
        className={`${imgClassName} w-auto object-contain filter drop-shadow-[0_4px_12px_rgba(0,0,0,0.08)] hover:drop-shadow-[0_8px_20px_rgba(95,174,132,0.3)] transition-all duration-300`}
      />
    </div>
  );
}

/* ============================================================
   Maison de Jeunes Abderrahmane Laala (Prominent High-Res Logo)
   ============================================================ */
export function MaisonJeunesLogo({ 
  className = '',
  imgClassName = 'h-20 sm:h-24 md:h-28'
}: { 
  className?: string;
  imgClassName?: string;
}) {
  return (
    <div 
      className={`flex items-center justify-center select-none transition-all duration-300 hover:scale-110 cursor-pointer ${className}`} 
      title="دار الشباب عبد الرحمن لعلى — ديوان مؤسسات الشباب"
    >
      <img
        src="/logos/logo_maison_jeunes.png"
        alt="دار الشباب عبد الرحمن لعلى"
        className={`${imgClassName} w-auto object-contain filter drop-shadow-[0_4px_12px_rgba(0,0,0,0.08)] hover:drop-shadow-[0_8px_20px_rgba(95,174,132,0.3)] transition-all duration-300`}
      />
    </div>
  );
}

/* ============================================================
   LJPE Partner Logo
   ============================================================ */
export function LjpePartnerLogo({ 
  className = '',
  imgClassName = 'h-20 sm:h-24 md:h-28'
}: { 
  className?: string;
  imgClassName?: string;
}) {
  return (
    <div 
      className={`flex items-center justify-center select-none transition-all duration-300 hover:scale-110 cursor-pointer ${className}`} 
      title="L.J.P.E — الرابطة الجزائرية لترقية الشباب والنخبة"
    >
      <img
        src="/logos/logo_ljpe.png"
        alt="L.J.P.E"
        className={`${imgClassName} w-auto object-contain filter drop-shadow-[0_4px_12px_rgba(0,0,0,0.08)] hover:drop-shadow-[0_8px_20px_rgba(95,174,132,0.3)] transition-all duration-300`}
      />
    </div>
  );
}

/* ============================================================
   Brand Identity Partners (Deployly, Chiali, ESI SBA, NCS)
   ============================================================ */
export function TechPartnerDeployly({ className = '' }: { className?: string }) {
  return (
    <div className={`flex items-center justify-center select-none ${className}`} title="Deployly Cloud">
      <img
        src="/figma-assets/partner-deployly.png"
        alt="Deployly Cloud"
        className="h-12 w-auto object-contain hover:scale-110 transition-transform duration-300"
      />
    </div>
  );
}

export function TechPartnerChiali({ className = '' }: { className?: string }) {
  return (
    <div className={`flex items-center justify-center select-none ${className}`} title="Groupe Chiali">
      <img
        src="/figma-assets/partner-chiali.png"
        alt="Groupe Chiali"
        className="h-12 w-auto object-contain hover:scale-110 transition-transform duration-300"
      />
    </div>
  );
}

export function TechPartnerEsisba({ className = '' }: { className?: string }) {
  return (
    <div className={`flex items-center justify-center select-none ${className}`} title="École Supérieure en Informatique 08 Mai 1945 Sidi Bel Abbès">
      <img
        src="/figma-assets/partner-esisba.png"
        alt="ESI SBA"
        className="h-14 w-auto object-contain hover:scale-110 transition-transform duration-300"
      />
    </div>
  );
}

export function TechClubNcs({ className = '' }: { className?: string }) {
  return (
    <div className={`flex items-center justify-center select-none ${className}`} title="National Cyber Security Club">
      <img
        src="/figma-assets/club-ncs.png"
        alt="NCS Club"
        className="h-12 w-auto object-contain hover:scale-110 transition-transform duration-300"
      />
    </div>
  );
}
