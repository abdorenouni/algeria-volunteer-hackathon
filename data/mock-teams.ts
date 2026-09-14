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
      juryName: 'لجنة التحكيم المركزية - الجزائر',
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
      juryName: 'لجنة التحكيم المركزية - الجزائر',
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
    name: 'نبض المواطنة',
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
      juryName: 'لجنة التحكيم المركزية - الجزائر',
      criteria: {
        innovation: 19,
        relevance: 24,
        feasibility: 22,
        impact: 13,
        teamworkPitch: 8
      },
      totalScore: 86,
      notes: 'مشروع إنساني عميق ذو أثر مباشر على السلم والتكافل المجتمعي في الأحياء.',
      strengths: 'حماس الفريق ووضوح آلية التواصل التضامني الميداني.',
      evaluatedAt: '2026-09-20T12:10:00Z'
    }
  },
  {
    id: 'team-oran-01',
    registrationNumber: 'DZ-2026-31-001',
    name: 'رواد الباهية',
    projectTitle: 'حاضنة "فضاء التطوع": إعادة تفعيل أندية الشباب التشاركية',
    projectSummary: 'تهيئة مساحة عمل مشتركة داخل دار الشباب مخصصة للمتطوعين ورواد الأعمال المجتمعية مع برنامج تدريب فصلي يؤهل 200 متطوع سنوياً.',
    trackId: 5,
    wilayaCode: 31,
    wilayaName: 'وهران',
    facilityName: 'دار الشباب الشهيد أحمد زبانة - وهران',
    category: 'clubs',
    categoryLabel: 'نوادي التطوع والمواطنة بمؤسسات الشباب',
    members: [
      { id: 'm-201', fullName: 'طارق قداري', phone: '0551112233', email: 'tarek.k@example.dz', idCardNumber: '31-2001-334455', role: 'قائد الفريق' },
      { id: 'm-202', fullName: 'إيمان بلحسن', phone: '0662223344', email: 'imane.b@example.dz', idCardNumber: '31-2002-667788', role: 'مصمم / مسوق' },
      { id: 'm-203', fullName: 'مراد بلحاج', phone: '0773334455', email: 'mourad.b@example.dz', idCardNumber: '31-2000-998877', role: 'منسق ميداني' }
    ],
    createdAt: '2026-09-12T11:00:00Z',
    status: 'evaluated',
    evaluation: {
      id: 'eval-201',
      teamId: 'team-oran-01',
      juryName: 'لجنة التحكيم الولائية - وهران',
      criteria: {
        innovation: 23,
        relevance: 25,
        feasibility: 24,
        impact: 14,
        teamworkPitch: 9
      },
      totalScore: 95,
      notes: 'تطبيق نموذجي لشعار "مؤسسات الشباب فضاءات للابتكار والتطوع" بإعادة هيكلة وتنشيط فضاءات دار الشباب.',
      strengths: 'قابلية تطبيق فورية وشراكات قوية مع جامعات وهران.',
      evaluatedAt: '2026-09-20T14:30:00Z'
    }
  },
  {
    id: 'team-oran-02',
    registrationNumber: 'DZ-2026-31-002',
    name: 'بصمة وهران',
    projectTitle: 'جواز الشاب المتطوع الرقمي',
    projectSummary: 'نظام بطاقة شبابية رقمية تمنح تخفيضات في النقل والفضاءات الرياضية والثقافية لكل شاب يكمل 30 ساعة تطوعية معتمدة.',
    trackId: 1,
    wilayaCode: 31,
    wilayaName: 'وهران',
    facilityName: 'المركب الرياضي الجواري - السانية',
    category: 'associations',
    categoryLabel: 'الجمعيات الشبابية الشريكة',
    members: [
      { id: 'm-204', fullName: 'وليد شريف', phone: '0554445566', email: 'walid.c@example.dz', idCardNumber: '31-2002-121212', role: 'قائد الفريق' },
      { id: 'm-205', fullName: 'أسماء بن زروق', phone: '0665556677', email: 'asma.b@example.dz', idCardNumber: '31-2003-343434', role: 'مطور / مبرمج' },
      { id: 'm-206', fullName: 'كريم عواد', phone: '0776667788', email: 'karim.a@example.dz', idCardNumber: '31-2001-565656', role: 'منسق ميداني' },
      { id: 'm-207', fullName: 'ليلى سلطاني', phone: '0547778899', email: 'layla.s@example.dz', idCardNumber: '31-2002-787878', role: 'مصمم / مسوق' }
    ],
    createdAt: '2026-09-13T09:45:00Z',
    status: 'evaluated',
    evaluation: {
      id: 'eval-202',
      teamId: 'team-oran-02',
      juryName: 'لجنة التحكيم الولائية - وهران',
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
  },
  {
    id: 'team-const-01',
    registrationNumber: 'DZ-2026-25-001',
    name: 'جسور التضامن',
    projectTitle: 'منصة "سيرتا التطوعية" للإغاثة والتدخل السريع',
    projectSummary: 'نظام إدارة طوارئ وتطوع محلي يربط المتطوعين المؤهلين في الإسعاف الأولي والإغاثة بأجهزة الحماية المدنية والمصالح البلدية عند الأزمات وموجات البرد وحرائق الصيف.',
    trackId: 2,
    wilayaCode: 25,
    wilayaName: 'قسنطينة',
    facilityName: 'دار الشباب عبد الحميد بن باديس - قسنطينة',
    category: 'associations',
    categoryLabel: 'الجمعيات الشبابية الشريكة',
    members: [
      { id: 'm-301', fullName: 'صالح بوالمرقة', phone: '0558889900', email: 'saleh.b@example.dz', idCardNumber: '25-2000-889900', role: 'قائد الفريق' },
      { id: 'm-302', fullName: 'دنيا رحماني', phone: '0669990011', email: 'dounia.r@example.dz', idCardNumber: '25-2002-112244', role: 'منسق ميداني' },
      { id: 'm-303', fullName: 'عبد الرؤوف كواش', phone: '0770001122', email: 'raouf.k@example.dz', idCardNumber: '25-1999-557799', role: 'مطور / مبرمج' }
    ],
    createdAt: '2026-09-13T16:00:00Z',
    status: 'evaluated',
    evaluation: {
      id: 'eval-301',
      teamId: 'team-const-01',
      juryName: 'لجنة التحكيم الولائية - قسنطينة',
      criteria: {
        innovation: 24,
        relevance: 24,
        feasibility: 23,
        impact: 15,
        teamworkPitch: 9
      },
      totalScore: 95,
      notes: 'مشروع ذو بعد استراتيجي وخدمي عالي، ينظم جهود الشباب في الإغاثة والأزمات بدقة.',
      strengths: 'تكامل تقني وميداني عالي ونموذج أولي جاهز للاختبار.',
      evaluatedAt: '2026-09-20T16:20:00Z'
    }
  },
  {
    id: 'team-ouargla-01',
    registrationNumber: 'DZ-2026-30-001',
    name: 'واحات الأمل',
    projectTitle: 'مبادرة "حزام الواحات": التشجير الذكي وإعادة تدوير مخلفات النخيل',
    projectSummary: 'مشروع تطوعي يجمع شباب الواحات لإنتاج السماد العضوي وحماية الواحات من التصحر مع زراعة أحزمة نباتية تحمي المحيط العمراني لورقلة.',
    trackId: 3,
    wilayaCode: 30,
    wilayaName: 'ورقلة',
    facilityName: 'دار الشباب المقراني - ورقلة',
    category: 'clubs',
    categoryLabel: 'نوادي التطوع والمواطنة بمؤسسات الشباب',
    members: [
      { id: 'm-401', fullName: 'محمد الهادي قاسمي', phone: '0551239876', email: 'elhadi.g@example.dz', idCardNumber: '30-1999-654321', role: 'قائد الفريق' },
      { id: 'm-402', fullName: 'سليم باحمد', phone: '0662348765', email: 'salim.b@example.dz', idCardNumber: '30-2001-765432', role: 'عضو باحث' },
      { id: 'm-403', fullName: 'نور الهدى حمادي', phone: '0773457654', email: 'nour.h@example.dz', idCardNumber: '30-2003-876543', role: 'منسق ميداني' }
    ],
    createdAt: '2026-09-14T08:30:00Z',
    status: 'evaluated',
    evaluation: {
      id: 'eval-401',
      teamId: 'team-ouargla-01',
      juryName: 'لجنة التحكيم الولائية - ورقلة',
      criteria: {
        innovation: 23,
        relevance: 25,
        feasibility: 24,
        impact: 14,
        teamworkPitch: 8
      },
      totalScore: 94,
      notes: 'مشروع يلامس البيئة الصحراوية مباشرة ويستثمر خصوصية الجنوب في حماية البيئة والتطوع المستدام.',
      strengths: 'أصالة الفكرة وواقعية تطبيقها في مؤسسات شباب الجنوب.',
      evaluatedAt: '2026-09-20T17:00:00Z'
    }
  }
];
