import { Link } from "@tanstack/react-router";
import { ArrowRight, Lightbulb } from "lucide-react";
import type { Appeal } from "@/content/donate";

/** £30,000 style amounts. Not Intl: Node and browsers can format differently, which breaks hydration. */
const pounds = (n: number) => `£${Math.round(n).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`;

/** The current fundraising appeal with a progress bar (content/donate.ts). */
export function AppealProgress({ appeal, donateHref }: { appeal: Appeal; donateHref?: string }) {
  const pct = Math.min(100, Math.round((appeal.raised / appeal.target) * 100));
  const toGo = Math.max(0, appeal.target - appeal.raised);
  return (
    <section
      aria-labelledby="appeal-title"
      className="reveal relative overflow-hidden rounded-3xl border border-pike-bright/60 bg-gradient-to-br from-pike-deep via-surface to-night p-6 sm:p-10"
    >
      <div aria-hidden="true" className="pointer-events-none absolute -right-16 -top-16 h-64 w-64 rounded-full bg-pike-bright/25 blur-3xl" />
      <div className="relative">
        <p className="eyebrow flex items-center gap-2 text-pike-bright">
          <Lightbulb className="h-4 w-4" aria-hidden="true" /> Current appeal
        </p>
        <h2 id="appeal-title" className="display mt-2 text-4xl sm:text-6xl">
          {appeal.title}
        </h2>
        <p className="mt-3 max-w-2xl leading-relaxed text-muted">{appeal.text}</p>

        <div className="mt-8 flex flex-wrap items-end justify-between gap-4">
          <p>
            <span className="display tabular text-5xl sm:text-6xl">{pounds(appeal.raised)}</span>
            <span className="ml-2 text-muted">raised of {pounds(appeal.target)}</span>
          </p>
          <p className="display tabular text-3xl text-pike-bright">{pct}%</p>
        </div>
        <div
          role="progressbar"
          aria-label={`${appeal.title}: ${pounds(appeal.raised)} raised of ${pounds(appeal.target)}`}
          aria-valuemin={0}
          aria-valuemax={appeal.target}
          aria-valuenow={appeal.raised}
          aria-valuetext={`${pounds(appeal.raised)} of ${pounds(appeal.target)} (${pct}%)`}
          className="mt-4 h-5 overflow-hidden rounded-full border border-line-strong bg-ink/60"
        >
          <div className="h-full rounded-full bg-gradient-to-r from-pike to-pike-bright" style={{ width: `${Math.max(pct, 2)}%` }} />
        </div>
        <div className="mt-4 flex flex-wrap items-center justify-between gap-4">
          <p className="text-sm text-muted">
            {toGo > 0 ? (
              <>
                <span className="font-semibold text-fg">{pounds(toGo)}</span> still to raise. Every donation gets us closer.
              </>
            ) : (
              "Target reached. Thank you to everyone who gave!"
            )}
          </p>
          {donateHref ? (
            <a
              href={donateHref}
              target="_blank"
              rel="noopener noreferrer"
              className="eyebrow inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-ink transition-colors hover:bg-pike-bright"
            >
              Donate to the appeal <ArrowRight className="h-4 w-4" aria-hidden="true" />
              <span className="sr-only">(opens in a new tab)</span>
            </a>
          ) : (
            <Link
              to="/contact"
              search={{ topic: "donation" }}
              className="eyebrow inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-ink transition-colors hover:bg-pike-bright"
            >
              Donate to the appeal <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          )}
        </div>
      </div>
    </section>
  );
}
