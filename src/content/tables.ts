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
  updated: "7 October 2026",
  source: { name: "Northern Counties East League", url: "https://www.ncefl.org.uk/tables/" },
  logo: { src: "/images/ncel-logo.webp", width: 132, height: 160, alt: "Macron Northern Counties East Football League" },
  ownTeam: "Pickering Town",
  zones: { promotion: 1, playoffs: 5, relegation: 2 },
  rows: [
    { team: "Dearne & District", played: 13, won: 9, drawn: 1, lost: 3, goalsFor: 30, goalsAgainst: 15, goalDifference: 15, points: 28 },
    { team: "Bottesford Town", played: 13, won: 8, drawn: 3, lost: 2, goalsFor: 33, goalsAgainst: 10, goalDifference: 23, points: 27 },
    { team: "Retford United", played: 15, won: 6, drawn: 5, lost: 4, goalsFor: 24, goalsAgainst: 17, goalDifference: 7, points: 23 },
    { team: "Retford FC", played: 13, won: 6, drawn: 4, lost: 3, goalsFor: 22, goalsAgainst: 19, goalDifference: 3, points: 22 },
    { team: "Horbury Town", played: 12, won: 6, drawn: 3, lost: 3, goalsFor: 21, goalsAgainst: 12, goalDifference: 9, points: 21 },
    { team: "Knaresborough Town", played: 11, won: 6, drawn: 2, lost: 3, goalsFor: 27, goalsAgainst: 19, goalDifference: 8, points: 20 },
    { team: "Worsbrough Bridge Athletic", played: 12, won: 6, drawn: 2, lost: 4, goalsFor: 24, goalsAgainst: 17, goalDifference: 7, points: 20 },
    { team: "Barton Town", played: 9, won: 6, drawn: 1, lost: 2, goalsFor: 19, goalsAgainst: 8, goalDifference: 11, points: 19 },
    { team: "Campion", played: 13, won: 6, drawn: 1, lost: 6, goalsFor: 26, goalsAgainst: 24, goalDifference: 2, points: 19 },
    { team: "Handsworth", played: 12, won: 5, drawn: 4, lost: 3, goalsFor: 23, goalsAgainst: 24, goalDifference: -1, points: 19 },
    { team: "Pickering Town", played: 13, won: 6, drawn: 1, lost: 6, goalsFor: 22, goalsAgainst: 25, goalDifference: -3, points: 19 },
    { team: "Rossington Main", played: 12, won: 4, drawn: 6, lost: 2, goalsFor: 18, goalsAgainst: 11, goalDifference: 7, points: 18 },
    { team: "Albion Sports", played: 15, won: 5, drawn: 2, lost: 8, goalsFor: 25, goalsAgainst: 27, goalDifference: -2, points: 17 },
    { team: "Penistone Church", played: 12, won: 4, drawn: 3, lost: 5, goalsFor: 20, goalsAgainst: 19, goalDifference: 1, points: 15 },
    { team: "Golcar United", played: 10, won: 3, drawn: 3, lost: 4, goalsFor: 19, goalsAgainst: 17, goalDifference: 2, points: 12 },
    { team: "Thackley", played: 14, won: 2, drawn: 5, lost: 7, goalsFor: 17, goalsAgainst: 26, goalDifference: -9, points: 11 },
    { team: "Tadcaster Albion", played: 11, won: 2, drawn: 5, lost: 4, goalsFor: 11, goalsAgainst: 20, goalDifference: -9, points: 11 },
    { team: "Parkgate", played: 13, won: 3, drawn: 2, lost: 8, goalsFor: 9, goalsAgainst: 30, goalDifference: -21, points: 11 },
    { team: "Frickley Athletic", played: 12, won: 2, drawn: 3, lost: 7, goalsFor: 18, goalsAgainst: 22, goalDifference: -4, points: 9 },
    { team: "Keighley Town", played: 13, won: 0, drawn: 2, lost: 11, goalsFor: 8, goalsAgainst: 54, goalDifference: -46, points: 2 },
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
