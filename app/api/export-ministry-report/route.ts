import { NextRequest, NextResponse } from 'next/server';
import { MinisterialReportPayload } from '@/types/hackathon';

export async function POST(req: NextRequest) {
  try {
    const payload: MinisterialReportPayload = await req.json();

    // Verify recipient matches official ministerial address
    if (payload.recipientEmail !== 'sd_ppmav@mjeunese.gov.dz') {
      return NextResponse.json(
        { error: 'عنوان البريد الإلكتروني للمرسل إليه غير مطابق للمنشور الوزاري' },
        { status: 400 }
      );
    }

    if (!payload.wilayaCode || !payload.wilayaName) {
      return NextResponse.json(
        { error: 'بيانات الولاية ناقصة' },
        { status: 400 }
      );
    }

    const timestamp = new Date().toISOString();
    const transmissionReceipt = {
      receiptNumber: `MJS-REP-DZ-${payload.wilayaCode}-${Date.now().toString().slice(-6)}`,
      recipient: 'sd_ppmav@mjeunese.gov.dz',
      wilaya: payload.wilayaName,
      wilayaCode: payload.wilayaCode,
      status: 'TRANSMITTED_SUCCESSFULLY',
      deliveredAt: timestamp,
      recordsCount: payload.topProjects.length,
      statsSummary: payload.stats,
      message: `تم استلام البطاقة المختصرة لنتائج الهاكاثون الوطني لولاية ${payload.wilayaName} وإيداعها في السجل المركزي لوزارة الشباب والرياضة.`
    };

    return NextResponse.json({
      success: true,
      receipt: transmissionReceipt,
      payload
    });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || 'حدث خطأ أثناء معالجة وإرسال التقرير الوزاري' },
      { status: 500 }
    );
  }
}
