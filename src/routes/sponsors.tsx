import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Check } from "lucide-react";
import { Container, PageHeader, SectionHeading } from "@/components/ui";
import { club } from "@/content/club";
import { packages, partners } from "@/content/sponsors";
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

function SponsorsPage() {
  return (
    <>
      <PageHeader eyebrow="Commercial" title="Back the Pikes">
        Local businesses keep non-league football alive. Put your name in front of supporters at Mill Lane and across
        the club's channels, at every budget.
      </PageHeader>

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
        <SectionHeading eyebrow="Thank you" title="Our partners" />
        {partners.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-line-strong p-10 text-center">
            <p className="display text-3xl">Your business here</p>
            <p className="mt-2 text-muted">Partner logos appear here. Be one of the first for the 2026–27 season.</p>
          </div>
        ) : (
          <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {partners.map((p) => (
              <li key={p.name} className="rounded-2xl border border-line bg-surface/70 p-6 text-center">
                <p className="eyebrow !text-[11px] text-muted">{p.tier}</p>
                {p.url ? (
                  <a href={p.url} target="_blank" rel="noopener noreferrer" className="display mt-2 block text-2xl hover:text-pike-bright">
                    {p.name}
                  </a>
                ) : (
                  <p className="display mt-2 text-2xl">{p.name}</p>
                )}
              </li>
            ))}
          </ul>
        )}
      </Container>
    </>
  );
}
