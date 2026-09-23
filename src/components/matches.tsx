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
  scoreline,
  venueLabel,
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
  const goals = scoreline(match);
  const homeGoals = goals?.home;
  const awayGoals = goals?.away;
  const nameClass = (name: string) => (name.startsWith("Pickering") ? "text-fg" : "text-fg/75");

  return (
    <li className="grid grid-cols-[4rem_1fr_auto] items-center gap-x-3 gap-y-2 border-b border-line py-4 sm:grid-cols-[6rem_1fr_auto] sm:gap-x-4">
      <div className="text-sm leading-tight">
        <p className="font-semibold text-fg">{formatDay(kickoffDate(match))}</p>
        {!match.score && !match.postponed && <p className="tabular text-muted">{formatTime(match)}</p>}
      </div>
      <div className="min-w-0">
        <p className="eyebrow truncate !text-[11px] text-muted">
          {match.competition}
          {match.team !== "first" && <span className="text-pike-bright"> · {teamNames[match.team]}</span>}
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
          ) : match.postponed ? (
            <span className="display rounded-md bg-raised px-2.5 py-1 text-xl text-muted">P–P</span>
          ) : (
            <span className="eyebrow rounded-md border border-line px-2 py-1 !text-[11px] text-muted">v</span>
          )}
          <span className={`truncate ${nameClass(away)}`}>{away}</span>
        </p>
        {(match.scorers || match.attendance) && (
          <p className="mt-1 text-xs text-muted sm:text-center">
            {[match.scorers && `Pikes scorers: ${match.scorers.join(", ")}`, match.attendance && `Att ${match.attendance}`]
              .filter(Boolean)
              .join(" · ")}
          </p>
        )}
      </div>
      <div className="flex flex-col items-end gap-2 sm:flex-row sm:items-center sm:gap-3">
        {result ? (
          <OutcomeBadge result={result} />
        ) : match.postponed ? (
          <span className="eyebrow !text-[11px] text-muted">Postponed</span>
        ) : (
          <>
            <span className={`eyebrow whitespace-nowrap !text-[11px] ${match.venue === "H" ? "text-pike-bright" : "text-muted"}`}>
              {venueLabel(match)}
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

/**
 * "Next match" panel with a live countdown to kick-off. `compact` is the slimmer version used side by side
 * in the home page hero (one per team); `label` names the team in that case.
 */
export function NextMatchPanel({ match, compact = false, label }: { match: Match; compact?: boolean; label?: string }) {
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
    <div
      className={`relative overflow-hidden rounded-3xl border border-line-strong bg-night bg-gradient-to-br from-pike-deep/60 via-surface to-night shadow-2xl shadow-ink/60 ${
        compact ? "h-full p-5" : "p-6 sm:p-8"
      }`}
    >
      <div aria-hidden="true" className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-pike/30 blur-3xl" />
      <div className="relative">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <p className={`eyebrow text-pike-bright ${compact ? "!text-[11px]" : ""}`}>
            {label ?? "Next match"} · {match.competition}
          </p>
          <p
            className={`eyebrow rounded-full px-3 py-1 !text-[11px] ${match.venue === "H" ? "bg-pike text-white" : "bg-raised text-muted"}`}
          >
            {venueLabel(match)}
          </p>
        </div>
        {compact ? (
          // The team is in the label and home/away in the badge, so the compact panel leads with the opponent.
          <p className="display mt-3 text-2xl xl:text-3xl">
            <span className="text-pike-bright">v</span> {match.opponent}
          </p>
        ) : (
          <p className="display mt-5 text-4xl sm:text-5xl">
            {home} <span className="text-pike-bright">v</span> {away}
          </p>
        )}
        <p className={compact ? "mt-2 text-sm text-muted" : "mt-3 text-muted"}>
          {compact ? formatDay(date) : formatLongDate(date)} · <span className="tabular">{formatTime(match)}</span> kick-off
        </p>
        {match.venue === "H" && (
          <p className={`mt-1 flex items-center gap-1.5 text-muted ${compact ? "text-xs" : "text-sm"}`}>
            <MapPin className={compact ? "h-3.5 w-3.5" : "h-4 w-4"} aria-hidden="true" />
            {ground.name}, {ground.postcode}
          </p>
        )}

        <div
          className={`grid grid-cols-4 ${compact ? "mt-4 gap-1.5" : "mt-7 gap-2 sm:max-w-md"}`}
          role="timer"
          aria-label={`Countdown to kick-off${label ? `, ${label}` : ""}`}
        >
          {units.map(([unit, value]) => (
            <div key={unit} className={`rounded-xl border border-line bg-ink/60 text-center ${compact ? "px-1 py-2" : "px-2 py-3"}`}>
              <p className={`display tabular ${compact ? "text-2xl xl:text-3xl" : "text-4xl sm:text-5xl"}`}>
                {value === undefined ? "–" : String(value).padStart(2, "0")}
              </p>
              <p className={`eyebrow mt-1 text-muted ${compact ? "!text-[9px]" : "!text-[10px]"}`}>{unit}</p>
            </div>
          ))}
        </div>
        {countdown?.done && <p className="mt-3 text-sm text-pike-bright">Kick-off time has arrived. Up the Pikes!</p>}

        <div className={compact ? "mt-4 text-sm" : "mt-6"}>
          <AddToCalendar match={match} />
        </div>
      </div>
    </div>
  );
}
