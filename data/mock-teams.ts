import { Team } from '@/types/hackathon';

export const INITIAL_TEAMS: Team[] = [
  {
    id: 'team-alger-01',
    registrationNumber: 'DZ-2026-16-001',
    name: 'فرسان التطوع الرقمي',
    projectTitle: 'منصة "سواعد الجزائر" لإدارة وتوثيق الساعات التطوعية',
    projectSummary: 'منصة وتطبيق رقمي يربط بين الجمعيات المحلية ومؤسسات الشباب لتوزيع الفرص التطوعية وإصدار بطاقات رقمية معتمدة توثق ساعات الخدمة المجتمعية وتمنح رصيد شارات تحفيزية.',
    trackId: 4,
    wilayaCode: 16,
    wilayaName: 'الجزائر العاصمة',
    facilityName: 'دار الشباب الشهيد عيسات إيدير - سيدي امحمد',
    category: 'clubs',
    categoryLabel: 'نوادي التطوع والمواطنة بمؤسسات الشباب',
    members: [
      { id: 'm-101', fullName: 'أمين بن مهيدي', phone: '0550123456', email: 'amine.m@example.dz', idCardNumber: '16-2001-987654', role: 'قائد الفريق' },
      { id: 'm-102', fullName: 'سارة بوعلام', phone: '0661234567', email: 'sara.b@example.dz', idCardNumber: '16-2002-456123', role: 'مطور / مبرمج' },
      { id: 'm-103', fullName: 'ياسين قاسي', phone: '0770345678', email: 'yacine.k@example.dz', idCardNumber: '16-1999-321789', role: 'مصمم / مسوق' },
      { id: 'm-104', fullName: 'فاطمة الزهراء بن علي', phone: '0541456789', email: 'fatima.b@example.dz', idCardNumber: '16-2003-852963', role: 'منسق ميداني' }
    ],
    createdAt: '2026-09-10T10:30:00Z',
    status: 'evaluated',
    evaluation: {
      id: 'eval-101',
      teamId: 'team-alger-01',
      juryName: 'لجنة التحكيم الولائية - الجزائر',
      criteria: {
        innovation: 23,
        relevance: 24,
        feasibility: 23,
        impact: 14,
        teamworkPitch: 9
      },
      totalScore: 93,
      notes: 'مشروع ناضج وعملي جداً، يتماشى مباشرة مع توجيهات الرقمنة الوزارية لتوثيق ساعات المتطوعين.',
      strengths: 'نموذج عمل قابل للتعميم الفوري على جميع دور الشباب بالولاية.',
      evaluatedAt: '2026-09-20T11:15:00Z'
    }
  },
  {
    id: 'team-alger-02',
    registrationNumber: 'DZ-2026-16-002',
    name: 'سفراء البيئة الخضراء',
    projectTitle: 'مشروع "الرئة الخضراء": تشجير المجمعات الحضرية والمدارس',
    projectSummary: 'مبادرة لتأسيس مشاتل ذكية داخل دور الشباب لإنتاج شتلات ملائمة للمناخ وتوزيعها على الجمعيات والمدارس في حملات تشجير منظمة ودورية.',
    trackId: 3,
    wilayaCode: 16,
    wilayaName: 'الجزائر العاصمة',
    facilityName: 'المركب الرياضي الجواري - بئر مراد رايس',
    category: 'associations',
    categoryLabel: 'الجمعيات الشبابية الشريكة',
    members: [
      { id: 'm-105', fullName: 'خالد دراجي', phone: '0552345678', email: 'khaled.d@example.dz', idCardNumber: '16-1998-112233', role: 'قائد الفريق' },
      { id: 'm-106', fullName: 'مريم حداد', phone: '0663456789', email: 'meriem.h@example.dz', idCardNumber: '16-2001-445566', role: 'منسق ميداني' },
      { id: 'm-107', fullName: 'رضا عمروش', phone: '0774567890', email: 'reda.a@example.dz', idCardNumber: '16-2000-778899', role: 'عضو باحث' }
    ],
    createdAt: '2026-09-11T14:20:00Z',
    status: 'evaluated',
    evaluation: {
      id: 'eval-102',
      teamId: 'team-alger-02',
      juryName: 'لجنة التحكيم الولائية - الجزائر',
      criteria: {
        innovation: 21,
        relevance: 23,
        feasibility: 22,
        impact: 14,
        teamworkPitch: 8
      },
      totalScore: 88,
      notes: 'خطة تشجير واقعية وقابلة للتنفيذ الميداني بتكلفة منخفضة ومشاركة مجتمعية فعالة.',
      strengths: 'تكامل ممتاز بين شباب دار الشباب وسكان الأحياء المجاورة.',
      evaluatedAt: '2026-09-20T11:45:00Z'
    }
  },
  {
    id: 'team-alger-03',
    registrationNumber: 'DZ-2026-16-003',
    name: 'نبض المواطنة والتكافل',
    projectTitle: 'شبكة "معاً لأجلهم": المساندة المنزلية لكبار السن وذوي الهمم',
    projectSummary: 'نظام تدخل تطوعي جواري يربط الشباب المتطوعين بأصحاب الحاجة من كبار السن وذوي الاحتياجات الخاصة لقضاء الحاجيات والمرافقة الطبية والاجتماعية.',
    trackId: 2,
    wilayaCode: 16,
    wilayaName: 'الجزائر العاصمة',
    facilityName: 'دار الشباب حسيبة بن بوعلي - القبة',
    category: 'individuals',
    categoryLabel: 'الشباب المنخرطون في مؤسسات الشباب',
    members: [
      { id: 'm-108', fullName: 'حمزة بوزيد', phone: '0555678901', email: 'hamza.b@example.dz', idCardNumber: '16-2000-990011', role: 'قائد الفريق' },
      { id: 'm-109', fullName: 'نسرين مسعودي', phone: '0666789012', email: 'nesrine.m@example.dz', idCardNumber: '16-2002-223344', role: 'مصمم / مسوق' },
      { id: 'm-110', fullName: 'بلال تومي', phone: '0777890123', email: 'bilal.t@example.dz', idCardNumber: '16-1999-556677', role: 'مطور / مبرمج' }
    ],
    createdAt: '2026-09-12T09:10:00Z',
    status: 'evaluated',
    evaluation: {
      id: 'eval-103',
      teamId: 'team-alger-03',
      juryName: 'لجنة التحكيم الولائية - الجزائر',
      criteria: {
        innovation: 19,
        relevance: 24,
        feasibility: 22,
        impact: 13,
        teamworkPitch: 8
      },
      totalScore: 86,
      notes: 'مشروع إنساني عميق ذو أثر مباشر على السلم والتكافل المجتمعي في أحياء العاصمة.',
      strengths: 'حماس الفريق ووضوح آلية التواصل التضامني الميداني.',
      evaluatedAt: '2026-09-20T12:10:00Z'
    }
  },
  {
    id: 'team-alger-04',
    registrationNumber: 'DZ-2026-16-004',
    name: 'رواد العاصمة',
    projectTitle: 'حاضنة "فضاء التطوع": إعادة تفعيل نوادي دور الشباب التشاركية',
    projectSummary: 'تهيئة مساحة عمل مشتركة داخل دار الشباب مخصصة للمتطوعين ورواد الأعمال المجتمعية مع برنامج تدريب فصلي يؤهل 200 متطوع سنوياً.',
    trackId: 5,
    wilayaCode: 16,
    wilayaName: 'الجزائر العاصمة',
    facilityName: 'دار الشباب الشهيد العربي بن مهيدي - باب الواد',
    category: 'clubs',
    categoryLabel: 'نوادي التطوع والمواطنة بمؤسسات الشباب',
    members: [
      { id: 'm-201', fullName: 'طارق قداري', phone: '0551112233', email: 'tarek.k@example.dz', idCardNumber: '16-2001-334455', role: 'قائد الفريق' },
      { id: 'm-202', fullName: 'إيمان بلحسن', phone: '0662223344', email: 'imane.b@example.dz', idCardNumber: '16-2002-667788', role: 'مصمم / مسوق' },
      { id: 'm-203', fullName: 'مراد بلحاج', phone: '0773334455', email: 'mourad.b@example.dz', idCardNumber: '16-2000-998877', role: 'منسق ميداني' }
    ],
    createdAt: '2026-09-12T11:00:00Z',
    status: 'evaluated',
    evaluation: {
      id: 'eval-104',
      teamId: 'team-alger-04',
      juryName: 'لجنة التحكيم الولائية - الجزائر',
      criteria: {
        innovation: 23,
        relevance: 25,
        feasibility: 24,
        impact: 14,
        teamworkPitch: 9
      },
      totalScore: 95,
      notes: 'تطبيق نموذجي لشعار "مؤسسات الشباب فضاءات للابتكار والتطوع" بإعادة هيكلة وتنشيط فضاءات دار الشباب.',
      strengths: 'قابلية تطبيق فورية وشراكات قوية مع جامعات الجزائر.',
      evaluatedAt: '2026-09-20T14:30:00Z'
    }
  },
  {
    id: 'team-alger-05',
    registrationNumber: 'DZ-2026-16-005',
    name: 'بصمة شباب المحروسة',
    projectTitle: 'جواز الشاب المتطوع الرقمي لولاية الجزائر',
    projectSummary: 'نظام بطاقة شبابية رقمية تمنح امتيازات وتسهيلات في النقل والفضاءات الرياضية والثقافية لكل شاب يكمل 30 ساعة تطوعية معتمدة.',
    trackId: 1,
    wilayaCode: 16,
    wilayaName: 'الجزائر العاصمة',
    facilityName: 'دار الشباب عبد الرحمن لعلى - المدنية',
    category: 'associations',
    categoryLabel: 'الجمعيات الشبابية الشريكة',
    members: [
      { id: 'm-204', fullName: 'وليد شريف', phone: '0554445566', email: 'walid.c@example.dz', idCardNumber: '16-2002-121212', role: 'قائد الفريق' },
      { id: 'm-205', fullName: 'أسماء بن زروق', phone: '0665556677', email: 'asma.b@example.dz', idCardNumber: '16-2003-343434', role: 'مطور / مبرمج' },
      { id: 'm-206', fullName: 'كريم عواد', phone: '0776667788', email: 'karim.a@example.dz', idCardNumber: '16-2001-565656', role: 'منسق ميداني' }
    ],
    createdAt: '2026-09-13T09:45:00Z',
    status: 'evaluated',
    evaluation: {
      id: 'eval-105',
      teamId: 'team-alger-05',
      juryName: 'لجنة التحكيم الولائية - الجزائر',
      criteria: {
        innovation: 22,
        relevance: 23,
        feasibility: 23,
        impact: 13,
        teamworkPitch: 8
      },
      totalScore: 89,
      notes: 'فكرة تحفيزية ممتازة لجذب اليافعين وتثمين جهودهم التطوعية بامتيازات ملموسة.',
      strengths: 'العرض التقديمي كان قوياً ومقنعاً للجنة.',
      evaluatedAt: '2026-09-20T15:00:00Z'
    }
  }
];
