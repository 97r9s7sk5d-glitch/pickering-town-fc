import { createFileRoute, Link } from "@tanstack/react-router";
import { MatchRow } from "@/components/matches";
import { Container, PageHeader, SampleNotice } from "@/components/ui";
import { club } from "@/content/club";
import { isSampleData, teamNames, type Match, type TeamId } from "@/content/fixtures";
import { fixtures, formatMonth, kickoffDate, results } from "@/lib/matches";
import { seo } from "@/lib/seo";

type View = "fixtures" | "results";
type TeamFilter = "all" | TeamId;
type Search = { view?: View; team?: TeamFilter };

export const Route = createFileRoute("/fixtures")({
  validateSearch: (search: Record<string, unknown>): Search => ({
    view: search.view === "results" ? "results" : undefined,
    team: search.team === "first" || search.team === "ladies" ? search.team : undefined,
  }),
  head: () =>
    seo({
      title: "Fixtures & results",
      path: "/fixtures",
      description: `Upcoming fixtures and latest results for ${club.name} first team and ladies, with kick-off times and add-to-calendar links.`,
    }),
  component: FixturesPage,
});

function groupByMonth(list: Match[]) {
  const groups: { month: string; matches: Match[] }[] = [];
  for (const m of list) {
    const month = formatMonth(kickoffDate(m));
    const last = groups[groups.length - 1];
    if (last?.month === month) last.matches.push(m);
    else groups.push({ month, matches: [m] });
  }
  return groups;
}

const tab = "eyebrow whitespace-nowrap rounded-full px-3.5 py-2 transition-colors sm:px-4";
const on = "bg-pike text-white";
const off = "text-muted hover:text-fg";

function FixturesPage() {
  const { view = "fixtures", team = "all" } = Route.useSearch();
  const teamId = team === "all" ? undefined : team;
  const list = view === "results" ? results(teamId) : fixtures(teamId);
  const groups = groupByMonth(list);

  return (
    <>
      <PageHeader eyebrow="2026–27 season" title="Fixtures & results">
        Every game for the first team and the ladies. Tap <strong className="text-fg">Add to calendar</strong> on any
        fixture to save it to your phone.
      </PageHeader>
      <Container className="mt-10">
        {isSampleData && <SampleNotice />}
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex gap-1 rounded-full border border-line bg-surface/60 p-1" role="group" aria-label="Show">
            {(["fixtures", "results"] as const).map((v) => (
              <Link
                key={v}
                to="/fixtures"
                search={(s: Search) => ({ ...s, view: v === "results" ? ("results" as const) : undefined })}
                aria-pressed={view === v}
                className={`${tab} ${view === v ? on : off}`}
                replace
              >
                {v === "fixtures" ? "Fixtures" : "Results"}
              </Link>
            ))}
          </div>
          <div className="flex gap-1 rounded-full border border-line bg-surface/60 p-1" role="group" aria-label="Team">
            {(["all", "first", "ladies"] as const).map((t) => (
              <Link
                key={t}
                to="/fixtures"
                search={(s: Search) => ({ ...s, team: t === "all" ? undefined : t })}
                aria-pressed={team === t}
                className={`${tab} ${team === t ? on : off}`}
                replace
              >
                {t === "all" ? "All teams" : teamNames[t]}
              </Link>
            ))}
          </div>
        </div>

        {groups.length === 0 ? (
          <p className="mt-12 text-muted">Nothing here yet. Check back soon.</p>
        ) : (
          groups.map((g) => (
            <section key={g.month} className="mt-10" aria-labelledby={`m-${g.month}`}>
              <h2 id={`m-${g.month}`} className="display text-3xl text-pike-bright">
                {g.month}
              </h2>
              <ul className="mt-2 border-t border-line-strong">
                {g.matches.map((m) => (
                  <MatchRow key={m.id} match={m} />
                ))}
              </ul>
            </section>
          ))
        )}
      </Container>
    </>
  );
}
