// Tidies the generated sitemap:
// - pages are served as folders (/teams/) and GitHub Pages redirects /teams to /teams/, so list the final address;
// - drop filtered views (?view=results) and files (programme PDFs), which the crawler finds but aren't pages;
// - drop duplicates.
import { readFileSync, writeFileSync } from "node:fs";

const file = "dist/client/sitemap.xml";
const xml = readFileSync(file, "utf8");
const seen = new Set();
const tidied = xml.replace(/<url>[\s\S]*?<\/url>\s*/g, (entry) => {
  const loc = entry.match(/<loc>([^<]*)<\/loc>/)?.[1];
  if (!loc) return entry;
  const { pathname, search } = new URL(loc);
  if (search || /\.[a-z0-9]+$/i.test(pathname)) return "";
  const slashed = loc.endsWith("/") ? loc : `${loc}/`;
  if (seen.has(slashed)) return "";
  seen.add(slashed);
  return entry.replace(`<loc>${loc}</loc>`, `<loc>${slashed}</loc>`);
});
writeFileSync(file, tidied);
console.log(`sitemap: ${seen.size} pages`);
