import { useEffect, useRef, useState, type FormEvent } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { AtSign, CheckCircle2, Mail, MapPin, Phone } from "lucide-react";
import { Card, Container, PageHeader } from "@/components/ui";
import { club, contact, ground } from "@/content/club";
import { contactForm } from "@/content/site";
import { seo } from "@/lib/seo";

const topics = {
  general: "General enquiry",
  sponsorship: "Sponsorship",
  playing: "Playing or coaching",
  volunteering: "Volunteering",
  media: "Press and media",
  donation: "Donations",
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
  "mt-1.5 w-full rounded-xl border bg-ink/60 px-4 py-3 text-fg placeholder:text-muted/70 focus:border-pike-bright focus:outline-none";
const fieldOk = "border-line-strong";
const fieldBad = "border-loss";

type Fields = { name: string; email: string; message: string };
type Errors = Partial<Record<keyof Fields, string>>;

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

function validate(f: Fields): Errors {
  const e: Errors = {};
  if (f.name.trim().length < 2) e.name = "Please tell us your name.";
  else if (f.name.length > 100) e.name = "That name is a bit long: 100 characters at most.";
  if (!EMAIL.test(f.email.trim())) e.email = "Please enter a valid email address, like name@example.com.";
  if (f.message.trim().length < 10) e.message = "Please write a little more (at least 10 characters).";
  else if (f.message.length > 3000) e.message = "Please keep your message under 3,000 characters.";
  return e;
}

type Status = "idle" | "sending" | "sent" | "error";

function ContactPage() {
  const { topic = "general" } = Route.useSearch();
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<Status>("idle");
  const startedAt = useRef(Date.now());
  const topicRef = useRef<HTMLSelectElement>(null);
  // The page is prerendered without a query string, so apply ?topic= (e.g. from "Sponsor this player") after load.
  useEffect(() => {
    if (topicRef.current) topicRef.current.value = topics[topic];
  }, [topic]);

  /**
   * Sends the message through Netlify Forms (the form is detected from the prerendered HTML at deploy).
   * Spam protection: a hidden honeypot field bots fill in, a minimum time before submitting, and Netlify's
   * own spam filtering. Bots are shown the normal "sent" message but nothing is delivered.
   */
  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const fields = {
      name: String(data.get("name") ?? ""),
      email: String(data.get("email") ?? ""),
      message: String(data.get("message") ?? ""),
    };
    const found = validate(fields);
    setErrors(found);
    const first = Object.keys(found)[0];
    if (first) {
      form.querySelector<HTMLElement>(`[name="${first}"]`)?.focus();
      return;
    }
    if (data.get("bot-field") || Date.now() - startedAt.current < contactForm.minFillTime) {
      setStatus("sent");
      return;
    }
    setStatus("sending");
    try {
      const res = await fetch("/", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams(data as unknown as Record<string, string>).toString(),
      });
      if (!res.ok) throw new Error(String(res.status));
      form.reset();
      setStatus("sent");
    } catch {
      setStatus("error");
    }
  }

  const err = (k: keyof Fields) =>
    errors[k] ? (
      <span id={`${k}-error`} className="mt-1.5 block text-sm font-normal text-[oklch(0.85_0.12_25)]">
        {errors[k]}
      </span>
    ) : null;
  const aria = (k: keyof Fields) => ({
    "aria-invalid": errors[k] ? true : undefined,
    "aria-describedby": errors[k] ? `${k}-error` : undefined,
  });
  const clear = (k: keyof Fields) => () => errors[k] && setErrors((e) => ({ ...e, [k]: undefined }));

  return (
    <>
      <PageHeader eyebrow="Get in touch" title="Contact">
        Sponsorship, playing, volunteering or anything else: we'd love to hear from you.
      </PageHeader>
      <Container className="mt-12 grid gap-6 lg:grid-cols-[1.3fr_1fr]">
        <Card className="p-6 sm:p-8">
          {status === "sent" ? (
            <div role="status">
              <CheckCircle2 className="h-10 w-10 text-win" aria-hidden="true" />
              <h2 className="display mt-4 text-4xl">Message sent</h2>
              <p className="mt-3 leading-relaxed text-muted">
                Thanks for getting in touch. Someone from the club will reply by email as soon as they can.
              </p>
              <button
                type="button"
                onClick={() => {
                  startedAt.current = Date.now();
                  setStatus("idle");
                }}
                className="mt-6 text-sm font-semibold text-pike-bright hover:text-fg"
              >
                Send another message
              </button>
            </div>
          ) : (
            <form
              name={contactForm.name}
              method="POST"
              data-netlify="true"
              netlify-honeypot="bot-field"
              action="/contact"
              onSubmit={onSubmit}
              noValidate
              className="grid gap-5"
            >
              <input type="hidden" name="form-name" value={contactForm.name} />
              {/* Honeypot: hidden from people, filled in by bots. */}
              <p className="hidden" aria-hidden="true">
                <label>
                  Leave this empty <input name="bot-field" tabIndex={-1} autoComplete="off" />
                </label>
              </p>
              <label className="text-sm font-semibold">
                What's it about?
                <select ref={topicRef} name="topic" defaultValue={topics.general} className={`${field} ${fieldOk}`}>
                  {Object.values(topics).map((label) => (
                    <option key={label} value={label}>
                      {label}
                    </option>
                  ))}
                </select>
              </label>
              <div className="grid gap-5 sm:grid-cols-2">
                <label className="text-sm font-semibold">
                  Your name
                  <input
                    name="name"
                    required
                    maxLength={100}
                    autoComplete="name"
                    onInput={clear("name")}
                    className={`${field} ${errors.name ? fieldBad : fieldOk}`}
                    {...aria("name")}
                  />
                  {err("name")}
                </label>
                <label className="text-sm font-semibold">
                  Email
                  <input
                    name="email"
                    type="email"
                    required
                    maxLength={200}
                    autoComplete="email"
                    inputMode="email"
                    onInput={clear("email")}
                    className={`${field} ${errors.email ? fieldBad : fieldOk}`}
                    {...aria("email")}
                  />
                  {err("email")}
                </label>
              </div>
              <label className="text-sm font-semibold">
                Message
                <textarea
                  name="message"
                  required
                  rows={6}
                  maxLength={3000}
                  onInput={clear("message")}
                  className={`${field} ${errors.message ? fieldBad : fieldOk}`}
                  {...aria("message")}
                />
                {err("message")}
              </label>
              <p className="text-xs leading-relaxed text-muted">
                We'll only use your details to reply to you. See our{" "}
                <Link to="/privacy" className="text-pike-bright underline underline-offset-2">privacy policy</Link>.
              </p>
              <button
                type="submit"
                disabled={status === "sending"}
                className="eyebrow justify-self-start rounded-full bg-pike px-6 py-3 text-white hover:bg-pike-bright hover:text-ink disabled:opacity-60"
              >
                {status === "sending" ? "Sending…" : "Send message"}
              </button>
              {status === "error" && (
                <p role="alert" className="text-sm text-[oklch(0.85_0.12_25)]">
                  Sorry, your message didn't send. Please try again, or message us on{" "}
                  <a href={contact.social[0].url} className="underline" target="_blank" rel="noopener noreferrer">
                    {contact.social[0].label}
                  </a>
                  .
                </p>
              )}
            </form>
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
          <Card className="p-6">
            <h2 className="eyebrow text-muted">Social media</h2>
            <ul className="mt-3 space-y-2">
              {contact.social.map((sc) => (
                <li key={sc.url}>
                  <a href={sc.url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-pike-bright">
                    <AtSign className="h-5 w-5 text-pike-bright" aria-hidden="true" />
                    {sc.label} <span className="text-muted">{sc.handle}</span>
                  </a>
                </li>
              ))}
            </ul>
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
