#!/usr/bin/env node
/**
 * Brings the first team's results and the NCEL Premier Division table up to date from the league's website
 * (www.ncefl.org.uk), by editing src/content/fixtures.ts and src/content/tables.ts. Run by
 * .github/workflows/sync-league.yml a few times a day; any change is committed and the site republished.
 *
 * From the club's NCEL page (every first-team game, all competitions, friendlies left out):
 *   - played games get their score, attendance, Pikes scorers and home/away;
 *   - postponed games are marked postponed;
 *   - upcoming games get the league's kick-off time and home/away;
 *   - a game that has moved to another date is moved, and a new game (e.g. a cup draw) is added.
 * From the league's tables page: the Premier Division rows (with W/D/L and goals) and the "updated" date.
 *
 * Only first-team lines and the first-team table are touched. If a page can't be fetched or doesn't look as
 * expected, nothing is changed and the script exits with an error, so a change to the league's website can
 * never blank the site's data.
 *
 *   node scripts/sync-league.mjs              fetch from the league's website
 *   node scripts/sync-league.mjs --from DIR   use saved pages (DIR/matches.html, DIR/tables.html) instead
 *   add --dry-run to print the changes without writing them
 */
import fs from "node:fs";

const SITE = "https://www.ncefl.org.uk";
const CLUB_SLUG = "pickeringtown";
const OUR_NAME = "Pickering Town";
const FIXTURES = "src/content/fixtures.ts";
const TABLES = "src/content/tables.ts";

const args = process.argv.slice(2);
const fromDir = args.includes("--from") ? args[args.indexOf("--from") + 1] : null;
const dryRun = args.includes("--dry-run");

// The NCEL files a season under the year it starts in (2026 = 2026-27); a new season's pages appear in June.
const today = new Date();
const season = today.getMonth() >= 5 ? today.getFullYear() : today.getFullYear() - 1;

// Short competition names used on the site; anything else keeps the league's name.
const COMPETITIONS = { "NCEL Premier Division": "NCEL Premier" };

function fail(message) {
  console.error(`sync-league: ${message}. Nothing was changed.`);
  process.exit(1);
}

/** A page from the league's site. Throws if it can't be fetched, so the caller can try again. */
async function page(url, file) {
  if (fromDir) return fs.readFileSync(`${fromDir}/${file}`, "utf8");
  let res;
  try {
    res = await fetch(url, {
      headers: { "User-Agent": "PickeringTownFC-website/1.0 (+https://www.pickeringtownfc.com)" },
      signal: AbortSignal.timeout(30_000),
    });
  } catch (err) {
    throw Object.assign(new Error(`${url} couldn't be reached (${err.cause?.code ?? err.name})`), { unreachable: true });
  }
  if (!res.ok) throw new Error(`${url} answered ${res.status}`);
  return res.text();
}

