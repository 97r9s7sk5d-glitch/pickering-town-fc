/**
 * The Donate page. CONFIRM everything here with the club before launch.
 *
 * - `onlineUrl`: a donation page (JustGiving, GoFundMe, a Stripe or PayPal payment link…). Leave empty to hide the
 *   "Donate online" option.
 * - `bank`: bank transfer details. Leave as null to hide them.
 * Without either, the page asks supporters to get in touch through the contact form.
 */
export type Appeal = { title: string; text: string; target: number; raised: number };
export type BankDetails = { accountName: string; sortCode: string; accountNumber: string; reference: string };

export const donate = {
  intro:
    "Pickering Town is run by volunteers, for the town. Every pound given goes back into the club: the pitch at Mill Lane, kit and equipment, and football for the first team, the ladies and our young players.",
  /**
   * The current fundraising appeal, shown with a progress bar at the top of the Donate page. Update `raised` as money
   * comes in (whole pounds). Set `appeal` to null when there's no appeal running.
   */
  appeal: {
    title: "New floodlights for Mill Lane",
    text: "New floodlights will keep evening kick-offs and winter training going at Mill Lane, and help the ground meet league standards for years to come.",
    target: 30000,
    raised: 5000,
  } as Appeal | null,
  onlineUrl: "",
  bank: null as BankDetails | null,
  uses: [
    { title: "The pitch and ground", text: "Keeping Mill Lane in shape: mowing, marking, drainage, and repairs to the stands and fencing." },
    { title: "Kit and equipment", text: "Balls, nets, training gear and first-aid kits for every team." },
    { title: "Young players", text: "Helping our under-18s and the pathway into senior football, so the cost never stops a young player taking part." },
    { title: "Running costs", text: "League and referee fees, travel to away games, floodlights and utilities." },
  ],
};
