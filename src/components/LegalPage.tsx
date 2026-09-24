import { Link } from "@tanstack/react-router";
import { Container, PageHeader } from "@/components/ui";
import type { LegalSection } from "@/content/legal";
import { legalUpdated } from "@/content/site";

/** Shared layout for the privacy policy and terms pages. */
export function LegalPage({ title, intro, sections }: { title: string; intro: string; sections: LegalSection[] }) {
  return (
    <>
      <PageHeader eyebrow={`Last updated ${legalUpdated}`} title={title}>
        {intro}
      </PageHeader>
      <Container className="mt-12 max-w-3xl">
        <div className="space-y-10">
          {sections.map((s) => (
            <section key={s.heading}>
              <h2 className="display text-3xl">{s.heading}</h2>
              <div className="mt-3 space-y-3 leading-relaxed text-fg/90">
                {s.paragraphs.map((p) => (
                  <p key={p}>{p}</p>
                ))}
              </div>
            </section>
          ))}
        </div>
        <p className="mt-12 text-sm text-muted">
          Questions? <Link to="/contact" className="text-pike-bright underline underline-offset-2">Contact the club</Link>.
        </p>
      </Container>
    </>
  );
}
