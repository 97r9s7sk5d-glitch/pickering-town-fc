import { club } from "@/content/club";

/** Per-page <head> tags: title, description and the social-share (Open Graph / X) equivalents. */
export function seo({ title, description, path = "/" }: { title?: string; description: string; path?: string }) {
  const fullTitle = title ? `${title} | ${club.name}` : `${club.name} | ${club.nickname} · Est. ${club.founded}`;
  const url = `${club.siteUrl}${path}`;
  return {
    meta: [
      { title: fullTitle },
      { name: "description", content: description },
      { property: "og:title", content: fullTitle },
      { property: "og:description", content: description },
      { property: "og:url", content: url },
      { property: "og:type", content: "website" },
      { property: "og:site_name", content: club.name },
      { property: "og:image", content: `${club.siteUrl}/og.jpg` },
      { property: "og:image:width", content: "1200" },
      { property: "og:image:height", content: "630" },
      { property: "og:image:alt", content: `${club.name} club badge` },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:image", content: `${club.siteUrl}/og.jpg` },
      { name: "twitter:site", content: "@PickeringTownFC" },
    ],
    links: [{ rel: "canonical", href: url }],
  };
}
