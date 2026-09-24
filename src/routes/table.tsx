import { createFileRoute } from "@tanstack/react-router";
import { LeagueTable, TableKey } from "@/components/LeagueTable";
import { FormGuide } from "@/components/matches";
import { Card, Container, PageHeader, SampleNotice } from "@/components/ui";
import { FullTimeEmbed } from "@/components/FullTimeEmbed";
import { club } from "@/content/club";
import { fullTime } from "@/content/fulltime";
import { isPlaceholderTable, tableTitle, tableUpdated } from "@/content/fixtures";
import { form } from "@/lib/matches";
import { seo } from "@/lib/seo";

export const Route = createFileRoute("/table")({
  head: () =>
    seo({
      title: "League table",
      path: "/table",
      description: `The ${tableTitle} table, with ${club.name} highlighted.`,
    }),
  component: TablePage,
});

function TablePage() {
  return (
    <>
      <PageHeader eyebrow={club.step} title="League table">
        {tableTitle}.
      </PageHeader>
      <Container className="mt-10 grid gap-6 lg:grid-cols-[1fr_18rem]">
        <div>
          {fullTime.table ? (
            <FullTimeEmbed snippet={fullTime.table} title={tableTitle} />
          ) : (
            <>
              {isPlaceholderTable && (
                <SampleNotice>
                  Preview: apart from Pickering Town's own record, this table is a placeholder until the club adds the
                  live league table.
                </SampleNotice>
              )}
              <LeagueTable />
              <TableKey />
              <p className="mt-3 text-xs text-muted">Table as at {tableUpdated}.</p>
            </>
          )}
        </div>
        <aside className="space-y-4">
          <Card className="p-6">
            <p className="eyebrow text-muted">Pikes form</p>
            <div className="mt-4">
              <FormGuide items={form()} />
            </div>
          </Card>
          <Card className="p-6 text-sm leading-relaxed text-muted">
            Official tables are published by the{" "}
            <a href="https://www.ncefl.org.uk/tables/" className="text-pike-bright underline underline-offset-2" target="_blank" rel="noopener noreferrer">
              Northern Counties East League
            </a>
            .
          </Card>
        </aside>
      </Container>
    </>
  );
}
