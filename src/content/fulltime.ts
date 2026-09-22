/**
 * Live data from the FA's Full-Time service (fulltime.thefa.com), which runs the NCEL and North Riding leagues.
 *
 * How to get a snippet: a Full-Time team administrator signs in, goes to Media → Code snippets, picks the feed
 * (league table, team fixtures or team results), the division and season, and presses Create. Full-Time shows
 * embed code like:
 *
 *   <div id="lrep123456789"></div>
 *   <script src="https://fulltime.thefa.com/client/api/cs1.js"></script>
 *   <script>var lrcode = '123456789';</script>
 *
 * Copy the two values into the matching slot below: `divId` is the div's id, `code` is the lrcode value.
 * Once a slot is filled, that page shows the live Full-Time feed instead of the lists in fixtures.ts.
 * Leave a slot as `null` to keep using fixtures.ts for it.
 */
export type FullTimeSnippet = { divId: string; code: string };

export const fullTime: {
  table: FullTimeSnippet | null;
  fixtures: { first: FullTimeSnippet | null; ladies: FullTimeSnippet | null };
  results: { first: FullTimeSnippet | null; ladies: FullTimeSnippet | null };
} = {
  table: null,
  fixtures: { first: null, ladies: null },
  results: { first: null, ladies: null },
};
