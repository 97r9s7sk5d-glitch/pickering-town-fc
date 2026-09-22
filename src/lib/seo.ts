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
      { property: "og:image", content: `${club.siteUrl}/og.png` },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:site", content: "@PickeringTownFC" },
    ],
    links: [{ rel: "canonical", href: url }],
  };
}
