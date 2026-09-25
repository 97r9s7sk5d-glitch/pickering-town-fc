import { ArrowUpRight, Headphones, Radio } from "lucide-react";
import { radio } from "@/content/media";

/** Local radio panel on the News page (details in content/media.ts). */
export function RadioPanel() {
  return (
    <section
      aria-labelledby="radio-title"
      className="reveal relative overflow-hidden rounded-3xl border border-line-strong bg-gradient-to-br from-pike-deep via-surface to-night p-6 sm:p-8"
    >
      <div aria-hidden="true" className="pointer-events-none absolute -right-10 -top-10 h-48 w-48 rounded-full bg-pike/30 blur-3xl" />
      <div className="relative flex flex-col gap-6 sm:flex-row sm:items-center">
        <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-full bg-white text-ink shadow-xl ring-2 ring-white/80">
          <Radio className="h-9 w-9" aria-hidden="true" />
        </div>
        <div className="flex-1">
          <p className="eyebrow text-pike-bright">Local radio · {radio.frequency}</p>
          <h2 id="radio-title" className="display mt-1 text-4xl sm:text-5xl">
            {radio.name}
          </h2>
          <p className="mt-2 max-w-2xl leading-relaxed text-muted">{radio.text}</p>
        </div>
        <div className="flex shrink-0 flex-col gap-3 self-start sm:self-center">
          {radio.latestInterview && (
            <a
              href={radio.latestInterview}
              target="_blank"
              rel="noopener noreferrer"
              className="eyebrow inline-flex items-center justify-center gap-2 rounded-full bg-white px-5 py-2.5 text-ink transition-colors hover:bg-pike-bright"
            >
              <Headphones className="h-4 w-4" aria-hidden="true" /> Listen to the latest interview
              <span className="sr-only">(opens in a new tab)</span>
            </a>
          )}
          <a
            href={radio.url}
            target="_blank"
            rel="noopener noreferrer"
            className={`eyebrow inline-flex items-center justify-center gap-2 rounded-full px-5 py-2.5 transition-colors ${
              radio.latestInterview
                ? "border border-line-strong text-fg hover:border-pike-bright hover:text-pike-bright"
                : "bg-white text-ink hover:bg-pike-bright"
            }`}
          >
            Listen live <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
            <span className="sr-only">(opens {radio.name} in a new tab)</span>
          </a>
        </div>
      </div>
    </section>
  );
}
