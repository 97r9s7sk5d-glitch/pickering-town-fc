import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { Crest } from "@/components/Crest";
import { inProgressTeams, type TeamId } from "@/content/fixtures";
import { juniorTeam, seniorTeams, type TeamPhoto } from "@/content/teams";
import { formatDay, formatTime, homeAway, nextMatch, kickoffDate, venueLabel } from "@/lib/matches";

type CardTeam = { id: TeamId; name: string; league: string; photo?: TeamPhoto & { focus: string } };

const cards: CardTeam[] = [
  ...seniorTeams.map((t) => ({ id: t.id, name: t.name, league: t.league, photo: t.photo })),
  { id: "u18", name: juniorTeam.name, league: "Juniors" },
];

/** Home page: one card per team, with its photo and next game. */
export function TeamCards() {
  return (
    <div className="grid gap-5 md:grid-cols-3">
      {cards.map((t) => {
        const next = nextMatch(t.id);
        const inProgress = inProgressTeams.includes(t.id);
        return (
          <Link
            key={t.id}
            to="/fixtures"
            search={{ team: t.id }}
            className="reveal group flex flex-col overflow-hidden rounded-2xl border border-line bg-surface/70 transition-colors hover:border-pike-bright"
          >
            <div className="relative aspect-[16/10] overflow-hidden">
              {t.photo ? (
                <img
                  src={t.photo.src}
                  alt={t.photo.alt}
                  width={t.photo.width}
                  height={t.photo.height}
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  style={{ objectPosition: t.photo.focus }}
                  loading="lazy"
                />
              ) : (
                <DemoTeamPhoto label={juniorTeam.age} />
              )}
              <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-ink via-ink/20 to-transparent" />
              <p className="display absolute bottom-3 left-5 text-4xl text-white drop-shadow">{t.name}</p>
            </div>
            <div className="flex flex-1 flex-col p-5">
              <p className="eyebrow !text-[11px] text-muted">{t.league}</p>
              <p className="eyebrow mt-4 text-pike-bright">Next game</p>
              {next ? (
                <>
                  <p className="mt-1 font-semibold text-fg">
                    {homeAway(next).home} v {homeAway(next).away}
                  </p>
                  <p className="text-sm text-muted">
                    {formatDay(kickoffDate(next))} · <span className="tabular">{formatTime(next)}</span> · {venueLabel(next)}
                  </p>
                </>
              ) : inProgress ? (
                <p className="mt-1 text-muted">Fixtures currently in progress, coming soon</p>
              ) : (
                <p className="mt-1 text-muted">Fixtures coming soon</p>
              )}
              <span className="mt-auto inline-flex items-center gap-1.5 pt-4 text-sm font-semibold text-pike-bright group-hover:text-fg">
                Fixtures & results <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
              </span>
            </div>
          </Link>
        );
      })}
    </div>
  );
}

/** Stand-in until the club has a team photo: pitch stripes, the badge and the age group. */
function DemoTeamPhoto({ label }: { label: string }) {
  return (
    <div
      role="img"
      aria-label={`${label} team photo coming soon`}
      className="flex h-full w-full flex-col items-center justify-center gap-3 bg-[repeating-linear-gradient(90deg,#1f6b33_0_48px,#257a3b_48px_96px)]"
    >
      <Crest className="h-20 w-20" />
      <p className="eyebrow rounded-full bg-ink/60 px-3 py-1 !text-[10px] text-white">Team photo coming soon</p>
    </div>
  );
}
