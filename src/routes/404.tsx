import { createFileRoute } from "@tanstack/react-router";
import { NotFound } from "@/components/NotFound";

/** Prerendered to /404.html (see vite.config.ts) so static hosts can serve it for unknown paths. */
export const Route = createFileRoute("/404")({
  head: () => ({ meta: [{ title: "Page not found | Pickering Town FC" }, { name: "robots", content: "noindex" }] }),
  component: NotFound,
});
