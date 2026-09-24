/**
 * The Shop page: the club's official merchandise, sold through O'Neills (the kit supplier). Orders, delivery and
 * returns are handled by O'Neills. CONFIRM the ranges listed with the club.
 */
export const shop = {
  partner: "O'Neills",
  url: "https://www.oneills.com/uk_en/shop-by-team/soccer/soccer-clubs/pickering-town-fc.html",
  intro:
    "Wear the royal blue and blue. Official Pickering Town kit and clubwear is made by O'Neills, the club's kit supplier, and sold through the club's O'Neills online shop.",
  /** Shown beside the intro: a player in the current home kit. */
  photo: { src: "/images/squad/player-2.webp", alt: "Wayne Brooksby in the Pickering Town home shirt", width: 585, height: 900 },
  ranges: [
    { title: "Match kit", text: "The shirts, shorts and socks the Pikes wear at Mill Lane." },
    { title: "Training wear", text: "Tops, jackets and training gear, as worn by the players and staff." },
    { title: "Leisure wear", text: "Hoodies, T-shirts and more to wear on matchday and every day." },
  ],
  note: "Orders, delivery and returns are handled by O'Neills. Every purchase supports the club.",
};
