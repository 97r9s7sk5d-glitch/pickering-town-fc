import { useEffect } from "react";

/**
 * Adapted from The Chairman's useRevealOnScroll: fades each `.reveal` element up once it scrolls into view.
 * Marks <html> with .js-reveal first, so without JavaScript nothing is ever hidden.
 */
export function useRevealOnScroll(deps: unknown[] = []) {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (!("IntersectionObserver" in window)) return;
    document.documentElement.classList.add("js-reveal");

    const targets = Array.from(document.querySelectorAll<HTMLElement>(".reveal:not(.is-visible)"));
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            io.unobserve(entry.target);
          }
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -6% 0px" },
    );
    targets.forEach((t) => io.observe(t));
    return () => io.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
}
