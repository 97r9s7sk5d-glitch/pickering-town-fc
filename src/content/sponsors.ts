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

/**
 * Current partners, as seen on the kit, the stand and the club's player graphics.
 * CONFIRM each one with the club before launch, and add { name, url?, tier } entries for any others.
 */
export type Partner = { name: string; url?: string; tier: "Shirt sponsor" | "Player sponsor" | "Partner" };
export const partners: Partner[] = [
  { name: "Flamingo Land Resort Yorkshire", tier: "Shirt sponsor" },
  { name: "Harome Homes", tier: "Player sponsor" },
  { name: "Harton Works", tier: "Player sponsor" },
  { name: "Television House Pickering", tier: "Player sponsor" },
  { name: "Edge Clothing", tier: "Player sponsor" },
];

/** Example player-sponsor graphics, shown with the Player sponsor package. */
export const playerSponsorGraphics = [
  { src: "/images/player-sponsors/harome-homes.webp", sponsor: "Harome Homes" },
  { src: "/images/player-sponsors/harton-works.webp", sponsor: "Harton Works" },
  { src: "/images/player-sponsors/television-house.webp", sponsor: "Television House Pickering" },
  { src: "/images/player-sponsors/edge-clothing.webp", sponsor: "Edge Clothing" },
];
