/**
 * Fixtures, results and the league table.
 *
 * SAMPLE DATA: apart from the rows marked "real", these are placeholders so every page can be designed and
 * tested. While `isSampleData` is true the site shows a small notice on the fixtures and table pages.
 * Replace the lists with the real season (or wire them to FA Full-Time, see the README), then set it to false.
 */
export const isSampleData = true;

export type TeamId = "first" | "ladies";

export const teamNames: Record<TeamId, string> = {
  first: "First Team",
  ladies: "Ladies",
};

export type Match = {
  id: string;
  /** Local kick-off time, ISO format without a timezone: "2026-09-26T15:00". */
  kickoff: string;
  team: TeamId;
  competition: string;
  opponent: string;
  venue: "H" | "A";
  /** [Pickering goals, opponent goals]. Leave out until the match is played. */
  score?: [number, number];
  attendance?: number;
  scorers?: string[];
};

export const matches: Match[] = [
  // Results
  { id: "m01", kickoff: "2026-08-08T15:00", team: "first", competition: "NCEL Premier", opponent: "Hallam", venue: "H", score: [2, 1] },
  { id: "m02", kickoff: "2026-08-12T19:45", team: "first", competition: "NCEL Premier", opponent: "Knaresborough Town", venue: "A", score: [1, 1] },
  { id: "m03", kickoff: "2026-08-15T15:00", team: "first", competition: "NCEL Premier", opponent: "Goole AFC", venue: "A", score: [0, 2] },
  { id: "m04", kickoff: "2026-08-22T15:00", team: "first", competition: "NCEL Premier", opponent: "Eccleshill United", venue: "H", score: [4, 1] },
  { id: "m05", kickoff: "2026-08-29T15:00", team: "first", competition: "NCEL Premier", opponent: "Emley AFC", venue: "A", score: [1, 2] },
  { id: "m06", kickoff: "2026-09-01T19:45", team: "first", competition: "NCEL Premier", opponent: "Barton Town", venue: "H", score: [2, 3] },
  { id: "m07", kickoff: "2026-09-05T15:00", team: "first", competition: "NCEL Premier", opponent: "Penistone Church", venue: "H", score: [5, 2] },
  { id: "m08", kickoff: "2026-09-08T19:45", team: "first", competition: "NCEL Premier", opponent: "Hemsworth MW", venue: "A", score: [0, 2] },
  // real: reported by the NCEL, attendance 224
  { id: "m09", kickoff: "2026-09-12T15:00", team: "first", competition: "NCEL Premier", opponent: "Golcar United", venue: "H", score: [3, 2], attendance: 224, scorers: ["Own goal", "George Brown", "Souleymane Coulibaly"] },
  // real: reported by the NCEL
  { id: "m10", kickoff: "2026-09-19T15:00", team: "first", competition: "NCEL Premier", opponent: "Bottesford Town", venue: "A", score: [0, 3] },
  { id: "l01", kickoff: "2026-09-06T14:00", team: "ladies", competition: "North Riding Women's Div 1", opponent: "Whitby Town Ladies", venue: "H", score: [2, 2] },
  { id: "l02", kickoff: "2026-09-20T14:00", team: "ladies", competition: "North Riding Women's Div 1", opponent: "Scarborough Athletic Ladies", venue: "A", score: [1, 3] },

  // Fixtures
  { id: "m11", kickoff: "2026-09-26T15:00", team: "first", competition: "NCEL Premier", opponent: "Winterton Rangers", venue: "H" },
  { id: "m12", kickoff: "2026-09-29T19:45", team: "first", competition: "NCEL League Cup", opponent: "Athersley Recreation", venue: "A" },
  { id: "m13", kickoff: "2026-10-03T15:00", team: "first", competition: "NCEL Premier", opponent: "Harrogate Railway Athletic", venue: "A" },
  { id: "m14", kickoff: "2026-10-10T15:00", team: "first", competition: "NCEL Premier", opponent: "Handsworth", venue: "H" },
  { id: "m15", kickoff: "2026-10-17T15:00", team: "first", competition: "North Riding Senior Cup", opponent: "Northallerton Town", venue: "H" },
  { id: "m16", kickoff: "2026-10-24T15:00", team: "first", competition: "NCEL Premier", opponent: "Hallam", venue: "A" },
  { id: "l03", kickoff: "2026-10-04T14:00", team: "ladies", competition: "North Riding Women's Div 1", opponent: "Malton & Norton Ladies", venue: "H" },
  { id: "l04", kickoff: "2026-10-18T14:00", team: "ladies", competition: "North Riding Women's Div 1", opponent: "Thirsk Falcons Ladies", venue: "A" },
];