const decode = (s) =>
  s.replace(/&amp;/g, "&").replace(/&#39;|&apos;/g, "'").replace(/&quot;/g, '"').replace(/&nbsp;/g, " ").replace(/&lt;/g, "<").replace(/&gt;/g, ">");
const text = (html) => decode(html.replace(/<br\s*\/?>/gi, " ").replace(/<[^>]+>/g, "")).replace(/\s+/g, " ").trim();
const squash = (name) => name.toLowerCase().replace(/[^a-z0-9]/g, "");

/** "7:45pm" -> "19:45" */
function to24h(t) {
  const m = /^(\d{1,2}):(\d{2})\s*([ap]m)$/i.exec(t.trim());
  if (!m) return null;
  let h = Number(m[1]) % 12;
  if (m[3].toLowerCase() === "pm") h += 12;
  return `${String(h).padStart(2, "0")}:${m[2]}`;
}

/** "Souleymane Coulibaly 19pen, 28" -> "Souleymane Coulibaly (19 pen, 28)"; unknown scorers are left out. */
function scorer(line) {
  const m = /^(.*?)\s+(\d.*)$/.exec(line.trim());
  if (!m || /^unknown$/i.test(m[1])) return null;
  const minutes = m[2].replace(/(\d+)\s*([a-z]+)/gi, "$1 $2").replace(/\s*,\s*/g, ", ");
  return `${m[1]} (${minutes})`;
}

// ---------- The club's matches page ----------

function parseMatches(html) {
  const rows = [...html.matchAll(/<tr class="nomobile">([\s\S]*?)<\/tr>/g)].map((m) => m[1]);
  const games = [];
  for (const row of rows) {
    const day = /\/matches\/day\/\d{4}\/(\d{4})(\d{2})(\d{2})\//.exec(row);
    const comp = [...row.matchAll(/<td class="tdcontainerblue teamfixtures"><a class="whitelink" title="([^"]+)" href="\/matches\//g)].map((m) => m[1]);
    const sides = [...row.matchAll(/<td class="tdcontainerblue teamresultswidth[^"]*">([\s\S]*?)<\/td>/g)].map((m) => m[1]);
    const middle = /<td class="tdcontainerpurple centertext"[^>]*>([\s\S]*?)<\/td>/.exec(row);
    if (!day || comp.length < 2 || sides.length !== 2 || !middle) continue;
    const competition = decode(comp[1]);
    if (/friendl/i.test(competition)) continue;

    const side = (cell) => {
      const name = /class="nomobile[^"]*"[^>]*>([\s\S]*?)<\/(?:a|font)>/.exec(cell);
      const goals = /<font class="goalscorers">([\s\S]*?)<\/font>/.exec(cell);
      return {
        name: name ? text(name[1]) : text(cell),
        ours: cell.includes(`/teams/${CLUB_SLUG}/`),
        scorers: goals ? goals[1].split(/<br\s*\/?>/i).map((l) => scorer(text(l))).filter(Boolean) : [],
      };
    };
    const [home, away] = sides.map(side);
    if (home.ours === away.ours) continue;
    const us = home.ours ? home : away;
    const them = home.ours ? away : home;

    const fonts = [...middle[1].matchAll(/<font[^>]*>([\s\S]*?)<\/font>/g)].map((m) => text(m[1]));
    const main = fonts[0] ?? "";
    const score = /^(\d+)\s*-\s*(\d+)$/.exec(main);
    const attendance = fonts.map((f) => /^Att:\s*([\d,]+)/i.exec(f)).find(Boolean);

    games.push({
      date: `${day[1]}-${day[2]}-${day[3]}`,
      time: to24h(main),
      competition: COMPETITIONS[competition] ?? competition,
      opponent: them.name,
      venue: home.ours ? "H" : "A",
      score: score ? (home.ours ? [Number(score[1]), Number(score[2])] : [Number(score[2]), Number(score[1])]) : undefined,
      postponed: /^(p\s*-\s*p|postp|off$)/i.test(main) && !score,
      attendance: attendance ? Number(attendance[1].replace(/,/g, "")) : undefined,
      scorers: us.scorers,
    });
  }
  return games;
}

// ---------- The tables page ----------

function parseTable(html) {
  // Each division starts with a red heading row; the Premier Division's rows run until the next heading.
  const sections = html.split(/<tr class="red">/).slice(1);
  const section = sections.find((t) => /href="\/matches\/ncelpremierdivision\//.test(t.slice(0, 600)));
  if (!section) return null;
  const table = section.split(/<\/table>/)[0];
  const rows = [];
  for (const [, row] of table.matchAll(/<tr class="tdcontainerblue">([\s\S]*?)<\/tr>/g)) {
    const cells = [...row.matchAll(/<td[^>]*>([\s\S]*?)<\/td>/g)].map((m) => m[1]);
    const name = /class="nomobile[^"]*"[^>]*>([\s\S]*?)<\/a>/.exec(row);
    // marker, pos, badge, team, P, HW, HD, HL, HF, HA, AW, AD, AL, AF, AA, Pts, +/-
    if (!name || cells.length < 17) continue;
    const n = cells.slice(4, 17).map((c) => Number(text(c)));
    if (n.some((v) => Number.isNaN(v))) continue;
    const [p, hw, hd, hl, hf, ha, aw, ad, al, af, aa, pts, gd] = n;
    rows.push({
      team: text(name[1]),
      played: p,
      won: hw + aw,
      drawn: hd + ad,
      lost: hl + al,
      goalsFor: hf + af,
      goalsAgainst: ha + aa,
      goalDifference: gd,
      points: pts,
    });
  }
  return rows;
}

// ---------- Writing the content files ----------

const KEYS = ["id", "kickoff", "team", "competition", "opponent", "venue", "score", "attendance", "postponed", "scorers"];
const lit = (v) => (Array.isArray(v) ? `[${v.map(lit).join(", ")}]` : typeof v === "string" ? JSON.stringify(v) : String(v));
const serialise = (m) =>
  `{ ${KEYS.filter((k) => m[k] !== undefined && !(Array.isArray(m[k]) && m[k].length === 0) && m[k] !== false)
    .map((k) => `${k}: ${lit(m[k])}`)
    .join(", ")} }`;

function updateFixtures(source, games) {
  const lines = source.split("\n");
  const ours = [];
  lines.forEach((line, i) => {
    const m = /^(\s*)(\{ id: "(f\d+)".*team: "first".*\}),\s*$/.exec(line);
    if (m) ours.push({ i, indent: m[1], match: Function(`"use strict"; return (${m[2]});`)() });
  });
  if (!ours.length) fail(`no first-team games found in ${FIXTURES}`);

  const changes = [];
  const byDate = new Map(ours.map((o) => [o.match.kickoff.slice(0, 10), o]));
  const unmatchedGames = [];
  const seen = new Set();

  const apply = (o, g) => {
    const before = serialise(o.match);
    const m = { ...o.match };
    if (!m.venue) m.venue = g.venue;
    if (m.kickoff.slice(0, 10) !== g.date) m.kickoff = `${g.date}T${g.time ?? m.kickoff.slice(11)}`;
    if (g.score) {
      m.score = g.score;
      m.attendance = g.attendance ?? m.attendance;
      m.scorers = g.scorers.length ? g.scorers : m.scorers;
      delete m.postponed;
    } else if (g.postponed) {
      m.postponed = true;
      delete m.score;
    } else if (g.time && m.kickoff.slice(11) !== g.time && !m.score) {
      m.kickoff = `${g.date}T${g.time}`;
    }
    o.match = m;
    const after = serialise(m);
    if (after !== before) changes.push(`${m.id} ${m.kickoff.slice(0, 10)} v ${m.opponent}: ${before} -> ${after}`);
  };

  for (const g of games) {
    const o = byDate.get(g.date);
    if (o) {
      seen.add(o);
      apply(o, g);
    } else unmatchedGames.push(g);
  }
  // A game on a date the site doesn't have: the same unplayed game moved to a new date, or a new game.
  const additions = [];
  for (const g of unmatchedGames) {
    const moved = ours.find(
      (o) => !seen.has(o) && !o.match.score && squash(o.match.opponent) === squash(g.opponent) && o.match.competition === g.competition,
    );
    if (moved) {
      seen.add(moved);
      apply(moved, g);
      continue;
    }
    if (g.date < `${season}-07-01`) continue;
    const next = Math.max(...ours.map((o) => Number(o.match.id.slice(1))), ...additions.map((a) => Number(a.id.slice(1)))) + 1;
    const m = {
      id: `f${String(next).padStart(2, "0")}`,
      kickoff: `${g.date}T${g.time ?? "15:00"}`,
      team: "first",
      competition: g.competition,
      opponent: g.opponent,
      venue: g.venue,
      score: g.score,
      attendance: g.score ? g.attendance : undefined,
      postponed: g.postponed || undefined,
      scorers: g.score ? g.scorers : undefined,
    };
    additions.push(m);
    changes.push(`added ${serialise(m)}`);
  }

  for (const o of ours) lines[o.i] = `${o.indent}${serialise(o.match)},`;
  if (additions.length) {
    const last = ours[ours.length - 1];
    lines.splice(last.i + 1, 0, ...additions.map((m) => `${last.indent}${serialise(m)},`));
  }
  return { source: lines.join("\n"), changes };
}

const MONTHS = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

function updateTable(source, rows) {
  const start = source.indexOf("export const firstTeamTable");
  const open = source.indexOf("rows: [", start);
  const close = source.indexOf("\n  ],", open);
  if (start < 0 || open < 0 || close < 0) fail(`couldn't find the first-team rows in ${TABLES}`);
  const rowLines = rows
    .map(
      (r) =>
        `    { team: ${JSON.stringify(r.team)}, played: ${r.played}, won: ${r.won}, drawn: ${r.drawn}, lost: ${r.lost}, goalsFor: ${r.goalsFor}, goalsAgainst: ${r.goalsAgainst}, goalDifference: ${r.goalDifference}, points: ${r.points} },`,
    )
    .join("\n");
  const oldRows = source.slice(open + "rows: [".length, close);
  if (oldRows.trim() === rowLines.trim()) return { source, changed: false };
  const updated = `${today.getDate()} ${MONTHS[today.getMonth()]} ${today.getFullYear()}`;
  let out = source.slice(0, open) + "rows: [\n" + rowLines + source.slice(close);
  const head = out.slice(start, out.indexOf("rows: [", start));
  out = out.replace(head, head.replace(/updated: "[^"]*"/, `updated: "${updated}"`));
  return { source: out, changed: true };
}

// ---------- Run ----------

const ATTEMPTS = 3;
const RETRY_SECONDS = 30;

/**
 * Reads the club's games and the table. The league's site now and then times out, or briefly serves a page with no
 * games on it, so each read is tried up to three times, 30 seconds apart. If the site still can't be reached, this
 * run is skipped with a warning (the next scheduled run catches up); if it answers but can't be read, the run fails,
 * as the page may have changed.
 */
async function readLeague() {
  for (let attempt = 1; ; attempt++) {
    try {
      const [matchesHtml, tablesHtml] = await Promise.all([
        page(`${SITE}/teams/${CLUB_SLUG}/matches/${season}/`, "matches.html"),
        page(`${SITE}/tables/`, "tables.html"),
      ]);
      const games = parseMatches(matchesHtml);
      if (games.length < 5) throw new Error(`only ${games.length} games read from the club's NCEL page; the page may have changed`);
      const rows = parseTable(tablesHtml);
      if (!rows || rows.length < 10 || !rows.some((r) => r.team === OUR_NAME)) throw new Error("the NCEL Premier Division table couldn't be read");
      return { games, rows };
    } catch (err) {
      if (fromDir) fail(err.message);
      if (attempt < ATTEMPTS) {
        console.log(`sync-league: ${err.message}; trying again in ${RETRY_SECONDS} seconds (attempt ${attempt} of ${ATTEMPTS}).`);
        await new Promise((r) => setTimeout(r, RETRY_SECONDS * 1000));
        continue;
      }
      if (err.unreachable) {
        console.log(`::warning::sync-league: ${err.message}. Nothing was changed; the next run will try again.`);
        process.exit(0);
      }
      fail(err.message);
    }
  }
}

const { games, rows } = await readLeague();

const fixtures = updateFixtures(fs.readFileSync(FIXTURES, "utf8"), games);
const table = updateTable(fs.readFileSync(TABLES, "utf8"), rows);

console.log(`Read ${games.length} games and ${rows.length} table rows from the NCEL.`);
for (const c of fixtures.changes) console.log(`  ${c}`);
console.log(table.changed ? "  table: updated" : "  table: no change");
if (!dryRun) {
  if (fixtures.changes.length) fs.writeFileSync(FIXTURES, fixtures.source);
  if (table.changed) fs.writeFileSync(TABLES, table.source);
}
