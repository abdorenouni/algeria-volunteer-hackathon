import nodemailer from 'nodemailer';
import fs from 'fs';
import path from 'path';

export interface SentEmailRecord {
  id: string;
  to: string;
  from: string;
  subject: string;
  registrationNumber?: string;
  teamName?: string;
  leaderName?: string;
  status: 'delivered_resend' | 'delivered_smtp' | 'simulated_success' | 'failed';
  mode: 'resend' | 'smtp' | 'test_account' | 'simulated';
  messageId?: string;
  previewUrl?: string;
  sentAt: string;
  htmlPreview?: string;
  error?: string;
}

const EMAILS_LOG_FILE = path.join(process.cwd(), 'data', 'sent-emails.json');

// In-memory fallback for serverless (Vercel)
let inMemorySentEmails: SentEmailRecord[] = [];

export function getSentEmails(): SentEmailRecord[] {
  try {
    if (fs.existsSync(EMAILS_LOG_FILE)) {
      const content = fs.readFileSync(EMAILS_LOG_FILE, 'utf8');
      const parsed = JSON.parse(content);
      if (Array.isArray(parsed)) {
        return parsed;
      }
    }
  } catch (err) {
    console.warn('[Node Sender] Could not read sent-emails.json, using in-memory store:', err);
  }
  return inMemorySentEmails;
}

export function logSentEmail(record: SentEmailRecord) {
  inMemorySentEmails = [record, ...inMemorySentEmails];
  try {
    const dir = path.dirname(EMAILS_LOG_FILE);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    fs.writeFileSync(EMAILS_LOG_FILE, JSON.stringify(inMemorySentEmails, null, 2), 'utf8');
  } catch (err) {
    console.warn('[Node Sender] Could not write sent-emails.json (normal in read-only serverless):', err);
  }
}

/**
 * Resolves email configuration:
 * 1. Resend API Key (Direct high-speed HTTP dispatch, recommended for Vercel)
 * 2. SMTP Environment Variables (Nodemailer)
 * 3. Simulated Fallback (Logs payload safely)
 */
export async function createNodeTransporter() {
  const resendApiKey = process.env.RESEND_API_KEY;
  if (resendApiKey) {
    return {
      mode: 'resend' as const,
      apiKey: resendApiKey,
      transporter: null,
      from: process.env.EMAIL_FROM || '"هاكاثون الابتكار والتطوع" <hackathon@acsociety.club>',
    };
  }

  const host = process.env.SMTP_HOST;
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;
  const port = Number(process.env.SMTP_PORT) || 587;
  const secure = process.env.SMTP_SECURE === 'true' || port === 465;

  if (host && user && pass) {
    return {
      mode: 'smtp' as const,
      apiKey: null,
      transporter: nodemailer.createTransport({
        host,
        port,
        secure,
        auth: { user, pass },
        tls: {
          rejectUnauthorized: false,
        }
      }),
      from: process.env.EMAIL_FROM || `"هاكاثون الابتكار والتطوع" <${user}>`,
    };
  }

  // Fallback: simulated delivery
  return {
    mode: 'simulated' as const,
    apiKey: null,
    transporter: null,
    from: process.env.EMAIL_FROM || '"هاكاثون الابتكار والتطوع" <no-reply@hackathon.dz>',
  };
}

export interface SendConfirmationEmailParams {
  to: string;
  leaderName: string;
  teamName: string;
  registrationNumber: string;
  trackName: string;
  wilayaName: string;
  categoryLabel?: string;
  facilityName?: string;
}

