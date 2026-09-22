import { useEffect, useRef } from "react";
import type { FullTimeSnippet } from "@/content/fulltime";

declare global {
  interface Window {
    lrcode?: string;
  }
}

const SCRIPT_SRC = "https://fulltime.thefa.com/client/api/cs1.js";

/**
 * Renders one FA Full-Time code snippet. Full-Time's script reads a single global `lrcode`, so only one of
 * these can be on a page at a time. The script is re-added on every mount so the feed also loads after
 * client-side navigation (a plain <script> tag would only run on the first page load).
 */
export function FullTimeEmbed({ snippet, title }: { snippet: FullTimeSnippet; title: string }) {
  const hostRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!hostRef.current) return;
    window.lrcode = snippet.code;
    const script = document.createElement("script");
    script.src = `${SCRIPT_SRC}?t=${Date.now()}`;
    script.async = true;
    document.body.appendChild(script);
    return () => script.remove();
  }, [snippet.code]);

  return (
    <section aria-label={title} className="fulltime-embed rounded-2xl border border-line bg-surface/70 p-4 sm:p-6">
      <div ref={hostRef} id={snippet.divId}>
        <p className="text-sm text-muted">Loading the latest from FA Full-Time…</p>
      </div>
      <p className="mt-4 text-xs text-muted">
        Live data from{" "}
        <a href="https://fulltime.thefa.com" target="_blank" rel="noopener noreferrer" className="underline underline-offset-2">
          FA Full-Time
        </a>
        .
      </p>
    </section>
  );
}
