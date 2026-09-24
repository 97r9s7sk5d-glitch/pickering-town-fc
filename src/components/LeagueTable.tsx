import type { LeagueTableData, TableRow } from "@/content/tables";

function zone(position: number, total: number, zones: LeagueTableData["zones"]): string {
  if (position <= zones.promotion) return "bg-win";
  if (position <= zones.playoffs) return "bg-pike-bright";
  if (position > total - zones.relegation) return "bg-loss";
  return "bg-transparent";
}

const th = "py-3 text-center font-semibold";
const signed = (n: number) => (n > 0 ? `+${n}` : String(n));

/**
 * A league table. W/D/L and goals columns appear when every row has them (goals hide on small phones).
 * `compact` shows only the five rows around the club, for the home page.
 */
export function LeagueTable({ table, compact = false }: { table: LeagueTableData; compact?: boolean }) {
  const total = table.rows.length;
  const ownIndex = table.rows.findIndex((r) => r.team === table.ownTeam);
  let rows: { row: TableRow; position: number }[] = table.rows.map((row, i) => ({ row, position: i + 1 }));
  if (compact && ownIndex >= 0) {
    const start = Math.max(0, Math.min(ownIndex - 2, total - 5));
    rows = rows.slice(start, start + 5);
  }
  const detail = !compact && table.rows.every((r) => r.won !== undefined && r.goalsFor !== undefined);

  return (
    <div className="-mx-4 overflow-x-auto px-4 sm:mx-0 sm:px-0">
      <table className="w-full min-w-[18rem] border-collapse text-sm">
        <caption className="sr-only">{table.title}</caption>
        <thead>
          <tr className="eyebrow border-b border-line-strong !text-[11px] text-muted">
            <th scope="col" className="w-10 py-3 text-left font-semibold">
              <span className="sr-only">Position</span>#
            </th>
            <th scope="col" className="py-3 text-left font-semibold">Club</th>
            <th scope="col" className={`w-9 ${th}`}><abbr title="Played">P</abbr></th>
            {detail && (
              <>
                <th scope="col" className={`w-9 ${th}`}><abbr title="Won">W</abbr></th>
                <th scope="col" className={`w-9 ${th}`}><abbr title="Drawn">D</abbr></th>
                <th scope="col" className={`w-9 ${th}`}><abbr title="Lost">L</abbr></th>
                <th scope="col" className={`hidden w-10 sm:table-cell ${th}`}><abbr title="Goals for">F</abbr></th>
                <th scope="col" className={`hidden w-10 sm:table-cell ${th}`}><abbr title="Goals against">A</abbr></th>
              </>
            )}
            <th scope="col" className={`w-11 ${th}`}><abbr title="Goal difference">GD</abbr></th>
            <th scope="col" className={`w-11 ${th}`}><abbr title="Points">Pts</abbr></th>
          </tr>
        </thead>
        <tbody className="tabular">
          {rows.map(({ row, position }) => {
            const own = row.team === table.ownTeam;
            return (
              <tr
                key={row.team}
                className={`border-b border-line ${own ? "bg-pike/20 font-semibold text-white" : "text-fg/90"}`}
                aria-current={own ? "true" : undefined}
              >
                <td className="relative py-3 pl-3">
                  <span aria-hidden="true" className={`absolute inset-y-2 left-0 w-1 rounded-full ${zone(position, total, table.zones)}`} />
                  {position}
                </td>
                <td className="py-3 pr-2">{row.team}</td>
                <td className="py-3 text-center">{row.played}</td>
                {detail && (
                  <>
                    <td className="py-3 text-center">{row.won}</td>
                    <td className="py-3 text-center">{row.drawn}</td>
                    <td className="py-3 text-center">{row.lost}</td>
                    <td className="hidden py-3 text-center sm:table-cell">{row.goalsFor}</td>
                    <td className="hidden py-3 text-center sm:table-cell">{row.goalsAgainst}</td>
                  </>
                )}
                <td className="py-3 text-center">{signed(row.goalDifference)}</td>
                <td className="display py-3 text-center text-lg">{row.points}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

/** Key for the coloured markers; only lists the zones this table uses. */
export function TableKey({ table }: { table: LeagueTableData }) {
  const { promotion, playoffs, relegation } = table.zones;
  if (!promotion && !playoffs && !relegation) return null;
  return (
    <ul className="mt-4 flex flex-wrap gap-x-5 gap-y-2 text-xs text-muted">
      {promotion > 0 && <li className="flex items-center gap-2"><span className="h-3 w-1 rounded-full bg-win" aria-hidden="true" />Promotion</li>}
      {playoffs > promotion && <li className="flex items-center gap-2"><span className="h-3 w-1 rounded-full bg-pike-bright" aria-hidden="true" />Play-offs</li>}
      {relegation > 0 && <li className="flex items-center gap-2"><span className="h-3 w-1 rounded-full bg-loss" aria-hidden="true" />Relegation</li>}
    </ul>
  );
}
