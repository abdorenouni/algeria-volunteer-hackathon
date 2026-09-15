import { NextRequest, NextResponse } from 'next/server';
import { getSentEmails, sendRegistrationConfirmationEmail, createNodeTransporter } from '@/lib/mailer';

// GET /api/send-email -> returns status of node mail sender and history of sent emails
export async function GET() {
  try {
    const emails = getSentEmails();
    const transportInfo = await createNodeTransporter();

    return NextResponse.json({
      success: true,
      status: 'active',
      mode: transportInfo.mode,
      from: transportInfo.from,
      count: emails.length,
      emails,
    }, {
      headers: { 'Cache-Control': 'no-store, max-age=0' }
    });
  } catch (err: any) {
    return NextResponse.json({
      success: false,
      error: err?.message || 'Error checking node sender status',
    }, { status: 500 });
  }
}

// POST /api/send-email -> test endpoint to send email directly via Node sender
export async function POST(req: NextRequest) {
  try {
    let body: any = {};
    try {
      body = await req.json();
    } catch {
      body = {};
    }

    const to = body.to || 'tester@hackathon.dz';
    const leaderName = body.leaderName || 'قائد الفريق المبتكر';
    const teamName = body.teamName || 'فريق التطوع والابتكار';
    const registrationNumber = body.registrationNumber || `DZ-2026-16-${Math.floor(100 + Math.random() * 900)}`;
    const trackName = body.trackName || 'تطوير المنصات الرقمية لخدمة العمل التطوعي';
    const wilayaName = body.wilayaName || 'الجزائر العاصمة';

    const result = await sendRegistrationConfirmationEmail({
      to,
      leaderName,
      teamName,
      registrationNumber,
      trackName,
      wilayaName,
    });

    return NextResponse.json({
      success: result.success,
      message: result.success ? 'تم إرسال بريد التأكيد بنجاح بواسطة Node Sender' : 'فشل إرسال البريد',
      details: result,
    }, { status: result.success ? 200 : 500 });
  } catch (err: any) {
    return NextResponse.json({
      success: false,
      error: err?.message || 'Internal server error in Node Sender',
    }, { status: 500 });
  }
}
