import { useEffect, useState } from "react";
import type { Match } from "@/content/fixtures";

/**
 * Live score for a game in progress, read from /live/<team>.json. That file is written on matchdays by the job that
 * reads Football Web Pages (see content/live.ts); until it exists, or while it's for a different game, there's no
 * live score and the panel shows the Football Web Pages feed instead.
 */
export type LiveEvent = {
  side: "us" | "them";
  type: "goal" | "pen" | "og" | "red";
  player: string;
  /** As reported, e.g. "38" or "90+5". */
  minute: string;
};

export type LiveScore = {
  /** The Match.id this score belongs to. */
  matchId: string;
  status: "pre" | "live" | "ht" | "ft";
  /** Minutes played, while live. */
  minute?: number | null;
  /** [Pickering goals, opponent goals]. */
  score: [number, number];
  events: LiveEvent[];
  /** When the job last saw a change (ISO). */
  updated?: string;
};

const POLL_MS = 30_000;

function isLiveScore(v: unknown): v is LiveScore {
  const s = v as LiveScore;
  return !!s && typeof s.matchId === "string" && Array.isArray(s.score) && s.score.length === 2 && Array.isArray(s.events);
}

/** Polls the live score file for this match every 30 seconds while the page is open. */
export function useLiveScore(match: Match): LiveScore | null {
  const [live, setLive] = useState<LiveScore | null>(null);

  useEffect(() => {
    let stopped = false;
    const load = async () => {
      if (document.visibilityState === "hidden") return;
      try {
        // A new query string each time, so neither the browser nor GitHub's cache hands back an old score.
        const res = await fetch(`/live/${match.team}.json?t=${Date.now()}`, { cache: "no-store" });
        if (!res.ok) return;
        const data: unknown = await res.json();
        if (!stopped && isLiveScore(data) && data.matchId === match.id && data.status !== "pre") setLive(data);
      } catch {
        // No file yet, or offline: keep whatever was last shown.
      }
    };
    load();
    const id = setInterval(load, POLL_MS);
    document.addEventListener("visibilitychange", load);
    return () => {
      stopped = true;
      clearInterval(id);
      document.removeEventListener("visibilitychange", load);
    };
  }, [match.id, match.team]);

  return live;
}
