import { defineConfig } from "vite";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import viteReact from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// Fully static: every page is prerendered to plain HTML at build
// time (crawling internal links from "/"), so the site can be hosted anywhere with no server.
// Plugin order matters: tanstackStart() must come before viteReact().
export default defineConfig({
  server: { port: 3000 },
  resolve: { tsconfigPaths: true },
  plugins: [
    tanstackStart({
      prerender: {
        enabled: true,
        crawlLinks: true,
        failOnError: true,
        // Netlify's build machines report many CPUs but share them, so rendering a page per CPU at once could time
        // out and fail the whole build now and then. Render four at a time and retry a failed page before giving up.
        concurrency: 4,
        retryCount: 3,
        retryDelay: 1000,
        // Filtered views (e.g. /fixtures?view=results) are the same page; prerendering them would overwrite it.
        // Links to files (e.g. a programme PDF in /public) aren't pages, so they're not crawled either.
        filter: (page) => !page.path.includes("?") && !/\.[a-z0-9]+$/i.test(page.path),
      },
      // A static 404 page for hosts that serve /404.html for unknown paths.
      pages: [{ path: "/404", prerender: { enabled: true, outputPath: "/404.html" }, sitemap: { exclude: true } }],
      sitemap: { enabled: true, host: "https://www.pickeringtownfc.com" },
    }),
    viteReact(),
    tailwindcss(),
  ],
});
