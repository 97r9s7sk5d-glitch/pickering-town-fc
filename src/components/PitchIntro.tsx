import { useCallback, useEffect, useLayoutEffect, useRef, useState, type CSSProperties, type RefObject } from "react";
import { club, ground } from "@/content/club";
import { introVideo, type IntroVideo } from "@/content/intro";
import { groundPhoto } from "@/content/squad";

/**
 * Opening sequence on the home page. With `introVideo` set (content/intro.ts) it plays that video and, as the pikes
 * hit the net, a royal blue splash washes over the screen into the home page. Without it, the drawn version runs:
 * the aerial photo of Mill Lane dissolves into a pitch with the badge in the centre circle, then a dive into the badge.
 *
 * Either way it also clears without JavaScript (a CSS fade on `.pitch-intro`), can be skipped by click, button or
 * Escape, plays once per visit when the home page is opened first, and is left out for reduced-motion users.
 */
let played = false;

// Runs before hydration: on a repeat load in the same visit (or with reduced motion), hide the intro before it
// paints and stop its video downloading.
const skipIfSeen = `(function(){var e=document.currentScript.parentElement;var skip=matchMedia("(prefers-reduced-motion: reduce)").matches;try{if(sessionStorage.getItem("ptfc-intro"))skip=true;sessionStorage.setItem("ptfc-intro","1")}catch(_){}if(!skip)return;e.setAttribute("data-skip","");var v=e.querySelector("video");if(v){v.removeAttribute("autoplay");v.removeAttribute("src");v.load()}})()`;

export function PitchIntro() {
  const [show, setShow] = useState(!played);
  const ref = useRef<HTMLDivElement>(null);
  const close = useCallback(() => setShow(false), []);

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
    <div
      ref={ref}
      className={`pitch-intro ${introVideo ? "pitch-intro--video" : ""}`}
      suppressHydrationWarning
      onClick={() => setShow(false)}
    >
      {introVideo ? <VideoScene video={introVideo} root={ref} onFail={close} /> : <DrawnScene />}
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

/**
 * Droplets thrown out by the splash, drawn over the wave. Fixed values (no Math.random), so the server and the
 * browser render the same markup.
 */
const droplets = Array.from({ length: 24 }, (_, i) => {
  const angle = (i / 24) * Math.PI * 2 + (i % 3) * 0.19;
  const dist = 18 + ((i * 7) % 6) * 6; // vmin
  return {
    "--dx": `${(Math.cos(angle) * dist).toFixed(1)}vmin`,
    "--dy": `${(Math.sin(angle) * dist - 8).toFixed(1)}vmin`,
    "--size": `${1.2 + ((i * 5) % 5) * 0.55}vmin`,
    "--delay": `${(i % 4) * 35}ms`,
  } as CSSProperties;
});

/**
 * The video, plus the splash layered over the goal. When the pikes reach the net (just before the end) the splash
 * starts from the net's position on screen; the root then fades out and PitchIntro unmounts on `animationend`.
 */
function VideoScene({ video, root, onFail }: { video: IntroVideo; root: RefObject<HTMLDivElement | null>; onFail: () => void }) {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const el = ref.current;
    const overlay = root.current;
    if (!el || !overlay || overlay.hasAttribute("data-skip")) return;
    let splashed = false;

    const splash = () => {
      if (splashed) return;
      splashed = true;
      // Map the net's position in the video frame to the screen, allowing for object-fit cover/contain.
      const r = el.getBoundingClientRect();
      const vw = el.videoWidth || video.width;
      const vh = el.videoHeight || video.height;
      const fit = getComputedStyle(el).objectFit === "contain" ? Math.min : Math.max;
      const k = fit(r.width / vw, r.height / vh);
      overlay.style.setProperty("--sx", `${r.left + (r.width - vw * k) / 2 + video.splash.x * vw * k}px`);
      overlay.style.setProperty("--sy", `${r.top + (r.height - vh * k) / 2 + video.splash.y * vh * k}px`);
      overlay.classList.add("is-splashing");
    };
    const onTime = () => {
      if (el.duration && el.currentTime >= el.duration - 0.3) splash();
    };
    // Don't keep visitors on a still frame if the video is slow to arrive.
    const slow = window.setTimeout(() => el.paused && onFail(), 4000);
    const onPlaying = () => window.clearTimeout(slow);

    el.addEventListener("timeupdate", onTime);
    el.addEventListener("ended", splash);
    el.addEventListener("playing", onPlaying);
    el.addEventListener("error", onFail);
    el.play().catch(onFail);
    return () => {
      window.clearTimeout(slow);
      el.removeEventListener("timeupdate", onTime);
      el.removeEventListener("ended", splash);
      el.removeEventListener("playing", onPlaying);
      el.removeEventListener("error", onFail);
    };
  }, [video, root, onFail]);

  return (
    <>
      <img className="pitch-intro__backdrop" src={video.poster} alt="" aria-hidden="true" />
      <video
        ref={ref}
        className="pitch-intro__video"
        src={video.src}
        poster={video.poster}
        width={video.width}
        height={video.height}
        muted
        playsInline
        autoPlay
        preload="auto"
        aria-hidden="true"
      />
      <div className="pitch-intro__wave pitch-intro__wave--rim" aria-hidden="true" />
      <div className="pitch-intro__wave pitch-intro__wave--fill" aria-hidden="true" />
      <div className="pitch-intro__splash" aria-hidden="true">
        <span className="pitch-intro__flash" />
        <span className="pitch-intro__ripple" />
        <span className="pitch-intro__ripple pitch-intro__ripple--late" />
        {droplets.map((style, i) => (
          <span key={i} className="pitch-intro__drop" style={style} />
        ))}
      </div>
    </>
  );
}

function DrawnScene() {
  return (
    <>
      <div className="pitch-intro__scene">
        <img className="pitch-intro__photo" src={groundPhoto.src} alt="" aria-hidden="true" fetchPriority="high" />
        <Pitch orientation="landscape" />
        <Pitch orientation="portrait" />
      </div>
      <p className="pitch-intro__place">
        <span className="display block text-6xl sm:text-8xl">{ground.name}</span>
        <span className="eyebrow mt-2 block">
          {club.town} · Home of {club.nickname}
        </span>
      </p>
    </>
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
