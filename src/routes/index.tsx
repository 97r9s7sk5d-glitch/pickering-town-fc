import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, MapPin, Trophy, Users } from "lucide-react";
import { FormGuide, NextMatchPanel, OutcomeBadge } from "@/components/matches";
import { LeagueTable } from "@/components/LeagueTable";
import { Card, Container, SectionHeading } from "@/components/ui";
import { ArticleCard } from "@/components/ArticleCard";
import { AmbassadorBanner } from "@/components/AmbassadorBanner";
import { TeamCards } from "@/components/TeamCards";
import { PitchIntro } from "@/components/PitchIntro";
import { club, ground } from "@/content/club";
import { honours, records } from "@/content/history";
import { articles } from "@/content/news";
import { groundPhoto, ladiesHeroPlayer, squad } from "@/content/squad";
import { leagueTable, ownTeamName, tableTitle } from "@/content/fixtures";
import { form, formatDay, homeAway, kickoffDate, lastResult, nextMatch, outcome, scoreline } from "@/lib/matches";
import { seo } from "@/lib/seo";

export const Route = createFileRoute("/")({
  head: () =>
    seo({
      description: `${club.name}, ${club.nickname}: fixtures, results, the ${club.leagueShort} table, news and matchday information for ${ground.name}, ${club.town}. Est. ${club.founded}.`,
    }),
  component: HomePage,
});

/** Hero countdowns: one per senior side, each with its own featured player cut-out. */
const heroTeams = [
  { id: "first", label: "First team", player: { src: squad[2].image, width: 558, height: 900, feather: false } },
  { id: "ladies", label: "Ladies", player: ladiesHeroPlayer },
] as const;

const arrowLink = "inline-flex items-center gap-1.5 text-sm font-semibold text-pike-bright hover:text-fg";

