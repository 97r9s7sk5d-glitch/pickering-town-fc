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
 * Contact form: messages are sent through Netlify Forms and appear in the Netlify dashboard (Forms → contact),
 * which can email each one to the club: Netlify → Project configuration → Notifications → Form submission
 * notifications. Spam is filtered by a hidden honeypot field, a minimum fill-in time and Netlify's own spam check.
 */
export const contactForm = {
  name: "contact",
  /** Submissions faster than this (in ms) after the page loads are treated as bots. */
  minFillTime: 3000,
};

/** When the privacy policy and terms were last updated. */
export const legalUpdated = "24 September 2026";

/** The website credit, shown small at the very bottom of every page. Set to null to remove it. */
export const siteCredit: { label: string; url: string } | null = {
  label: "The Chairman",
  url: "https://thechairman.org.uk",
};
