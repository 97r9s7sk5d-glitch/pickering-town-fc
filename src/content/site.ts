/**
 * Site-wide settings for analytics and the contact form.
 *
 * Analytics: paste a Google Analytics 4 measurement ID (looks like "G-XXXXXXXXXX", from analytics.google.com →
 * Admin → Data streams) into `ga4MeasurementId`. It only loads for visitors who accept analytics cookies in the
 * cookie banner. Leave it empty and no analytics code loads at all.
 */
export const analytics = {
  ga4MeasurementId: "",
};

/**
 * Contact form. With no Web3Forms key, "Send message" opens the visitor's email app with their message written out
 * and addressed to the club email (contact.email in club.ts), ready to send.
 *
 * To have messages sent straight from the page instead: go to web3forms.com, enter the club email address, and paste
 * the access key they email you into `web3formsKey` (it's meant to be public). Messages then arrive in that inbox.
 * Spam protection: a hidden honeypot field bots fill in, and a minimum fill-in time.
 */
export const contactForm = {
  web3formsKey: "",
  /** Submissions faster than this (in ms) after the page loads are treated as bots. */
  minFillTime: 3000,
};

/** When the privacy policy and terms were last updated. */
export const legalUpdated = "13 November 2026";

/**
 * The website credit: "Design by" and The Chairman's CT logo in a tab at the top left of every page, above the
 * header. `label` is what screen readers and search engines get in place of the logo ("Design by The Chairman").
 * Set to null to remove it.
 */
export const siteCredit: { prefix: string; label: string; logo: string; url: string } | null = {
  prefix: "Design by",
  label: "The Chairman",
  logo: "/images/the-chairman-ct.svg",
  url: "https://thechairman.org.uk",
};

/**
 * The Site map page (/sitemap): every page, for people and search engines. The main menu's pages and the news
 * articles are listed automatically; these are the other pages, and a few useful views.
 */
export const sitemapExtras = {
  intro: "Every page on the website in one place.",
  views: [
    { label: "Latest results", href: "/fixtures?view=results" },
    { label: "Ladies fixtures", href: "/fixtures?team=ladies" },
    { label: "Ladies results", href: "/fixtures?view=results&team=ladies" },
  ],
  more: [
    { label: "Donate", href: "/donate" },
    { label: "Contact", href: "/contact" },
    { label: "Privacy & cookies", href: "/privacy" },
    { label: "Terms of use", href: "/terms" },
  ],
};
