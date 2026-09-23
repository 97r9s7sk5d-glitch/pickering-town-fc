import { club, officials } from "./club";
import type { TeamId } from "./fixtures";

/**
 * The club's teams, shown on the Teams page. Add a fact (manager, training night, league) as { label, value }.
 * Anything marked "CONFIRM" should be checked by the club before launch.
 */
export type TeamFact = { label: string; value: string };

export type SeniorTeam = {
  id: TeamId;
  name: string;
  league: string;
  text: string;
  facts: TeamFact[];
};

const manager = officials.find((o) => o.role === "First-team manager");

export const seniorTeams: SeniorTeam[] = [
  {
    id: "first",
    name: "First Team",
    league: club.league,
    text: `The Pikes compete at ${club.step.toLowerCase()}, with home games at Mill Lane.`,
    facts: [...(manager ? [{ label: "Manager", value: manager.name }] : []), { label: "Level", value: "Step 5" }],
  },
  {
    id: "ladies",
    name: "Ladies First Team",
    league: "North Riding Women's League Division One",
    text: "Formed in 2025 and now in their second season. New players of every experience level are welcome.",
    facts: [{ label: "Formed", value: "2025" }],
  },
];

export type JuniorBand = {
  ages: string;
  format: string;
  text: string;
};

/**
 * Junior section, U8 up to U18. CONFIRM: remove any age group the club doesn't run this season,
 * and add coaches, leagues and training times as they're agreed.
 */
export const juniorAgeGroups = ["U8", "U9", "U10", "U11", "U12", "U13", "U14", "U16", "U18"];

/** Match formats follow the FA's youth football pathway. */
export const juniorBands: JuniorBand[] = [
  {
    ages: "U8",
    format: "5 v 5",
    text: "Small-sided mini-soccer: lots of touches, lots of goals and a first taste of playing for the Pikes.",
  },
  {
    ages: "U9 – U10",
    format: "7 v 7",
    text: "Bigger pitches and more team play, with coaching focused on skills, confidence and enjoyment.",
  },
  {
    ages: "U11 – U12",
    format: "9 v 9",
    text: "Positions, shape and the step towards the full game, still with the emphasis on development over results.",
  },
  {
    ages: "U13 – U18",
    format: "11 v 11",
    text: "The full game. Our under-18s are the oldest junior side and the bridge into the first team and the ladies first team.",
  },
];

export const juniorsIntro =
  "Pickering Town's junior section gives boys and girls in and around Pickering a place to play in royal blue and white, from under-8s all the way up to under-18s.";
