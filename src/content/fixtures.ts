/**
 * Fixtures, results and the league table.
 *
 * FIRST TEAM: the club's real 2026–27 list. Scores are [Pickering goals, opponent goals].
 * Home or away is only filled in where it's confirmed; games without a `venue` show "H/A TBC" until it's added.
 *
 * PLACEHOLDERS: the ladies and U18 games, and the league table apart from Pickering's own row, are made up so
 * the pages can be designed. The site shows a notice wherever placeholders appear. Replace them (or wire the
 * pages to FA Full-Time, see the README) and update `placeholderTeams` / `isPlaceholderTable`.
 */
export const placeholderTeams: TeamId[] = ["ladies", "u18"];
export const isPlaceholderTable = true;

export type TeamId = "first" | "ladies" | "u18";

/** Tab and label names on the fixtures pages. */
export const teamNames: Record<TeamId, string> = {
  first: "First Team",
  ladies: "Ladies",
  u18: "U18",
};

/** How each side appears in a fixture line ("Pickering Town U18 v ..."). */
export const ourSideNames: Record<TeamId, string> = {
  first: "Pickering Town",
  ladies: "Pickering Town Ladies",
  u18: "Pickering Town U18",
};

export type Match = {
  id: string;
  /** Local kick-off time, ISO format without a timezone: "2026-09-26T15:00". */
  kickoff: string;
  team: TeamId;
  competition: string;
  opponent: string;
  /** "H" home, "A" away. Leave out while it's still to be confirmed. */
  venue?: "H" | "A";
  /** [Pickering goals, opponent goals]. Leave out until the match is played. */
  score?: [number, number];
  attendance?: number;
  scorers?: string[];
};

