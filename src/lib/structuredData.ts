import { admission, club, ground } from "@/content/club";
import { ourSideNames } from "@/content/fixtures";
import type { Article } from "@/content/news";
import { ukOffset } from "@/lib/dates";
import { fixtures } from "@/lib/matches";

/**
 * Structured data (schema.org JSON-LD) that lets Google show the club's games and news as rich results. Built from
 * the content files at build time, so it's the same in the prerendered page and in the browser.
 */

const clubRef = { "@type": "SportsOrganization", "@id": `${club.siteUrl}/#club`, name: club.name, url: `${club.siteUrl}/` };

const groundPlace = {
  "@type": "Place",
  name: ground.name,
  address: {
    "@type": "PostalAddress",
    streetAddress: ground.addressLines[0],
    addressLocality: club.town,
    addressRegion: club.county,
    postalCode: ground.postcode,
    addressCountry: "GB",
  },
};

/** Upcoming first-team home games at Mill Lane, as of `now` (pass the build time). */
export function homeGameEvents(now: number) {
  const adultPrice = admission.find((a) => a.label === "Adults")?.price.replace(/[^\d.]/g, "");
  return fixtures("first", now)
    .filter((m) => m.venue === "H")
    .map((m) => ({
      "@context": "https://schema.org",
      "@type": "SportsEvent",
      name: `${ourSideNames.first} v ${m.opponent}`,
      description: `${m.competition}: ${ourSideNames.first} v ${m.opponent} at ${ground.name}, ${club.town}.`,
      sport: "Association football",
      startDate: `${m.kickoff}:00${ukOffset(m.kickoff)}`,
      eventStatus: "https://schema.org/EventScheduled",
      eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
      location: groundPlace,
      image: [`${club.siteUrl}/og.jpg`],
      homeTeam: { "@type": "SportsTeam", name: ourSideNames.first },
      awayTeam: { "@type": "SportsTeam", name: m.opponent },
      organizer: clubRef,
      ...(adultPrice
        ? {
            offers: {
              "@type": "Offer",
              price: adultPrice,
              priceCurrency: "GBP",
              availability: "https://schema.org/InStock",
              url: `${club.siteUrl}/matchday/`,
            },
          }
        : {}),
    }));
}

export function newsArticle(article: Article) {
  return {
    "@context": "https://schema.org",
    "@type": "NewsArticle",
    headline: article.title,
    description: article.summary,
    datePublished: article.date,
    image: [`${club.siteUrl}${article.image.src}`],
    mainEntityOfPage: `${club.siteUrl}/news/${article.slug}/`,
    author: clubRef,
    publisher: { ...clubRef, logo: { "@type": "ImageObject", url: `${club.siteUrl}/badge.png` } },
  };
}

/** A <script type="application/ld+json"> for a route's head. */
export const jsonLd = (data: unknown) => ({ type: "application/ld+json", children: JSON.stringify(data) });
