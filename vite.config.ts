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
        // Filtered views (e.g. /fixtures?view=results) are the same page; prerendering them would overwrite it.
        filter: (page) => !page.path.includes("?"),
      },
      // A static 404 page for hosts that serve /404.html for unknown paths.
      pages: [{ path: "/404", prerender: { enabled: true, outputPath: "/404.html" }, sitemap: { exclude: true } }],
      sitemap: { enabled: true, host: "https://www.pickeringtownfc.com" },
    }),
    viteReact(),
    tailwindcss(),
  ],
});
