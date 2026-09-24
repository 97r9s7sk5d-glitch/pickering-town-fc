import { createFileRoute } from "@tanstack/react-router";
import { ArrowUpRight, Shirt, ShoppingBag, Sparkles } from "lucide-react";
import { Container, PageHeader } from "@/components/ui";
import { club } from "@/content/club";
import { shop } from "@/content/shop";
import { seo } from "@/lib/seo";

export const Route = createFileRoute("/shop")({
  head: () =>
    seo({
      title: "Club shop",
      path: "/shop",
      description: `Official ${club.name} kit and clubwear, made by ${shop.partner} and sold through the club's ${shop.partner} online shop.`,
    }),
  component: ShopPage,
});

const icons = [Shirt, Sparkles, ShoppingBag];

function ShopLink({ className = "" }: { className?: string }) {
  return (
    <a
      href={shop.url}
      target="_blank"
      rel="noopener noreferrer"
      className={`eyebrow inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-ink transition-colors hover:bg-pike-bright ${className}`}
    >
      Shop at {shop.partner} <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
      <span className="sr-only">(opens in a new tab)</span>
    </a>
  );
}

function ShopPage() {
  return (
    <>
      <PageHeader eyebrow="Merchandise" title="Club shop">
        {shop.intro}
      </PageHeader>

      <Container className="mt-12">
        <section
          aria-labelledby="shop-title"
          className="reveal relative overflow-hidden rounded-3xl border border-pike-bright/60 bg-gradient-to-br from-pike-deep via-surface to-night"
        >
          <div aria-hidden="true" className="pointer-events-none absolute -left-16 -top-16 h-64 w-64 rounded-full bg-pike-bright/25 blur-3xl" />
          <div className="relative grid items-end gap-6 md:grid-cols-[1fr_auto]">
            <div className="p-6 sm:p-10">
              <p className="eyebrow text-pike-bright">Official online shop</p>
              <h2 id="shop-title" className="display mt-2 text-5xl sm:text-6xl">
                The Pikes at {shop.partner}
              </h2>
              <p className="mt-3 max-w-xl leading-relaxed text-muted">
                Browse the full range and order online. {shop.note}
              </p>
              <ShopLink className="mt-8" />
            </div>
            <img
              src={shop.photo.src}
              alt={shop.photo.alt}
              width={shop.photo.width}
              height={shop.photo.height}
              className="mx-auto h-72 w-auto self-end sm:h-80 md:mr-10"
              loading="lazy"
            />
          </div>
        </section>
      </Container>

      <Container className="mt-12">
        <h2 className="sr-only">What's in the shop</h2>
        <ul className="grid gap-5 md:grid-cols-3">
          {shop.ranges.map((r, i) => {
            const Icon = icons[i % icons.length];
            return (
              <li key={r.title} className="reveal rounded-2xl border border-line bg-surface/70 p-6">
                <Icon className="h-7 w-7 text-pike-bright" aria-hidden="true" />
                <h3 className="display mt-4 text-2xl">{r.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{r.text}</p>
              </li>
            );
          })}
        </ul>
        <ShopLink className="mt-8" />
      </Container>
    </>
  );
}
