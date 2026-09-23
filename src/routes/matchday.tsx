import { createFileRoute } from "@tanstack/react-router";
import { Bus, Car, MapPin, Train, Beer, Accessibility } from "lucide-react";
import { NextMatchPanel } from "@/components/matches";
import { Card, Container, PageHeader, SectionHeading } from "@/components/ui";
import { admission, club, ground } from "@/content/club";
import { fixtures } from "@/lib/matches";
import { groundTour } from "@/content/squad";
import { GroundFlyover } from "@/components/GroundFlyover";
import { seo } from "@/lib/seo";

export const Route = createFileRoute("/matchday")({
  head: () =>
    seo({
      title: "Matchday at Mill Lane",
      path: "/matchday",
      description: `Visiting ${ground.name}, home of ${club.name}: address and map, admission prices, directions by car, train and bus, and the clubhouse.`,
    }),
  component: MatchdayPage,
});

const travel = [
  {
    icon: Car,
    title: "By car",
    text: "Pickering sits on the A170 between Thirsk and Scarborough. From York, take the A64 towards Scarborough, then the A169 at Malton.",
  },
  {
    icon: Train,
    title: "By train",
    text: "The nearest mainline station is Malton, on the York to Scarborough line, around nine miles away. The North Yorkshire Moors Railway also runs into Pickering.",
  },
  {
    icon: Bus,
    title: "By bus",
    text: "Coastliner 840 (Leeds, York, Malton, Pickering, Whitby) stops in the town centre. Check the timetable for matchday times.",
  },
];

function MatchdayPage() {
  const nextHome = fixtures().find((m) => m.venue === "H");

  return (
    <>
      <PageHeader eyebrow="Visit us" title={`Matchday at ${ground.name}`}>
        Everything you need for a game at the home of the Pikes.
      </PageHeader>

      <Container className="mt-12 grid gap-6 lg:grid-cols-[1fr_1.1fr]">
        <Card className="overflow-hidden">
          <GroundFlyover shots={groundTour} />
          <div className="p-6 sm:p-8">
          <p className="eyebrow text-pike-bright">The ground</p>
          <h2 className="display mt-2 text-5xl">{ground.name}</h2>
          <address className="mt-4 flex gap-2 not-italic leading-relaxed text-fg/90">
            <MapPin className="mt-1 h-5 w-5 shrink-0 text-pike-bright" aria-hidden="true" />
            <span>
              {ground.addressLines.join(", ")}
              <br />
              {ground.postcode}
            </span>
          </address>
          <dl className="mt-6 grid grid-cols-2 gap-3">
            <div className="rounded-xl border border-line bg-ink/40 p-4">
              <dt className="eyebrow !text-[11px] text-muted">Capacity</dt>
              <dd className="display mt-1 text-2xl">{ground.capacity}</dd>
            </div>
            <div className="rounded-xl border border-line bg-ink/40 p-4">
              <dt className="eyebrow !text-[11px] text-muted">Seats</dt>
              <dd className="display mt-1 text-2xl">{ground.seats}</dd>
            </div>
            <div className="col-span-2 rounded-xl border border-line bg-ink/40 p-4">
              <dt className="eyebrow !text-[11px] text-muted">Main stand</dt>
              <dd className="display mt-1 text-2xl">
                {ground.stand} <span className="text-muted">({ground.standOpened})</span>
              </dd>
            </div>
          </dl>
          <a
            href={ground.mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="eyebrow mt-6 inline-flex items-center gap-2 rounded-full bg-pike px-6 py-3 text-white hover:bg-pike-bright hover:text-ink"
          >
            <MapPin className="h-4 w-4" aria-hidden="true" /> Open in Maps
          </a>
          </div>
        </Card>
        {nextHome ? (
          <div>
            <p className="eyebrow mb-3 text-muted">Next home game</p>
            <NextMatchPanel match={nextHome} />
          </div>
        ) : null}
      </Container>

      <Container className="mt-20 grid gap-10 lg:grid-cols-2">
        <section>
          <SectionHeading eyebrow="On the gate" title="Admission" />
          <table className="w-full text-left">
            <caption className="sr-only">Admission prices</caption>
            <tbody>
              {admission.map((a) => (
                <tr key={a.label} className="border-b border-line">
                  <th scope="row" className="py-4 font-semibold">
                    {a.label}
                    {a.note && <span className="block text-sm font-normal text-muted">{a.note}</span>}
                  </th>
                  <td className="display tabular py-4 text-right text-3xl">{a.price}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <p className="mt-4 text-sm text-muted">Prices are for league games. Cup-tie prices can differ.</p>
        </section>
        <section>
          <SectionHeading eyebrow="At the ground" title="Facilities" />
          <ul className="space-y-4">
            <li className="flex gap-4 rounded-2xl border border-line bg-surface/70 p-5">
              <Beer className="h-6 w-6 shrink-0 text-pike-bright" aria-hidden="true" />
              <div>
                <h3 className="font-semibold">Clubhouse</h3>
                <p className="mt-1 text-sm leading-relaxed text-muted">
                  The {ground.clubhouse} clubhouse is at the ground: the place to meet before the game and talk it over
                  after.
                </p>
              </div>
            </li>
            <li className="flex gap-4 rounded-2xl border border-line bg-surface/70 p-5">
              <Accessibility className="h-6 w-6 shrink-0 text-pike-bright" aria-hidden="true" />
              <div>
                <h3 className="font-semibold">Accessibility</h3>
                <p className="mt-1 text-sm leading-relaxed text-muted">
                  If you have access needs, contact the club before your visit and we'll help you plan your day.
                </p>
              </div>
            </li>
          </ul>
        </section>
      </Container>

      <Container className="mt-20">
        <SectionHeading eyebrow="Getting here" title="Travel" />
        <div className="grid gap-4 md:grid-cols-3">
          {travel.map(({ icon: Icon, title, text }) => (
            <div key={title} className="reveal rounded-2xl border border-line bg-surface/70 p-6">
              <Icon className="h-7 w-7 text-pike-bright" aria-hidden="true" />
              <h3 className="display mt-4 text-3xl">{title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">{text}</p>
            </div>
          ))}
        </div>
      </Container>
    </>
  );
}
