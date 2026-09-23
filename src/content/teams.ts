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

/** The club's junior side. CONFIRM: add the coach, league and training times as they're agreed. */
export const juniorTeam = {
  age: "U18",
  name: "Under-18s",
  intro:
    "Our under-18s give young players in and around Pickering eleven-a-side football in royal blue and white, and a pathway into the first team and the ladies first team.",
  facts: [
    { label: "Age group", value: "Under 18" },
    { label: "Format", value: "11 v 11" },
  ] as TeamFact[],
};
