import { useEffect, useRef, useState } from "react";
import { liveFeedStyle } from "@/content/live";

const FWP = "https://www.footballwebpages.co.uk";
/** How long to wait for the feed to show before offering it on Football Web Pages' own site. */
const SLOW_MS = 20_000;

const newId = () => (typeof crypto.randomUUID === "function" ? crypto.randomUUID() : Math.random().toString(36).slice(2));

/**
 * A Football Web Pages live feed (content/live.ts), as an iframe of their embed page. Their embed.js builds the same
 * iframe, but when that script is blocked (content blockers, tracking protection) or fails to download (patchy signal
 * at the ground) nothing appears at all, as some supporters found on 7 Nov 2026, so the site builds it itself. Like
 * embed.js it passes an id, the site's address and the width, so the feed can report its height ("loaded/<id>/<height>")
 * and the day chosen with its arrows ("change-date/<id>/<date>"). If the feed hasn't shown within 20 seconds, a link
 * to the same feed on their own site appears under it.
 */
export function LiveFeed({ feed }: { feed: string }) {
  const box = useRef<HTMLDivElement>(null);
  const [frame, setFrame] = useState<{ id: string; width: number } | null>(null);
  const [day, setDay] = useState<Record<string, string>>({});
  const [height, setHeight] = useState<string | null>(null);
  const [slow, setSlow] = useState(false);

  // The width is the box's own, so it's measured once the box is on the page.
  useEffect(() => {
    setFrame({ id: newId(), width: box.current?.offsetWidth ?? 0 });
    setDay({});
    setHeight(null);
    setSlow(false);
  }, [feed]);

  useEffect(() => {
    if (!frame) return;
    const onMessage = (e: MessageEvent) => {
      if (e.origin !== FWP || typeof e.data !== "string") return;
      const [kind, id, value] = e.data.split("/");
      if (id !== frame.id || !value) return;
      if (kind === "loaded") setHeight(/^\d+$/.test(value) ? `${value}px` : value);
      else if (kind === "change-date") setDay({ date: value });
      else if (kind === "change-page") setDay({ page: value });
    };
    window.addEventListener("message", onMessage);
    const timer = setTimeout(() => setSlow(true), SLOW_MS);
    return () => {
      window.removeEventListener("message", onMessage);
      clearTimeout(timer);
    };
  }, [frame]);

  const query = frame
    ? new URLSearchParams({ ...liveFeedStyle, id: frame.id, ...day, origin: window.location.origin, width: String(frame.width) })
    : null;

  return (
    <div ref={box}>
      <div className={`relative overflow-hidden rounded-xl ${height ? "" : "min-h-80 bg-ink/60"}`}>
        {!height && (
          <p className="absolute inset-0 flex items-center justify-center text-sm text-muted" aria-hidden="true">
            Loading live updates…
          </p>
        )}
        {query && (
          <iframe
            src={`${FWP}/embed/${feed}?${query}`}
            title="Live match updates from Football Web Pages"
            className="relative block w-full border-0"
            style={{ height: height ?? "20rem" }}
          />
        )}
      </div>
      {slow && !height && (
        <p className="mt-3 text-sm text-muted">
          Live updates not showing?{" "}
          <a href={`${FWP}/${feed}`} target="_blank" rel="noopener noreferrer" className="text-pike-bright underline hover:text-fg">
            Open them on Football Web Pages
            <span className="sr-only"> (opens in a new tab)</span>
          </a>
          .
        </p>
      )}
    </div>
  );
}
