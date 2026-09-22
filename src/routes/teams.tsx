import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { Container, PageHeader, SectionHeading } from "@/components/ui";
import { club, officials } from "@/content/club";
import { squad, teamPhoto } from "@/content/squad";
import { seo } from "@/lib/seo";

export const Route = createFileRoute("/teams")({
  head: () =>
    seo({
      title: "Teams",
      path: "/teams",
      description: `${club.name} first team in the ${club.leagueShort}, Pickering Town Ladies, and how to get involved as a player, coach or volunteer.`,
    }),
  component: TeamsPage,
});

const manager = officials.find((o) => o.role === "First-team manager");

const teams = [
  {
    id: "first",
    name: "First Team",
    league: club.league,
    text: `The Pikes compete at ${club.step.toLowerCase()}, with home games at Mill Lane.`,
    facts: [manager && { label: "Manager", value: manager.name }, { label: "Level", value: "Step 5" }].filter(Boolean) as {
      label: string;
      value: string;
    }[],
  },
  {
    id: "ladies",
    name: "Ladies",
    league: "North Riding Women's League Division One",
    text: "Formed in 2025 and now in their second season. New players of every experience level are welcome.",
    facts: [{ label: "Formed", value: "2025" }],
  },
] as const;

function TeamsPage() {
  return (
    <>
      <PageHeader eyebrow="Royal blue and white" title="Our teams">
        From Step 5 on a Saturday afternoon to a women's team in only its second season: there's a place for you at
        Pickering Town.
      </PageHeader>
      <Container className="mt-12 grid gap-6 lg:grid-cols-2">
        {teams.map((t) => (
          <section key={t.id} className="reveal overflow-hidden rounded-3xl border border-line bg-surface/70" aria-labelledby={`team-${t.id}`}>
            <div className="relative h-56 bg-gradient-to-br from-pike-deep via-pike to-pike-bright">
              {t.id === "first" ? (
                <>
                  <img src={teamPhoto.src} alt={teamPhoto.alt} width={teamPhoto.width} height={teamPhoto.height} className="absolute inset-0 h-full w-full object-cover object-[50%_80%]" loading="lazy" />
                  <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-ink via-ink/30 to-transparent" />
                </>
              ) : (
                <div aria-hidden="true" className="absolute inset-0 [background:repeating-linear-gradient(90deg,oklch(1_0_0/0.18)_0_36px,transparent_36px_72px)]" />
              )}
              <p className="display absolute bottom-4 left-6 text-6xl text-white drop-shadow" id={`team-${t.id}`}>
                {t.name}
              </p>
            </div>
            <div className="p-6 sm:p-8">
              <p className="eyebrow text-pike-bright">{t.league}</p>
              <p className="mt-3 leading-relaxed text-muted">{t.text}</p>
              <dl className="mt-6 grid grid-cols-2 gap-4">
                {t.facts.map((f) => (
                  <div key={f.label} className="rounded-xl border border-line bg-ink/40 p-4">
                    <dt className="eyebrow !text-[11px] text-muted">{f.label}</dt>
                    <dd className="display mt-1 text-2xl">{f.value}</dd>
                  </div>
                ))}
              </dl>
              <Link
                to="/fixtures"
                search={{ team: t.id }}
                className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-pike-bright hover:text-fg"
              >
                {t.name} fixtures <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </div>
          </section>
        ))}
      </Container>

      <Container className="mt-24">
        <SectionHeading eyebrow="2026–27" title="First-team squad" />
        <ul className="grid grid-cols-2 gap-4 sm:grid-cols-4 lg:grid-cols-7">
          {squad.map((p) => (
            <li key={p.image} className="reveal group relative overflow-hidden rounded-2xl border border-line bg-gradient-to-b from-pike-deep/70 via-surface to-ink">
              <div aria-hidden="true" className="absolute inset-x-0 top-6 mx-auto h-32 w-32 rounded-full bg-pike/40 blur-2xl" />
              <img
                src={p.image}
                alt={p.name ? `${p.name}, Pickering Town` : "Pickering Town first-team player"}
                className="relative mx-auto h-56 w-auto pt-4 transition-transform duration-500 group-hover:scale-105"
                loading="lazy"
              />
              {p.name && (
                <div className="relative border-t border-line bg-ink/80 px-3 py-2.5">
                  <p className="display text-xl">{p.name}</p>
                  {(p.position || p.number) && (
                    <p className="eyebrow !text-[10px] text-muted">
                      {p.number && `#${p.number} `}
                      {p.position}
                    </p>
                  )}
                </div>
              )}
            </li>
          ))}
        </ul>
      </Container>

      <Container className="mt-24">
        <SectionHeading eyebrow="Get involved" title="Join the club" />
        <div className="grid gap-4 md:grid-cols-3">
          {[
            { title: "Players", text: "Looking for a club? Senior and ladies trials are arranged through the club. Get in touch and we'll pass you to the right manager." },
            { title: "Coaches", text: "Qualified or keen to learn, we'd love to hear from coaches who want to help grow football in Pickering." },
            { title: "Volunteers", text: "Gate, bar, programme, pitch or social media: every non-league club runs on volunteers, and every hour helps." },
          ].map((c) => (
            <div key={c.title} className="reveal rounded-2xl border border-line bg-surface/70 p-6">
              <h3 className="display text-3xl">{c.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted">{c.text}</p>
            </div>
          ))}
        </div>
        <Link
          to="/contact"
          className="eyebrow mt-8 inline-flex items-center gap-2 rounded-full bg-pike px-6 py-3 text-white hover:bg-pike-bright hover:text-ink"
        >
          Get in touch <ArrowRight className="h-4 w-4" aria-hidden="true" />
        </Link>
      </Container>
    </>
  );
}
