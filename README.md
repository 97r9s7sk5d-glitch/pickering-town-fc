# Pickering Town FC website

The new website for Pickering Town Football Club ("The Pikes", est. 1888), replacing the TeamExpert template site.
It's built with TanStack Start, React 19 and Tailwind CSS v4. Every page is
prerendered to plain HTML at build time, so it's fast, search-engine friendly and can be hosted free on any static
host (Vercel, Netlify, Cloudflare Pages, GitHub Pages).

## Pages

| Page | What's on it |
| --- | --- |
| `/` | Hero, next match with live countdown, last result, form guide, league position, latest news, table snippet |
| `/fixtures` | Fixtures and results by month, filter by first team or ladies, **add any game to your calendar** (.ics) |
| `/table` | Full league table with Pickering highlighted and promotion/play-off/relegation markers |
| `/news`, `/news/<slug>` | News and match reports |
| `/teams` | First team, ladies, and how to join as a player, coach or volunteer |
| `/club` | History timeline, honours, cup records, officials |
| `/matchday` | Mill Lane: address and map, admission, clubhouse, accessibility, travel by car/train/bus |
| `/sponsors` | Sponsorship packages and partner listing |
| `/contact` | Enquiry form (opens the visitor's email app) or social links if no email is set |

It also includes SEO tags and social-share cards on every page, schema.org `SportsTeam` data, a sitemap and
robots.txt, a 404 page, a skip-to-content link, visible keyboard focus and reduced-motion support. It works on
phones with no sideways scrolling.

## Editing content

All the words and data live in `src/content/`, so there's no need to touch page code:

- `club.ts`: club facts, ground, contact details, officials, admission prices
- `fixtures.ts`: fixtures, results, league table (set `isSampleData = false` once it holds the real season)
- `fulltime.ts`: FA Full-Time snippet codes for live fixtures, results and table (see below)
- `news.ts`: news articles (newest first)
- `history.ts`: timeline, honours, records
- `sponsors.ts`: sponsorship packages and current partners

The crest in `src/components/Crest.tsx` and `public/favicon.svg` is a **placeholder** in club colours. Replace it
with the official badge.

## Facts to confirm before launch

These came from public sources (NCEL statistics, Wikipedia, the current club site) because the club site couldn't
be read directly. Each one is marked `CONFIRM` in the code:

- [ ] Ground postcode (YO18 7DB), capacity (~2,000) and seats (~200)
- [ ] Officials: Chairman Jamie Hopwood, manager Paul Marshall (after Tony Hackworth left in January 2026), kit managers
- [ ] Club email/phone, Facebook and Instagram accounts (only X @PickeringTownFC is set)
- [ ] Admission prices (currently "TBC")
- [ ] Honours list and history dates in `history.ts`
- [ ] **Fixtures and table**: only the Golcar United (3–2) and Bottesford Town (0–3) results and Pickering's
      table row (10th, 13 pts) are real. Everything else is placeholder, and the site shows a notice saying so.

## Keeping fixtures up to date (FA Full-Time)

The NCEL and the North Riding leagues run on the FA's **Full-Time** service. The FA doesn't offer a public data
feed. Its supported way to show fixtures, results and tables on a club site is **code snippets**, and the site
is ready for them:

1. A Full-Time team administrator for the club signs in at fulltime.thefa.com and goes to **Media → Code snippets**.
2. Create a snippet for each of: league table, first-team fixtures, first-team results (and the ladies' too).
3. From each embed code, copy the `div` id (`lrep…`) and the `lrcode` value into `src/content/fulltime.ts`.

Each filled slot switches that page to the live Full-Time feed, styled in club colours, so there's no manual
updating after games. Slots left empty keep using `src/content/fixtures.ts`. The home page's next match,
countdown and form guide still read `fixtures.ts`, so keep the next few fixtures in there.

## Development

```bash
npm install
npm run dev        # http://localhost:3000
npm run typecheck
npm run build      # static site in dist/client
npm run preview
```

To deploy, point any static host at `npm run build` with output directory `dist/client`. `vercel.json` already
sets this up for Vercel: import the GitHub repo and it deploys on every push.
