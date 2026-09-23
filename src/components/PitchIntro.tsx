import { useLayoutEffect, useRef, useState } from "react";
import { club } from "@/content/club";

/**
 * Opening sequence on the home page: an aerial view of the pitch with the badge sitting in the centre circle,
 * then the camera dives into the badge and lands on the home page.
 *
 * The animation itself is pure CSS (see `.pitch-intro` in styles.css), so it also finishes without JavaScript.
 * It plays once per visit: only when the home page is the first page opened, and not for reduced-motion users.
 */
let played = false;

// Runs before hydration: on a repeat load in the same visit, hide the intro before it paints.
const skipIfSeen = `(function(){var e=document.currentScript.parentElement;try{if(sessionStorage.getItem("ptfc-intro"))e.setAttribute("data-skip","");sessionStorage.setItem("ptfc-intro","1")}catch(_){}})()`;

export function PitchIntro() {
  const [show, setShow] = useState(!played);
  const ref = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (!show) return;
    played = true;
    const el = ref.current;
    if (!el) return;
    const done = () => setShow(false);
    // Skip it if the visitor opened another page first and then clicked through to the home page.
    const openedUrl = (performance.getEntriesByType("navigation")[0] as PerformanceNavigationTiming | undefined)?.name;
    const landedOnHome = !openedUrl || new URL(openedUrl).pathname === location.pathname;
    if (el.hasAttribute("data-skip") || !landedOnHome || matchMedia("(prefers-reduced-motion: reduce)").matches) {
      done();
      return;
    }
    const onEnd = (e: AnimationEvent) => {
      if (e.target === el) done();
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") done();
    };
    el.addEventListener("animationend", onEnd);
    window.addEventListener("keydown", onKey);
    return () => {
      el.removeEventListener("animationend", onEnd);
      window.removeEventListener("keydown", onKey);
    };
  }, [show]);

  if (!show) return null;

  return (
    <div ref={ref} className="pitch-intro" suppressHydrationWarning onClick={() => setShow(false)}>
      <div className="pitch-intro__scene">
        <Pitch orientation="landscape" />
        <Pitch orientation="portrait" />
      </div>
      <p className="pitch-intro__caption eyebrow">
        {club.name} · Est. {club.founded}
      </p>
      <button type="button" className="pitch-intro__skip eyebrow" onClick={() => setShow(false)}>
        Skip intro
      </button>
      <script dangerouslySetInnerHTML={{ __html: skipIfSeen }} />
    </div>
  );
}

// Pitch in metres (105 × 68), with a 6 m margin so the goals and run-off show.
const L = 105;
const W = 68;
const M = 6;
const stripes = 12;

// The badge's roundel sits in the centre circle; these place its centre on the spot (badge art is 331 × 302).
const badgeW = 19.9;
const badgeH = 18.15;
const badgeCx = 9.9;
const badgeCy = 8.7;

function Pitch({ orientation }: { orientation: "landscape" | "portrait" }) {
  const portrait = orientation === "portrait";
  const vbW = (portrait ? W : L) + M * 2;
  const vbH = (portrait ? L : W) + M * 2;
  const cx = (portrait ? W : L) / 2;
  const cy = (portrait ? L : W) / 2;
  const rotate = portrait ? `translate(${W} 0) rotate(90)` : undefined;

  return (
    <svg
      className={`pitch-intro__pitch pitch-intro__pitch--${orientation}`}
      viewBox={`${-M} ${-M} ${vbW} ${vbH}`}
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
    >
      <defs>
        <radialGradient id={`floodlight-${orientation}`} cx="50%" cy="50%" r="70%">
          <stop offset="0%" stopColor="#fff" stopOpacity="0.16" />
          <stop offset="60%" stopColor="#fff" stopOpacity="0" />
          <stop offset="100%" stopColor="#000" stopOpacity="0.55" />
        </radialGradient>
      </defs>
      <g transform={rotate}>
        <rect x={-M * 2} y={-M * 2} width={L + M * 4} height={W + M * 4} fill="#1f6b33" />
        {Array.from({ length: stripes }, (_, i) =>
          i % 2 ? null : <rect key={i} x={(L / stripes) * i} y={-M * 2} width={L / stripes} height={W + M * 4} fill="#257a3b" />,
        )}
        <g className="pitch-intro__lines" fill="none" stroke="#fff" strokeOpacity="0.85" strokeWidth="0.3">
          <rect pathLength={1} x={0} y={0} width={L} height={W} />
          <path pathLength={1} d={`M${L / 2} 0V${W}`} />
          <circle pathLength={1} cx={L / 2} cy={W / 2} r={9.15} />
          {[0, 1].map((end) => {
            const x = (d: number) => (end ? L - d : d);
            return (
              <g key={end}>
                <path pathLength={1} d={`M${x(0)} ${W / 2 - 20.16}H${x(16.5)}V${W / 2 + 20.16}H${x(0)}`} />
                <path pathLength={1} d={`M${x(0)} ${W / 2 - 9.16}H${x(5.5)}V${W / 2 + 9.16}H${x(0)}`} />
                <path pathLength={1} d={`M${x(0)} ${W / 2 - 3.66}H${x(-2)}V${W / 2 + 3.66}H${x(0)}`} />
                <path pathLength={1} d={`M${x(16.5)} ${W / 2 - 7.3}A9.15 9.15 0 0 ${end ? 0 : 1} ${x(16.5)} ${W / 2 + 7.3}`} />
                <circle cx={x(11)} cy={W / 2} r={0.3} fill="#fff" stroke="none" />
              </g>
            );
          })}
          {[
            [0, 0, "M1 0A1 1 0 0 1 0 1"],
            [L, 0, "M-1 0A1 1 0 0 0 0 1"],
            [0, W, "M0 -1A1 1 0 0 1 1 0"],
            [L, W, "M0 -1A1 1 0 0 0 -1 0"],
          ].map(([x, y, d]) => (
            <path key={`${x}-${y}`} pathLength={1} transform={`translate(${x} ${y})`} d={d as string} />
          ))}
        </g>
      </g>
      <rect x={-M} y={-M} width={vbW} height={vbH} fill={`url(#floodlight-${orientation})`} />
      <image
        className="pitch-intro__badge"
        href="/badge.webp"
        x={cx - badgeCx}
        y={cy - badgeCy}
        width={badgeW}
        height={badgeH}
      />
    </svg>
  );
}
