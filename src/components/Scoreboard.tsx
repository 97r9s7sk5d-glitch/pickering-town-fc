import type { Match } from "@/content/fixtures";
import { ourSideNames } from "@/content/fixtures";
import type { LiveEvent, LiveScore } from "@/lib/liveScore";

/** Initials for a club without a badge on file: "Barton Town" -> "BT". */
const initials = (name: string) =>
  name
    .replace(/\b(FC|AFC|Ladies|Women)\b/gi, "")
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0]!.toUpperCase())
    .join("");

function Crest({ ours, name, compact }: { ours: boolean; name: string; compact: boolean }) {
  const size = compact ? "h-12 w-12" : "h-16 w-16";
  return ours ? (
    <img src="/badge.webp" alt="" className={`${size} object-contain drop-shadow`} width={64} height={64} />
  ) : (
    <span
      aria-hidden="true"
      className={`${size} display flex items-center justify-center rounded-full border border-line-strong bg-white/10 ${compact ? "text-lg" : "text-xl"}`}
    >
      {initials(name)}
    </span>
  );
}

function Status({ live }: { live: LiveScore }) {
  if (live.status === "live")
    return (
      <span className="eyebrow inline-flex items-center gap-1.5 rounded-full bg-[oklch(0.62_0.2_25)] px-2.5 py-0.5 !text-[11px] text-white">
        <span className="relative flex h-1.5 w-1.5" aria-hidden="true">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-white opacity-75 motion-reduce:animate-none" />
          <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-white" />
        </span>
        Live{live.minute ? ` ${live.minute}'` : ""}
      </span>
    );
  return <span className="text-sm text-muted">{live.status === "ht" ? "Half time" : "Full time"}</span>;
}

const mark = (e: LiveEvent) => (e.type === "pen" ? " (pen)" : e.type === "og" ? " (og)" : "");

/** One side's goals (and red cards), grouped by player: "Coulibaly 36', 88' (pen)". Surnames only when compact. */
function Events({ events, align, compact }: { events: LiveEvent[]; align: "left" | "right"; compact: boolean }) {
  const byPlayer = new Map<string, LiveEvent[]>();
  for (const e of events) byPlayer.set(e.player, [...(byPlayer.get(e.player) ?? []), e]);
  return (
    <ul className={`space-y-0.5 text-sm text-fg/85 ${align === "right" ? "text-right" : "text-left"}`}>
      {[...byPlayer].map(([player, list]) => (
        <li key={player}>
          {list[0]!.type === "red" && <span className="mr-1 inline-block h-3 w-2 rounded-[2px] bg-[oklch(0.62_0.2_25)] align-[-1px]" aria-label="Red card" />}
          {compact ? player.split(/\s+/).pop() : player} {list.map((e) => `${e.minute}'${mark(e)}`).join(", ")}
        </li>
      ))}
    </ul>
  );
}

/**
 * Our own live scoreboard: both clubs, the score, Live/Half time/Full time and the scorers, laid out like a
 * football app's match header. Fed by useLiveScore().
 */
export function Scoreboard({ match, live, compact }: { match: Match; live: LiveScore; compact: boolean }) {
  const us = ourSideNames[match.team];
  const weAreHome = match.venue !== "A";
  const home = weAreHome ? us : match.opponent;
  const away = weAreHome ? match.opponent : us;
  const [ours, theirs] = live.score;
  const [homeGoals, awayGoals] = weAreHome ? [ours, theirs] : [theirs, ours];
  const homeEvents = live.events.filter((e) => (e.side === "us") === weAreHome);
  const awayEvents = live.events.filter((e) => (e.side === "us") !== weAreHome);

  return (
    <div
      className={`rounded-2xl border border-line bg-ink/50 ${compact ? "p-4" : "p-5 sm:p-6"}`}
      role="status"
      aria-live="polite"
      aria-label={`${home} ${homeGoals}, ${away} ${awayGoals}, ${live.status === "live" ? "live" : live.status === "ht" ? "half time" : "full time"}`}
    >
      <div className="grid grid-cols-[1fr_auto_1fr] items-start gap-2">
        <div className="flex flex-col items-center gap-2 text-center">
          <Crest ours={weAreHome} name={home} compact={compact} />
          <p className={`font-semibold leading-tight ${compact ? "text-sm" : ""}`}>{home}</p>
        </div>
        <div className="flex flex-col items-center gap-2 pt-1">
          <p className={`display tabular leading-none ${compact ? "text-5xl" : "text-6xl sm:text-7xl"}`}>
            {homeGoals}
            <span className="mx-2 text-muted">-</span>
            {awayGoals}
          </p>
          <Status live={live} />
        </div>
        <div className="flex flex-col items-center gap-2 text-center">
          <Crest ours={!weAreHome} name={away} compact={compact} />
          <p className={`font-semibold leading-tight ${compact ? "text-sm" : ""}`}>{away}</p>
        </div>
      </div>
      {live.events.length > 0 && (
        <div className="mt-4 grid grid-cols-[1fr_auto_1fr] items-start gap-3 border-t border-line pt-3">
          <Events events={homeEvents} align="right" compact={compact} />
          <span aria-hidden="true" className="pt-0.5 text-base">
            ⚽
          </span>
          <Events events={awayEvents} align="left" compact={compact} />
        </div>
      )}
    </div>
  );
}
