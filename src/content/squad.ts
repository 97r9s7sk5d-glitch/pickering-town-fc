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
