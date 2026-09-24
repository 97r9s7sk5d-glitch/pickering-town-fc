import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, ArrowUpRight, HandCoins, HeartHandshake, Landmark, Mail, Ticket, Trophy, Users } from "lucide-react";
import { AppealProgress } from "@/components/AppealProgress";
import { BankDetails } from "@/components/BankDetails";
import { Card, Container, PageHeader, SectionHeading } from "@/components/ui";
import { admission, club } from "@/content/club";
import { donate } from "@/content/donate";
import { seo } from "@/lib/seo";

export const Route = createFileRoute("/donate")({
  head: () =>
    seo({
      title: "Donate",
      path: "/donate",
      description: `Support ${club.name}, run by volunteers for the town: help keep football at the heart of the Pickering community.`,
    }),
  component: DonatePage,
});

const useIcons = [HeartHandshake, Users, Trophy, Landmark];
const seasonTicket = admission.find((a) => a.label === "Season ticket");

function DonatePage() {
  const { bank, onlineUrl } = donate;
  return (
    <>
      <PageHeader eyebrow="Support the Pikes" title="Donate">
        {donate.intro}
      </PageHeader>

      {donate.appeal && (
        <Container className="mt-12">
          <AppealProgress appeal={donate.appeal} bank={bank} donateHref={onlineUrl || undefined} />
        </Container>
      )}

      <Container className="mt-20">
        <SectionHeading eyebrow="Where it goes" title="How your support helps" />
        <ul className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
          {donate.uses.map((u, i) => {
            const Icon = useIcons[i % useIcons.length];
            return (
              <li key={u.title} className="reveal rounded-2xl border border-line bg-surface/70 p-6">
                <Icon className="h-7 w-7 text-pike-bright" aria-hidden="true" />
                <h3 className="display mt-4 text-2xl">{u.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{u.text}</p>
              </li>
            );
          })}
        </ul>
      </Container>

      <Container className="mt-20">
        <SectionHeading eyebrow="Give" title="How to donate" />
        <div className="grid gap-5 lg:grid-cols-3">
          {onlineUrl && (
            <Card className="reveal flex flex-col p-6 sm:p-8">
              <HandCoins className="h-8 w-8 text-pike-bright" aria-hidden="true" />
              <h3 className="display mt-4 text-3xl">Donate online</h3>
              <p className="mt-2 flex-1 leading-relaxed text-muted">A one-off gift or a regular donation, by card in a couple of minutes.</p>
              <a
                href={onlineUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="eyebrow mt-6 inline-flex items-center gap-2 self-start rounded-full bg-white px-6 py-3 text-ink transition-colors hover:bg-pike-bright"
              >
                Donate now <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                <span className="sr-only">(opens in a new tab)</span>
              </a>
            </Card>
          )}
          {bank && (
            <Card className="reveal p-6 sm:p-8">
              <Landmark className="h-8 w-8 text-pike-bright" aria-hidden="true" />
              <h3 className="display mt-4 text-3xl">Bank transfer</h3>
              <div className="mt-2">
                <BankDetails bank={bank} />
              </div>
            </Card>
          )}
          <Card className={`reveal flex flex-col p-6 sm:p-8 ${!onlineUrl && !bank ? "lg:col-span-2" : ""}`}>
            <Mail className="h-8 w-8 text-pike-bright" aria-hidden="true" />
            <h3 className="display mt-4 text-3xl">{onlineUrl || bank ? "Talk to us" : "Get in touch to donate"}</h3>
            <p className="mt-2 flex-1 leading-relaxed text-muted">
              {onlineUrl || bank
                ? "Thinking of a larger gift, giving in memory of someone, or funding something specific? We'd love to hear from you."
                : "Send us a message and we'll tell you how to give, whether it's a one-off gift, a regular donation, a gift in memory of someone or funding something specific."}
            </p>
            <Link
              to="/contact"
              search={{ topic: "donation" }}
              className="eyebrow mt-6 inline-flex items-center gap-2 self-start rounded-full bg-pike px-6 py-3 text-white hover:bg-pike-bright hover:text-ink"
            >
              Contact the club <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </Card>
          <Card className="reveal flex flex-col p-6 sm:p-8">
            <HeartHandshake className="h-8 w-8 text-pike-bright" aria-hidden="true" />
            <h3 className="display mt-4 text-3xl">On matchday</h3>
            <p className="mt-2 flex-1 leading-relaxed text-muted">
              Come along to Mill Lane and speak to anyone at the club on a matchday.
            </p>
            <Link to="/matchday" className="mt-6 inline-flex items-center gap-1 self-start text-sm font-semibold text-pike-bright hover:text-fg">
              Plan your visit <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </Card>
        </div>
      </Container>

      <Container className="mt-20">
        <SectionHeading eyebrow="Other ways to help" title="Back the club" />
        <ul className="grid gap-5 md:grid-cols-3">
          <li className="reveal rounded-2xl border border-line bg-surface/70 p-6">
            <Ticket className="h-7 w-7 text-pike-bright" aria-hidden="true" />
            <h3 className="display mt-4 text-2xl">Buy a season ticket</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted">
              {seasonTicket ? `${seasonTicket.price} for every home league game.` : "Every home league game."} The simplest way to back
              the Pikes all season.
            </p>
            <Link to="/matchday" className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-pike-bright hover:text-fg">
              Admission prices <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </li>
          <li className="reveal rounded-2xl border border-line bg-surface/70 p-6">
            <HandCoins className="h-7 w-7 text-pike-bright" aria-hidden="true" />
            <h3 className="display mt-4 text-2xl">Sponsor the club</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted">Put your business in front of supporters with a board, a matchday or a player.</p>
            <Link to="/sponsors" className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-pike-bright hover:text-fg">
              Sponsorship <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </li>
          <li className="reveal rounded-2xl border border-line bg-surface/70 p-6">
            <Users className="h-7 w-7 text-pike-bright" aria-hidden="true" />
            <h3 className="display mt-4 text-2xl">Volunteer</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted">Matchday jobs, the pitch, photos and social media: every bit of help counts.</p>
            <Link
              to="/contact"
              search={{ topic: "volunteering" }}
              className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-pike-bright hover:text-fg"
            >
              Offer to help <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </li>
        </ul>
      </Container>
    </>
  );
}
