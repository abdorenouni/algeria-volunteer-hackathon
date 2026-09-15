export type TrackId = 1 | 2 | 3 | 4 | 5;

export interface Track {
  id: TrackId;
  title: string;
  shortTitle: string;
  subtitle: string;
  description: string;
  iconName: string;
  badgeColor: string;
  objectives: string[];
  sampleProjects: string[];
}

export type TargetCategory = 
  | 'clubs' 
  | 'associations' 
  | 'individuals';

export interface Wilaya {
  code: number;
  codeString: string;
  nameAr: string;
  nameFr: string;
  region: 'الوسط' | 'الشرق' | 'الغرب' | 'الجنوب';
}

export interface TeamMember {
  id: string;
  fullName: string;
  phone: string;
  email: string;
  idCardNumber: string; // رقم بطاقة التعريف أو بطاقة الشاب
  role: 'قائد الفريق' | 'مطور / مبرمج' | 'مصمم / مسوق' | 'منسق ميداني' | 'عضو باحث';
}

export interface JuryRubricCriteria {
  innovation: number;       // الابتكار والإبداع [0 - 25]
  relevance: number;        // ملاءمة الحل للتحدي [0 - 25]
  feasibility: number;      // قابلية التطبيق والواقعية [0 - 25]
  impact: number;           // الأثر على العمل التطوعي [0 - 15]
  teamworkPitch: number;    // العمل الجماعي وطريقة العرض [0 - 10]
}

export interface JuryEvaluation {
  id: string;
  teamId: string;
  juryName: string;
  criteria: JuryRubricCriteria;
  totalScore: number;       // مجموع النقاط من 100
  notes: string;
  strengths?: string;
  recommendations?: string;
  evaluatedAt: string;
}

export interface Team {
  id: string;
  registrationNumber: string; // e.g. DZ-2026-16-001
  name: string;
  projectTitle: string;
  projectSummary: string;
  trackId: TrackId;
  wilayaCode: number;
  wilayaName?: string;
  facilityName: string;       // اسم مؤسسة أو دار الشباب
  category: TargetCategory;
  categoryLabel?: string;
  members: TeamMember[];      // 3 to 5 members
  createdAt: string;
  status: 'registered' | 'accepted' | 'rejected' | 'evaluated' | 'shortlisted' | 'winner';
  decidedAt?: string;          // ISO timestamp when admin accepted/rejected
  decisionNote?: string;       // optional admin note
  evaluation?: JuryEvaluation;
}

export interface WilayaStats {
  wilayaCode: number;
  wilayaName: string;
  youthFacilitiesCount: number;
  partnerAssociationsCount: number;
  youthParticipantsCount: number;
  teamsCount: number;
  evaluatedCount: number;
}

export interface MinisterialReportPayload {
  reportId: string;
  wilayaCode: number;
  wilayaName: string;
  reportingDate: string;
  recipientEmail: string; // sd_ppmav@mjeunese.gov.dz
  directorate: string;    // مديرية الشباب والرياضة لولاية...
  stats: WilayaStats;
  topProjects: {
    rank: 1 | 2 | 3;
    teamName: string;
    projectTitle: string;
    trackTitle: string;
    facilityName: string;
    totalScore: number;
    leaderName: string;
    membersCount: number;
    membersNames: string[];
  }[];
  generalObservations: string;
  committeePresident: string;
  sentAt?: string;
  status: 'draft' | 'dispatched';
}
