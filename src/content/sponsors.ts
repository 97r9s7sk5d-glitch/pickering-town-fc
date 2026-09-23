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
  { name: "BodyFresh", tier: "Player sponsor" },
  { name: "LISAM", tier: "Player sponsor" },
  { name: "Typhon Martial Arts", tier: "Player sponsor" },
];

/**
 * Player graphics shown with the Player sponsor package. `sponsor: null` marks a player still looking for a
 * sponsor: the page tags it "Sponsor available". Fill in the sponsor's name once one signs up.
 */
export type PlayerGraphic = { src: string; sponsor: string | null; team: "first" | "ladies" };
export const playerSponsorGraphics: PlayerGraphic[] = [
  // First team
  { src: "/images/player-sponsors/harome-homes.webp", sponsor: "Harome Homes", team: "first" },
  { src: "/images/player-sponsors/harton-works.webp", sponsor: "Harton Works", team: "first" },
  { src: "/images/player-sponsors/television-house.webp", sponsor: "Television House Pickering", team: "first" },
  { src: "/images/player-sponsors/edge-clothing.webp", sponsor: "Edge Clothing", team: "first" },
  // Individual sponsors appear by name in the sponsor box.
  { src: "/images/player-sponsors/stuart-elvidge.webp", sponsor: "Stuart Elvidge", team: "first" },
  { src: "/images/player-sponsors/mandy-paul-wattam.webp", sponsor: "Mandy & Paul Wattam", team: "first" },
  { src: "/images/player-sponsors/available-1.webp", sponsor: null, team: "first" },
  { src: "/images/player-sponsors/available-2.webp", sponsor: null, team: "first" },
  // Ladies first team
  { src: "/images/player-sponsors/ladies-vicki-bodyfresh.webp", sponsor: "BodyFresh", team: "ladies" },
  { src: "/images/player-sponsors/ladies-sofia-lisam.webp", sponsor: "LISAM", team: "ladies" },
  { src: "/images/player-sponsors/ladies-sarah-typhon.webp", sponsor: "Typhon Martial Arts", team: "ladies" },
  { src: "/images/player-sponsors/ladies-sophie-available.webp", sponsor: null, team: "ladies" },
];
