import { analytics } from "@/content/site";

/** The visitor's cookie choice, kept in localStorage. `null` until they choose. */
export type Consent = "accepted" | "rejected";
const KEY = "ptfc-consent";
export const CONSENT_EVENT = "ptfc-consent-change";
export const OPEN_SETTINGS_EVENT = "ptfc-open-cookie-settings";

export function readConsent(): Consent | null {
  try {
    const v = localStorage.getItem(KEY);
    return v === "accepted" || v === "rejected" ? v : null;
  } catch {
    return null;
  }
}

export function saveConsent(value: Consent) {
  try {
    localStorage.setItem(KEY, value);
  } catch {
    // Private mode: the choice lasts for this page only.
  }
  window.dispatchEvent(new CustomEvent(CONSENT_EVENT, { detail: value }));
}

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

/** Loads Google Analytics 4, only called once the visitor has accepted (and only if an ID is set). */
export function loadAnalytics() {
  const id = analytics.ga4MeasurementId;
  if (!id || window.gtag) return;
  window.dataLayer = window.dataLayer || [];
  window.gtag = function gtag() {
    // gtag.js reads the arguments object, not an array.
    // eslint-disable-next-line prefer-rest-params
    window.dataLayer!.push(arguments);
  };
  window.gtag("js", new Date());
  window.gtag("config", id, { anonymize_ip: true });
  const s = document.createElement("script");
  s.async = true;
  s.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(id)}`;
  document.head.appendChild(s);
}

/** Withdrawing consent: stop Analytics and clear its cookies. */
export function disableAnalytics() {
  const id = analytics.ga4MeasurementId;
  if (id) (window as unknown as Record<string, boolean>)[`ga-disable-${id}`] = true;
  for (const c of document.cookie.split(";")) {
    const name = c.split("=")[0].trim();
    if (name === "_ga" || name.startsWith("_ga_")) {
      for (const domain of ["", location.hostname, `.${location.hostname.replace(/^www\./, "")}`]) {
        document.cookie = `${name}=; Max-Age=0; path=/${domain ? `; domain=${domain}` : ""}`;
      }
    }
  }
}
