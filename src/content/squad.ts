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

export type TourShot = {
  src: string;
  alt: string;
  caption: string;
  /** Drone-style camera move across the shot: CSS transforms at the start and end of its turn on screen. */
  from: string;
  to: string;
};

/**
 * The "flyover" on the Matchday page: the camera glides through these shots in order, fading from one to the
 * next. Add, remove or reorder shots here; landscape photos around 600 px wide or larger work best.
 */
export const groundTour: TourShot[] = [
  {
    src: groundPhoto.src,
    alt: groundPhoto.alt,
    caption: "Mill Lane from above",
    from: "scale(1.02) translate(0, 0)",
    to: "scale(1.22) translate(-3%, 2%)",
  },
  {
    src: "/images/mill-lane-centre-circle.webp",
    alt: "The centre circle at Mill Lane, looking towards the Tony Dunning Stand on a sunny day",
    caption: "The centre circle",
    from: "scale(1.25) translate(0, 4%)",
    to: "scale(1.08) translate(0, -2%)",
  },
  {
    src: "/images/mill-lane-from-the-stand.webp",
    alt: "The striped Mill Lane pitch during a match, seen from inside the stand",
    caption: "The view from the stand",
    from: "scale(1.12) translate(3%, 0)",
    to: "scale(1.12) translate(-3%, 0)",
  },
  {
    src: "/images/tony-dunning-stand-matchday.webp",
    alt: "Supporters in the Tony Dunning Stand, opened in 2010, lined with sponsor boards",
    caption: "The Tony Dunning Stand",
    from: "scale(1.06) translate(-2%, 0)",
    to: "scale(1.2) translate(2%, 1%)",
  },
  {
    src: "/images/mill-lane-seated-stand.webp",
    alt: "The seated stand at Mill Lane with red seats and sponsor boards",
    caption: "The seated stand",
    from: "scale(1.18) translate(2%, 1%)",
    to: "scale(1.05) translate(-1%, 0)",
  },
  {
    src: "/images/mill-lane-walkway.webp",
    alt: "The walkway along the side of the pitch at Mill Lane, past the dugout",
    caption: "Along the touchline",
    from: "scale(1.05) translate(0, 0)",
    to: "scale(1.2) translate(-3%, -1%)",
  },
];
