import { createFileRoute } from "@tanstack/react-router";
import { ArticleCard } from "@/components/ArticleCard";
import { Container, PageHeader } from "@/components/ui";
import { club } from "@/content/club";
import { articles } from "@/content/news";
import { seo } from "@/lib/seo";

export const Route = createFileRoute("/news/")({
  head: () =>
    seo({ title: "News", path: "/news", description: `The latest news, match reports and announcements from ${club.name}.` }),
  component: NewsPage,
});

function NewsPage() {
  return (
    <>
      <PageHeader eyebrow="From Mill Lane" title="News">
        Match reports, club announcements and everything happening at the Pikes.
      </PageHeader>
      <Container className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {articles.map((a) => (
          <ArticleCard key={a.slug} article={a} />
        ))}
      </Container>
    </>
  );
}
