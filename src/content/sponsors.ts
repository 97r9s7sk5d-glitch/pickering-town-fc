/** Commercial packages on the Sponsors page. Prices are "on request" until the club sets them. */
export type Package = { name: string; price: string; points: string[]; featured?: boolean };

export const packages: Package[] = [
  {
    name: "Pitchside board",
    price: "On request",
    points: ["Your board on show at every home game", "Listed on the Sponsors page", "Season-long exposure"],
  },
  {
    name: "Matchday sponsor",
    price: "On request",
    points: [
      "Your business named as the day's sponsor",
      "Thanked on the website and social media",
      "Choose the player of the match",
    ],
    featured: true,
  },
  {
    name: "Matchball sponsor",
    price: "On request",
    points: ["Named on the matchday announcement", "Social media thank-you", "A great gift for a birthday or occasion"],
  },
  {
    name: "Player sponsor",
    price: "On request",
    points: ["Back your favourite player for the season", "Your name alongside theirs on the website"],
  },
];

/** Current partners. Add { name, url?, tier } entries here and they appear on the Sponsors page and footer. */
export type Partner = { name: string; url?: string; tier: "Principal" | "Partner" };
export const partners: Partner[] = [];
