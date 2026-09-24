import { ArrowUpRight } from "lucide-react";
import { clubSponsors } from "@/content/sponsors";

/** Smaller club sponsor cards, shown under the club ambassador banner on the Sponsors page. */
export function ClubSponsors() {
  return (
    <ul className="mt-5 grid gap-5 sm:grid-cols-2">
      {clubSponsors.map((s) => (
        <li
          key={s.name}
          className="reveal flex items-center gap-5 rounded-2xl border border-line-strong bg-gradient-to-br from-surface to-night p-5"
        >
          {s.logo && s.round ? (
            <div className="flex h-20 w-36 shrink-0 items-center justify-center sm:w-44">
              <img
                src={s.logo}
                alt={`${s.name} logo`}
                width={320}
                height={320}
                className="h-20 w-20 rounded-full shadow-lg ring-2 ring-white/80"
                loading="lazy"
              />
            </div>
          ) : (
            <div className="flex h-20 w-36 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-white p-2 shadow-lg sm:w-44">
              {s.logo ? (
                <img
                  src={s.logo}
                  alt={`${s.name} logo`}
                  width={580}
                  height={166}
                  className="max-h-full w-full object-contain"
                  loading="lazy"
                />
              ) : (
                <span
                  aria-hidden="true"
                  className="display text-center text-2xl leading-none text-ink"
                >
                  {s.name}
                </span>
              )}
            </div>
          )}
          <div className="min-w-0">
            <p className="eyebrow !text-[11px] text-pike-bright">
              Club sponsor
            </p>
            <p className="display mt-1 text-2xl sm:text-3xl">{s.name}</p>
            {s.url && (
              <a
                href={s.url}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-1 inline-flex items-center gap-1 text-sm font-semibold text-pike-bright hover:text-fg"
              >
                Visit website{" "}
                <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
                <span className="sr-only">(opens in a new tab)</span>
              </a>
            )}
          </div>
        </li>
      ))}
    </ul>
  );
}
