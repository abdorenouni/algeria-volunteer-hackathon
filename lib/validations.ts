import { z } from 'zod';

export const teamMemberSchema = z.object({
  id: z.string().default(() => Math.random().toString(36).substring(2, 9)),
  fullName: z.string().min(2, 'الاسم الكامل يجب أن يحتوي على حرفين على الأقل'),
  phone: z.string().optional().or(z.literal('')),
  email: z.string().email('يرجى إدخال بريد إلكتروني صحيح').optional().or(z.literal('')),
  idCardNumber: z.string().optional().or(z.literal('')),
  role: z.enum(['قائد الفريق', 'مطور / مبرمج', 'مصمم / مسوق', 'منسق ميداني', 'عضو باحث'], {
    message: 'يرجى اختيار دور العضو في الفريق'
  }).default('منسق ميداني')
});

export const registrationFormSchema = z.object({
  wilayaCode: z.coerce.number().min(1).max(58).default(16),
  facilityName: z.string().min(2, 'اسم المؤسسة الشبانية مطلوب'),
  category: z.enum(['clubs', 'associations', 'individuals'], {
    message: 'يرجى تحديد الفئة المستهدفة المشاركة'
  }),
  name: z.string().min(2, 'اسم الفريق مطلوب'),
  projectTitle: z.string().min(2, 'عنوان المشروع مطلوب'),
  projectSummary: z.string().optional().or(z.literal('')),
  trackId: z.coerce.number().min(1).max(5).default(1),
  members: z.array(teamMemberSchema)
    .min(3, 'يشترط القانون الداخلي للهاكاثون 3 أعضاء على الأقل في كل فريق')
    .max(5, 'الحد الأقصى المسموح به هو 5 أعضاء فقط في كل فريق'),
  agreement: z.boolean().default(true)
});

export type RegistrationFormData = z.infer<typeof registrationFormSchema>;
export type TeamMemberData = z.infer<typeof teamMemberSchema>;
