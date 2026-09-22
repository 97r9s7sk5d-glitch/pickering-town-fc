import { useEffect, useRef, useState } from "react";
import { Link, useMatchRoute, type LinkProps } from "@tanstack/react-router";

export type NavItem = { to: LinkProps["to"]; label: string };

/**
 * Segmented-control style nav: a pill slides beneath whichever route is active,
 * instead of a plain link row. Nested pages (e.g. a news article) keep their section highlighted.
 */
export function RoutePillNav({ items }: { items: NavItem[] }) {
  const matchRoute = useMatchRoute();
  const containerRef = useRef<HTMLDivElement>(null);
  const linkRefs = useRef<(HTMLAnchorElement | null)[]>([]);
  const activeIndex = items.findIndex((item) => matchRoute({ to: item.to, fuzzy: item.to !== "/" }));
  const [pill, setPill] = useState({ left: 0, width: 0, ready: false });

  useEffect(() => {
    function measure() {
      const el = activeIndex >= 0 ? linkRefs.current[activeIndex] : null;
      const container = containerRef.current;
      if (!el || !container) {
        setPill((p) => ({ ...p, ready: false }));
        return;
      }
      const c = container.getBoundingClientRect();
      const e = el.getBoundingClientRect();
      setPill({ left: e.left - c.left, width: e.width, ready: true });
    }
    measure();
    // Web fonts change link widths after first paint.
    document.fonts?.ready.then(measure);
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [activeIndex]);

  return (
    <div ref={containerRef} className="relative flex items-center gap-0.5 rounded-full border border-line bg-surface/60 p-1">
      <span
        aria-hidden="true"
        className={`absolute inset-y-1 rounded-full bg-pike ${pill.ready ? "transition-all duration-300 ease-out" : ""}`}
        style={{ left: pill.left, width: pill.width, opacity: pill.ready ? 1 : 0 }}
      />
      {items.map((item, i) => (
        <Link
          key={item.label}
          to={item.to}
          ref={(el) => {
            linkRefs.current[i] = el;
          }}
          aria-current={activeIndex === i ? "page" : undefined}
          className={`eyebrow relative z-10 whitespace-nowrap rounded-full px-3.5 py-1.5 !text-[13px] transition-colors duration-300 ${
            activeIndex === i ? "text-white" : "text-muted hover:text-fg"
          }`}
        >
          {item.label}
        </Link>
      ))}
    </div>
  );
}
