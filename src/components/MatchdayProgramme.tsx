import { ArrowUpRight, BookOpen } from "lucide-react";
import { Crest } from "@/components/Crest";
import { SectionHeading } from "@/components/ui";
import { matches, type Match } from "@/content/fixtures";
import { programmes, type Programme } from "@/content/programmes";
import { fixtures, formatLongDate, homeAway, kickoffDate } from "@/lib/matches";

type Issue = Programme & { match: Match };

const title = (m: Match) => {
  const { home, away } = homeAway(m);
  return `${home} v ${away}`;
};

/** Digital matchday programmes (content/programmes.ts): the latest issue, back issues, or a note until the first. */
export function MatchdayProgramme() {
  const issues = programmes
    .map((p) => ({ ...p, match: matches.find((m) => m.id === p.matchId) }))
    .filter((p): p is Issue => Boolean(p.match));
  const [latest, ...back] = issues;
  const nextHome = fixtures("first").find((m) => m.venue === "H");

  return (
    <section aria-labelledby="programme-title">
      <SectionHeading eyebrow="Read online" title="Matchday programme" titleId="programme-title" />
      <div className={`grid gap-6 ${back.length ? "lg:grid-cols-[1.2fr_1fr]" : ""}`}>
        <div className="reveal flex flex-col gap-6 rounded-3xl border border-line-strong bg-gradient-to-br from-pike-deep via-surface to-night p-6 sm:flex-row sm:items-center sm:p-8">
          <div className="flex aspect-[3/4] w-28 shrink-0 items-center justify-center overflow-hidden rounded-xl border border-white/20 bg-ink shadow-xl sm:w-36">
            {latest?.cover ? (
              <img src={latest.cover} alt="" className="h-full w-full object-cover" loading="lazy" />
            ) : (
              <Crest className="h-16 w-auto" />
            )}
          </div>
          {latest ? (
            <div>
              <p className="eyebrow text-pike-bright">Latest issue</p>
              <p className="display mt-1 text-3xl sm:text-4xl">{title(latest.match)}</p>
              <p className="mt-1 text-muted">
                {latest.match.competition} · {formatLongDate(kickoffDate(latest.match))}
              </p>
              <a
                href={latest.file}
                target="_blank"
                rel="noopener noreferrer"
                className="eyebrow mt-5 inline-flex items-center gap-2 rounded-full bg-white px-5 py-2.5 text-ink transition-colors hover:bg-pike-bright"
              >
                <BookOpen className="h-4 w-4" aria-hidden="true" /> Read the programme
                <span className="sr-only">(opens in a new tab)</span>
              </a>
            </div>
          ) : (
            <div>
              <p className="eyebrow text-pike-bright">Coming soon</p>
              <p className="display mt-1 text-3xl sm:text-4xl">Digital programme</p>
              <p className="mt-2 max-w-md leading-relaxed text-muted">
                Team news, the manager's notes, the opposition and the league table, free to read on your phone.
                {nextHome && (
                  <>
                    {" "}
                    The programme for <span className="text-fg">{title(nextHome)}</span> on{" "}
                    {formatLongDate(kickoffDate(nextHome))} will be here before kick-off.
                  </>
                )}
              </p>
            </div>
          )}
        </div>
        {back.length > 0 && (
          <div>
            <h3 className="eyebrow mb-3 text-muted">Back issues</h3>
            <ul className="divide-y divide-line rounded-2xl border border-line bg-surface/70">
              {back.map((p) => (
                <li key={p.matchId}>
                  <a
                    href={p.file}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between gap-4 px-5 py-4 hover:bg-raised/40"
                  >
                    <span>
                      <span className="block font-semibold">{title(p.match)}</span>
                      <span className="text-sm text-muted">{formatLongDate(kickoffDate(p.match))}</span>
                    </span>
                    <ArrowUpRight className="h-4 w-4 shrink-0 text-pike-bright" aria-hidden="true" />
                    <span className="sr-only">(opens in a new tab)</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </section>
  );
}
