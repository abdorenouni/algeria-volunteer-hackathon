import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import { Team, TargetCategory } from '@/types/hackathon';
import { getWilayaByCode } from '@/data/wilayas';

const DATA_FILE = path.join(process.cwd(), 'data', 'registered-teams.json');

// In-memory fallback for serverless runtimes (Vercel)
let inMemoryTeams: Team[] = [];

function loadTeams(): Team[] {
  try {
    if (fs.existsSync(DATA_FILE)) {
      const content = fs.readFileSync(DATA_FILE, 'utf8');
      const parsed = JSON.parse(content);
      if (Array.isArray(parsed)) {
        return parsed;
      }
    }
  } catch (err) {
    console.warn('Could not read registered-teams.json, using in-memory store:', err);
  }
  return inMemoryTeams;
}

function persistTeams(teams: Team[]) {
  inMemoryTeams = teams;
  try {
    const dir = path.dirname(DATA_FILE);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    fs.writeFileSync(DATA_FILE, JSON.stringify(teams, null, 2), 'utf8');
  } catch (err) {
    console.warn('Could not write to registered-teams.json (normal in read-only serverless):', err);
  }
}

// GET /api/register -> returns all registered teams
export async function GET() {
  const teams = loadTeams();
  return NextResponse.json({
    success: true,
    count: teams.length,
    teams,
  }, {
    headers: {
      'Cache-Control': 'no-store, max-age=0',
    }
  });
}

// POST /api/register -> adds a newly registered team
export async function POST(req: NextRequest) {
  try {
    let body: any = {};
    try {
      body = await req.json();
    } catch {
      body = {};
    }

    const name = (body.name && String(body.name).trim()) || 'فريق الابتكار الميداني';
    const facilityName = (body.facilityName && String(body.facilityName).trim()) || 'دار الشباب أو المركب الرياضي الجواري';
    const category = body.category || 'clubs';
    const projectTitle = (body.projectTitle && String(body.projectTitle).trim()) || 'منصة تطوع-تك لحملات الأحياء';
    const projectSummary = (body.projectSummary && String(body.projectSummary).trim()) || projectTitle;
    const trackId = Number(body.trackId) >= 1 && Number(body.trackId) <= 5 ? Number(body.trackId) : 1;
    const wilayaCode = Number(body.wilayaCode) || 16;
    const leaderBirthDate = body.leaderBirthDate || '2006/08/21';
    const leaderName = (body.leaderName && String(body.leaderName).trim()) || (body.members?.[0]?.fullName && String(body.members[0].fullName).trim()) || 'قائد الفريق';
    const leaderEmail = (body.leaderEmail && String(body.leaderEmail).trim()) || (body.members?.[0]?.email && String(body.members[0].email).trim()) || 'leader@hackathon.dz';

    const currentWilaya = getWilayaByCode(wilayaCode);
    const wilayaStr = wilayaCode < 10 ? `0${wilayaCode}` : `${wilayaCode}`;
    const randomSuffix = Math.floor(100 + Math.random() * 900);
    const registrationNumber = `DZ-2026-${wilayaStr}-${randomSuffix}`;

    // Ensure 3 to 5 sanitized members
    const rawMembers = Array.isArray(body.members) && body.members.length > 0 ? body.members : [];
    const sanitizedMembers = [
      {
        id: 'm-1',
        fullName: leaderName,
        phone: rawMembers[0]?.phone || '0555000000',
        email: leaderEmail,
        idCardNumber: rawMembers[0]?.idCardNumber || '12345678',
        role: 'قائد الفريق',
      },
      {
        id: 'm-2',
        fullName: rawMembers[1]?.fullName || 'عضو الفريق 2',
        phone: rawMembers[1]?.phone || '0666000000',
        email: rawMembers[1]?.email || 'member2@hackathon.dz',
        idCardNumber: rawMembers[1]?.idCardNumber || '12345679',
        role: 'مطور / مبرمج',
      },
      {
        id: 'm-3',
        fullName: rawMembers[2]?.fullName || 'عضو الفريق 3',
        phone: rawMembers[2]?.phone || '0777000000',
        email: rawMembers[2]?.email || 'member3@hackathon.dz',
        idCardNumber: rawMembers[2]?.idCardNumber || '12345680',
        role: 'مصمم / مسوق',
      },
      ...(rawMembers.slice(3, 5).map((m: any, idx: number) => ({
        id: m.id || `m-${idx + 4}`,
        fullName: m.fullName || `عضو الفريق ${idx + 4}`,
        phone: m.phone || '0555000000',
        email: m.email || `member${idx + 4}@hackathon.dz`,
        idCardNumber: m.idCardNumber || '00000000',
        role: m.role || 'منسق ميداني',
      })))
    ];

    const newTeam: Team = {
      id: `team-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
      registrationNumber,
      name,
      projectTitle,
      projectSummary,
      trackId: trackId as 1 | 2 | 3 | 4 | 5,
      wilayaCode,
      wilayaName: currentWilaya ? currentWilaya.nameAr : `ولاية ${wilayaCode}`,
      facilityName,
      category: category as TargetCategory,
      categoryLabel:
        category === 'clubs'
          ? 'نوادي التطوع والمواطنة'
          : category === 'associations'
          ? 'الجمعيات والمنظمات الشبابية'
          : 'الشباب المنخرطون والمبتكرون',
      members: sanitizedMembers,
      createdAt: new Date().toISOString(),
      status: 'registered',
    };

    const existingTeams = loadTeams();
    const updatedTeams = [newTeam, ...existingTeams];
    persistTeams(updatedTeams);

    return NextResponse.json({
      success: true,
      message: 'تم تسجيل الفريق بنجاح في المنصة الرسمية للهاكاثون',
      team: newTeam,
    }, { status: 200 });
  } catch (err: any) {
    console.error('Registration API error:', err);
    return NextResponse.json({
      success: false,
      error: 'حدث خطأ غير متوقع أثناء معالجة طلب التسجيل',
      details: String(err?.message || err),
    }, { status: 500 });
  }
}
