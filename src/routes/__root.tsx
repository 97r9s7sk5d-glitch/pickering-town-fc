import {
  Outlet,
  createRootRoute,
  HeadContent,
  Scripts,
  useRouter,
  type ErrorComponentProps,
} from "@tanstack/react-router";
import type { ReactNode } from "react";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { club, contact, ground } from "@/content/club";
import { useRevealOnScroll } from "@/hooks/use-reveal";
import { Centered, NotFound, button } from "@/components/NotFound";
import appCss from "../styles.css?url";

/** Tells search engines this is a football club, where it plays and where to find it online. */
const structuredData = {
  "@context": "https://schema.org",
  "@type": "SportsTeam",
  name: club.name,
  alternateName: club.nickname,
  sport: "Association football",
  foundingDate: String(club.founded),
  url: club.siteUrl,
  logo: `${club.siteUrl}/badge.png`,
  memberOf: { "@type": "SportsOrganization", name: club.league },
  location: {
    "@type": "StadiumOrArena",
    name: ground.name,
    address: {
      "@type": "PostalAddress",
      streetAddress: ground.addressLines[0],
      addressLocality: club.town,
      addressRegion: club.county,
      postalCode: ground.postcode,
      addressCountry: "GB",
    },
  },
  sameAs: contact.social.map((s) => s.url),
};

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { name: "theme-color", content: "#0b1220" },
      { title: club.name },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "icon", href: "/favicon.png", type: "image/png" },
      { rel: "apple-touch-icon", href: "/apple-touch-icon.png" },
    ],
    scripts: [{ type: "application/ld+json", children: JSON.stringify(structuredData) }],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFound,
  errorComponent: ErrorPage,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="en-GB">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  useRevealOnScroll();
  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-full focus:bg-pike focus:px-4 focus:py-2 focus:text-white"
      >
        Skip to content
      </a>
      <SiteHeader />
      <main id="main" tabIndex={-1} className="outline-none">
        <Outlet />
      </main>
      <SiteFooter />
    </>
  );
}

function ErrorPage({ error, reset }: ErrorComponentProps) {
  console.error(error);
  const router = useRouter();
  return (
    <Centered title="Something went wrong" text="This page didn't load. Try again, or head back to the home page.">
      <button
        type="button"
        className={button}
        onClick={() => {
          router.invalidate();
          reset();
        }}
      >
        Try again
      </button>
      <a href="/" className={button}>Home</a>
    </Centered>
  );
}
