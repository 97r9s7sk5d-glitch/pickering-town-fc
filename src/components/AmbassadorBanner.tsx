import { ArrowUpRight } from "lucide-react";
import { clubAmbassador } from "@/content/sponsors";

/** The main club ambassador (Flamingo Land): full banner at the top of the Sponsors page, compact in the home hero. */
export function AmbassadorBanner({ compact = false }: { compact?: boolean }) {
  if (compact) return <AmbassadorCompact />;
  return (
    <div className="reveal relative overflow-hidden rounded-3xl border border-pike-bright/60 bg-gradient-to-br from-pike-deep via-surface to-night p-6 sm:p-8">
      <div aria-hidden="true" className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full bg-pike/30 blur-3xl" />
      <div className="relative flex flex-col gap-6 sm:flex-row sm:items-center">
        <img
          src={clubAmbassador.logo}
          alt={`${clubAmbassador.name} logo`}
          width={256}
          height={256}
          className={`shrink-0 rounded-full shadow-xl ring-2 ring-white/80 ${compact ? "h-20 w-20" : "h-24 w-24 sm:h-28 sm:w-28"}`}
          loading="lazy"
        />
        <div className="flex-1">
          <p className="eyebrow text-pike-bright">{clubAmbassador.role}</p>
          <p className={`display mt-1 ${compact ? "text-3xl sm:text-4xl" : "text-4xl sm:text-5xl"}`}>{clubAmbassador.name}</p>
          <div className="mt-2 max-w-3xl space-y-3 leading-relaxed text-muted">
            {clubAmbassador.text.map((para) => (
              <p key={para}>{para}</p>
            ))}
          </div>
        </div>
        <a
          href={clubAmbassador.url}
          target="_blank"
          rel="noopener noreferrer"
          className="eyebrow inline-flex shrink-0 items-center gap-2 self-start rounded-full bg-white px-5 py-2.5 text-ink transition-colors hover:bg-pike-bright sm:self-center"
        >
          Visit Flamingo Land <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
          <span className="sr-only">(opens in a new tab)</span>
        </a>
      </div>
    </div>
  );
}

function AmbassadorCompact() {
  return (
    <div className="flex max-w-xl items-center gap-4 rounded-2xl border border-pike-bright/40 bg-ink/60 p-4 backdrop-blur-sm">
      <img
        src={clubAmbassador.logo}
        alt={`${clubAmbassador.name} logo`}
        width={256}
        height={256}
        className="h-16 w-16 shrink-0 rounded-full shadow-lg ring-2 ring-white/80"
      />
      <div className="min-w-0 flex-1">
        <p className="eyebrow !text-[11px] text-pike-bright">{clubAmbassador.role}</p>
        <p className="display mt-0.5 text-2xl">{clubAmbassador.name}</p>
        <p className="mt-1 text-sm leading-snug text-muted">{clubAmbassador.text[0]}</p>
        <a
          href={clubAmbassador.url}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-2 inline-flex items-center gap-1 text-sm font-semibold text-pike-bright hover:text-fg"
        >
          Visit Flamingo Land <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
          <span className="sr-only">(opens in a new tab)</span>
        </a>
      </div>
    </div>
  );
}
