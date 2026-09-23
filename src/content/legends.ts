/**
 * Club legends, shown on /legends. Add a person by copying an entry. `image` is optional: without one the
 * card shows the club badge. Each string in `story` is one paragraph.
 * CONFIRM every profile with the club before launch.
 */
export type Legend = {
  slug: string;
  name: string;
  role: string;
  /** Years with the club, e.g. "1985–2009". Leave empty if unknown. */
  years: string;
  summary: string;
  story: string[];
  image?: { src: string; alt: string; caption: string };
  /** Where the facts came from, so they can be checked. */
  sources?: string[];
};

export const legends: Legend[] = [
  {
    slug: "tony-dunning",
    name: "Tony Dunning",
    role: "Chairman",
    years: "",
    summary: "Former chairman whose name is on the stand at Mill Lane.",
    story: [
      "Tony Dunning served Pickering Town as chairman and was one of the club's greatest supporters. Welcoming a new sponsor in 2008, he called it \"a fantastic boost for the club\".",
      "In 2010 the club dedicated the stand at Mill Lane to his memory. Chairmen Keith Usher and Graham Manser unveiled the Tony Dunning Stand alongside members of his family, before a memorial match against Whitby Town watched by more than 230 people and preceded by a minute's silence.",
      "Every home game since has been watched from the stand that carries his name.",
    ],
    image: {
      src: "/images/tony-dunning-stand.webp",
      alt: "Supporters in the Tony Dunning Stand at Mill Lane, with the stand's name board above them",
      caption: "The Tony Dunning Stand, opened in 2010",
    },
    sources: ["NCEL newsletters, 2008 and 2010"],
  },
  {
    slug: "wizzie-wood",
    name: "Wizzie Wood",
    role: "Club legend",
    years: "",
    summary: "Remembered at Mill Lane with the stand behind the goal: the Wizzie Wood Stand.",
    story: [
      "The covered stand behind the goal at Mill Lane carries Wizzie Wood's name, so every home game is played in front of it.",
      "Wizzie's full story is being written with the club. If you have memories or photos to share, get in touch.",
    ],
    image: {
      src: "/images/wizzie-wood-stand.webp",
      alt: "The goal at Mill Lane in front of the Wizzie Wood Stand, with its name board above the sponsor boards",
      caption: "The Wizzie Wood Stand at Mill Lane",
    },
  },
];
