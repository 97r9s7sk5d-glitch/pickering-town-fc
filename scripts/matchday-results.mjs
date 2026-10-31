#!/usr/bin/env node
/**
 * Gets a first-team score onto the site soon after the game. Run by .github/workflows/matchday-results.yml.
 *
 * GitHub delays or drops scheduled runs when it's busy, often for hours on a Saturday afternoon, so the results
 * sync's own every-15-minutes schedule can't be relied on after a game. Instead this waits inside one run: from
 * about full time it starts the results sync (.github/workflows/sync-league.yml) every 10 minutes until the game
 * has its score on main, or gives up 5 hours after kick-off (the evening syncs and the site check take over then).
 * Before GitHub's 6-hour limit on a run, it starts a fresh run of itself to carry on.
 *
 * Does nothing on a day without a first-team game, or once today's game has its score.
 * Needs GH_TOKEN (to start the workflows) and TZ=Europe/London (kick-off times in fixtures.ts are UK time).
 */
import { execFileSync } from "node:child_process";

const FULL_TIME_AFTER = 110; // minutes after kick-off: 90 minutes, half-time and stoppages
const GIVE_UP_AFTER = 300; // minutes after kick-off
const EVERY = 10; // minutes between syncs
const RUN_LIMIT = 320; // minutes this run waits before handing over to a fresh one

const started = Date.now();
const minutes = (n) => n * 60_000;
const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
const run = (...args) => execFileSync(args[0], args.slice(1), { encoding: "utf8" });
const startWorkflow = (file) => run("gh", "workflow", "run", file, "--ref", "main", "--repo", process.env.GITHUB_REPOSITORY);
const at = (ms) => new Date(ms).toTimeString().slice(0, 5);

const d = new Date();
const today = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;

/** Today's first-team game, as it is on main now, if it's still waiting for its score. */
function waiting() {
  run("git", "fetch", "-q", "origin", "main");
  for (const line of run("git", "show", "FETCH_HEAD:src/content/fixtures.ts").split("\n")) {
    const m = /id: "([^"]+)", kickoff: "([^"]+)", team: "first".*opponent: "([^"]+)"/.exec(line);
    if (!m || !m[2].startsWith(today) || /score:|postponed: true/.test(line)) continue;
    return { id: m[1], kickoff: new Date(m[2]).getTime(), opponent: m[3] };
  }
}

let game = waiting();
if (!game) {
  console.log("No first-team game waiting for its score today.");
  process.exit(0);
}
console.log(`${game.opponent} (${game.id}) kicks off at ${at(game.kickoff)}; syncing from ${at(game.kickoff + minutes(FULL_TIME_AFTER))}.`);

while (game) {
  const now = Date.now();
  const from = game.kickoff + minutes(FULL_TIME_AFTER);
  const handOver = started + minutes(RUN_LIMIT);
  if (now > game.kickoff + minutes(GIVE_UP_AFTER)) {
    console.log(`::warning::No score for ${game.opponent} yet; leaving it to the evening results syncs.`);
    break;
  }
  if (now >= handOver) {
    startWorkflow("matchday-results.yml");
    console.log("Carrying on in a fresh run.");
    break;
  }
  // A hiccup reaching GitHub shouldn't end the wait: try again next time round.
  try {
    if (now >= from) {
      startWorkflow("sync-league.yml");
      console.log(`${at(now)} started the results sync.`);
    }
  } catch (err) {
    console.log(`::warning::Couldn't start the results sync: ${err.message}`);
  }
  // Wait until full time, or for the next sync, but not past the hand-over.
  await sleep(Math.min(now >= from ? minutes(EVERY) : from - now, handOver - now));
  try {
    game = waiting();
    if (!game) console.log("The score is on the site.");
  } catch (err) {
    console.log(`::warning::Couldn't read the fixtures on main: ${err.message}`);
  }
}
