import { useEffect, useState } from "react";
import { CalendarPlus, MapPin } from "lucide-react";
import type { Match } from "@/content/fixtures";
import { teamNames } from "@/content/fixtures";
import { ground } from "@/content/club";
import {
  formatDay,
  formatLongDate,
  formatTime,
  homeAway,
  icsFor,
  kickoffDate,
  outcome,
  type Outcome,
} from "@/lib/matches";

const outcomeStyles: Record<Outcome, string> = {
  W: "bg-win text-ink",
  D: "bg-draw text-ink",
  L: "bg-loss text-white",
};
const outcomeWords: Record<Outcome, string> = { W: "Win", D: "Draw", L: "Defeat" };

export function OutcomeBadge({ result, size = "sm" }: { result: Outcome; size?: "sm" | "lg" }) {
  return (
    <span
      className={`display inline-flex items-center justify-center rounded-md ${outcomeStyles[result]} ${
        size === "lg" ? "h-9 w-9 text-xl" : "h-7 w-7 text-base"
      }`}
      title={outcomeWords[result]}
    >
      <span aria-hidden="true">{result}</span>
      <span className="sr-only">{outcomeWords[result]}</span>
    </span>
  );
}

export function FormGuide({ items }: { items: { match: Match; outcome: Outcome }[] }) {
  return (
    <ol className="flex gap-1.5" aria-label="Recent form, oldest first">
      {items.map(({ match, outcome }) => (
        <li key={match.id}>
          <OutcomeBadge result={outcome} />
        </li>
      ))}
    </ol>
  );
}

