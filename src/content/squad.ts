/**
 * First-team squad photos (cut-outs with transparent backgrounds, in /public/images/squad).
 * Add each player's name, position and shirt number; any left blank are simply not shown.
 * Names are from the club; sponsors are as on the club's player graphics. CONFIRM: positions and shirt numbers.
 */
export type Player = { image: string; name: string; position?: string; number?: number; sponsor?: string };

export const squad: Player[] = [
  { image: "/images/squad/player-1.webp", name: "Souleymane Coulibaly", sponsor: "The Spotted Cow" },
  { image: "/images/squad/player-2.webp", name: "Wayne Brooksby", sponsor: "Nicky Jackson" },
  { image: "/images/squad/player-3.webp", name: "Blake Drury" },
  { image: "/images/squad/player-4.webp", name: "Ben Leyland" },
  { image: "/images/squad/player-5.webp", name: "Jamie Thornton", sponsor: "Tom Parsons Trust" },
  { image: "/images/squad/player-6.webp", name: "Nathan Dyer", sponsor: "Severfield" },
  { image: "/images/squad/player-7.webp", name: "Conner Avison", sponsor: "Cladding & Roofing Solutions Limited" },
  // Players 8 to 16 are cut out from the club's player sponsor graphics.
  { image: "/images/squad/player-8.webp", name: "Luke Jackson", position: "Goalkeeper", sponsor: "Mandy & Paul Wattam" },
  { image: "/images/squad/player-9.webp", name: "George Thewlis" },
  { image: "/images/squad/player-10.webp", name: "Simon Heslop", position: "Manager" },
  { image: "/images/squad/player-11.webp", name: "Charlie Thompson" },
  { image: "/images/squad/player-12.webp", name: "Marshall Nock", sponsor: "Edge Clothing" },
  { image: "/images/squad/player-13.webp", name: "Michael Coulson", sponsor: "Harome Homes" },
  { image: "/images/squad/player-14.webp", name: "Cameron Blackburn", sponsor: "Harton Works" },
  { image: "/images/squad/player-15.webp", name: "Dominic Weston", sponsor: "Stuart Elvidge" },
  { image: "/images/squad/player-16.webp", name: "Riley McGinity", sponsor: "Television House Pickering" },
];

/**
 * Ladies first-team squad: portraits cropped from the club's player graphics (in /public/images/ladies).
 * Names and sponsors are as on the graphics (first names). CONFIRM: surnames, positions and shirt numbers.
 */
export const ladiesSquad: Player[] = [
  { image: "/images/ladies/vicki.webp", name: "Vicki", sponsor: "BodyFresh" },
  { image: "/images/ladies/sophie.webp", name: "Sophie" },
  { image: "/images/ladies/sofia.webp", name: "Sofia", position: "Goalkeeper", sponsor: "LISAM" },
  { image: "/images/ladies/sarah.webp", name: "Sarah", sponsor: "Typhon Martial Arts" },
  { image: "/images/ladies/lottie.webp", name: "Lottie", sponsor: "Beauty by Milly Cuthbertson" },
  { image: "/images/ladies/leila.webp", name: "Leila", sponsor: "Xtreme Roofing Ltd" },
  { image: "/images/ladies/kira.webp", name: "Kira", sponsor: "M2 Masons Stonemasonry" },
  { image: "/images/ladies/danielle.webp", name: "Danielle", sponsor: "Salon 16" },
  { image: "/images/ladies/eden.webp", name: "Eden", sponsor: "Personal Promotions" },
  { image: "/images/ladies/erin.webp", name: "Erin", position: "Goalkeeper", sponsor: "Young Lines Aesthetics & Skin" },
  { image: "/images/ladies/evie.webp", name: "Evie", sponsor: "Hungate Cottages" },
  { image: "/images/ladies/chloe.webp", name: "Chloe", sponsor: "Hungate Cottages" },
  { image: "/images/ladies/brooke.webp", name: "Brooke", sponsor: "Calm & Glow Therapy Studio" },
  { image: "/images/ladies/belle.webp", name: "Belle" },
  { image: "/images/ladies/lorna.webp", name: "Lorna", sponsor: "Evergreen Direct" },
  { image: "/images/ladies/millie.webp", name: "Millie", sponsor: "Beneath the Weeds" },
  { image: "/images/ladies/kim.webp", name: "Kim", sponsor: "Intelsius" },
  { image: "/images/ladies/aimee.webp", name: "Aimee", sponsor: "Trequinho" },
  { image: "/images/ladies/alesha.webp", name: "Alesha", sponsor: "Fabulously Glam Skin & Beyond" },
];

/** First-team player shown above the men's countdown in the home page hero (Wayne Brooksby). */
export const firstTeamHeroPlayer = { src: "/images/squad/player-2.webp", width: 585, height: 900, feather: false };

/**
 * Ladies player shown behind the ladies countdown in the home page hero: a cut-out with no background, like the
 * first-team one. `feather` fades a photo's edges into the page instead, if a player without a cut-out is used.
 */
export const ladiesHeroPlayer = { src: "/images/ladies/hero-vicki.webp", width: 410, height: 487, feather: false };

/** Aerial photo of Mill Lane: pitch, Tony Dunning Stand, clubhouse and the town beyond. */
export const groundPhoto = {
  src: "/images/mill-lane-aerial.webp",
  alt: "Aerial view of Mill Lane, home of Pickering Town, with the pitch, stand and clubhouse and the town behind",
  width: 588,
  height: 393,
};

/** Squad photo taken in front of the Tony Dunning Stand at Mill Lane. */
export const teamPhoto = {
  src: "/images/first-team-tony-dunning-stand.webp",
  alt: "Pickering Town first-team squad and staff lined up in front of the Tony Dunning Stand at Mill Lane",
  width: 571,
  height: 350,
};

/** Ladies first-team squad photo. */
export const ladiesTeamPhoto = {
  src: "/images/ladies-first-team.webp",
  alt: "Pickering Town Ladies first team lined up in front of a goal, in the club's blue kit with the goalkeeper in pink",
  width: 960,
  height: 640,
};
