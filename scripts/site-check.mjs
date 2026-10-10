#!/usr/bin/env node
/**
 * Health check for the live site, run every hour (and after every deploy) by .github/workflows/site-check.yml.
 *
 * Checks:
 * - every page in the sitemap loads, and every page, image, video, PDF, script and stylesheet the pages link to on
 *   the site itself answers (other websites aren't checked);
 * - a missing page shows the "Page not found" page with a 404;
 * - each page in a real browser, at desktop and phone sizes: no JavaScript errors (including React hydration
 *   errors), no failed requests to the site, no broken images, and nothing wider than a phone screen;
 * - first-team games that kicked off more than 30 hours ago have a result (it comes from the league, so a missing
 *   one means the results sync isn't working or the league hasn't posted it);
 * - the latest results sync and deploy on GitHub didn't fail.
 * Anything that fails is checked again 30 seconds later, and only problems that are still there are reported.
 *
 * Writes a Markdown report (--report FILE) and exits 1 if there are problems. Ladies and U18 results, which are
 * added by hand, are listed as notes and don't fail the check.
 *
 *   node scripts/site-check.mjs [--base URL] [--report FILE] [--no-browser]
 *
 * --base checks another copy of the site (e.g. a local server) whose sitemap still names www.pickeringtownfc.com.
 * The browser is Google Chrome (installed on GitHub's runners); set CHROME_PATH to use another Chromium.
 */
import fs from "node:fs";
import crypto from "node:crypto";

const SITE = "https://www.pickeringtownfc.com";
const args = process.argv.slice(2);
const option = (name) => (args.includes(name) ? args[args.indexOf(name) + 1] : undefined);
const BASE = (option("--base") ?? SITE).replace(/\/$/, "");
const REPORT = option("--report");
const useBrowser = !args.includes("--no-browser");
const RESULT_DUE_HOURS = 30;
const RECHECK_SECONDS = 30;

/** Problems as [what, where] pairs (JSON, so a Set drops repeats); the report groups them by what went wrong. */
const problems = [];
const problem = (what, where = "") => JSON.stringify([what, where]);
const status = (res) => (res.status ? `answered ${res.status}` : `couldn't be reached (${res.error})`);
const notes = [];
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const path = (url) => url.replace(BASE, "") || "/";

/** The site's own address for a link, or null for other websites, anchors, email and phone links. */
function ownUrl(ref, from) {
  if (!ref || /^(#|mailto:|tel:|data:|javascript:)/i.test(ref)) return null;
  const url = new URL(ref.replace(SITE, BASE), from);
  if (url.origin !== new URL(BASE).origin) return null;
  url.hash = "";
  return url.href;
}

async function get(url, method = "GET") {
  try {
    const res = await fetch(url, { method, redirect: "follow", signal: AbortSignal.timeout(30_000) });
    return { status: res.status, headers: res.headers, body: method === "GET" ? await res.text() : "" };
  } catch (err) {
    return { status: 0, error: err.cause?.code ?? err.name };
  }
}

/** Runs `check` for each item, a few at a time; returns the items it reported problems for. */
async function eachLimited(items, limit, check) {
  const failed = [];
  let next = 0;
  await Promise.all(
    Array.from({ length: limit }, async () => {
      while (next < items.length) {
        const item = items[next++];
        const found = await check(item);
        if (found.length) failed.push([item, found]);
      }
    }),
  );
  return failed;
}

/** Checks each item, then checks the failures once more after a pause, and reports what fails both times. */
async function withRecheck(items, limit, check) {
  const first = await eachLimited(items, limit, check);
  if (!first.length) return;
  await sleep(RECHECK_SECONDS * 1000);
  for (const [, found] of await eachLimited(first.map(([item]) => item), limit, check)) problems.push(...found);
}

// ---------- Pages, links and files ----------

const sitemap = await get(`${BASE}/sitemap.xml`);
const pages = [...sitemap.body.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1].replace(SITE, BASE));
if (sitemap.status !== 200 || pages.length < 10) {
  problems.push(problem(`**/sitemap.xml** ${status(sitemap)} with ${pages.length} pages listed`));
}

/** Every address on the site that a page links to: pages, images (including srcset), video, PDFs, scripts, styles. */
const linked = new Map();
async function checkPage(url) {
  const res = await get(url);
  if (res.status !== 200) return [problem(`**${path(url)}** ${status(res)}`)];
  if (!/<title>[^<]+<\/title>/.test(res.body)) return [problem(`**${path(url)}** has no title, so it may not have built properly`)];
  for (const [, attr, value] of res.body.matchAll(/\s(href|src|poster|data-src|data-portrait-src|data-poster|srcset)="([^"]+)"/g)) {
    const refs = attr === "srcset" ? value.split(",").map((s) => s.trim().split(/\s+/)[0]) : [value];
    for (const ref of refs) {
      const own = ownUrl(ref.replace(/&amp;/g, "&"), url);
      if (own && !linked.has(own)) linked.set(own, url);
    }
  }
  return [];
}
await withRecheck(pages, 6, checkPage);

