/**
 * League tables, one per team, shown on the Table page (and the first team's on the home page).
 * The first team's table is kept up to date from the NCEL website by scripts/sync-league.mjs. To update another,
 * copy the rows from the league's website in order and change `updated`.
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
  /** The league's logo (on a white tile, as it has black lettering), linked to `source`. */
  logo?: { src: string; width: number; height: number; alt: string };
  /** The club's own row, matched by name and highlighted. */
  ownTeam: string;
  /** Coloured markers: top `promotion`, then play-offs down to `playoffs`, bottom `relegation`. 0 = none. */
  zones: { promotion: number; playoffs: number; relegation: number };
  rows: TableRow[];
};

export const firstTeamTable: LeagueTableData = {
  label: "First Team",
  title: "NCEL Premier Division 2026–27",
  updated: "31 October 2026",
  source: { name: "Northern Counties East League", url: "https://www.ncefl.org.uk/tables/" },
  logo: { src: "/images/ncel-logo.webp", width: 132, height: 160, alt: "Macron Northern Counties East Football League" },
  ownTeam: "Pickering Town",
  zones: { promotion: 1, playoffs: 5, relegation: 2 },
  rows: [
    { team: "Dearne & District", played: 18, won: 12, drawn: 2, lost: 4, goalsFor: 45, goalsAgainst: 23, goalDifference: 22, points: 38 },
    { team: "Barton Town", played: 14, won: 9, drawn: 2, lost: 3, goalsFor: 28, goalsAgainst: 12, goalDifference: 16, points: 29 },
    { team: "Bottesford Town", played: 15, won: 8, drawn: 4, lost: 3, goalsFor: 36, goalsAgainst: 15, goalDifference: 21, points: 28 },
    { team: "Retford FC", played: 15, won: 8, drawn: 4, lost: 3, goalsFor: 29, goalsAgainst: 22, goalDifference: 7, points: 28 },
    { team: "Retford United", played: 17, won: 7, drawn: 6, lost: 4, goalsFor: 28, goalsAgainst: 20, goalDifference: 8, points: 27 },
    { team: "Campion", played: 17, won: 8, drawn: 3, lost: 6, goalsFor: 30, goalsAgainst: 26, goalDifference: 4, points: 27 },
    { team: "Handsworth", played: 16, won: 7, drawn: 5, lost: 4, goalsFor: 30, goalsAgainst: 29, goalDifference: 1, points: 26 },
    { team: "Horbury Town", played: 16, won: 7, drawn: 4, lost: 5, goalsFor: 25, goalsAgainst: 17, goalDifference: 8, points: 25 },
    { team: "Knaresborough Town", played: 16, won: 7, drawn: 4, lost: 5, goalsFor: 32, goalsAgainst: 28, goalDifference: 4, points: 25 },
    { team: "Thackley", played: 18, won: 6, drawn: 5, lost: 7, goalsFor: 31, goalsAgainst: 29, goalDifference: 2, points: 23 },
    { team: "Rossington Main", played: 16, won: 5, drawn: 7, lost: 4, goalsFor: 24, goalsAgainst: 20, goalDifference: 4, points: 22 },
    { team: "Penistone Church", played: 17, won: 6, drawn: 4, lost: 7, goalsFor: 29, goalsAgainst: 29, goalDifference: 0, points: 22 },
    { team: "Albion Sports", played: 18, won: 6, drawn: 3, lost: 9, goalsFor: 28, goalsAgainst: 31, goalDifference: -3, points: 21 },
    { team: "Pickering Town", played: 17, won: 6, drawn: 3, lost: 8, goalsFor: 24, goalsAgainst: 32, goalDifference: -8, points: 21 },
    { team: "Worsbrough Bridge Athletic", played: 15, won: 6, drawn: 2, lost: 7, goalsFor: 27, goalsAgainst: 24, goalDifference: 3, points: 20 },
    { team: "Golcar United", played: 15, won: 5, drawn: 4, lost: 6, goalsFor: 31, goalsAgainst: 27, goalDifference: 4, points: 19 },
    { team: "Frickley Athletic", played: 16, won: 5, drawn: 3, lost: 8, goalsFor: 27, goalsAgainst: 25, goalDifference: 2, points: 18 },
    { team: "Tadcaster Albion", played: 16, won: 3, drawn: 6, lost: 7, goalsFor: 16, goalsAgainst: 30, goalDifference: -14, points: 15 },
    { team: "Parkgate", played: 17, won: 4, drawn: 3, lost: 10, goalsFor: 18, goalsAgainst: 39, goalDifference: -21, points: 15 },
    { team: "Keighley Town", played: 17, won: 0, drawn: 2, lost: 15, goalsFor: 10, goalsAgainst: 70, goalDifference: -60, points: 2 },
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
