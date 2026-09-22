# Pickering Town FC website

The new website for Pickering Town Football Club ("The Pikes", est. 1888), replacing the TeamExpert template site.
It's built on the same stack as The Chairman (TanStack Start, React 19, Tailwind CSS v4). Every page is
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

## Keeping fixtures up to date

For now, edit `src/content/fixtures.ts` after each game. A good next step is to pull fixtures, results and the
table automatically from the FA's Full-Time service (which the NCEL uses) at build time, and rebuild the site on a
daily schedule.

## Development

```bash
npm install
npm run dev        # http://localhost:3000
npm run typecheck
npm run build      # static site in dist/client
npm run preview
```

To deploy, point any static host at `npm run build` with output directory `dist/client`.
