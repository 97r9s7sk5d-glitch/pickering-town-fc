import { useEffect, useState } from "react";
import { Pause, Play } from "lucide-react";
import type { TourShot } from "@/content/squad";

const SHOT_MS = 5500;

/**
 * A drone-style tour of the ground built from still photos: each shot drifts and zooms (see `.flyover` in
 * styles.css) and cross-fades into the next, on a loop. Visitors can pause it, and it holds still for
 * reduced-motion users. The first shot is in the prerendered HTML, so it shows before scripts load.
 */
export function GroundFlyover({ shots }: { shots: TourShot[] }) {
  const [active, setActive] = useState(0);
  // The previous shot keeps drifting while it fades out, instead of snapping back to its start.
  const [leaving, setLeaving] = useState<number | null>(null);
  const [playing, setPlaying] = useState(true);

  useEffect(() => {
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) setPlaying(false);
  }, []);

  useEffect(() => {
    if (!playing || shots.length < 2) return;
    const t = setInterval(() => {
      setActive((i) => {
        setLeaving(i);
        return (i + 1) % shots.length;
      });
    }, SHOT_MS);
    return () => clearInterval(t);
  }, [playing, shots.length]);

  const shot = shots[active];

  return (
    <div className={`flyover relative aspect-[16/9] overflow-hidden bg-ink ${playing ? "" : "is-paused"}`}>
      {shots.map((s, i) => (
        <img
          key={s.src}
          src={s.src}
          alt={i === active ? s.alt : ""}
          aria-hidden={i === active ? undefined : true}
          className={`flyover__shot ${i === active ? "is-active" : i === leaving ? "is-leaving" : ""}`}
          style={{ "--from": s.from, "--to": s.to, "--shot-ms": `${SHOT_MS + 1200}ms` } as React.CSSProperties}
          loading={i === 0 ? "eager" : "lazy"}
        />
      ))}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/80 via-transparent to-transparent" />
      <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-3 p-4">
        <div>
          <p className="eyebrow text-white drop-shadow" aria-live="polite">
            {shot.caption}
          </p>
          <div className="mt-2 flex gap-1.5" aria-hidden="true">
            {shots.map((s, i) => (
              <span key={s.src} className={`h-1 rounded-full transition-all duration-500 ${i === active ? "w-6 bg-pike-bright" : "w-2 bg-white/50"}`} />
            ))}
          </div>
        </div>
        <button
          type="button"
          onClick={() => setPlaying((p) => !p)}
          className="grid h-9 w-9 place-items-center rounded-full border border-white/30 bg-ink/60 text-white backdrop-blur hover:bg-ink/80"
          aria-label={playing ? "Pause the ground tour" : "Play the ground tour"}
        >
          {playing ? <Pause className="h-4 w-4" aria-hidden="true" /> : <Play className="h-4 w-4" aria-hidden="true" />}
        </button>
      </div>
    </div>
  );
}
