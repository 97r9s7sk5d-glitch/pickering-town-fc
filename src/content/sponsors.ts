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

/** The main club ambassador, shown at the top of the Sponsors page and in the home page hero. */
export const clubAmbassador = {
  name: "Flamingo Land Resort Yorkshire",
  role: "Main club ambassador",
  text: "Flamingo Land is our main club ambassador and all club officials and players respect wearing the brand on match day and training kits. Thank you for all your support and trust and backing the Pikes.",
  url: "https://www.flamingoland.co.uk",
  logo: "/images/flamingo-land.webp",
};

/**
 * Club sponsors, shown as smaller cards under the club ambassador on the Sponsors page. `logo` is optional: without
 * one the card shows the name. `round` shows a circular logo as a circle rather than on a white panel.
 */
export type ClubSponsor = { name: string; logo?: string; round?: boolean; url?: string };
export const clubSponsors: ClubSponsor[] = [
  { name: "The Black Bull", logo: "/images/black-bull.webp", round: true, url: "https://www.theblackbullinnpickering.co.uk" },
  { name: "Television House Pickering", logo: "/images/television-house-logo.webp", url: "https://www.televisionhouse.co.uk" },
];

/**
 * Current partners, as seen on the kit, the stand and the club's player graphics.
 * CONFIRM each one with the club before launch, and add { name, url?, tier } entries for any others.
 */
export type Partner = { name: string; url?: string; tier: "Shirt sponsor" | "Player sponsor" | "Partner" };
export const partners: Partner[] = [
  { name: "Harome Homes", tier: "Player sponsor" },
  { name: "Harton Works", tier: "Player sponsor" },
  { name: "Television House Pickering", tier: "Player sponsor" },
  { name: "Edge Clothing", tier: "Player sponsor" },
  { name: "The Spotted Cow", tier: "Player sponsor" },
  { name: "Severfield", tier: "Player sponsor" },
  { name: "Tom Parsons Trust", tier: "Player sponsor" },
  { name: "Cladding & Roofing Solutions Limited", tier: "Player sponsor" },
  { name: "BodyFresh", tier: "Player sponsor" },
  { name: "LISAM", tier: "Player sponsor" },
  { name: "Typhon Martial Arts", tier: "Player sponsor" },
  { name: "Beauty by Milly Cuthbertson", tier: "Player sponsor" },
  { name: "Xtreme Roofing Ltd", tier: "Player sponsor" },
  { name: "M2 Masons Stonemasonry", tier: "Player sponsor" },
  { name: "Salon 16", tier: "Player sponsor" },
  { name: "Personal Promotions", tier: "Player sponsor" },
  { name: "Young Lines Aesthetics & Skin", tier: "Player sponsor" },
  { name: "Hungate Cottages", tier: "Player sponsor" },
  { name: "Calm & Glow Therapy Studio", tier: "Player sponsor" },
  { name: "Evergreen Direct", tier: "Player sponsor" },
  { name: "Beneath the Weeds", tier: "Player sponsor" },
  { name: "Intelsius", tier: "Player sponsor" },
  { name: "Trequinho", tier: "Player sponsor" },
  { name: "Fabulously Glam Skin & Beyond", tier: "Player sponsor" },
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
  { src: "/images/player-sponsors/spotted-cow.webp", sponsor: "The Spotted Cow", team: "first" },
  { src: "/images/player-sponsors/severfield.webp", sponsor: "Severfield", team: "first" },
  { src: "/images/player-sponsors/tom-parsons-trust.webp", sponsor: "Tom Parsons Trust", team: "first" },
  { src: "/images/player-sponsors/crs-cladding-roofing.webp", sponsor: "Cladding & Roofing Solutions Limited", team: "first" },
  // Individual sponsors appear by name in the sponsor box.
  { src: "/images/player-sponsors/stuart-elvidge.webp", sponsor: "Stuart Elvidge", team: "first" },
  { src: "/images/player-sponsors/mandy-paul-wattam.webp", sponsor: "Mandy & Paul Wattam", team: "first" },
  { src: "/images/player-sponsors/nicky-jackson.webp", sponsor: "Nicky Jackson", team: "first" },
  { src: "/images/player-sponsors/available-1.webp", sponsor: null, team: "first" },
  { src: "/images/player-sponsors/available-2.webp", sponsor: null, team: "first" },
  { src: "/images/player-sponsors/available-3.webp", sponsor: null, team: "first" },
  { src: "/images/player-sponsors/available-4.webp", sponsor: null, team: "first" },
  // Ladies first team
  { src: "/images/player-sponsors/ladies-vicki-bodyfresh.webp", sponsor: "BodyFresh", team: "ladies" },
  { src: "/images/player-sponsors/ladies-sofia-lisam.webp", sponsor: "LISAM", team: "ladies" },
  { src: "/images/player-sponsors/ladies-sarah-typhon.webp", sponsor: "Typhon Martial Arts", team: "ladies" },
  { src: "/images/player-sponsors/ladies-lottie-milly-cuthbertson.webp", sponsor: "Beauty by Milly Cuthbertson", team: "ladies" },
  { src: "/images/player-sponsors/ladies-leila-xtreme-roofing.webp", sponsor: "Xtreme Roofing Ltd", team: "ladies" },
  { src: "/images/player-sponsors/ladies-kira-m2-masons.webp", sponsor: "M2 Masons Stonemasonry", team: "ladies" },
  { src: "/images/player-sponsors/ladies-danielle-salon-16.webp", sponsor: "Salon 16", team: "ladies" },
  { src: "/images/player-sponsors/ladies-eden-personal-promotions.webp", sponsor: "Personal Promotions", team: "ladies" },
  { src: "/images/player-sponsors/ladies-erin-young-lines.webp", sponsor: "Young Lines Aesthetics & Skin", team: "ladies" },
  { src: "/images/player-sponsors/ladies-evie-hungate-cottages.webp", sponsor: "Hungate Cottages", team: "ladies" },
  { src: "/images/player-sponsors/ladies-chloe-hungate-cottages.webp", sponsor: "Hungate Cottages", team: "ladies" },
  { src: "/images/player-sponsors/ladies-brooke-calm-and-glow.webp", sponsor: "Calm & Glow Therapy Studio", team: "ladies" },
  { src: "/images/player-sponsors/ladies-lorna-evergreen-direct.webp", sponsor: "Evergreen Direct", team: "ladies" },
  { src: "/images/player-sponsors/ladies-millie-beneath-the-weeds.webp", sponsor: "Beneath the Weeds", team: "ladies" },
  { src: "/images/player-sponsors/ladies-kim-intelsius.webp", sponsor: "Intelsius", team: "ladies" },
  { src: "/images/player-sponsors/ladies-aimee-trequinho.webp", sponsor: "Trequinho", team: "ladies" },
  { src: "/images/player-sponsors/ladies-alesha-fabulously-glam.webp", sponsor: "Fabulously Glam Skin & Beyond", team: "ladies" },
  { src: "/images/player-sponsors/ladies-sophie-available.webp", sponsor: null, team: "ladies" },
  // CONFIRM: Belle's graphic says "Sponsored by" but has no logo, so she's shown as available for now.
  { src: "/images/player-sponsors/ladies-belle-available.webp", sponsor: null, team: "ladies" },
];
