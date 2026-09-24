/**
 * Digital matchday programmes, shown on the Matchday page (newest first).
 *
 * To add one: put the PDF in /public/programmes (e.g. /public/programmes/2026-09-26-grimsby-borough.pdf), then add
 * { matchId, file } below. `matchId` is the game's id in fixtures.ts, which gives the opponent and date. `file` can
 * also be a link to an online reader (Issuu, Joomag, Pitchero and so on). `cover` is an optional cover image.
 */
export type Programme = { matchId: string; file: string; cover?: string };

export const programmes: Programme[] = [];
