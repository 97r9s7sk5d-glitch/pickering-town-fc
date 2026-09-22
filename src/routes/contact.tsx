import { useState, type FormEvent } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { AtSign, Mail, MapPin, Phone } from "lucide-react";
import { Card, Container, PageHeader } from "@/components/ui";
import { club, contact, ground } from "@/content/club";
import { seo } from "@/lib/seo";

const topics = {
  general: "General enquiry",
  sponsorship: "Sponsorship",
  playing: "Playing or coaching",
  volunteering: "Volunteering",
  media: "Press and media",
} as const;
type Topic = keyof typeof topics;

export const Route = createFileRoute("/contact")({
  validateSearch: (search: Record<string, unknown>): { topic?: Topic } => ({
    topic: typeof search.topic === "string" && search.topic in topics ? (search.topic as Topic) : undefined,
  }),
  head: () =>
    seo({ title: "Contact", path: "/contact", description: `Get in touch with ${club.name}: sponsorship, playing, volunteering and general enquiries.` }),
  component: ContactPage,
});

const field =
  "mt-1.5 w-full rounded-xl border border-line-strong bg-ink/60 px-4 py-3 text-fg placeholder:text-muted/70 focus:border-pike-bright focus:outline-none";

function ContactPage() {
  const { topic = "general" } = Route.useSearch();
  const [sent, setSent] = useState(false);

  /** No server needed: the message opens in the visitor's own email app, addressed to the club. */
  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const subject = `${topics[data.get("topic") as Topic]}: ${data.get("name")}`;
    const body = `${data.get("message")}\n\n${data.get("name")}\n${data.get("email")}`;
    window.location.href = `mailto:${contact.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    setSent(true);
  }

  return (
    <>
      <PageHeader eyebrow="Get in touch" title="Contact">
        Sponsorship, playing, volunteering or anything else: we'd love to hear from you.
      </PageHeader>
      <Container className="mt-12 grid gap-6 lg:grid-cols-[1.3fr_1fr]">
        <Card className="p-6 sm:p-8">
          {contact.email ? (
            <form onSubmit={onSubmit} className="grid gap-5">
              <label className="text-sm font-semibold">
                What's it about?
                <select name="topic" defaultValue={topic} className={field}>
                  {Object.entries(topics).map(([value, label]) => (
                    <option key={value} value={value}>
                      {label}
                    </option>
                  ))}
                </select>
              </label>
              <div className="grid gap-5 sm:grid-cols-2">
                <label className="text-sm font-semibold">
                  Your name
                  <input name="name" required autoComplete="name" className={field} />
                </label>
                <label className="text-sm font-semibold">
                  Email
                  <input name="email" type="email" required autoComplete="email" className={field} />
                </label>
              </div>
              <label className="text-sm font-semibold">
                Message
                <textarea name="message" required rows={6} className={field} />
              </label>
              <button
                type="submit"
                className="eyebrow justify-self-start rounded-full bg-pike px-6 py-3 text-white hover:bg-pike-bright hover:text-ink"
              >
                Send message
              </button>
              {sent && (
                <p role="status" className="text-sm text-muted">
                  Your email app should have opened with the message ready to send. If it didn't, email us at{" "}
                  <a href={`mailto:${contact.email}`} className="text-pike-bright underline">
                    {contact.email}
                  </a>
                  .
                </p>
              )}
            </form>
          ) : (
            <div>
              <h2 className="display text-4xl">Message us</h2>
              <p className="mt-3 leading-relaxed text-muted">
                The quickest way to reach the club is a message on social media. We'll point you to the right person.
              </p>
              <ul className="mt-6 space-y-3">
                {contact.social.map((s) => (
                  <li key={s.url}>
                    <a
                      href={s.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 rounded-xl border border-line-strong p-4 hover:border-pike-bright"
                    >
                      <AtSign className="h-5 w-5 text-pike-bright" aria-hidden="true" />
                      <span className="font-semibold">{s.label}</span>
                      <span className="text-muted">{s.handle}</span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </Card>
        <div className="space-y-4">
          <Card className="p-6">
            <h2 className="eyebrow text-muted">Ground</h2>
            <p className="mt-3 flex gap-2">
              <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-pike-bright" aria-hidden="true" />
              <span>
                {ground.name}, {ground.addressLines.slice(1).join(", ")} {ground.postcode}
              </span>
            </p>
          </Card>
          {(contact.email || contact.phone) && (
            <Card className="space-y-3 p-6">
              <h2 className="eyebrow text-muted">Direct</h2>
              {contact.email && (
                <a href={`mailto:${contact.email}`} className="flex gap-2 hover:text-pike-bright">
                  <Mail className="h-5 w-5 text-pike-bright" aria-hidden="true" /> {contact.email}
                </a>
              )}
              {contact.phone && (
                <a href={`tel:${contact.phone.replace(/\s/g, "")}`} className="flex gap-2 hover:text-pike-bright">
                  <Phone className="h-5 w-5 text-pike-bright" aria-hidden="true" /> {contact.phone}
                </a>
              )}
            </Card>
          )}
        </div>
      </Container>
    </>
  );
}