export type TableRow = {
  team: string;
  played: number;
  won: number;
  drawn: number;
  lost: number;
  goalsFor: number;
  goalsAgainst: number;
  points: number;
};

export const tableTitle = "NCEL Premier Division 2026–27";

/** Rows in league order. The club's own row is matched by name and highlighted. */
export const leagueTable: TableRow[] = [
  { team: "Hemsworth MW", played: 10, won: 8, drawn: 1, lost: 1, goalsFor: 24, goalsAgainst: 9, points: 25 },
  { team: "Goole AFC", played: 10, won: 7, drawn: 2, lost: 1, goalsFor: 21, goalsAgainst: 8, points: 23 },
  { team: "Bottesford Town", played: 10, won: 7, drawn: 1, lost: 2, goalsFor: 22, goalsAgainst: 11, points: 22 },
  { team: "Emley AFC", played: 10, won: 6, drawn: 2, lost: 2, goalsFor: 19, goalsAgainst: 12, points: 20 },
  { team: "Barton Town", played: 10, won: 6, drawn: 1, lost: 3, goalsFor: 20, goalsAgainst: 14, points: 19 },
  { team: "Knaresborough Town", played: 10, won: 5, drawn: 3, lost: 2, goalsFor: 17, goalsAgainst: 12, points: 18 },
  { team: "Handsworth", played: 10, won: 5, drawn: 1, lost: 4, goalsFor: 16, goalsAgainst: 15, points: 16 },
  { team: "Winterton Rangers", played: 10, won: 4, drawn: 3, lost: 3, goalsFor: 15, goalsAgainst: 14, points: 15 },
  { team: "Harrogate Railway Athletic", played: 10, won: 4, drawn: 2, lost: 4, goalsFor: 16, goalsAgainst: 16, points: 14 },
  // real: 10th after 10 games, as published by the NCEL
  { team: "Pickering Town", played: 10, won: 4, drawn: 1, lost: 5, goalsFor: 18, goalsAgainst: 19, points: 13 },
  { team: "Athersley Recreation", played: 10, won: 3, drawn: 3, lost: 4, goalsFor: 13, goalsAgainst: 15, points: 12 },
  { team: "Penistone Church", played: 10, won: 3, drawn: 2, lost: 5, goalsFor: 14, goalsAgainst: 19, points: 11 },
  { team: "Hallam", played: 10, won: 3, drawn: 1, lost: 6, goalsFor: 12, goalsAgainst: 18, points: 10 },
  { team: "Eccleshill United", played: 10, won: 2, drawn: 3, lost: 5, goalsFor: 11, goalsAgainst: 17, points: 9 },
  { team: "Golcar United", played: 10, won: 2, drawn: 2, lost: 6, goalsFor: 12, goalsAgainst: 21, points: 8 },
  { team: "Thackley", played: 10, won: 1, drawn: 2, lost: 7, goalsFor: 8, goalsAgainst: 22, points: 5 },
];

export const ownTeamName = "Pickering Town";
/** Positions that go up / down, for the coloured markers on the table. CONFIRM for the current season. */
export const promotionPlaces = 1;
export const playoffPlaces = 5;
export const relegationPlaces = 2;
