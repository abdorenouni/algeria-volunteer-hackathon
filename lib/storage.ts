import { Team, JuryEvaluation, MinisterialReportPayload } from '@/types/hackathon';
import { INITIAL_TEAMS } from '@/data/mock-teams';
import { WILAYAS } from '@/data/wilayas';

const STORAGE_KEY_TEAMS = 'hackathon_teams_v1';
const STORAGE_KEY_REPORTS = 'hackathon_ministry_reports_v1';

export function getStoredTeams(): Team[] {
  if (typeof window === 'undefined') return INITIAL_TEAMS;
  try {
    const raw = localStorage.getItem(STORAGE_KEY_TEAMS);
    if (!raw) {
      localStorage.setItem(STORAGE_KEY_TEAMS, JSON.stringify(INITIAL_TEAMS));
      return INITIAL_TEAMS;
    }
    return JSON.parse(raw);
  } catch {
    return INITIAL_TEAMS;
  }
}

export function saveTeam(team: Team): Team[] {
  const teams = getStoredTeams();
  const existingIdx = teams.findIndex((t) => t.id === team.id);
  let updated: Team[];
  if (existingIdx >= 0) {
    updated = [...teams];
    updated[existingIdx] = team;
  } else {
    updated = [team, ...teams];
  }
  if (typeof window !== 'undefined') {
    localStorage.setItem(STORAGE_KEY_TEAMS, JSON.stringify(updated));
    window.dispatchEvent(new Event('hackathon_teams_updated'));
  }
  return updated;
}

export function saveEvaluation(teamId: string, evaluation: JuryEvaluation): Team[] {
  const teams = getStoredTeams();
  const updated = teams.map((t) => {
    if (t.id === teamId) {
      return {
        ...t,
        status: 'evaluated' as const,
        evaluation
      };
    }
    return t;
  });
  if (typeof window !== 'undefined') {
    localStorage.setItem(STORAGE_KEY_TEAMS, JSON.stringify(updated));
    window.dispatchEvent(new Event('hackathon_teams_updated'));
  }
  return updated;
}

export function resetToDefaultTeams(): Team[] {
  if (typeof window !== 'undefined') {
    localStorage.setItem(STORAGE_KEY_TEAMS, JSON.stringify(INITIAL_TEAMS));
    window.dispatchEvent(new Event('hackathon_teams_updated'));
  }
  return INITIAL_TEAMS;
}

export function getTeamsByWilaya(wilayaCode: number): Team[] {
  const teams = getStoredTeams();
  return teams.filter((t) => t.wilayaCode === wilayaCode);
}

export function getTopProjectsForWilaya(wilayaCode: number, limit = 3): Team[] {
  const teams = getTeamsByWilaya(wilayaCode);
  // Sort by evaluation total score descending
  return teams
    .filter((t) => t.evaluation && t.evaluation.totalScore > 0)
    .sort((a, b) => (b.evaluation?.totalScore || 0) - (a.evaluation?.totalScore || 0))
    .slice(0, limit);
}

export function getStoredReports(): MinisterialReportPayload[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY_REPORTS);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function saveReport(report: MinisterialReportPayload): void {
  if (typeof window === 'undefined') return;
  const reports = getStoredReports();
  const filtered = reports.filter((r) => r.reportId !== report.reportId);
  const updated = [report, ...filtered];
  localStorage.setItem(STORAGE_KEY_REPORTS, JSON.stringify(updated));
}
