import { createFileRoute, Link } from "@tanstack/react-router";
import { MatchRow } from "@/components/matches";
import { Container, PageHeader, SampleNotice } from "@/components/ui";
import { FullTimeEmbed } from "@/components/FullTimeEmbed";
import { club } from "@/content/club";
import { fullTime } from "@/content/fulltime";
import { placeholderTeams, teamNames, type Match, type TeamId } from "@/content/fixtures";
import { fixtures, formatMonth, kickoffDate, results } from "@/lib/matches";
import { seo } from "@/lib/seo";

type View = "fixtures" | "results";
type TeamFilter = "all" | TeamId;
type Search = { view?: View; team?: TeamFilter };

export const Route = createFileRoute("/fixtures")({
  validateSearch: (search: Record<string, unknown>): Search => ({
    view: search.view === "results" ? "results" : undefined,
    team: typeof search.team === "string" && search.team in teamNames ? (search.team as TeamId) : undefined,
  }),
  head: () =>
    seo({
      title: "Fixtures & results",
      path: "/fixtures",
      description: `Upcoming fixtures and latest results for ${club.name} first team, ladies and U18s, with kick-off times and add-to-calendar links.`,
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
  // A live Full-Time feed replaces the local list when one is set up for this view. Full-Time feeds are per
  // team, so "All teams" uses the first team's feed.
  const liveSnippet = fullTime[view][teamId ?? "first"];
  const shownPlaceholders = placeholderTeams.filter((t) => !teamId || t === teamId);
  const hasTbcVenue = !teamId || teamId === "first" ? list.some((m) => m.team === "first" && !m.venue) : false;
  const notice = [
    shownPlaceholders.length > 0 &&
      `${shownPlaceholders.map((t) => teamNames[t]).join(" and ")} games are placeholders until the club adds the real ones.`,
    hasTbcVenue && `Games marked H/A TBC are still to be confirmed as home or away.`,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <>
      <PageHeader eyebrow="2026–27 season" title="Fixtures & results">
        Every game for the first team, the ladies and the U18s. Tap <strong className="text-fg">Add to calendar</strong> on any
        fixture to save it to your phone.
      </PageHeader>
      <Container className="mt-10">
        {!liveSnippet && notice && <SampleNotice>{notice}</SampleNotice>}
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
            {(["all", ...(Object.keys(teamNames) as TeamId[])] as const).map((t) => (
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

        {liveSnippet ? (
          <div className="mt-10">
            <FullTimeEmbed
              key={`${view}-${teamId ?? "first"}`}
              snippet={liveSnippet}
              title={`${teamNames[teamId ?? "first"]} ${view}`}
            />
          </div>
        ) : groups.length === 0 ? (
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
