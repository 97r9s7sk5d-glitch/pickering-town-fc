import { useEffect, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { MatchRow } from "@/components/matches";
import { Container, PageHeader, SampleNotice } from "@/components/ui";
import { FullTimeEmbed } from "@/components/FullTimeEmbed";
import { club } from "@/content/club";
import { fullTime } from "@/content/fulltime";
import { inProgressTeams, teamNames, type Match, type TeamId } from "@/content/fixtures";
import { fixtures, formatMonth, kickoffDate, resultsList } from "@/lib/matches";
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

const tab = "eyebrow whitespace-nowrap rounded-full px-3 py-2 transition-colors min-[400px]:px-3.5 sm:px-4";
const on = "bg-pike text-white";
const off = "text-muted hover:text-fg";

function FixturesPage() {
  // The page is prerendered once (no query string), so the first client render must match it: the tab from the
  // URL (?view=results, ?team=ladies) is applied straight after hydration.
  const search = Route.useSearch();
  const [hydrated, setHydrated] = useState(false);
  useEffect(() => setHydrated(true), []);
  const { view = "fixtures", team = "all" } = hydrated ? search : {};
  const teamId = team === "all" ? undefined : team;
  const list = view === "results" ? resultsList(teamId) : fixtures(teamId);
  const groups = groupByMonth(list);
  // A live Full-Time feed replaces the local list when one is set up for this view. Full-Time feeds are per
  // team, so "All teams" uses the first team's feed.
  const liveSnippet = fullTime[view][teamId ?? "first"];
  const inProgress = inProgressTeams.filter((t) => !teamId || t === teamId);
  const hasTbcVenue = !teamId || teamId === "first" ? list.some((m) => m.team === "first" && !m.venue) : false;
  const notice = [
    inProgress.length > 0 &&
      `${inProgress.map((t) => teamNames[t]).join(" and ")} fixtures and results are currently in progress and will be added here soon.`,
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
                aria-current={view === v ? "true" : undefined}
                className={`${tab} ${view === v ? on : off}`}
                replace
              >
                {v === "fixtures" ? "Fixtures" : "Results"}
              </Link>
            ))}
          </div>
          <div className="flex max-w-full gap-1 overflow-x-auto rounded-full border border-line bg-surface/60 p-1 [scrollbar-width:none]" role="group" aria-label="Team">
            {(["all", ...(Object.keys(teamNames) as TeamId[])] as const).map((t) => (
              <Link
                key={t}
                to="/fixtures"
                search={(s: Search) => ({ ...s, team: t === "all" ? undefined : t })}
                aria-current={team === t ? "true" : undefined}
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
          teamId && inProgress.includes(teamId) ? null : <p className="mt-12 text-muted">Nothing here yet. Check back soon.</p>
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
