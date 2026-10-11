import { createFileRoute, Link } from "@tanstack/react-router";
import { navItems } from "@/components/SiteHeader";
import { Card, Container, PageHeader } from "@/components/ui";
import { club } from "@/content/club";
import { articles } from "@/content/news";
import { sitemapExtras } from "@/content/site";
import { formatDate } from "@/lib/dates";
import { seo } from "@/lib/seo";

export const Route = createFileRoute("/sitemap")({
  head: () => seo({ title: "Site map", path: "/sitemap", description: `Every page on the ${club.name} website: fixtures, results, tables, teams, matchday, news and more.` }),
  component: SitemapPage,
});

const link = "text-fg/90 underline-offset-2 hover:text-pike-bright hover:underline";

/** Lists every page: the main menu, other pages and views, and every news article. */
function SitemapPage() {
  const sections = [
    { heading: "Main pages", links: navItems.map((n) => ({ label: n.label, href: n.to })) },
    { heading: "Fixtures and results", links: sitemapExtras.views },
    { heading: "More", links: sitemapExtras.more },
  ];
  return (
    <>
      <PageHeader eyebrow={club.name} title="Site map">
        {sitemapExtras.intro}
      </PageHeader>
      <Container className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
        {sections.map((s) => (
          <Card key={s.heading} className="p-6">
            <h2 className="eyebrow text-muted">{s.heading}</h2>
            <ul className="mt-4 space-y-2">
              {s.links.map((l) => (
                <li key={l.href}>
                  <a href={l.href} className={link}>
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </Card>
        ))}
        <Card className="p-6">
          <h2 className="eyebrow text-muted">News</h2>
          <ul className="mt-4 space-y-3">
            {articles.map((a) => (
              <li key={a.slug}>
                <Link to="/news/$slug" params={{ slug: a.slug }} className={link}>
                  {a.title}
                </Link>
                <span className="block text-xs text-muted">{formatDate(a.date)}</span>
              </li>
            ))}
          </ul>
        </Card>
      </Container>
    </>
  );
}
