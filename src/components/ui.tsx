import type { ReactNode } from "react";
import { Info } from "lucide-react";

/** Top-of-page title band used by every inner page. */
export function PageHeader({ eyebrow, title, children }: { eyebrow: string; title: string; children?: ReactNode }) {
  return (
    <div className="pitch-backdrop border-b border-line">
      <div className="mx-auto max-w-7xl px-4 pb-12 pt-14 sm:px-6 sm:pb-16 sm:pt-20">
        <p className="eyebrow animate-rise text-pike-bright">{eyebrow}</p>
        <h1 className="display animate-rise mt-3 text-6xl sm:text-8xl">{title}</h1>
        {children && <div className="animate-rise-late mt-5 max-w-2xl text-lg leading-relaxed text-muted">{children}</div>}
      </div>
    </div>
  );
}

export function SectionHeading({ eyebrow, title, action }: { eyebrow?: string; title: string; action?: ReactNode }) {
  return (
    <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
      <div>
        {eyebrow && <p className="eyebrow text-pike-bright">{eyebrow}</p>}
        <h2 className="display mt-2 text-4xl sm:text-5xl">{title}</h2>
        <div aria-hidden="true" className="pike-rule mt-4 h-1 w-24 rounded-full" />
      </div>
      {action}
    </div>
  );
}

export function Container({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <div className={`mx-auto max-w-7xl px-4 sm:px-6 ${className}`}>{children}</div>;
}

/** Shown on pages that still use the placeholder fixtures/table data. */
export function SampleNotice() {
  return (
    <p className="mb-8 flex items-start gap-2 rounded-xl border border-draw/40 bg-draw/10 px-4 py-3 text-sm text-fg">
      <Info className="mt-0.5 h-4 w-4 shrink-0 text-draw" aria-hidden="true" />
      <span>Preview: most fixtures and table figures on this page are placeholders until the club adds the full season.</span>
    </p>
  );
}

export function Card({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <div className={`rounded-2xl border border-line bg-surface/70 ${className}`}>{children}</div>;
}
