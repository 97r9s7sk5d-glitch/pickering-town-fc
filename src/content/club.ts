/**
 * Core club facts, used across the whole site. Edit the text here and every page updates.
 * Anything marked "CONFIRM" came from public sources and should be checked by the club before launch
 * (see "Facts to confirm" in the README).
 */
export const club = {
  name: "Pickering Town FC",
  fullName: "Pickering Town Community Football Club",
  nickname: "The Pikes",
  founded: 1888,
  town: "Pickering",
  county: "North Yorkshire",
  league: "Northern Counties East League Premier Division",
  leagueShort: "NCEL Premier",
  step: "Step 5 of the National League System",
  colours: "Royal blue and white",
  shirtSponsor: "Flamingo Land Resort Yorkshire",
  siteUrl: "https://www.pickeringtownfc.com",
  tagline: "Non-league football at Mill Lane since 1888.",
};

export const ground = {
  name: "Mill Lane",
  addressLines: ["Mill Lane", "Pickering", "North Yorkshire"],
  postcode: "YO18 7DB", // CONFIRM
  capacity: "approx. 2,000", // CONFIRM
  seats: "approx. 200", // CONFIRM
  clubhouse: "Pickering Recreation Club",
  stand: "The Tony Dunning Stand",
  standOpened: 2010,
  mapsUrl: "https://www.google.com/maps/search/?api=1&query=Pickering+Town+FC+Mill+Lane+Pickering+YO18+7DB",
  what3words: "",
};

/** Leave a value empty ("") and the site hides it rather than showing a broken link. */
export const contact = {
  email: "", // CONFIRM: club secretary / general enquiries address
  phone: "",
  social: [
    { label: "X (Twitter)", handle: "@PickeringTownFC", url: "https://x.com/PickeringTownFC" },
    // CONFIRM and add: { label: "Facebook", handle: "...", url: "https://www.facebook.com/..." },
    // CONFIRM and add: { label: "Instagram", handle: "...", url: "https://www.instagram.com/..." },
  ],
};

export type Official = { role: string; name: string };

/** CONFIRM: taken from the club's current website and public sources in September 2026. */
export const officials: Official[] = [
  { role: "Chairman", name: "Jamie Hopwood" },
  { role: "First-team manager", name: "Paul Marshall" },
  { role: "Kit managers", name: "Tim Prest & Sam Prest" },
];

export type Admission = { label: string; price: string; note?: string };

/** CONFIRM: prices for the current season. */
export const admission: Admission[] = [
  { label: "Adults", price: "TBC" },
  { label: "Concessions", price: "TBC" },
  { label: "Under 16s", price: "TBC" },
  { label: "Season ticket", price: "TBC", note: "All home league games" },
];