export const matches: Match[] = [
  // FIRST TEAM results (club's list). Times on played games are the usual kick-offs and aren't shown.
  { id: "f01", kickoff: "2026-07-25T15:00", team: "first", competition: "NCEL Premier", opponent: "Bottesford Town", venue: "A", score: [0, 3] },
  { id: "f02", kickoff: "2026-07-29T19:45", team: "first", competition: "NCEL Premier", opponent: "Retford United", venue: "H", score: [0, 2] },
  { id: "f03", kickoff: "2026-08-04T19:45", team: "first", competition: "NCEL Premier", opponent: "Worsbrough Bridge Athletic", score: [2, 3] },
  { id: "f04", kickoff: "2026-08-08T15:00", team: "first", competition: "Cup", opponent: "Crook Town", score: [0, 4] },
  { id: "f05", kickoff: "2026-08-11T19:45", team: "first", competition: "NCEL Premier", opponent: "Rossington Main", score: [1, 4] },
  { id: "f06", kickoff: "2026-08-15T15:00", team: "first", competition: "Cup", opponent: "Alnwick Town", score: [3, 1] },
  { id: "f07", kickoff: "2026-08-21T19:45", team: "first", competition: "NCEL Premier", opponent: "Golcar United", score: [3, 1] },
  { id: "f08", kickoff: "2026-08-25T19:45", team: "first", competition: "NCEL Premier", opponent: "Albion Sports", score: [0, 2] },
  { id: "f09", kickoff: "2026-08-28T19:45", team: "first", competition: "NCEL Premier", opponent: "Keighley Town", score: [4, 0] },
  { id: "f10", kickoff: "2026-09-08T19:45", team: "first", competition: "NCEL Premier", opponent: "Horbury Town", score: [3, 2] },
  { id: "f11", kickoff: "2026-09-11T19:45", team: "first", competition: "FA Vase", opponent: "Grangetown Boys Club", venue: "H", score: [3, 2] },
  { id: "f12", kickoff: "2026-09-15T19:45", team: "first", competition: "NCEL Premier", opponent: "Tadcaster Albion", venue: "A", score: [3, 0] },
  { id: "f13", kickoff: "2026-09-19T15:00", team: "first", competition: "NCEL Premier", opponent: "Penistone Church", venue: "A", score: [2, 2] },

  // FIRST TEAM fixtures (club's list). CONFIRM: home or away where `venue` is missing, and the cup competitions.
  { id: "f14", kickoff: "2026-09-26T15:00", team: "first", competition: "NCEL Premier", opponent: "Retford FC", venue: "H" },
  { id: "f15", kickoff: "2026-09-29T19:45", team: "first", competition: "NCEL Premier", opponent: "Barton Town" },
  { id: "f16", kickoff: "2026-10-03T15:00", team: "first", competition: "NCEL Premier", opponent: "Handsworth" },
  { id: "f17", kickoff: "2026-10-06T19:45", team: "first", competition: "NCEL Premier", opponent: "Dearne & District" },
  { id: "f18", kickoff: "2026-10-10T15:00", team: "first", competition: "FA Vase", opponent: "Holker Old Boys" },
  { id: "f19", kickoff: "2026-10-13T19:45", team: "first", competition: "Cup", opponent: "Dearne & District" },
  { id: "f20", kickoff: "2026-10-17T15:00", team: "first", competition: "NCEL Premier", opponent: "Parkgate" },
  { id: "f21", kickoff: "2026-10-24T15:00", team: "first", competition: "NCEL Premier", opponent: "Thackley" },
  { id: "f22", kickoff: "2026-10-31T15:00", team: "first", competition: "NCEL Premier", opponent: "Frickley Athletic" },
  { id: "f23", kickoff: "2026-11-07T15:00", team: "first", competition: "NCEL Premier", opponent: "Bottesford Town", venue: "H" },
  { id: "f24", kickoff: "2026-11-11T19:45", team: "first", competition: "NCEL Premier", opponent: "Campion AFC" },
  { id: "f25", kickoff: "2026-11-14T15:00", team: "first", competition: "NCEL Premier", opponent: "Retford United", venue: "A" },
  { id: "f26", kickoff: "2026-11-17T19:45", team: "first", competition: "NCEL Premier", opponent: "Knaresborough Town" },
  { id: "f27", kickoff: "2026-11-21T15:00", team: "first", competition: "NCEL Premier", opponent: "Worsbrough Bridge Athletic" },
  { id: "f28", kickoff: "2026-11-24T19:30", team: "first", competition: "Cup", opponent: "Redcar Athletic" },
  { id: "f29", kickoff: "2026-11-28T15:00", team: "first", competition: "NCEL Premier", opponent: "Rossington Main" },
  { id: "f30", kickoff: "2026-12-04T20:00", team: "first", competition: "NCEL Premier", opponent: "Golcar United" },
  { id: "f31", kickoff: "2026-12-12T15:00", team: "first", competition: "NCEL Premier", opponent: "Albion Sports" },
  { id: "f32", kickoff: "2026-12-19T15:00", team: "first", competition: "NCEL Premier", opponent: "Keighley Town" },
  { id: "f33", kickoff: "2027-01-02T13:30", team: "first", competition: "NCEL Premier", opponent: "Knaresborough Town" },
  { id: "f34", kickoff: "2027-01-09T15:00", team: "first", competition: "NCEL Premier", opponent: "Horbury Town" },
  { id: "f35", kickoff: "2027-01-16T15:00", team: "first", competition: "NCEL Premier", opponent: "Tadcaster Albion", venue: "H" },
  { id: "f36", kickoff: "2027-01-23T15:00", team: "first", competition: "NCEL Premier", opponent: "Penistone Church", venue: "H" },
  { id: "f37", kickoff: "2027-01-30T15:00", team: "first", competition: "NCEL Premier", opponent: "Retford FC", venue: "A" },
  { id: "f38", kickoff: "2027-02-06T15:00", team: "first", competition: "NCEL Premier", opponent: "Barton Town" },
  { id: "f39", kickoff: "2027-02-13T15:00", team: "first", competition: "NCEL Premier", opponent: "Handsworth" },
  { id: "f40", kickoff: "2027-02-20T15:00", team: "first", competition: "NCEL Premier", opponent: "Campion AFC" },
  { id: "f41", kickoff: "2027-02-27T15:00", team: "first", competition: "NCEL Premier", opponent: "Dearne & District" },
  { id: "f42", kickoff: "2027-03-13T15:00", team: "first", competition: "NCEL Premier", opponent: "Parkgate" },
  { id: "f43", kickoff: "2027-03-20T15:00", team: "first", competition: "NCEL Premier", opponent: "Thackley" },
  { id: "f44", kickoff: "2027-04-03T15:00", team: "first", competition: "NCEL Premier", opponent: "Frickley Athletic" },

  // PLACEHOLDERS: ladies and U18 games, to be replaced with the real lists.
  { id: "l01", kickoff: "2026-09-06T14:00", team: "ladies", competition: "North Riding Women's Div 1", opponent: "Whitby Town Ladies", venue: "H", score: [2, 2] },
  { id: "l02", kickoff: "2026-09-20T14:00", team: "ladies", competition: "North Riding Women's Div 1", opponent: "Scarborough Athletic Ladies", venue: "A", score: [1, 3] },
  { id: "y01", kickoff: "2026-09-13T10:30", team: "u18", competition: "U18 League", opponent: "Malton & Norton U18", venue: "H", score: [3, 1] },
  { id: "y02", kickoff: "2026-09-20T10:30", team: "u18", competition: "U18 League", opponent: "Scarborough Athletic U18", venue: "A", score: [2, 2] },
  { id: "l03", kickoff: "2026-10-04T14:00", team: "ladies", competition: "North Riding Women's Div 1", opponent: "Malton & Norton Ladies", venue: "H" },
  { id: "l04", kickoff: "2026-10-18T14:00", team: "ladies", competition: "North Riding Women's Div 1", opponent: "Thirsk Falcons Ladies", venue: "A" },
  { id: "y03", kickoff: "2026-09-27T10:30", team: "u18", competition: "U18 League", opponent: "Whitby Town U18", venue: "H" },
  { id: "y04", kickoff: "2026-10-04T10:30", team: "u18", competition: "U18 League", opponent: "Kirkbymoorside U18", venue: "A" },
  { id: "y05", kickoff: "2026-10-11T10:30", team: "u18", competition: "U18 Cup", opponent: "Helmsley U18", venue: "H" },
  { id: "y06", kickoff: "2026-10-25T10:30", team: "u18", competition: "U18 League", opponent: "Thirsk Falcons U18", venue: "A" },
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