const files = [...linked.keys()].filter((u) => !pages.includes(u));
await withRecheck(files, 8, async (url) => {
  let res = await get(url, "HEAD");
  if (res.status === 405) res = await get(url);
  return res.status === 200
    ? []
    : [problem(`**${path(url)}** ${status(res)}`, `linked from ${path(linked.get(url))}`)];
});

await withRecheck([`${BASE}/site-check-missing-page/`], 1, async (url) => {
  const res = await get(url);
  return res.status === 404 && /not found/i.test(res.body)
    ? []
    : [problem(`**Missing pages**: an address that doesn't exist answered ${res.status || res.error} instead of showing the "Page not found" page`)];
});

// ---------- Results ----------

const now = Date.now();
const fixtures = fs.readFileSync(new URL("../src/content/fixtures.ts", import.meta.url), "utf8");
for (const line of fixtures.split("\n")) {
  const m = /id: "([^"]+)", kickoff: "([^"]+)", team: "(\w+)".*opponent: "([^"]+)"/.exec(line);
  if (!m || /score:|postponed: true/.test(line)) continue;
  const [, id, kickoff, team, opponent] = m;
  // Kick-off times are UK time; treating them as UTC is close enough for a 30-hour allowance.
  if (now - Date.parse(`${kickoff}:00Z`) < RESULT_DUE_HOURS * 3600_000) continue;
  const game = `${opponent} on ${kickoff.slice(0, 10)} (${id})`;
  if (team === "first") problems.push(problem(`**Results**: no first-team result yet for ${game}. The league may not have posted it, or the results sync isn't working.`));
  else notes.push(`${team === "ladies" ? "Ladies" : "U18"}: no result yet for ${game}. These are added by hand in src/content/fixtures.ts.`);
}

// ---------- GitHub: latest results sync and deploy ----------

if (process.env.GITHUB_TOKEN && process.env.GITHUB_REPOSITORY) {
  for (const [file, name] of [["sync-league.yml", "results sync"], ["deploy-pages.yml", "deploy"]]) {
    const res = await fetch(
      `https://api.github.com/repos/${process.env.GITHUB_REPOSITORY}/actions/workflows/${file}/runs?branch=main&status=completed&per_page=1`,
      { headers: { Authorization: `Bearer ${process.env.GITHUB_TOKEN}`, Accept: "application/vnd.github+json" } },
    ).catch(() => null);
    const run = res?.ok ? (await res.json()).workflow_runs?.[0] : null;
    if (run && !["success", "cancelled", "skipped"].includes(run.conclusion)) problems.push(problem(`**GitHub**: the latest ${name} ${run.conclusion} (${run.created_at.slice(0, 16).replace("T", " ")} UTC): ${run.html_url}`));
  }
}

// ---------- In a real browser ----------

