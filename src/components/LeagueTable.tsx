import {
  leagueTable,
  ownTeamName,
  playoffPlaces,
  promotionPlaces,
  relegationPlaces,
  type TableRow,
} from "@/content/fixtures";

function zone(position: number, total: number): string {
  if (position <= promotionPlaces) return "bg-win";
  if (position <= playoffPlaces) return "bg-pike-bright";
  if (position > total - relegationPlaces) return "bg-loss";
  return "bg-transparent";
}

/**
 * The league table. `compact` shows only the rows around Pickering (for the home page) and hides the
 * goal columns; the full version scrolls sideways on small phones rather than squashing.
 */
export function LeagueTable({ compact = false }: { compact?: boolean }) {
  const total = leagueTable.length;
  const ownIndex = leagueTable.findIndex((r) => r.team === ownTeamName);
  let rows: { row: TableRow; position: number }[] = leagueTable.map((row, i) => ({ row, position: i + 1 }));
  if (compact && ownIndex >= 0) {
    const start = Math.max(0, Math.min(ownIndex - 2, total - 5));
    rows = rows.slice(start, start + 5);
  }

  return (
    <div className="-mx-4 overflow-x-auto px-4 sm:mx-0 sm:px-0">
      <table className="w-full min-w-[20rem] border-collapse text-sm">
        <thead>
          <tr className="eyebrow border-b border-line-strong !text-[11px] text-muted">
            <th scope="col" className="w-10 py-3 text-left font-semibold">
              <span className="sr-only">Position</span>#
            </th>
            <th scope="col" className="py-3 text-left font-semibold">Club</th>
            <th scope="col" className="w-10 py-3 text-center font-semibold"><abbr title="Played">P</abbr></th>
            {!compact && (
              <>
                <th scope="col" className="w-10 py-3 text-center font-semibold"><abbr title="Won">W</abbr></th>
                <th scope="col" className="w-10 py-3 text-center font-semibold"><abbr title="Drawn">D</abbr></th>
                <th scope="col" className="w-10 py-3 text-center font-semibold"><abbr title="Lost">L</abbr></th>
                <th scope="col" className="hidden w-12 py-3 text-center font-semibold sm:table-cell"><abbr title="Goals for">F</abbr></th>
                <th scope="col" className="hidden w-12 py-3 text-center font-semibold sm:table-cell"><abbr title="Goals against">A</abbr></th>
              </>
            )}
            <th scope="col" className="w-12 py-3 text-center font-semibold"><abbr title="Goal difference">GD</abbr></th>
            <th scope="col" className="w-12 py-3 text-center font-semibold"><abbr title="Points">Pts</abbr></th>
          </tr>
        </thead>
        <tbody className="tabular">
          {rows.map(({ row, position }) => {
            const own = row.team === ownTeamName;
            const gd = row.goalsFor - row.goalsAgainst;
            return (
              <tr
                key={row.team}
                className={`border-b border-line ${own ? "bg-pike/20 font-semibold text-white" : "text-fg/90"}`}
                aria-current={own ? "true" : undefined}
              >
                <td className="relative py-3 pl-3">
                  <span aria-hidden="true" className={`absolute inset-y-2 left-0 w-1 rounded-full ${zone(position, total)}`} />
                  {position}
                </td>
                <td className="py-3 pr-2">{row.team}</td>
                <td className="py-3 text-center">{row.played}</td>
                {!compact && (
                  <>
                    <td className="py-3 text-center">{row.won}</td>
                    <td className="py-3 text-center">{row.drawn}</td>
                    <td className="py-3 text-center">{row.lost}</td>
                    <td className="hidden py-3 text-center sm:table-cell">{row.goalsFor}</td>
                    <td className="hidden py-3 text-center sm:table-cell">{row.goalsAgainst}</td>
                  </>
                )}
                <td className="py-3 text-center">{gd > 0 ? `+${gd}` : gd}</td>
                <td className="display py-3 text-center text-lg">{row.points}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export function TableKey() {
  return (
    <ul className="mt-4 flex flex-wrap gap-x-5 gap-y-2 text-xs text-muted">
      <li className="flex items-center gap-2"><span className="h-3 w-1 rounded-full bg-win" aria-hidden="true" />Promotion</li>
      <li className="flex items-center gap-2"><span className="h-3 w-1 rounded-full bg-pike-bright" aria-hidden="true" />Play-offs</li>
      <li className="flex items-center gap-2"><span className="h-3 w-1 rounded-full bg-loss" aria-hidden="true" />Relegation</li>
    </ul>
  );
}
