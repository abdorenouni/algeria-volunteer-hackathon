import { z } from 'zod';

export const teamMemberSchema = z.object({
  id: z.string().default(() => Math.random().toString(36).substring(2, 9)),
  fullName: z.string().min(3, 'الاسم الكامل يجب أن يحتوي على 3 أحرف على الأقل'),
  phone: z.string().regex(/^(05|06|07)[0-9]{8}$/, 'رقم الهاتف يجب أن يكون رقماً جزائرياً صالحاً يبدأ بـ 05، 06 أو 07 (10 أرقام)'),
  email: z.string().email('يرجى إدخال بريد إلكتروني صحيح'),
  idCardNumber: z.string().min(5, 'رقم بطاقة التعريف الوطنية أو بطاقة الشاب إجباري (5 خانات على الأقل)'),
  role: z.enum(['قائد الفريق', 'مطور / مبرمج', 'مصمم / مسوق', 'منسق ميداني', 'عضو باحث'], {
    message: 'يرجى اختيار دور العضو في الفريق'
  })
});

export const registrationFormSchema = z.object({
  wilayaCode: z.coerce.number().min(1, 'يرجى اختيار الولاية').max(58, 'رقم الولاية غير صحيح'),
  facilityName: z.string().min(3, 'اسم المؤسسة الشبانية مطلوب (3 أحرف على الأقل)'),
  category: z.enum(['clubs', 'associations', 'individuals'], {
    message: 'يرجى تحديد الفئة المستهدفة المشاركة'
  }),
  name: z.string().min(3, 'اسم الفريق يجب أن يحتوي على 3 أحرف على الأقل'),
  projectTitle: z.string().min(5, 'عنوان المشروع يجب أن يكون واضحاً (5 أحرف على الأقل)'),
  projectSummary: z.string().min(20, 'ملخص الفكرة والمشروع يجب أن يحتوي على 20 حرفاً على الأقل لشرح الفكرة'),
  trackId: z.coerce.number().min(1).max(5, 'يرجى اختيار أحد المجالات الخمسة للهاكاثون'),
  members: z.array(teamMemberSchema)
    .min(3, 'يشترط القانون الداخلي للهاكاثون 3 أعضاء على الأقل في كل فريق')
    .max(5, 'الحد الأقصى المسموح به هو 5 أعضاء فقط في كل فريق'),
  agreement: z.boolean().refine((val) => val === true, {
    message: 'يجب التعهد بصحة البيانات والالتزام بضوابط الهاكاثون الوطني'
  })
});

export type RegistrationFormData = z.infer<typeof registrationFormSchema>;
export type TeamMemberData = z.infer<typeof teamMemberSchema>;
