import { useEffect } from "react";
import { liveFeedStyle } from "@/content/live";

const SCRIPT = "https://www.footballwebpages.co.uk/embed.js";

declare global {
  interface Window {
    initEmbeds?: () => void;
  }
}

/**
 * A Football Web Pages live feed (content/live.ts). Their embed.js turns each `.fwp-embed` into an iframe that
 * keeps itself up to date. It only scans the page on DOMContentLoaded, which has long passed by the time a game
 * kicks off, so it's loaded on demand and asked to scan again.
 */
export function LiveFeed({ feed }: { feed: string }) {
  useEffect(() => {
    const scan = () => window.initEmbeds?.();
    let script = document.querySelector<HTMLScriptElement>(`script[src="${SCRIPT}"]`);
    if (!script) {
      script = document.createElement("script");
      script.src = SCRIPT;
      script.async = true;
      document.body.appendChild(script);
    }
    if (window.initEmbeds) scan();
    else script.addEventListener("load", scan);
    return () => script?.removeEventListener("load", scan);
  }, [feed]);

  const data = Object.fromEntries(Object.entries(liveFeedStyle).map(([k, v]) => [`data-${k}`, v]));
  return <div key={feed} className="fwp-embed overflow-hidden rounded-xl" data-url={feed} {...data} />;
}
