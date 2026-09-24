import { ArrowUpRight, Landmark, Lightbulb } from "lucide-react";
import { BankDetails } from "@/components/BankDetails";
import type { Appeal, BankDetails as Bank } from "@/content/donate";

/** £30,000 style amounts. Not Intl: Node and browsers can format differently, which breaks hydration. */
const pounds = (n: number) => `£${Math.round(n).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`;

/** The current fundraising appeal (content/donate.ts): the story, a progress bar and how to give. */
export function AppealProgress({ appeal, bank, donateHref }: { appeal: Appeal; bank?: Bank | null; donateHref?: string }) {
  const pct = Math.min(100, Math.round((appeal.raised / appeal.target) * 100));
  const toGo = Math.max(0, appeal.target - appeal.raised);
  return (
    <section
      id="appeal"
      aria-labelledby="appeal-title"
      className="reveal relative scroll-mt-28 overflow-hidden rounded-3xl border border-pike-bright/60 bg-gradient-to-br from-pike-deep via-surface to-night p-6 sm:p-10"
    >
      <div aria-hidden="true" className="pointer-events-none absolute -right-16 -top-16 h-64 w-64 rounded-full bg-pike-bright/25 blur-3xl" />
      <div className="relative">
        <p className="eyebrow flex items-center gap-2 text-pike-bright">
          <Lightbulb className="h-4 w-4" aria-hidden="true" /> {appeal.eyebrow}
        </p>
        <h2 id="appeal-title" className="display mt-2 max-w-4xl text-4xl sm:text-6xl">
          {appeal.title}
        </h2>
        <p className="mt-4 max-w-3xl text-lg leading-relaxed text-fg/90">{appeal.text}</p>

        <div className="mt-8 flex flex-wrap items-end justify-between gap-4">
          <p>
            <span className="display tabular text-5xl sm:text-6xl">{pounds(appeal.raised)}</span>
            <span className="ml-2 text-muted">
              raised of <span className="font-semibold text-fg">{pounds(appeal.target)}</span> by {appeal.deadline}
            </span>
          </p>
          <p className="display tabular text-3xl text-pike-bright">{pct}%</p>
        </div>
        <div
          role="progressbar"
          aria-label={`${appeal.eyebrow}: ${pounds(appeal.raised)} raised of ${pounds(appeal.target)}`}
          aria-valuemin={0}
          aria-valuemax={appeal.target}
          aria-valuenow={appeal.raised}
          aria-valuetext={`${pounds(appeal.raised)} of ${pounds(appeal.target)} (${pct}%)`}
          className="mt-4 h-5 overflow-hidden rounded-full border border-line-strong bg-ink/60"
        >
          <div
            className="h-full rounded-full bg-gradient-to-r from-pike to-pike-bright"
            style={{ width: `${appeal.raised > 0 ? Math.max(pct, 2) : 0}%` }}
          />
        </div>
        <p className="mt-3 text-sm text-muted">
          {toGo > 0 ? (
            <>
              <span className="font-semibold text-fg">{pounds(toGo)}</span> still to raise. Every donation gets us closer.
            </>
          ) : (
            "Target reached. Thank you to everyone who gave!"
          )}
        </p>

        <div className="mt-10 grid gap-8 lg:grid-cols-[1.3fr_1fr]">
          <div className="space-y-4 leading-relaxed text-muted">
            {appeal.story.map((para) => (
              <p key={para}>{para}</p>
            ))}
          </div>
          {(bank || donateHref) && (
            <div id="bank-details" className="order-first scroll-mt-28 self-start rounded-2xl lg:order-last border border-line-strong bg-ink/60 p-6">
              <h3 className="display flex items-center gap-2 text-2xl">
                <Landmark className="h-6 w-6 text-pike-bright" aria-hidden="true" /> Donate by bank transfer
              </h3>
              {bank ? (
                <>
                  <p className="mt-1 text-sm text-muted">Please use the reference so we can match your gift to the appeal.</p>
                  <div className="mt-3">
                    <BankDetails bank={bank} />
                  </div>
                </>
              ) : null}
              {donateHref && (
                <a
                  href={donateHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="eyebrow mt-5 inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-ink transition-colors hover:bg-pike-bright"
                >
                  Donate online <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                  <span className="sr-only">(opens in a new tab)</span>
                </a>
              )}
            </div>
          )}
        </div>

        <div className="mt-10 border-t border-line-strong pt-8">
          <p className="display text-3xl text-pike-bright sm:text-4xl">{appeal.tagline}</p>
          <p className="mt-3 max-w-2xl leading-relaxed text-fg/90">{appeal.thanks}</p>
        </div>
      </div>
    </section>
  );
}
