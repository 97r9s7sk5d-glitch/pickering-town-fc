import { club } from "./club";

/**
 * Privacy policy and terms of use. Plain-English starting points for a community football club website:
 * CONFIRM both with the club committee before launch (and adjust if the club starts collecting other data,
 * e.g. online ticketing or memberships).
 */
export type LegalSection = { heading: string; paragraphs: string[] };

export const privacySections: LegalSection[] = [
  {
    heading: "Who we are",
    paragraphs: [
      `This website is run by ${club.fullName} ("the club", "we"), ${club.town}, ${club.county}. We are the data controller for personal information collected through this site. You can reach us through the contact page.`,
    ],
  },
  {
    heading: "What we collect",
    paragraphs: [
      "Contact form: when you send us a message we receive your name, email address, the topic you chose and your message. We use these only to reply to you and to deal with your enquiry.",
      "Analytics: if you accept analytics cookies, we use Google Analytics to count visits and see which pages are popular. It records things like the pages you view, roughly where you are (country or city), and your device and browser. It does not tell us who you are. If you reject analytics cookies, it does not run.",
      "Server logs: our hosting provider (Netlify) keeps standard technical logs, such as IP addresses and the pages requested, for security and to keep the site running.",
    ],
  },
  {
    heading: "Our legal basis",
    paragraphs: [
      "We handle contact form messages on the basis of our legitimate interest in answering enquiries. Analytics only runs with your consent, which you can withdraw at any time using “Cookie settings” at the bottom of every page.",
    ],
  },
  {
    heading: "Cookies and similar storage",
    paragraphs: [
      "Essential: the site remembers in your browser whether you have seen the opening video this visit, and your cookie choice. These don't identify you and are needed for the site to work as intended.",
      "Analytics (optional): Google Analytics cookies (named _ga and _ga_…) are only set if you click “Accept analytics”. They last up to two years unless you clear them or change your choice.",
    ],
  },
  {
    heading: "Who we share it with",
    paragraphs: [
      "Contact form messages are delivered through Netlify, which hosts the site. Analytics data, if you consent, is processed by Google. Both act on our behalf. We never sell your information, and we don't share it with anyone else unless the law requires it.",
    ],
  },
  {
    heading: "How long we keep it",
    paragraphs: [
      "We keep contact messages for as long as needed to deal with your enquiry, and no longer than two years. Analytics data is kept for 14 months.",
    ],
  },
  {
    heading: "Your rights",
    paragraphs: [
      "You can ask to see the information we hold about you, have it corrected or deleted, or object to how we use it. Contact us through the contact page. If you're unhappy with how we've handled your information, you can complain to the Information Commissioner's Office (ico.org.uk).",
    ],
  },
  {
    heading: "Children",
    paragraphs: [
      "The contact form is intended for adults. If you are under 13, please ask a parent or guardian to get in touch for you.",
    ],
  },
];

export const termsSections: LegalSection[] = [
  {
    heading: "About these terms",
    paragraphs: [
      `These terms apply to your use of this website, run by ${club.fullName}. By using the site you accept them. If you don't agree, please don't use the site.`,
    ],
  },
  {
    heading: "Information on the site",
    paragraphs: [
      "We work hard to keep fixtures, results, tables and other information accurate, but it is provided for general information and may change. Kick-off times and venues can move at short notice: check with the club or the league before travelling. Official league tables and results are published by the leagues.",
    ],
  },
  {
    heading: "Photos, badge and content",
    paragraphs: [
      "The club badge, name, photographs and text on this site belong to the club or are used with permission. You may share links and view the site for personal use, but please don't copy, reproduce or use them commercially without our written permission. Sponsor names and logos belong to their owners.",
    ],
  },
  {
    heading: "Using the site",
    paragraphs: [
      "Please don't misuse the site: no attempts to break its security, send spam through the contact form, or use automated tools to overload it. We may block anyone who does.",
    ],
  },
  {
    heading: "Links to other sites",
    paragraphs: [
      "We link to other websites, such as the league, our sponsors and partners. We aren't responsible for their content or how they handle your information.",
    ],
  },
  {
    heading: "Liability",
    paragraphs: [
      "The site is provided “as is”. To the extent the law allows, the club is not liable for any loss arising from your use of the site or reliance on its content. Nothing in these terms limits liability that cannot be limited by law.",
    ],
  },
  {
    heading: "Changes and law",
    paragraphs: [
      "We may update these terms from time to time; the date at the top shows the latest version. These terms are governed by the law of England and Wales.",
    ],
  },
];
