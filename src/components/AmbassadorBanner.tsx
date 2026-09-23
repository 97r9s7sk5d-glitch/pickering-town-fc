import { ArrowUpRight } from "lucide-react";
import { clubAmbassador } from "@/content/sponsors";

/** The club's principal partner (Flamingo Land): used at the top of the Sponsors page and on the home page. */
export function AmbassadorBanner({ compact = false }: { compact?: boolean }) {
  return (
    <div className="reveal relative overflow-hidden rounded-3xl border border-pike-bright/60 bg-gradient-to-br from-pike-deep via-surface to-night p-6 sm:p-8">
      <div aria-hidden="true" className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full bg-pike/30 blur-3xl" />
      <div className="relative flex flex-col gap-6 sm:flex-row sm:items-center">
        <img
          src={clubAmbassador.logo}
          alt={`${clubAmbassador.name} logo`}
          width={164}
          height={164}
          className={`shrink-0 rounded-full bg-white p-1.5 shadow-xl ${compact ? "h-20 w-20" : "h-24 w-24 sm:h-28 sm:w-28"}`}
          loading="lazy"
        />
        <div className="flex-1">
          <p className="eyebrow text-pike-bright">{clubAmbassador.role}</p>
          <p className={`display mt-1 ${compact ? "text-3xl sm:text-4xl" : "text-4xl sm:text-5xl"}`}>{clubAmbassador.name}</p>
          <p className="mt-2 max-w-2xl leading-relaxed text-muted">{clubAmbassador.text}</p>
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
