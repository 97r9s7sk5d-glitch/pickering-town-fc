import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { Crest } from "@/components/Crest";
import { Container, PageHeader } from "@/components/ui";
import { club } from "@/content/club";
import { legends } from "@/content/legends";
import { seo } from "@/lib/seo";

export const Route = createFileRoute("/legends")({
  head: () =>
    seo({
      title: "Club legends",
      path: "/legends",
      description: `The people who made ${club.name}: players, officials and volunteers remembered at Mill Lane, including Tony Dunning.`,
    }),
  component: LegendsPage,
});

function LegendsPage() {
  return (
    <>
      <PageHeader eyebrow="Hall of fame" title="Club legends">
        Players, officials and volunteers who have given their all to {club.name} since {club.founded}.
      </PageHeader>

      <Container className="mt-12 space-y-8">
        {legends.map((l) => (
          <article
            key={l.slug}
            id={l.slug}
            className="reveal grid scroll-mt-28 overflow-hidden rounded-3xl border border-line bg-surface/70 md:grid-cols-[minmax(0,2fr)_minmax(0,3fr)]"
          >
            <figure className="relative min-h-56 bg-gradient-to-br from-pike-deep via-pike to-pike-bright">
              {l.image ? (
                <>
                  <img src={l.image.src} alt={l.image.alt} className="absolute inset-0 h-full w-full object-cover" loading="lazy" />
                  <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink/90 to-transparent px-5 pb-3 pt-10 text-xs text-fg/85">
                    {l.image.caption}
                  </figcaption>
                </>
              ) : (
                <div className="absolute inset-0 grid place-items-center [background:repeating-linear-gradient(90deg,oklch(1_0_0/0.14)_0_36px,transparent_36px_72px)]">
                  <Crest className="h-28 w-28" />
                </div>
              )}
            </figure>
            <div className="p-6 sm:p-8">
              <p className="eyebrow text-pike-bright">
                {l.role}
                {l.years && ` · ${l.years}`}
              </p>
              <h2 className="display mt-2 text-5xl">{l.name}</h2>
              <p className="mt-2 text-lg text-fg/90">{l.summary}</p>
              <div className="mt-4 space-y-3 leading-relaxed text-muted">
                {l.story.map((para) => (
                  <p key={para}>{para}</p>
                ))}
              </div>
              {l.sources && <p className="mt-5 text-xs text-muted/80">Sources: {l.sources.join("; ")}</p>}
            </div>
          </article>
        ))}

        <div className="reveal rounded-3xl border border-dashed border-line-strong p-8 text-center">
          <p className="display text-3xl">Know a Pikes legend?</p>
          <p className="mx-auto mt-2 max-w-xl text-muted">
            Help us tell the club's story. Send us names, memories and photos of the players and volunteers who
            belong on this page.
          </p>
          <Link
            to="/contact"
            className="eyebrow mt-6 inline-flex items-center gap-2 rounded-full bg-pike px-6 py-3 text-white hover:bg-pike-bright hover:text-ink"
          >
            Get in touch <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>
      </Container>
    </>
  );
}
