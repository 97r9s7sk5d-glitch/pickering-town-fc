import { useEffect } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { NotFound } from "@/components/NotFound";

declare global {
  interface Window {
    __ptfcMissedUrl?: string;
  }
}

// GitHub Pages serves this page (404.html) at whatever address was asked for, but it was prerendered for /404, so
// hydrating it at another address would fail. Before hydration, point the address at /404 so the app renders the
// same page; straight after, put the visitor's address back in the address bar.
const atThisAddress = `(function(){var p=location.pathname;if(p!=="/404"&&p!=="/404/"&&p!=="/404.html"){window.__ptfcMissedUrl=p+location.search+location.hash;history.replaceState(history.state,"","/404")}})()`;

/** Prerendered to /404.html (see vite.config.ts) so static hosts can serve it for unknown paths. */
export const Route = createFileRoute("/404")({
  head: () => ({ meta: [{ title: "Page not found | Pickering Town FC" }, { name: "robots", content: "noindex" }] }),
  component: NotFoundPage,
});

function NotFoundPage() {
  useEffect(() => {
    const missed = window.__ptfcMissedUrl;
    if (missed) {
      delete window.__ptfcMissedUrl;
      history.replaceState(history.state, "", missed);
    }
  }, []);

  return (
    <>
      <script dangerouslySetInnerHTML={{ __html: atThisAddress }} />
      <NotFound />
    </>
  );
}
