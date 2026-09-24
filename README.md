# Pickering Town FC website

The new website for Pickering Town Football Club ("The Pikes", est. 1888), replacing the TeamExpert template site.
It's built with TanStack Start, React 19 and Tailwind CSS v4. Every page is
prerendered to plain HTML at build time, so it's fast, search-engine friendly and can be hosted free on any static
host (Vercel, Netlify, Cloudflare Pages, GitHub Pages).

Live at **https://www.pickeringtownfc.com**, hosted on Netlify and deployed from `main`. The domain is registered with
GoDaddy: `@` is an A record to `75.2.60.5` and `www` is a CNAME to `pickering-town-fc-draft.netlify.app`, with www
as Netlify's primary domain. The old draft address redirects to the live site (see `netlify.toml`).

## Pages

| Page | What's on it |
| --- | --- |
| `/` | Hero, next match with live countdown, last result, form guide, league position, latest news, table snippet |
| `/fixtures` | Fixtures and results by month, filter by first team or ladies, **add any game to your calendar** (.ics) |
| `/table` | Full league table with Pickering highlighted and promotion/play-off/relegation markers |
| `/news`, `/news/<slug>` | News and match reports, and the Radio Scarborough 107.6 FM panel |
| `/teams` | First team, ladies, and how to join as a player, coach or volunteer |
| `/club` | History timeline, honours, cup records, officials |
| `/matchday` | Mill Lane: address and map, next home game, digital matchday programme, admission, clubhouse, accessibility, travel |
| `/sponsors` | Club ambassador, club sponsors, sponsorship packages, player sponsors and partners |
| `/shop` | Club shop: links to the club's O'Neills online shop for kit and clubwear |
| `/donate` | What donations pay for, how to give, and other ways to back the club |
| `/contact` | Enquiry form (opens the visitor's email app) or social links if no email is set |

It also includes SEO tags and social-share cards on every page, schema.org `SportsTeam` data, a sitemap and
robots.txt, a 404 page, a skip-to-content link, visible keyboard focus and reduced-motion support. It works on
phones with no sideways scrolling.

## Editing content

All the words and data live in `src/content/`, so there's no need to touch page code:

- `club.ts`: club facts, ground, contact details, officials, admission prices
- `programmes.ts`: digital matchday programmes (add a PDF to `public/programmes/` and one line here)
- `donate.ts`: the Donate page: the current appeal (floodlights, target and amount raised: update `raised` as money comes in), the online donation link (hidden until filled in) and the club bank details
- `shop.ts`: the Shop page (the O'Neills club shop link, photo and ranges)
- `media.ts`: the local radio panel on the News page
- `fixtures.ts`: fixtures and results for the first team and the ladies. The U18s show an "in progress" message until their games are added: add them, then take `"u18"` out of `inProgressTeams`. Add `venue` to any game still marked H/A TBC. League tables are in `tables.ts`
- `fulltime.ts`: FA Full-Time snippet codes for live fixtures, results and table (see below)
- `news.ts`: news articles (newest first)
- `intro.ts`: the home page's opening video (set to `null` for the drawn animation) and where its splash starts
- `site.ts`: analytics (Google Analytics 4 ID, loads only after cookie consent), contact form settings and the date on the legal pages
- `legal.ts`: the privacy & cookies policy and terms of use
- `history.ts`: timeline, honours, records
- `legends.ts`: the Club legends page (copy an entry to add a person)
- `sponsors.ts`: the main club ambassador (Flamingo Land), club sponsors (The Black Bull, Television House), sponsorship packages, partners and player-sponsor graphics
- `squad.ts`: first-team and ladies squad photos (add names and positions here) and the team photos
- `teams.ts`: the teams, their banner photos, the U18s and the academy link (Hawkes 360)

The official club badge is `public/badge.webp` (with `badge.png`, `favicon.png` and `apple-touch-icon.png` made
from it), cut out from the white background the club supplied.

Photos live in `public/images/`: an aerial view of Mill Lane, the team photo in front of the Tony Dunning Stand,
seven squad cut-outs and nine player graphics, all supplied by the club and compressed to WebP.

## Facts to confirm before launch

These came from public sources (NCEL statistics, Wikipedia, the current club site) because the club site couldn't
be read directly. Each one is marked `CONFIRM` in the code:

- [ ] Ground postcode (YO18 7DB), capacity (~2,000) and seats (~200)
- [ ] Officials: Chairman Jamie Hopwood, manager Simon Heslop, kit managers
- [ ] Club email and phone (Facebook, Instagram and X are set)
- [x] Admission prices (adults £8, concessions £6, under 16s free, season ticket £100)
- [ ] Names and positions for the seven squad photos in `squad.ts`
- [ ] Partners in `sponsors.ts` (Flamingo Land shirt sponsor, and the player sponsors Harome Homes, Harton Works, Television House Pickering, Edge Clothing)
- [ ] Photo credit for the team photo (watermarked bottom right)
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
npm run preview:file  # the whole site as one HTML file: dist-preview/index.html
```

`npm run preview:file` makes a private draft you can send to people without publishing anything: it's the full
site (menus, countdown, filters, images, fonts) in a single file that opens in any browser, even offline.

To deploy, point any static host at `npm run build` with output directory `dist/client`. `vercel.json` already
sets this up for Vercel: import the GitHub repo and it deploys on every push.

## Contact form and analytics

- **Contact form:** messages arrive in Netlify under **Forms → contact**. To get each one by email, go to
  Netlify → Project configuration → Notifications → Form submission notifications → Add notification → Email.
  Netlify's free plan includes 100 submissions a month. Spam is filtered by a hidden honeypot field, a minimum
  fill-in time and Netlify's own spam check (flagged messages are under **Forms → Spam**).
- **Analytics:** create a Google Analytics 4 property, copy its measurement ID (`G-…`) into
  `src/content/site.ts`, and push. It only loads for visitors who accept analytics cookies.
