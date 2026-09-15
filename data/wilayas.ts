import { Wilaya } from '@/types/hackathon';

// Participating Wilaya: Only Wilaya 16 (ولاية الجزائر العاصمة)
export const WILAYAS: Wilaya[] = [
  { 
    code: 16, 
    codeString: '16', 
    nameAr: 'الجزائر العاصمة', 
    nameFr: 'Alger', 
    region: 'الوسط' 
  },
];

export function getWilayaByCode(code: number | string): Wilaya | undefined {
  const numeric = typeof code === 'string' ? parseInt(code, 10) : code;
  return WILAYAS.find((w) => w.code === numeric) || WILAYAS[0];
}