export async function sendRegistrationConfirmationEmail(params: SendConfirmationEmailParams): Promise<{
  success: boolean;
  mode: string;
  messageId?: string;
  previewUrl?: string;
  error?: string;
}> {
  const {
    to,
    leaderName,
    teamName,
    registrationNumber,
    trackName,
    wilayaName,
    categoryLabel = 'نوادي التطوع والمواطنة',
    facilityName = 'دار الشباب / المركب الرياضي الجواري',
  } = params;

  const subject = `تأكيد تسجيل الفريق [${registrationNumber}] - الهاكاثون الوطني للابتكار والتطوع`;

  const htmlContent = `
<!DOCTYPE html>
<html dir="rtl" lang="ar">
<head>
  <meta charset="utf-8">
  <title>${subject}</title>
  <style>
    body { font-family: 'Segoe UI', Tahoma, Arial, sans-serif; background-color: #FBF9FC; margin: 0; padding: 20px; color: #1F1A26; direction: rtl; text-align: right; }
    .container { max-width: 650px; margin: 0 auto; background: #ffffff; border: 2px solid #1F1A26; box-shadow: -8px 8px 0px #000000; padding: 32px; }
    .header { text-align: center; border-bottom: 2px solid #1F1A26; padding-bottom: 20px; margin-bottom: 24px; }
    .tag { display: inline-block; background: #CD0000; color: #ffffff; padding: 4px 14px; font-weight: bold; font-size: 13px; margin-bottom: 10px; }
    .title { font-size: 26px; font-weight: 800; color: #213D2E; margin: 0; }
    .badge { background: #5FAE84; color: #ffffff; padding: 12px 20px; font-size: 20px; font-weight: 800; text-align: center; border: 1.5px solid #1F1A26; margin: 20px 0; }
    .table-details { width: 100%; border-collapse: collapse; margin: 20px 0; }
    .table-details td { padding: 12px 14px; border: 1px solid #e2e8f0; font-size: 15px; }
    .table-details td.label { font-weight: bold; background: #f8fafc; width: 35%; color: #0f172a; }
    .box { background: #f1f5f9; border-right: 4px solid #5FAE84; padding: 16px; margin: 20px 0; }
    .footer { text-align: center; border-top: 1px solid #e2e8f0; padding-top: 20px; margin-top: 30px; font-size: 13px; color: #64748b; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <div class="tag">الجمهورية الجزائرية الديمقراطية الشعبية</div>
      <h1 class="title">الهاكاثون الوطني للابتكار والتطوع 2026</h1>
      <p style="color: #64748b; margin: 6px 0 0 0;">وزارة الشباب والرياضة | المجلس الأعلى للشباب | ولاية الجزائر</p>
    </div>

    <p style="font-size: 17px; line-height: 1.6;">
      مرحباً <strong>${leaderName}</strong>،<br>
      تهانينا! تم تسجيل فريقكم بنجاح للمشاركة في المرحلة الولائية والوطنية من هاكاثون الابتكار والتطوع.
    </p>

    <div class="badge">
      رقم التسجيل الرسمي: ${registrationNumber}
    </div>

    <h3 style="color: #213D2E; border-bottom: 1px solid #cbd5e1; padding-bottom: 8px;">بيانات استمارة المشاركة:</h3>
    <table class="table-details">
      <tr>
        <td class="label">اسم الفريق:</td>
        <td><strong>${teamName}</strong></td>
      </tr>
      <tr>
        <td class="label">قائد الفريق:</td>
        <td>${leaderName}</td>
      </tr>
      <tr>
        <td class="label">البريد الإلكتروني:</td>
        <td dir="ltr" style="text-align: right;">${to}</td>
      </tr>
      <tr>
        <td class="label">المسار التنافسي:</td>
        <td>${trackName}</td>
      </tr>
      <tr>
        <td class="label">الولاية والمؤسسة:</td>
        <td>${wilayaName} - ${facilityName}</td>
      </tr>
      <tr>
        <td class="label">فئة المشاركة:</td>
        <td>${categoryLabel}</td>
      </tr>
      <tr>
        <td class="label">تاريخ ووقت التسجيل:</td>
        <td>${new Date().toLocaleString('ar-DZ', { timeZone: 'Africa/Algiers' })}</td>
      </tr>
    </table>

    <div class="box">
      <h4 style="margin: 0 0 8px 0; color: #213D2E;">الخطوات القادمة للمشاركين:</h4>
      <ul style="margin: 0; padding-right: 20px; line-height: 1.8;">
        <li>سيقوم منسق الولاية بالتواصل معكم لتأكيد الحضور في التصفيات الولائية.</li>
        <li>يرجى تجهيز بطاقة التعريف الوطنية لجميع أعضاء الفريق يوم انطلاق الفعالية.</li>
        <li>سنرسل لكم رابط قناة التلغرام الرسمية وجدول ورشات التدريب التوجيهية قريباً.</li>
      </ul>
    </div>

    <div class="footer">
      <p>هذه الرسالة آلية تم إنشاؤها وتأكيدها بواسطة المنصة الرقمية الرسمية للهاكاثون (Resend & Node Sender).</p>
      <p>© 2026 اللجنة الوطنية لتنظيم هاكاثون الابتكار والتطوع - جميع الحقوق محفوظة.</p>
    </div>
  </div>
</body>
</html>
  `;

  const recordId = `mail-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`;

  try {
    const config = await createNodeTransporter();

    // 1. Resend Dispatch
    if (config.mode === 'resend' && config.apiKey) {
      const res = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${config.apiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          from: config.from,
          to: [to],
          subject,
          html: htmlContent,
        }),
      });

      const resData = await res.json();
      if (!res.ok) {
        throw new Error(resData?.message || `Resend API Error (HTTP ${res.status})`);
      }

      const logRecord: SentEmailRecord = {
        id: recordId,
        to,
        from: config.from,
        subject,
        registrationNumber,
        teamName,
        leaderName,
        status: 'delivered_resend',
        mode: 'resend',
        messageId: resData?.id,
        sentAt: new Date().toISOString(),
        htmlPreview: htmlContent.slice(0, 500) + '...',
      };
      logSentEmail(logRecord);

      return {
        success: true,
        mode: 'resend',
        messageId: resData?.id,
      };
    }

    // 2. SMTP Dispatch
    if (config.mode === 'smtp' && config.transporter) {
      const info = await config.transporter.sendMail({
        from: config.from,
        to,
        subject,
        html: htmlContent,
      });

      const logRecord: SentEmailRecord = {
        id: recordId,
        to,
        from: config.from,
        subject,
        registrationNumber,
        teamName,
        leaderName,
        status: 'delivered_smtp',
        mode: 'smtp',
        messageId: info.messageId,
        sentAt: new Date().toISOString(),
        htmlPreview: htmlContent.slice(0, 500) + '...',
      };
      logSentEmail(logRecord);

      return {
        success: true,
        mode: 'smtp',
        messageId: info.messageId,
      };
    }

    // 3. Fallback: Log simulated dispatch
    console.log(`[Node Sender] Simulated dispatch for ${to} (${registrationNumber})`);
    const logRecord: SentEmailRecord = {
      id: recordId,
      to,
      from: config.from,
      subject,
      registrationNumber,
      teamName,
      leaderName,
      status: 'simulated_success',
      mode: 'simulated',
      messageId: `<simulated-${recordId}@hackathon.dz>`,
      sentAt: new Date().toISOString(),
      htmlPreview: htmlContent,
    };
    logSentEmail(logRecord);

    return {
      success: true,
      mode: 'simulated',
      messageId: logRecord.messageId,
    };
  } catch (err: any) {
    console.error('[Node Sender] Error dispatching email:', err);
    const logRecord: SentEmailRecord = {
      id: recordId,
      to,
      from: 'no-reply@hackathon.dz',
      subject,
      registrationNumber,
      teamName,
      leaderName,
      status: 'failed',
      mode: 'smtp',
      sentAt: new Date().toISOString(),
      error: err?.message || String(err),
    };
    logSentEmail(logRecord);

    return {
      success: false,
      mode: 'failed',
      error: err?.message || 'Error dispatching email',
    };
  }
}
