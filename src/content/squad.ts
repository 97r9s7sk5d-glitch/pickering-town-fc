/**
 * First-team squad photos (cut-outs with transparent backgrounds, in /public/images/squad).
 * Add each player's name, position and shirt number; any left blank are simply not shown.
 * CONFIRM: names still to be added for every photo below.
 */
export type Player = { image: string; name: string; position?: string; number?: number };

export const squad: Player[] = [
  { image: "/images/squad/player-1.webp", name: "" },
  { image: "/images/squad/player-2.webp", name: "" },
  { image: "/images/squad/player-3.webp", name: "" },
  { image: "/images/squad/player-4.webp", name: "" },
  { image: "/images/squad/player-5.webp", name: "" },
  { image: "/images/squad/player-6.webp", name: "" },
  { image: "/images/squad/player-7.webp", name: "" },
];

/**
 * Ladies first-team squad: portraits cropped from the club's player graphics (in /public/images/ladies).
 * Names are as on the graphics (first names). CONFIRM: surnames, positions and shirt numbers.
 */
export const ladiesSquad: Player[] = [
  { image: "/images/ladies/vicki.webp", name: "Vicki" },
  { image: "/images/ladies/sophie.webp", name: "Sophie" },
  { image: "/images/ladies/sofia.webp", name: "Sofia", position: "Goalkeeper" },
  { image: "/images/ladies/sarah.webp", name: "Sarah" },
  { image: "/images/ladies/lottie.webp", name: "Lottie" },
  { image: "/images/ladies/leila.webp", name: "Leila" },
  { image: "/images/ladies/kira.webp", name: "Kira" },
  { image: "/images/ladies/danielle.webp", name: "Danielle" },
  { image: "/images/ladies/eden.webp", name: "Eden" },
  { image: "/images/ladies/erin.webp", name: "Erin", position: "Goalkeeper" },
  { image: "/images/ladies/evie.webp", name: "Evie" },
  { image: "/images/ladies/chloe.webp", name: "Chloe" },
  { image: "/images/ladies/brooke.webp", name: "Brooke" },
  { image: "/images/ladies/belle.webp", name: "Belle" },
  { image: "/images/ladies/lorna.webp", name: "Lorna" },
  { image: "/images/ladies/millie.webp", name: "Millie" },
  { image: "/images/ladies/kim.webp", name: "Kim" },
  { image: "/images/ladies/aimee.webp", name: "Aimee" },
  { image: "/images/ladies/alesha.webp", name: "Alesha" },
];

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
  alt: "Pickering Town Ladies first team lined up in front of a goal, in royal blue and white with the goalkeeper in pink",
  width: 960,
  height: 640,
};
