import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Check } from "lucide-react";
import { Container, PageHeader, SectionHeading } from "@/components/ui";
import { AmbassadorBanner } from "@/components/AmbassadorBanner";
import { ClubSponsors } from "@/components/ClubSponsors";
import { club } from "@/content/club";
import { packages, partners, playerSponsorGraphics } from "@/content/sponsors";
import { seo } from "@/lib/seo";

export const Route = createFileRoute("/sponsors")({
  head: () =>
    seo({
      title: "Sponsorship",
      path: "/sponsors",
      description: `Sponsor ${club.name}: pitchside boards, matchday, matchball and player sponsorship. Put your business in front of Pickering.`,
    }),
  component: SponsorsPage,
});

const graphicGroups = [
  { team: "first", label: "First team" },
  { team: "ladies", label: "Ladies first team" },
] as const;

function SponsorsPage() {
  return (
    <>
      <PageHeader eyebrow="Commercial" title="Back the Pikes">
        Local businesses keep non-league football alive. Put your name in front of supporters at Mill Lane and across
        the club's channels, at every budget.
      </PageHeader>

      <Container className="mt-12">
        <AmbassadorBanner />
        <ClubSponsors />
      </Container>

      <Container className="mt-12">
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {packages.map((p) => (
            <div
              key={p.name}
              className={`reveal flex flex-col rounded-2xl border p-6 ${
                p.featured ? "border-pike-bright bg-gradient-to-b from-pike-deep/70 to-surface" : "border-line bg-surface/70"
              }`}
            >
              {p.featured && <p className="eyebrow mb-3 !text-[11px] text-pike-bright">Most popular</p>}
              <h2 className="display text-3xl">{p.name}</h2>
              <p className="mt-1 text-sm text-muted">{p.price}</p>
              <ul className="mt-5 flex-1 space-y-2.5 text-sm">
                {p.points.map((pt) => (
                  <li key={pt} className="flex gap-2">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-win" aria-hidden="true" />
                    {pt}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <Link
          to="/contact"
          search={{ topic: "sponsorship" }}
          className="eyebrow mt-8 inline-flex items-center gap-2 rounded-full bg-pike px-6 py-3 text-white hover:bg-pike-bright hover:text-ink"
        >
          Talk to us about sponsorship <ArrowRight className="h-4 w-4" aria-hidden="true" />
        </Link>
      </Container>

      <Container className="mt-24">
        <SectionHeading eyebrow="Player sponsorship" title="Back a Pike" />
        <p className="-mt-2 mb-8 max-w-2xl leading-relaxed text-muted">
          Player sponsors get their logo on the player's profile graphic, used on the website and across the club's
          social media all season.
        </p>
        {graphicGroups.map((group) => (
          <section key={group.team} className="mt-10 first:mt-0" aria-label={`${group.label} player graphics`}>
            <h3 className="eyebrow mb-4 text-pike-bright">{group.label}</h3>
            <ul className="grid grid-cols-2 gap-4 lg:grid-cols-4">
              {playerSponsorGraphics.filter((g) => g.team === group.team).map((g) => (
                <li key={g.src} className="reveal flex flex-col overflow-hidden rounded-2xl border border-line bg-surface">
                  <img
                    src={g.src}
                    alt={g.sponsor ? `${group.label} player graphic sponsored by ${g.sponsor}` : `${group.label} player graphic, sponsor available`}
                    width={940}
                    height={788}
                    className="w-full bg-white"
                    loading="lazy"
                  />
                  {g.sponsor ? (
                    <p className="mt-auto px-3 py-2.5 text-xs text-muted">
                      Sponsored by <span className="font-semibold text-fg">{g.sponsor}</span>
                    </p>
                  ) : (
                    <Link
                      to="/contact"
                      search={{ topic: "sponsorship" }}
                      className="eyebrow mt-auto flex items-center justify-between gap-2 bg-pike px-3 py-2.5 !text-[11px] text-white hover:bg-pike-bright hover:text-ink"
                    >
                      Sponsor this player <ArrowRight className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </section>
        ))}
      </Container>

      <Container className="mt-24">
        <SectionHeading eyebrow="Thank you" title="Our partners" />
        {partners.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-line-strong p-10 text-center">
            <p className="display text-3xl">Your business here</p>
            <p className="mt-2 text-muted">Partner logos appear here.</p>
          </div>
        ) : (
          <ul className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
            {partners.map((p) => (
              <li
                key={p.name}
                className={`flex flex-col justify-center rounded-2xl border p-4 text-center sm:p-6 ${
                  p.tier === "Shirt sponsor" ? "border-pike-bright bg-gradient-to-b from-pike-deep/70 to-surface sm:col-span-2 lg:col-span-4" : "border-line bg-surface/70"
                }`}
              >
                <p className="eyebrow !text-[10px] text-pike-bright sm:!text-[11px]">{p.tier}</p>
                {p.url ? (
                  <a href={p.url} target="_blank" rel="noopener noreferrer" className="display mt-2 block text-3xl hover:text-pike-bright">
                    {p.name}
                  </a>
                ) : (
                  <p className={`display mt-2 break-words ${p.tier === "Shirt sponsor" ? "text-4xl sm:text-5xl" : "text-lg sm:text-2xl"}`}>{p.name}</p>
                )}
              </li>
            ))}
          </ul>
        )}
      </Container>
    </>
  );
}
