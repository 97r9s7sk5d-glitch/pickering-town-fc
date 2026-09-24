/**
 * The Donate page. The floodlight appeal and bank details are the club's own wording.
 *
 * - `onlineUrl`: a donation page (JustGiving, GoFundMe, a Stripe or PayPal payment link…). Leave empty to hide the
 *   "Donate online" option.
 * - `bank`: bank transfer details. Leave as null to hide them.
 * Without either, the page asks supporters to get in touch through the contact form.
 */
export type Appeal = {
  eyebrow: string;
  title: string;
  /** Opening paragraph, under the title. */
  text: string;
  /** The rest of the appeal, one paragraph each. */
  story: string[];
  target: number;
  raised: number;
  /** Shown as "by …" beside the target. */
  deadline: string;
  /** Closing line, in large type. */
  tagline: string;
  thanks: string;
};
export type BankDetails = { accountName: string; bankName?: string; sortCode: string; accountNumber: string; reference: string };

export const donate = {
  intro:
    "Pickering Town is run by volunteers, for the town. Every pound given goes back into the club: the pitch at Mill Lane, kit and equipment, and football for the first team, the ladies and our young players.",
  /**
   * The current fundraising appeal, shown with a progress bar at the top of the Donate page. Update `raised` as money
   * comes in (whole pounds). Set `appeal` to null when there's no appeal running.
   */
  appeal: {
    eyebrow: "Floodlight appeal",
    title: "Help us light up the future of Pickering Town FC",
    text: "We are calling on our supporters, local businesses and the wider community to help us raise vital funds to replace the floodlights at Pickering Town Football Club.",
    story: [
      "Our current floodlights were installed around 40 years ago and have served the club incredibly well. However, they are now reaching the end of their working life and are expected to last only for the remainder of this season. To secure the future of football at the ground, we now need to act.",
      "We need to raise £30,000 from our community and supporters to complement other grant funding and enable us to complete this essential upgrade.",
      "This isn't simply about replacing lights. It's about protecting the future of our football club and ensuring that our senior teams, academy players, young footballers, supporters and future generations can continue to enjoy football in Pickering for many years to come.",
      "If you can spare anything at all to help us achieve our £30,000 target, every donation, large or small, will make a genuine difference. Whether you can donate, fundraise, sponsor the project or simply share our appeal, every contribution will take us another step closer to our target.",
      "Now we need your help to light up the next 40.",
    ],
    target: 30000,
    raised: 0,
    deadline: "31 March 2027",
    tagline: "£30,000. One community. One club. One target.",
    thanks: "Thank you for supporting Pickering Town Football Club and helping us secure its future for the next generation.",
  } as Appeal | null,
  onlineUrl: "",
  bank: {
    accountName: "Pickering Town Football Club",
    bankName: "Virgin Money",
    sortCode: "05-06-69",
    accountNumber: "36593823",
    reference: "Flood Light Donation",
  } as BankDetails | null,
  uses: [
    { title: "The pitch and ground", text: "Keeping Mill Lane in shape: mowing, marking, drainage, and repairs to the stands and fencing." },
    { title: "Kit and equipment", text: "Balls, nets, training gear and first-aid kits for every team." },
    { title: "Young players", text: "Helping our under-18s and the pathway into senior football, so the cost never stops a young player taking part." },
    { title: "Running costs", text: "League and referee fees, travel to away games, floodlights and utilities." },
  ],
};
