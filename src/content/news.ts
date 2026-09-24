/**
 * News articles, newest first. To add one, copy an entry to the top of the list and give it a new slug
 * (the slug becomes the web address: /news/<slug>). Each string in `body` is one paragraph.
 */
export type Article = {
  slug: string;
  title: string;
  /** ISO date: "2026-09-22". */
  date: string;
  category: "Club" | "Match report" | "Ladies" | "Community" | "Commercial";
  summary: string;
  body: string[];
  /** Photo for the card and article header. */
  image: { src: string; alt: string };
};

export const articles: Article[] = [
  {
    slug: "welcome-to-the-new-website",
    image: { src: "/images/mill-lane-aerial.webp", alt: "Aerial view of Mill Lane" },
    title: "Welcome to the new Pickering Town FC website",
    date: "2026-09-22",
    category: "Club",
    summary: "Fixtures, results, the table and everything you need for a matchday at Mill Lane, now in one place.",
    body: [
      "Welcome to the new home of Pickering Town Football Club online.",
      "Everything a supporter needs is now a tap away: the next match and a countdown to kick-off, fixtures and results for the first team and the ladies, the league table, and a matchday guide to Mill Lane with directions, admission and the clubhouse.",
      "You can add any fixture straight to your phone's calendar from the fixtures page, so you never miss a game.",
      "The site works just as well on a phone in the stand as it does on a laptop at home. If anything is missing or out of date, let us know and we'll put it right.",
    ],
  },
  {
    slug: "ladies-second-season-under-way",
    image: { src: "/images/ladies-first-team.webp", alt: "Pickering Town Ladies first team" },
    title: "Pickering Town Ladies: season two under way",
    date: "2026-09-06",
    category: "Ladies",
    summary: "Formed in 2025, our women's team is back in the North Riding Women's League Premier Division. New players welcome.",
    body: [
      "Pickering Town Ladies were formed in 2025 and are now into their second season in the North Riding Women's League Premier Division.",
      "The team is always looking for new players, whatever your experience.",
      "If you'd like to play, coach or help out, get in touch with the club. Come and support the team at home games too: fixtures are on the fixtures page under \"Ladies\".",
    ],
  },
  {
    slug: "partner-with-the-pikes",
    image: { src: "/images/tony-dunning-stand.webp", alt: "Sponsor boards along the Tony Dunning Stand at Mill Lane" },
    title: "Partner with the Pikes this season",
    date: "2026-08-01",
    category: "Commercial",
    summary: "Pitchside boards, matchball and programme sponsorship, and kit partners: put your business in front of Pickering.",
    body: [
      "Local businesses keep non-league football alive, and there are ways to support Pickering Town at every budget.",
      "Pitchside advertising boards, matchday and matchball sponsorship, programme adverts and player sponsorship are all available for the season.",
      "Every partner is thanked on our website and social media. See the Sponsors page for the packages and how to get in touch.",
    ],
  },
  {
    slug: "fa-cup-run-2025-26",
    image: { src: "/images/first-team-tony-dunning-stand.webp", alt: "Pickering Town first team in front of the Tony Dunning Stand" },
    title: "Looking back: our 2025–26 FA Cup run",
    date: "2025-10-01",
    category: "Club",
    summary: "The Pikes matched the club's best FA Cup run, reaching the second qualifying round.",
    body: [
      "Pickering Town reached the second qualifying round of the Emirates FA Cup in 2025–26, equalling the club's best run in the competition.",
      "It's the fourth time the club has gone that far, after 1999–2000, 2001–02 and 2003–04.",
      "Thank you to everyone who travelled and supported the team through the rounds.",
    ],
  },
];
