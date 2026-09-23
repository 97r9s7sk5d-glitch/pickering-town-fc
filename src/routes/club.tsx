import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Trophy } from "lucide-react";
import { Container, PageHeader, SectionHeading } from "@/components/ui";
import { club, officials } from "@/content/club";
import { honours, records, timeline } from "@/content/history";
import { seo } from "@/lib/seo";

export const Route = createFileRoute("/club")({
  head: () =>
    seo({
      title: "History & honours",
      path: "/club",
      description: `The story of ${club.name} since ${club.founded}: league history, honours, cup records and club officials.`,
    }),
  component: ClubPage,
});

function ClubPage() {
  return (
    <>
      <PageHeader eyebrow={`Est. ${club.founded}`} title="The club">
        {new Date().getFullYear() - club.founded} years of football in {club.town}: from the York League to
        Step 4 and back to the NCEL Premier Division.
      </PageHeader>

      <Container className="mt-16">
        <SectionHeading eyebrow="Timeline" title="Our history" />
        <ol className="relative ml-3 border-l-2 border-line-strong">
          {timeline.map((era) => (
            <li key={era.years} className="reveal relative pb-10 pl-8 last:pb-0">
              <span aria-hidden="true" className="absolute -left-[9px] top-1.5 h-4 w-4 rounded-full border-4 border-ink bg-pike-bright" />
              <p className="display text-2xl text-pike-bright">{era.years}</p>
              <h3 className="mt-1 text-lg font-semibold">{era.title}</h3>
              <p className="mt-1 max-w-2xl leading-relaxed text-muted">{era.text}</p>
            </li>
          ))}
        </ol>
      </Container>

      <Container className="mt-24">
        <SectionHeading eyebrow="Silverware" title="Honours" />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {honours.map((h) => (
            <div key={h.competition + h.detail} className="reveal rounded-2xl border border-line bg-surface/70 p-6">
              <Trophy className="h-6 w-6 text-draw" aria-hidden="true" />
              <h3 className="display mt-3 text-2xl">{h.competition}</h3>
              <p className="text-sm text-muted">{h.detail}</p>
              <ul className="mt-4 flex flex-wrap gap-2">
                {h.seasons.map((s) => (
                  <li key={s} className="tabular rounded-full bg-raised px-3 py-1 text-sm font-semibold">
                    {s}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </Container>

      <Container className="mt-24 grid gap-10 lg:grid-cols-2">
        <section>
          <SectionHeading eyebrow="Best runs" title="Records" />
          <dl className="divide-y divide-line border-y border-line">
            {records.map((r) => (
              <div key={r.label} className="grid grid-cols-[8rem_1fr] gap-4 py-4">
                <dt className="eyebrow pt-1 text-muted">{r.label}</dt>
                <dd>
                  <p className="display text-2xl">{r.value}</p>
                  <p className="text-sm text-muted">{r.detail}</p>
                </dd>
              </div>
            ))}
          </dl>
        </section>
        <section>
          <SectionHeading eyebrow="Who's who" title="Officials" />
          <dl className="divide-y divide-line border-y border-line">
            {officials.map((o) => (
              <div key={o.role} className="grid grid-cols-[10rem_1fr] gap-4 py-4">
                <dt className="eyebrow pt-1 text-muted">{o.role}</dt>
                <dd className="text-lg font-semibold">{o.name}</dd>
              </div>
            ))}
          </dl>
        </section>
      </Container>

      <Container className="mt-24">
        <Link
          to="/legends"
          className="reveal group flex flex-col gap-4 rounded-3xl border border-line bg-gradient-to-br from-pike-deep/70 to-surface p-6 transition-colors hover:border-pike-bright sm:flex-row sm:items-center sm:justify-between sm:p-8"
        >
          <div>
            <p className="eyebrow text-pike-bright">Hall of fame</p>
            <p className="display mt-1 text-4xl">Club legends</p>
            <p className="mt-2 max-w-xl text-muted">
              The people behind {club.name}, from Tony Dunning, whose name is on the stand, to the players supporters
              still talk about.
            </p>
          </div>
          <span className="eyebrow inline-flex shrink-0 items-center gap-2 text-pike-bright group-hover:text-fg">
            Meet the legends <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
          </span>
        </Link>
      </Container>
    </>
  );
}
