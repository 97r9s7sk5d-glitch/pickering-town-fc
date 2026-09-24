import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { Cookie } from "lucide-react";
import { OPEN_SETTINGS_EVENT, disableAnalytics, loadAnalytics, readConsent, saveConsent, type Consent } from "@/lib/consent";

/**
 * Cookie consent banner. Shown until the visitor chooses; reopened from "Cookie settings" in the footer.
 * Analytics only loads after "Accept analytics". Rendered after hydration (it depends on localStorage), so it
 * never affects the prerendered HTML.
 */
export function CookieBanner() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const consent = readConsent();
    if (consent === "accepted") loadAnalytics();
    if (consent === null) setOpen(true);
    const reopen = () => setOpen(true);
    window.addEventListener(OPEN_SETTINGS_EVENT, reopen);
    return () => window.removeEventListener(OPEN_SETTINGS_EVENT, reopen);
  }, []);

  function choose(value: Consent) {
    saveConsent(value);
    if (value === "accepted") loadAnalytics();
    else disableAnalytics();
    setOpen(false);
  }

  if (!open) return null;

  return (
    <div
      role="dialog"
      aria-labelledby="cookie-title"
      aria-describedby="cookie-text"
      className="fixed inset-x-3 bottom-3 z-50 mx-auto max-w-2xl rounded-2xl border border-line-strong bg-night/95 p-5 shadow-2xl shadow-ink/60 backdrop-blur sm:inset-x-6 sm:bottom-6"
    >
      <div className="flex gap-4">
        <Cookie className="mt-0.5 hidden h-6 w-6 shrink-0 text-pike-bright sm:block" aria-hidden="true" />
        <div>
          <p id="cookie-title" className="font-semibold">Cookies on this site</p>
          <p id="cookie-text" className="mt-1 text-sm leading-relaxed text-muted">
            We use essential storage to make the site work. With your permission we'd also like to use analytics
            cookies to see which pages are useful. Read our{" "}
            <Link to="/privacy" className="text-pike-bright underline underline-offset-2">privacy & cookies policy</Link>.
          </p>
          <div className="mt-4 flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => choose("accepted")}
              className="eyebrow rounded-full bg-pike px-5 py-2.5 text-white hover:bg-pike-bright hover:text-ink"
            >
              Accept analytics
            </button>
            <button
              type="button"
              onClick={() => choose("rejected")}
              className="eyebrow rounded-full border border-line-strong px-5 py-2.5 text-fg hover:border-pike-bright hover:text-pike-bright"
            >
              Essential only
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

/** Footer link that reopens the banner so visitors can change their choice. */
export function CookieSettingsButton({ className = "" }: { className?: string }) {
  return (
    <button type="button" onClick={() => window.dispatchEvent(new Event(OPEN_SETTINGS_EVENT))} className={className}>
      Cookie settings
    </button>
  );
}
