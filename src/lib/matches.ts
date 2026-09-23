import { club, ground } from "@/content/club";
import { matches, ourSideNames, type Match, type TeamId } from "@/content/fixtures";

export type Outcome = "W" | "D" | "L";

/** Kick-off as a Date. Times in the content are UK local time; the site is only used in the UK. */
export function kickoffDate(match: Match): Date {
  return new Date(match.kickoff);
}

export function outcome(match: Match): Outcome | null {
  if (!match.score) return null;
  const [us, them] = match.score;
  return us > them ? "W" : us === them ? "D" : "L";
}

export function isPlayed(match: Match): boolean {
  return match.score !== undefined;
}

/** Played matches, newest first. */
export function results(team?: TeamId): Match[] {
  return matches
    .filter((m) => isPlayed(m) && (!team || m.team === team))
    .sort((a, b) => b.kickoff.localeCompare(a.kickoff));
}

/** Unplayed matches, soonest first. */
export function fixtures(team?: TeamId): Match[] {
  return matches
    .filter((m) => !isPlayed(m) && (!team || m.team === team))
    .sort((a, b) => a.kickoff.localeCompare(b.kickoff));
}

export function nextMatch(team: TeamId = "first"): Match | undefined {
  return fixtures(team)[0];
}

export function lastResult(team: TeamId = "first"): Match | undefined {
  return results(team)[0];
}

/** Last five league results, oldest first, as W/D/L. */
export function form(team: TeamId = "first", count = 5): { match: Match; outcome: Outcome }[] {
  return results(team)
    .slice(0, count)
    .reverse()
    .map((match) => ({ match, outcome: outcome(match)! }));
}

export function homeAway(match: Match): { home: string; away: string } {
  const us = ourSideNames[match.team];
  // Pickering are listed first unless the game is confirmed as away.
  return match.venue === "A" ? { home: match.opponent, away: us } : { home: us, away: match.opponent };
}

/** The score in the same order as homeAway(). */
export function scoreline(match: Match): { home: number; away: number } | undefined {
  if (!match.score) return undefined;
  const [us, them] = match.score;
  return match.venue === "A" ? { home: them, away: us } : { home: us, away: them };
}

export function venueLabel(match: Match): string {
  return match.venue === "H" ? "Home" : match.venue === "A" ? "Away" : "H/A TBC";
}

// Dates are formatted by hand rather than with Intl: Node (at build time) and browsers ship different
// locale data ("Sept" vs "Sep"), which would make the prerendered HTML disagree with the browser.
const DAYS = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const MONTHS = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

export const formatDay = (d: Date) => `${DAYS[d.getDay()].slice(0, 3)} ${d.getDate()} ${MONTHS[d.getMonth()].slice(0, 3)}`;
export const formatLongDate = (d: Date) => `${DAYS[d.getDay()]} ${d.getDate()} ${MONTHS[d.getMonth()]} ${d.getFullYear()}`;
export const formatMonth = (d: Date) => `${MONTHS[d.getMonth()]} ${d.getFullYear()}`;
export const monthName = (monthIndex: number) => MONTHS[monthIndex];
/** "15:00" straight from the content, so prerendered HTML never shifts with the build machine's timezone. */
export const formatTime = (match: Match) => match.kickoff.slice(11, 16);

/** An .ics calendar file for one match, so supporters can add it to their phone. */
export function icsFor(match: Match): string {
  const { home, away } = homeAway(match);
  const start = match.kickoff.replace(/[-:]/g, "") + "00";
  const endDate = new Date(kickoffDate(match).getTime() + 2 * 60 * 60 * 1000);
  const pad = (n: number) => String(n).padStart(2, "0");
  const end = `${endDate.getFullYear()}${pad(endDate.getMonth() + 1)}${pad(endDate.getDate())}T${pad(endDate.getHours())}${pad(endDate.getMinutes())}00`;
  const location =
    match.venue === "H"
      ? `${ground.name}, ${ground.addressLines.slice(1).join(", ")} ${ground.postcode}`
      : match.venue === "A"
        ? match.opponent
        : "Venue to be confirmed";
  return [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//Pickering Town FC//Fixtures//EN",
    "BEGIN:VEVENT",
    `UID:${match.id}@pickeringtownfc`,
    `DTSTAMP:${start}`,
    `DTSTART;TZID=Europe/London:${start}`,
    `DTEND;TZID=Europe/London:${end}`,
    `SUMMARY:${home} v ${away}`,
    `DESCRIPTION:${match.competition}. ${club.name}.`,
    `LOCATION:${location}`,
    "END:VEVENT",
    "END:VCALENDAR",
  ].join("\r\n");
}
