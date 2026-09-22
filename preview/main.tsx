/**
 * Single-file draft preview: the real site as one self-contained HTML file (npm run preview:file), for
 * sharing privately before launch. Uses hash URLs (#/fixtures) so it works when opened straight from disk.
 */
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider, createHashHistory, createRouter } from "@tanstack/react-router";
import { routeTree } from "./routeTree.gen";
import css from "../src/styles.css?inline";

// Styles (with fonts inlined) go straight into the page: a plain import would be dropped as a separate file.
const style = document.createElement("style");
style.textContent = css;
document.head.append(style);

// The root route's <html> shell is only for the prerendered site; here React renders into #app instead.
(routeTree.options as { shellComponent?: unknown }).shellComponent = undefined;

// Every image the pages show, inlined, so the file needs nothing else.
const inlined = import.meta.glob(["../public/images/**/*.webp", "../public/badge.webp"], { query: "?inline", import: "default", eager: true }) as Record<
  string,
  string
>;
const images = new Map(Object.entries(inlined).map(([path, data]) => [path.replace("../public", ""), data]));

function inlineImages(root: ParentNode) {
  root.querySelectorAll<HTMLImageElement>('img[src^="/"]').forEach((img) => {
    const data = images.get(img.getAttribute("src")!);
    if (data) img.src = data;
  });
}
new MutationObserver((records) => {
  for (const r of records) r.addedNodes.forEach((n) => n instanceof Element && inlineImages(n.parentNode ?? n));
}).observe(document.body, { childList: true, subtree: true });

const router = createRouter({ routeTree, history: createHashHistory(), scrollRestoration: true });

createRoot(document.getElementById("app")!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
);
