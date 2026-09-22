import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";
import { ArticleCard } from "@/components/ArticleCard";
import { Container } from "@/components/ui";
import { articles } from "@/content/news";
import { formatDate } from "@/lib/dates";
import { seo } from "@/lib/seo";

export const Route = createFileRoute("/news/$slug")({
  loader: ({ params }) => {
    const article = articles.find((a) => a.slug === params.slug);
    if (!article) throw notFound();
    return article;
  },
  head: ({ loaderData }) =>
    loaderData
      ? seo({ title: loaderData.title, path: `/news/${loaderData.slug}`, description: loaderData.summary })
      : {},
  component: ArticlePage,
});

function ArticlePage() {
  const article = Route.useLoaderData();
  const more = articles.filter((a) => a.slug !== article.slug).slice(0, 3);

  return (
    <>
      <article>
        <header className="pitch-backdrop border-b border-line">
          <Container className="max-w-3xl pb-12 pt-10 sm:pt-14">
            <Link to="/news" className="inline-flex items-center gap-1.5 text-sm text-muted hover:text-fg">
              <ArrowLeft className="h-4 w-4" aria-hidden="true" /> All news
            </Link>
            <p className="eyebrow animate-rise mt-8 text-pike-bright">
              {article.category} · <time dateTime={article.date}>{formatDate(article.date)}</time>
            </p>
            <h1 className="display animate-rise mt-3 text-5xl sm:text-7xl">{article.title}</h1>
            <p className="animate-rise-late mt-5 text-xl leading-relaxed text-fg/85">{article.summary}</p>
          </Container>
        </header>
        <Container className="mt-10 max-w-3xl">
          <div className="space-y-5 text-lg leading-relaxed text-fg/90">
            {article.body.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>
        </Container>
      </article>
      {more.length > 0 && (
        <Container className="mt-20">
          <h2 className="display text-4xl">More news</h2>
          <div className="mt-6 grid gap-5 md:grid-cols-3">
            {more.map((a) => (
              <ArticleCard key={a.slug} article={a} />
            ))}
          </div>
        </Container>
      )}
    </>
  );
}
