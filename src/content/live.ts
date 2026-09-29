import type { TeamId } from "@/content/fixtures";

/**
 * Live scores during a game. When a next-match countdown reaches kick-off, the panel switches to "Live" and shows
 * the team's Football Web Pages feed (goals, half time and full time as they're reported; the same service as the
 * NCEL's live scores page, www.ncefl.org.uk/live/) until two hours after kick-off, when the next game takes over.
 * The final score then comes from the league (scripts/sync-league.mjs).
 *
 * `feed` is the part of a Football Web Pages address after footballwebpages.co.uk/, or null for no live feed.
 * `follow` is a link for following the game elsewhere, shown under the feed (or on its own without one).
 * /live-test.html shows the candidate feeds so they can be checked in a browser.
 */
export type LiveSource = { feed: string | null; follow: { label: string; url: string } | null };

export const liveScores: Record<TeamId, LiveSource> = {
  first: {
    feed: "pickering-town/vidiprinter",
    follow: { label: "NCEL live scores", url: "https://www.ncefl.org.uk/live/" },
  },
  ladies: {
    feed: null,
    follow: { label: "the Ladies on Facebook", url: "https://www.facebook.com/share/19eEsX2Jpo/" },
  },
  u18: { feed: null, follow: null },
};

/** Football Web Pages widget colours, set to the site's royal blue. */
export const liveFeedStyle = {
  "background-color": "#0a2a86",
  color: "#FFFFFF",
  "font-family": "Inter",
  "font-size": "14px",
  "border-color": "#1f4fd1",
  "heading-color": "#FFFFFF",
  "hover-background-color": "#0d37ab",
  "goal-background-color": "#1f9d55",
  "half-time-full-time-background-color": "#000000",
  "info-background-color": "#0d37ab",
};
