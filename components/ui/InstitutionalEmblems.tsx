'use client';

import React from 'react';

// Official Circular Algerian Ministry of Youth and Sports Emblem from Figma
export function MinistryEmblem({ size = 56, className = '' }: { size?: number; className?: string }) {
  return (
    <div
      className={`relative inline-flex items-center justify-center flex-shrink-0 select-none ${className}`}
      style={{ width: size, height: size }}
      title="وزارة الشباب والرياضة — الجمهورية الجزائرية الديمقراطية الشعبية"
    >
      <img
        src="/logos/logo_mjs.png"
        alt="شعار وزارة الشباب والرياضة"
        width={size}
        height={size}
        className="w-full h-full object-contain"
      />
    </div>
  );
}

// Official Wilaya of Algiers Youth & Sports Directorate Emblem from Figma
export function WilayaAlgerEmblem({ size = 56, className = '' }: { size?: number; className?: string }) {
  return (
    <div
      className={`relative inline-flex items-center justify-center flex-shrink-0 select-none ${className}`}
      style={{ width: size, height: size }}
      title="مديرية الشباب والرياضة والترفيه لولاية الجزائر"
    >
      <img
        src="/logos/logo_djs_alger.png"
        alt="شعار مديرية الشباب والرياضة والترفيه لولاية الجزائر"
        width={size}
        height={size}
        className="w-full h-full object-contain"
      />
    </div>
  );
}

// White Monochrome Wilaya of Algiers Emblem for Dark Footers from Figma
export function WilayaAlgerEmblemWhite({ size = 56, className = '' }: { size?: number; className?: string }) {
  return (
    <div
      className={`relative inline-flex items-center justify-center flex-shrink-0 select-none ${className}`}
      style={{ width: size, height: size }}
      title="مديرية الشباب والرياضة والترفيه لولاية الجزائر"
    >
      <img
        src="/logos/logo_djs_alger_white.png"
        alt="شعار مديرية الشباب والرياضة والترفيه لولاية الجزائر"
        width={size}
        height={size}
        className="w-full h-full object-contain"
      />
    </div>
  );
}

// ACS Association Partner Logo from Figma
export function AcsPartnerLogo({ className = '' }: { className?: string }) {
  return (
    <div className={`flex items-center justify-center select-none ${className}`} title="Advanced Computing Society (ACS)">
      <img
        src="/logos/logo_acs.png"
        alt="ACS - Advanced Computing Society"
        className="h-16 w-auto object-contain hover:scale-105 transition-transform"
      />
    </div>
  );
}

// Maison de Jeunes Abderrahmane Laala from Figma
export function MaisonJeunesLogo({ className = '' }: { className?: string }) {
  return (
    <div className={`flex items-center justify-center select-none ${className}`} title="دار الشباب عبد الرحمن لعلى">
      <img
        src="/logos/logo_maison_jeunes.png"
        alt="دار الشباب عبد الرحمن لعلى - Maison de jeunes Abderrahmane Laala"
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
