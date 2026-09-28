import { useEffect, useState } from "react";

declare const __BUILD_TIME__: number;

/** When the site was built. The prerendered HTML is worked out as of this moment. */
export const buildTime: number = __BUILD_TIME__;

/**
 * The current time, for picking the next games. The first render uses the build time so it matches the prerendered
 * HTML; straight after hydration it switches to the visitor's clock and keeps ticking, so a game drops off "next
 * match" once it's over even if nobody has rebuilt the site.
 */
export function useNow(intervalMs = 60_000): number {
  const [now, setNow] = useState(buildTime);
  useEffect(() => {
    setNow(Date.now());
    const id = setInterval(() => setNow(Date.now()), intervalMs);
    return () => clearInterval(id);
  }, [intervalMs]);
  return now;
}
