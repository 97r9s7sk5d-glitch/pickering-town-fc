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
export const legalUpdated = "25 September 2026";

/** The website credit, a thin line at the top left of every page, above the header. Set to null to remove it. */
export const siteCredit: { label: string; url: string } | null = {
  label: "The Chairman",
  url: "https://thechairman.org.uk",
};