export function AddToCalendar({ match, compact = false, className = "" }: { match: Match; compact?: boolean; className?: string }) {
  function download() {
    const blob = new Blob([icsFor(match)], { type: "text/calendar;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `pickering-town-${match.id}.ics`;
    a.click();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  }
  return (
    <button
      type="button"
      onClick={download}
      className={`inline-flex items-center gap-1.5 text-sm text-pike-bright hover:text-fg ${className}`}
    >
      <CalendarPlus className="h-4 w-4" aria-hidden="true" />
      {compact ? (
        <>
          <span className="sr-only sm:not-sr-only">Add to calendar</span>
          <span className="sr-only">: {homeAway(match).home} v {homeAway(match).away}</span>
        </>
      ) : (
        "Add to calendar"
      )}
    </button>
  );
}

/** One fixture or result in a list: stacked teams on phones, "Home 2–1 Away" on wider screens. */
export function MatchRow({ match }: { match: Match }) {
  const { home, away } = homeAway(match);
  const result = outcome(match);
  const homeGoals = match.score && (match.venue === "H" ? match.score[0] : match.score[1]);
  const awayGoals = match.score && (match.venue === "H" ? match.score[1] : match.score[0]);
  const nameClass = (name: string) => (name.startsWith("Pickering") ? "text-fg" : "text-fg/75");

  return (
    <li className="grid grid-cols-[4rem_1fr_auto] items-center gap-x-3 gap-y-2 border-b border-line py-4 sm:grid-cols-[6rem_1fr_auto] sm:gap-x-4">
      <div className="text-sm leading-tight">
        <p className="font-semibold text-fg">{formatDay(kickoffDate(match))}</p>
        <p className="tabular text-muted">{formatTime(match)}</p>
      </div>
      <div className="min-w-0">
        <p className="eyebrow truncate !text-[11px] text-muted">
          {match.competition}
          {match.team === "ladies" && <span className="text-pike-bright"> · {teamNames.ladies}</span>}
        </p>
        {/* Phones */}
        <dl className="mt-1 space-y-0.5 font-semibold sm:hidden">
          {[
            [home, homeGoals],
            [away, awayGoals],
          ].map(([name, goals]) => (
            <div key={name as string} className="flex items-baseline justify-between gap-3">
              <dt className={`min-w-0 break-words ${nameClass(name as string)}`}>{name}</dt>
              {goals !== undefined && <dd className="display tabular text-xl">{goals}</dd>}
            </div>
          ))}
        </dl>
        {/* Tablet and up */}
        <p className="mt-1 hidden grid-cols-[1fr_auto_1fr] items-center gap-3 font-semibold sm:grid">
          <span className={`truncate text-right ${nameClass(home)}`}>{home}</span>
          {match.score ? (
            <span className="display tabular rounded-md bg-raised px-2.5 py-1 text-xl">
              {homeGoals}–{awayGoals}
            </span>
          ) : (
            <span className="eyebrow rounded-md border border-line px-2 py-1 !text-[11px] text-muted">v</span>
          )}
          <span className={`truncate ${nameClass(away)}`}>{away}</span>
        </p>
        {match.scorers && <p className="mt-1 text-xs text-muted sm:text-center">Pikes scorers: {match.scorers.join(", ")}</p>}
      </div>
      <div className="flex flex-col items-end gap-2 sm:flex-row sm:items-center sm:gap-3">
        {result ? (
          <OutcomeBadge result={result} />
        ) : (
          <>
            <span className={`eyebrow !text-[11px] ${match.venue === "H" ? "text-pike-bright" : "text-muted"}`}>
              {match.venue === "H" ? "Home" : "Away"}
            </span>
            <AddToCalendar match={match} compact />
          </>
        )}
      </div>
    </li>
  );
}

function useCountdown(target: Date) {
  const [now, setNow] = useState<number | null>(null);
  useEffect(() => {
    setNow(Date.now());
    const id = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(id);
  }, []);
  if (now === null) return null;
  const ms = Math.max(0, target.getTime() - now);
  return {
    days: Math.floor(ms / 86_400_000),
    hours: Math.floor(ms / 3_600_000) % 24,
    minutes: Math.floor(ms / 60_000) % 60,
    seconds: Math.floor(ms / 1000) % 60,
    done: ms === 0,
  };
}

/** Big "next match" panel with a live countdown to kick-off. */
export function NextMatchPanel({ match }: { match: Match }) {
  const date = kickoffDate(match);
  const countdown = useCountdown(date);
  const { home, away } = homeAway(match);
  const units: [string, number | undefined][] = [
    ["Days", countdown?.days],
    ["Hrs", countdown?.hours],
    ["Mins", countdown?.minutes],
    ["Secs", countdown?.seconds],
  ];

  return (
    <div className="relative overflow-hidden rounded-3xl border border-line-strong bg-gradient-to-br from-pike-deep/60 via-surface to-night p-6 sm:p-8">
      <div aria-hidden="true" className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-pike/30 blur-3xl" />
      <div className="relative">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <p className="eyebrow text-pike-bright">Next match · {match.competition}</p>
          <p className={`eyebrow rounded-full px-3 py-1 !text-[11px] ${match.venue === "H" ? "bg-pike text-white" : "bg-raised text-muted"}`}>
            {match.venue === "H" ? "Home" : "Away"}
          </p>
        </div>
        <p className="display mt-5 text-4xl sm:text-5xl">
          {home} <span className="text-pike-bright">v</span> {away}
        </p>
        <p className="mt-3 text-muted">
          {formatLongDate(date)} · <span className="tabular">{formatTime(match)}</span> kick-off
        </p>
        {match.venue === "H" && (
          <p className="mt-1 flex items-center gap-1.5 text-sm text-muted">
            <MapPin className="h-4 w-4" aria-hidden="true" />
            {ground.name}, {ground.postcode}
          </p>
        )}

        <div className="mt-7 grid grid-cols-4 gap-2 sm:max-w-md" role="timer" aria-label="Countdown to kick-off">
          {units.map(([label, value]) => (
            <div key={label} className="rounded-xl border border-line bg-ink/60 px-2 py-3 text-center">
              <p className="display tabular text-4xl sm:text-5xl">{value === undefined ? "–" : String(value).padStart(2, "0")}</p>
              <p className="eyebrow mt-1 !text-[10px] text-muted">{label}</p>
            </div>
          ))}
        </div>
        {countdown?.done && <p className="mt-3 text-sm text-pike-bright">Kick-off time has arrived. Up the Pikes!</p>}

        <div className="mt-6">
          <AddToCalendar match={match} />
        </div>
      </div>
    </div>
  );
}
