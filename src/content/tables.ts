/**
 * League tables, one per team, shown on the Table page (and the first team's on the home page).
 * To update one, copy the rows from the league's website in order and change `updated`.
 * W/D/L and goals are optional: the columns only show when every row has them.
 */
export type TableRow = {
  team: string;
  played: number;
  won?: number;
  drawn?: number;
  lost?: number;
  goalsFor?: number;
  goalsAgainst?: number;
  goalDifference: number;
  points: number;
};

export type LeagueTableData = {
  /** Tab label on the Table page. */
  label: string;
  title: string;
  /** When the rows were copied from the league's website. */
  updated: string;
  source: { name: string; url: string };
  /** The club's own row, matched by name and highlighted. */
  ownTeam: string;
  /** Coloured markers: top `promotion`, then play-offs down to `playoffs`, bottom `relegation`. 0 = none. */
  zones: { promotion: number; playoffs: number; relegation: number };
  rows: TableRow[];
};

export const firstTeamTable: LeagueTableData = {
  label: "First Team",
  title: "NCEL Premier Division 2026–27",
  updated: "24 September 2026",
  source: { name: "Northern Counties East League", url: "https://www.ncefl.org.uk/tables/" },
  ownTeam: "Pickering Town",
  zones: { promotion: 1, playoffs: 5, relegation: 2 },
  rows: [
    { team: "Dearne & District", played: 10, goalDifference: 15, points: 24 },
    { team: "Bottesford Town", played: 9, goalDifference: 21, points: 21 },
    { team: "Retford United", played: 12, goalDifference: 3, points: 19 },
    { team: "Worsbrough Bridge Athletic", played: 8, goalDifference: 11, points: 16 },
    { team: "Knaresborough Town", played: 8, goalDifference: 8, points: 16 },
    { team: "Retford FC", played: 10, goalDifference: 1, points: 16 },
    { team: "Handsworth", played: 9, goalDifference: -1, points: 15 },
    { team: "Barton Town", played: 6, goalDifference: 6, points: 13 },
    { team: "Albion Sports", played: 11, goalDifference: 2, points: 13 },
    { team: "Pickering Town", played: 10, goalDifference: -1, points: 13 },
    { team: "Campion AFC", played: 10, goalDifference: -2, points: 13 },
    { team: "Golcar United", played: 8, goalDifference: 5, points: 12 },
    { team: "Penistone Church", played: 9, goalDifference: 0, points: 12 },
    { team: "Horbury Town", played: 8, goalDifference: 3, points: 11 },
    { team: "Rossington Main", played: 9, goalDifference: 2, points: 11 },
    { team: "Thackley", played: 11, goalDifference: 0, points: 11 },
    { team: "Tadcaster Albion", played: 8, goalDifference: -9, points: 7 },
    { team: "Parkgate", played: 10, goalDifference: -18, points: 7 },
    { team: "Frickley Athletic", played: 9, goalDifference: -5, points: 5 },
    { team: "Keighley Town", played: 11, goalDifference: -41, points: 2 },
  ],
};

/** From FA Full-Time. CONFIRM the promotion/relegation places with the league (none marked for now). */
export const ladiesTable: LeagueTableData = {
  label: "Ladies",
  title: "North Riding Women's League Premier Division 2026–27",
  updated: "24 September 2026",
  source: { name: "FA Full-Time", url: "https://fulltime.thefa.com" },
  ownTeam: "Pickering Town Ladies",
  zones: { promotion: 0, playoffs: 0, relegation: 0 },
  rows: [
    { team: "Middlesbrough Girls Senior", played: 3, won: 3, drawn: 0, lost: 0, goalsFor: 12, goalsAgainst: 5, goalDifference: 7, points: 9 },
    { team: "Boro Rangers Juniors Women", played: 2, won: 1, drawn: 0, lost: 1, goalsFor: 8, goalsAgainst: 5, goalDifference: 3, points: 3 },
    { team: "Northallerton Town Women", played: 2, won: 1, drawn: 0, lost: 1, goalsFor: 7, goalsAgainst: 5, goalDifference: 2, points: 3 },
    { team: "T.I.B.S Women", played: 2, won: 1, drawn: 0, lost: 1, goalsFor: 6, goalsAgainst: 4, goalDifference: 2, points: 3 },
    { team: "Redcar Athletic Ladies", played: 1, won: 1, drawn: 0, lost: 0, goalsFor: 3, goalsAgainst: 2, goalDifference: 1, points: 3 },
    { team: "Wigginton Grasshoppers Ladies", played: 2, won: 0, drawn: 1, lost: 1, goalsFor: 6, goalsAgainst: 7, goalDifference: -1, points: 1 },
    { team: "Guisborough Town Ladies", played: 2, won: 0, drawn: 1, lost: 1, goalsFor: 5, goalsAgainst: 10, goalDifference: -5, points: 1 },
    { team: "Pickering Town Ladies", played: 2, won: 0, drawn: 0, lost: 2, goalsFor: 2, goalsAgainst: 11, goalDifference: -9, points: 0 },
  ],
};

export const leagueTables = [firstTeamTable, ladiesTable];