let browserPages = 0;
if (useBrowser && pages.length) {
  const { chromium } = await import("playwright-core");
  const browser = await chromium.launch(process.env.CHROME_PATH ? { executablePath: process.env.CHROME_PATH } : { channel: "chrome" });
  const sizes = [
    { name: "desktop", viewport: { width: 1366, height: 900 } },
    { name: "phone", viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true, deviceScaleFactor: 2 },
  ];
  const origin = new URL(BASE).origin;

  async function inBrowser([url, size]) {
    const { name, ...options } = size;
    const context = await browser.newContext(options);
    const page = await context.newPage();
    const found = new Set();
    const where = `${path(url)} (${name})`;
    const own = (u) => u.startsWith(origin);
    page.on("pageerror", (err) => found.add(problem(`JavaScript error: ${err.message.split("\n")[0]}`, where)));
    page.on("console", (msg) => {
      if (msg.type() !== "error" || /^Failed to load resource/.test(msg.text())) return;
      if (msg.location().url && !own(msg.location().url)) return; // other websites' widgets
      found.add(problem(`Console error: ${msg.text().split("\n")[0].slice(0, 300)}`, where));
    });
    page.on("response", (res) => {
      if (own(res.url()) && res.status() >= 400) found.add(problem(`**${path(res.url())}** answered ${res.status()}`, where));
    });
    page.on("requestfailed", (req) => {
      const error = req.failure()?.errorText ?? "";
      if (own(req.url()) && !/ERR_ABORTED/.test(error)) found.add(problem(`**${path(req.url())}** didn't load (${error})`, where));
    });
    try {
      await page.goto(url, { waitUntil: "load", timeout: 60_000 });
      await page.waitForTimeout(2000);
      // Scroll down the page so lazy images load, then check none are broken.
      await page.evaluate(async () => {
        for (let y = 0; y < document.body.scrollHeight; y += window.innerHeight * 0.8) {
          window.scrollTo(0, y);
          await new Promise((r) => setTimeout(r, 150));
        }
      });
      await page.waitForLoadState("networkidle", { timeout: 15_000 }).catch(() => {});
      const broken = await page.evaluate(() =>
        [...document.images].filter((img) => img.complete && img.currentSrc && img.naturalWidth === 0).map((img) => img.currentSrc),
      );
      for (const src of broken) found.add(problem(`**${path(src)}** doesn't show (broken image)`, where));
      const wide = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
      if (wide > 1) found.add(problem("The page is wider than the screen, so it scrolls sideways", `${where} by ${wide}px`));
    } catch (err) {
      found.add(problem(`Didn't finish loading (${err.message.split("\n")[0]})`, where));
    }
    await context.close();
    return [...found];
  }

  const runs = pages.flatMap((url) => sizes.map((size) => [url, size]));
  browserPages = runs.length;
  await withRecheck(runs, 4, inBrowser);
  await browser.close();
}

// ---------- Report ----------

/** One line per thing that went wrong, with the pages (and sizes) it happened on. */
const grouped = new Map();
for (const [what, where] of [...new Set(problems)].map((p) => JSON.parse(p))) {
  if (!grouped.has(what)) grouped.set(what, []);
  if (where) grouped.get(what).push(where);
}
const unique = [...grouped].map(([what, wheres]) =>
  wheres.length ? `${what} (${wheres.slice(0, 6).join(", ")}${wheres.length > 6 ? ` and ${wheres.length - 6} more` : ""})` : what,
);
const signature = crypto.createHash("sha1").update([...grouped.keys()].sort().join("\n")).digest("hex").slice(0, 12);
const checked = `${pages.length} pages, ${files.length} linked files${browserPages ? `, and each page in a browser at desktop and phone sizes` : ""}`;
const report = [
  `<!-- site-check:${unique.length ? signature : "ok"} -->`,
  unique.length ? `## ${unique.length} problem${unique.length === 1 ? "" : "s"} found on ${BASE.replace(/^https?:\/\//, "")}` : `## All clear on ${BASE.replace(/^https?:\/\//, "")}`,
  "",
  `Checked ${new Date().toISOString().slice(0, 16).replace("T", " ")} UTC: ${checked}.${unique.length ? ` Each problem was still there when checked again ${RECHECK_SECONDS} seconds later.` : ""}`,
  ...(unique.length ? ["", "### Problems", ...unique.map((p) => `- ${p}`)] : []),
  ...(notes.length ? ["", "### Notes (not counted as problems)", ...notes.map((n) => `- ${n}`)] : []),
  "",
].join("\n");

console.log(report);
if (REPORT) fs.writeFileSync(REPORT, report);
if (process.env.GITHUB_STEP_SUMMARY) fs.appendFileSync(process.env.GITHUB_STEP_SUMMARY, report);
if (process.env.GITHUB_OUTPUT) fs.appendFileSync(process.env.GITHUB_OUTPUT, `problems=${unique.length}\nsignature=${signature}\n`);
process.exit(unique.length ? 1 : 0);
