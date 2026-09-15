'use client';

import React from 'react';

// Official Circular Algerian Ministry of Youth and Sports Emblem from Figma
export function MinistryEmblem({ size = 64, className = '' }: { size?: number; className?: string }) {
  return (
    <div
      className={`relative inline-flex items-center justify-center flex-shrink-0 select-none ${className}`}
      style={{ width: size, height: size }}
      title="وزارة الشباب والرياضة — الجمهورية الجزائرية الديمقراطية الشعبية"
    >
      <img
        src="/figma-assets/organizer-mjs.png"
        alt="شعار وزارة الشباب والرياضة"
        width={size}
        height={size}
        className="w-full h-full object-contain"
      />
    </div>
  );
}

// Official Wilaya Emblem from Figma
export function WilayaAlgerEmblem({ size = 64, className = '' }: { size?: number; className?: string }) {
  return (
    <div
      className={`relative inline-flex items-center justify-center flex-shrink-0 select-none ${className}`}
      style={{ width: size, height: size }}
      title="ولاية سيدي بلعباس — الجمهورية الجزائرية الديمقراطية الشعبية"
    >
      <img
        src="/figma-assets/organizer-wilaya.png"
        alt="شعار ولاية سيدي بلعباس"
        width={size}
        height={size}
        className="w-full h-full object-contain"
      />
    </div>
  );
}

// White Monochrome Wilaya Emblem for Dark Footers from Figma
export function WilayaAlgerEmblemWhite({ size = 56, className = '' }: { size?: number; className?: string }) {
  return (
    <div
      className={`relative inline-flex items-center justify-center flex-shrink-0 select-none ${className}`}
      style={{ width: size, height: size }}
      title="ولاية سيدي بلعباس"
    >
      <img
        src="/figma-assets/organizer-wilaya.png"
        alt="شعار ولاية سيدي بلعباس"
        width={size}
        height={size}
        className="w-full h-full object-contain brightness-0 invert"
      />
    </div>
  );
}

// ACS Association Partner Logo from Figma
export function AcsPartnerLogo({ className = '' }: { className?: string }) {
  return (
    <div className={`flex items-center justify-center select-none ${className}`} title="الرابطة الولائية للأنشطة الثقافية والعلمية للشباب (ACS)">
      <img
        src="/figma-assets/organizer-acs.png"
        alt="ACS - الرابطة الولائية للأنشطة الثقافية والعلمية للشباب"
        className="h-16 w-auto object-contain hover:scale-105 transition-transform"
      />
    </div>
  );
}

// Maison de Jeunes Abderrahmane Laala from Figma
export function MaisonJeunesLogo({ className = '' }: { className?: string }) {
  return (
    <div className={`flex items-center justify-center select-none ${className}`} title="ديوان مؤسسات الشباب">
      <img
        src="/logos/logo_maison_jeunes.png"
        alt="ديوان مؤسسات الشباب"
        className="h-16 w-auto object-contain hover:scale-105 transition-transform"
      />
    </div>
  );
}

// LJPE Partner Logo from Figma
export function LjpePartnerLogo({ className = '' }: { className?: string }) {
  return (
    <div className={`flex items-center justify-center select-none ${className}`} title="L.J.P.E">
      <img
        src="/logos/logo_ljpe.png"
        alt="L.J.P.E"
        className="h-16 w-auto object-contain hover:scale-105 transition-transform"
      />
    </div>
  );
}

// Brand Identity Partners from Figma Node 13:7243 (Deployly, Chiali, ESI SBA, NCS)
export function TechPartnerDeployly({ className = '' }: { className?: string }) {
  return (
    <div className={`flex items-center justify-center select-none ${className}`} title="Deployly Cloud">
      <img
        src="/figma-assets/partner-deployly.png"
        alt="Deployly Cloud"
        className="h-12 w-auto object-contain hover:scale-105 transition-transform"
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
        className="h-12 w-auto object-contain hover:scale-105 transition-transform"
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
        className="h-14 w-auto object-contain hover:scale-105 transition-transform"
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
        className="h-12 w-auto object-contain hover:scale-105 transition-transform"
      />
    </div>
  );
}
