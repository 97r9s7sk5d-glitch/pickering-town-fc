import { useEffect } from "react";

/**
 * Fades each `.reveal` element up once it scrolls into view.
 * Marks <html> with .js-reveal first, so without JavaScript nothing is ever hidden.
 *
 * Runs once for the whole app. A MutationObserver picks up `.reveal` elements added later, so pages reached
 * by clicking a link (which render after the URL changes) are revealed too, not just the first page loaded.
 */
export function useRevealOnScroll() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (!("IntersectionObserver" in window) || !("MutationObserver" in window)) return;
    document.documentElement.classList.add("js-reveal");

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            io.unobserve(entry.target);
          }
        }
      },
      // threshold 0: tall blocks (a long squad grid on a phone) still reveal as soon as they enter the screen.
      { threshold: 0, rootMargin: "0px 0px -6% 0px" },
    );

    const observeWithin = (root: ParentNode) => {
      if (root instanceof HTMLElement && root.matches(".reveal:not(.is-visible)")) io.observe(root);
      root.querySelectorAll<HTMLElement>(".reveal:not(.is-visible)").forEach((el) => io.observe(el));
    };

    observeWithin(document);
    const mo = new MutationObserver((mutations) => {
      for (const m of mutations) m.addedNodes.forEach((n) => n instanceof HTMLElement && observeWithin(n));
    });
    mo.observe(document.body, { childList: true, subtree: true });

    return () => {
      mo.disconnect();
      io.disconnect();
    };
  }, []);
}
