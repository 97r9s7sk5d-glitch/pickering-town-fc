import { createFileRoute } from "@tanstack/react-router";
import { LeagueTable, TableKey } from "@/components/LeagueTable";
import { FormGuide } from "@/components/matches";
import { Card, Container, PageHeader, SectionHeading } from "@/components/ui";
import { FullTimeEmbed } from "@/components/FullTimeEmbed";
import { club } from "@/content/club";
import { fullTime } from "@/content/fulltime";
import { firstTeamTable, ladiesTable, type LeagueTableData } from "@/content/tables";
import { form } from "@/lib/matches";
import { seo } from "@/lib/seo";

export const Route = createFileRoute("/table")({
  head: () =>
    seo({
      title: "League tables",
      path: "/table",
      description: `League tables for ${club.name}: the ${firstTeamTable.title} and the ${ladiesTable.title}.`,
    }),
  component: TablePage,
});

const sections: { id: "first" | "ladies"; table: LeagueTableData }[] = [
  { id: "first", table: firstTeamTable },
  { id: "ladies", table: ladiesTable },
];

function TablePage() {
  return (
    <>
      <PageHeader eyebrow="Where we stand" title="League tables">
        The first team in the {firstTeamTable.title.replace(/ \d{4}.*$/, "")} and the ladies in the{" "}
        {ladiesTable.title.replace(/ \d{4}.*$/, "")}.
      </PageHeader>
      <Container className="mt-8">
        <nav aria-label="Tables" className="flex flex-wrap gap-2">
          {sections.map(({ id, table }) => (
            <a
              key={id}
              href={`#${id}`}
              className="eyebrow rounded-full border border-line-strong px-4 py-2 hover:border-pike-bright hover:text-pike-bright"
            >
              {table.label}
            </a>
          ))}
        </nav>
      </Container>
      {sections.map(({ id, table }) => {
        const own = table.rows.findIndex((r) => r.team === table.ownTeam) + 1;
        const live = fullTime.table[id];
        return (
          <Container key={id} className="mt-12 grid gap-6 lg:grid-cols-[1fr_18rem] [&>*]:min-w-0">
            <section id={id} className="scroll-mt-28" aria-labelledby={`${id}-title`}>
              <SectionHeading eyebrow={table.label} title={table.title} titleId={`${id}-title`} />
              {live ? (
                <FullTimeEmbed snippet={live} title={table.title} />
              ) : (
                <>
                  <LeagueTable table={table} />
                  <TableKey table={table} />
                  <p className="mt-3 text-xs text-muted">
                    Table as at {table.updated}. Official table:{" "}
                    <a href={table.source.url} className="text-pike-bright underline underline-offset-2" target="_blank" rel="noopener noreferrer">
                      {table.source.name}
                    </a>
                    .
                  </p>
                </>
              )}
            </section>
            <aside aria-label={`${table.label} summary`} className="space-y-4 lg:pt-24">
              <Card className="p-6">
                <p className="eyebrow text-muted">{table.label} position</p>
                <p className="display mt-2 text-6xl tabular">{own || "–"}</p>
                <p className="text-sm text-muted">of {table.rows.length}</p>
              </Card>
              {id === "first" && (
                <Card className="p-6">
                  <p className="eyebrow text-muted">Pikes form</p>
                  <div className="mt-4">
                    <FormGuide items={form()} />
                  </div>
                </Card>
              )}
            </aside>
          </Container>
        );
      })}
    </>
  );
}
