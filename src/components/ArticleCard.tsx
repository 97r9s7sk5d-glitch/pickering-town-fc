import { Link } from "@tanstack/react-router";
import type { Article } from "@/content/news";
import { formatDate } from "@/lib/dates";

/** Colour behind each category's photo while it loads. */
const categoryArt: Record<Article["category"], string> = {
  Club: "from-pike-deep via-pike to-pike-bright",
  "Match report": "from-ink via-pike-deep to-pike",
  Ladies: "from-pike via-pike-deep to-ink",
  Community: "from-night via-pike-deep to-pike-bright",
  Commercial: "from-raised via-night to-pike-deep",
};

export function ArticleCard({ article, featured = false }: { article: Article; featured?: boolean }) {
  return (
    <Link
      to="/news/$slug"
      params={{ slug: article.slug }}
      className="reveal group flex flex-col overflow-hidden rounded-2xl border border-line bg-surface/70 transition-colors hover:border-pike-bright"
    >
      <div className={`relative flex h-44 items-end overflow-hidden bg-gradient-to-br p-5 ${categoryArt[article.category]}`}>
        <img
          src={article.image.src}
          alt=""
          className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
          loading="lazy"
        />
        <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-ink/80 via-ink/10 to-transparent" />
        <span className="eyebrow relative rounded-full bg-ink/70 px-3 py-1 !text-[11px] text-white backdrop-blur">
          {article.category}
        </span>
      </div>
      <div className="flex flex-1 flex-col p-5">
        <time dateTime={article.date} className="text-xs text-muted">
          {formatDate(article.date)}
        </time>
        <h3 className={`display mt-2 group-hover:text-pike-bright ${featured ? "text-3xl" : "text-2xl"}`}>{article.title}</h3>
        <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-muted">{article.summary}</p>
      </div>
    </Link>
  );
}
