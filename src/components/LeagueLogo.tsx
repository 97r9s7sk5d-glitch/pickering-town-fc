import type { LeagueTableData } from "@/content/tables";

/** A league's logo on a white tile (logos are drawn for white backgrounds), linking to the league's website. */
export function LeagueLogo({ table, className = "h-16" }: { table: LeagueTableData; className?: string }) {
  if (!table.logo) return null;
  return (
    <a
      href={table.source.url}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex shrink-0 rounded-xl bg-white p-1.5 shadow-lg shadow-ink/30 transition-transform hover:scale-105"
    >
      <img src={table.logo.src} alt={table.logo.alt} width={table.logo.width} height={table.logo.height} className={`${className} w-auto`} />
      <span className="sr-only"> (opens in a new tab)</span>
    </a>
  );
}