function HomePage() {
  const last = lastResult();
  const lastOutcome = last ? outcome(last) : null;
  const position = leagueTable.findIndex((r) => r.team === ownTeamName) + 1;
  const trophies = honours.reduce((n, h) => n + h.seasons.length, 0);

  return (
    <>
      <PitchIntro />
      {/* Hero */}
      <section className="pitch-backdrop relative overflow-hidden border-b border-line">
        <img src={groundPhoto.src} alt="" aria-hidden="true" className="absolute inset-0 h-full w-full object-cover opacity-45 mix-blend-luminosity" fetchPriority="high" />
        <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-r from-ink via-ink/75 to-ink/30" />
        <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-ink via-transparent to-ink/60" />
        <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-pike-bright/60 to-transparent" />
        <Container className="relative grid gap-10 pb-16 pt-12 sm:pt-20 lg:grid-cols-[1fr_1.15fr] lg:items-center lg:gap-12 lg:pb-24">
          <div>
            <p className="eyebrow animate-rise text-pike-bright">
              {club.nickname} · {club.leagueShort} · Est. {club.founded}
            </p>
            <h1 className="display animate-rise mt-4 text-[clamp(4rem,12vw,8rem)]">
              Pickering
              <br />
              <span className="bg-gradient-to-r from-pike-bright to-pike bg-clip-text text-transparent">Town FC</span>
            </h1>
            <p className="animate-rise-late mt-6 max-w-lg text-lg leading-relaxed text-muted">
              Non-league football in the heart of Ryedale. {club.colours}, {ground.name}, and a club that has
              been part of {club.town} for {new Date().getFullYear() - club.founded} years.
            </p>
            <div className="animate-rise-late mt-8 flex flex-wrap gap-3">
              <Link
                to="/fixtures"
                className="eyebrow inline-flex items-center gap-2 rounded-full bg-pike px-6 py-3 text-white shadow-lg shadow-pike/30 transition-colors hover:bg-pike-bright hover:text-ink"
              >
                Fixtures &amp; results <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
              <Link
                to="/matchday"
                className="eyebrow inline-flex items-center gap-2 rounded-full border border-line-strong px-6 py-3 text-fg transition-colors hover:border-pike-bright hover:text-pike-bright"
              >
                Plan your visit
              </Link>
            </div>
            {/* Main club ambassador: in the hero on large screens, below the hero on phones (see after the section). */}
            <div className="animate-rise-late mt-10 hidden lg:block">
              <AmbassadorBanner compact />
            </div>
          </div>
          {/* Next game for each senior side, side by side, each with a featured player rising behind the panel
              (players on large screens only; on phones the panels stack). */}
          <div className="animate-rise-late grid gap-5 sm:grid-cols-2">
            {heroTeams.map(({ id, label, player }) => {
              const match = nextMatch(id);
              return (
                <div key={id} className="relative flex flex-col lg:pt-44">
                  <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 -top-4 hidden justify-center lg:flex">
                    <div className="absolute top-16 h-48 w-48 rounded-full bg-pike/40 blur-3xl" />
                    <img
                      src={player.src}
                      alt=""
                      width={player.width}
                      height={player.height}
                      className={`relative h-72 w-auto ${player.feather ? "[mask-image:radial-gradient(ellipse_62%_58%_at_50%_42%,black_55%,transparent_100%)]" : ""}`}
                      fetchPriority="high"
                    />
                  </div>
                  <div className="relative flex-1">
                    {match ? <NextMatchPanel match={match} compact label={label} /> : <NoFixtures label={label} />}
                  </div>
                </div>
              );
            })}
          </div>
        </Container>
      </section>

      <Container className="mt-10 lg:hidden">
        <AmbassadorBanner compact />
      </Container>

      {/* Season at a glance */}
      <Container className="mt-14 grid gap-4 md:grid-cols-3">
        {last && lastOutcome && (
          <Card className="reveal p-6">
            <p className="eyebrow text-muted">Last result</p>
            <div className="mt-4 flex items-center gap-4">
              <OutcomeBadge result={lastOutcome} size="lg" />
              <div>
                <p className="display text-3xl tabular">
                  {homeAway(last).home} {scoreline(last)!.home}–{scoreline(last)!.away} {homeAway(last).away}
                </p>
                <p className="mt-1 text-sm text-muted">
                  {formatDay(kickoffDate(last))} · {last.competition}
                </p>
              </div>
            </div>
          </Card>
        )}
        <Card className="reveal p-6">
          <p className="eyebrow text-muted">Form · last five</p>
          <div className="mt-5">
            <FormGuide items={form()} />
          </div>
          <Link to="/fixtures" search={{ view: "results" }} className={`${arrowLink} mt-5`}>
            All results <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </Card>
        <Card className="reveal p-6">
          <p className="eyebrow text-muted">League position</p>
          <p className="display mt-3 text-6xl tabular">
            {position}
            <sup className="ml-1 text-2xl text-pike-bright">{ordinal(position)}</sup>
          </p>
          <p className="text-sm text-muted">{tableTitle}</p>
        </Card>
      </Container>

      {/* Teams: next game for each side */}
      <Container className="mt-24">
        <SectionHeading eyebrow="Three teams, one club" title="Our teams" />
        <TeamCards />
      </Container>

      {/* News */}
      <Container className="mt-24">
        <SectionHeading
          eyebrow="Latest"
          title="News"
          action={
            <Link to="/news" className={arrowLink}>
              All news <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          }
        />
        <div className="grid gap-5 md:grid-cols-3">
          {articles.slice(0, 3).map((a, i) => (
            <ArticleCard key={a.slug} article={a} featured={i === 0} />
          ))}
        </div>
      </Container>

      {/* Table + matchday */}
      <Container className="mt-24 grid gap-6 lg:grid-cols-[1.2fr_1fr]">
        <Card className="reveal p-6 sm:p-8">
          <SectionHeading
            eyebrow={club.leagueShort}
            title="The table"
            action={
              <Link to="/table" className={arrowLink}>
                Full table <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            }
          />
          <LeagueTable compact />
        </Card>
        <div className="reveal relative overflow-hidden rounded-2xl border border-line bg-gradient-to-br from-pike-deep to-night p-6 sm:p-8">
          <img src={groundPhoto.src} alt="" aria-hidden="true" className="absolute inset-0 h-full w-full object-cover" loading="lazy" />
          <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-br from-pike-deep/95 via-pike-deep/80 to-night/60" />
          <div className="relative">
            <p className="eyebrow text-pike-bright">Matchday</p>
            <h2 className="display mt-2 text-5xl">Come to {ground.name}</h2>
            <p className="mt-4 leading-relaxed text-fg/85">
              Come and get behind the Pikes. Directions, admission and the clubhouse at the {ground.clubhouse} are
              all in the matchday guide.
            </p>
            <p className="mt-5 flex items-center gap-2 text-sm text-muted">
              <MapPin className="h-4 w-4" aria-hidden="true" />
              {ground.addressLines.join(", ")}, {ground.postcode}
            </p>
            <Link
              to="/matchday"
              className="eyebrow mt-7 inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-ink transition-colors hover:bg-pike-bright"
            >
              Matchday guide <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </Container>

      {/* Heritage */}
      <Container className="mt-24">
        <SectionHeading eyebrow="Since 1888" title="Our story" />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <Stat value={String(club.founded)} label="Founded" />
          <Stat value={String(trophies)} label="Honours won" />
          <Stat value={records[0].value} label={`${records[0].label}, ${records[0].detail}`} />
          <Stat value="Step 4" label="Reached in 2018" />
        </div>
        <Link to="/club" className={`${arrowLink} mt-6`}>
          History, honours and officials <ArrowRight className="h-4 w-4" aria-hidden="true" />
        </Link>
      </Container>

      {/* Teams + sponsors */}
      <Container className="mt-24 grid gap-5 md:grid-cols-2">
        <Link to="/teams" className="reveal group rounded-2xl border border-line bg-surface/70 p-6 transition-colors hover:border-pike-bright sm:p-8">
          <Users className="h-8 w-8 text-pike-bright" aria-hidden="true" />
          <h2 className="display mt-4 text-4xl">Play for the Pikes</h2>
          <p className="mt-3 text-muted">
            A first team at Step 5, a ladies first team, an under-18s side and an academy pathway with Hawkes 360, with room for players, coaches and volunteers.
          </p>
          <span className={`${arrowLink} mt-5`}>
            Our teams <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
          </span>
        </Link>
        <Link to="/sponsors" className="reveal group rounded-2xl border border-line bg-surface/70 p-6 transition-colors hover:border-pike-bright sm:p-8">
          <Trophy className="h-8 w-8 text-pike-bright" aria-hidden="true" />
          <h2 className="display mt-4 text-4xl">Back the club</h2>
          <p className="mt-3 text-muted">
            Pitchside boards, matchday and matchball sponsorship: local businesses keep non-league football going.
          </p>
          <span className={`${arrowLink} mt-5`}>
            Sponsorship <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
          </span>
        </Link>
      </Container>
    </>
  );
}

function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div className="reveal rounded-2xl border border-line bg-surface/70 p-6">
      <p className={`display text-fg ${value.length > 8 ? "text-4xl" : "text-5xl"}`}>{value}</p>
      <p className="mt-2 text-sm text-muted">{label}</p>
    </div>
  );
}

function NoFixtures({ label = "Next match" }: { label?: string }) {
  return (
    <Card className="p-8">
      <p className="eyebrow text-pike-bright">{label}</p>
      <p className="display mt-3 text-4xl">Fixtures coming soon</p>
      <p className="mt-2 text-muted">New fixtures appear here as soon as the league publishes them.</p>
    </Card>
  );
}

function ordinal(n: number) {
  const s = ["th", "st", "nd", "rd"];
  const v = n % 100;
  return s[(v - 20) % 10] || s[v] || s[0];
}
