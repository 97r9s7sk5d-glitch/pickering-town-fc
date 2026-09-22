import { Link } from "@tanstack/react-router";
import { Crest } from "@/components/Crest";
import { navItems } from "@/components/SiteHeader";
import { club, contact, ground } from "@/content/club";

export function SiteFooter() {
  return (
    <footer className="mt-24 border-t border-line bg-night">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-[1.4fr_1fr_1fr]">
        <div>
          <div className="flex items-center gap-3">
            <Crest className="h-16 w-auto" />
            <div>
              <p className="display text-3xl">{club.name}</p>
              <p className="eyebrow text-pike-bright">{club.nickname} · Est. {club.founded}</p>
            </div>
          </div>
          <p className="mt-5 max-w-sm text-sm leading-relaxed text-muted">
            {club.league}. Home games at {ground.name}, {club.town}.
          </p>
        </div>
        <div>
          <h2 className="eyebrow text-muted">Explore</h2>
          <ul className="mt-4 grid grid-cols-2 gap-x-6 gap-y-2 text-sm">
            {[...navItems.slice(1), { to: "/contact" as const, label: "Contact" }].map((item) => (
              <li key={item.label}>
                <Link to={item.to} className="text-fg/90 hover:text-pike-bright">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h2 className="eyebrow text-muted">Find us</h2>
          <address className="mt-4 text-sm not-italic leading-relaxed text-fg/90">
            {ground.addressLines.join(", ")}
            <br />
            {ground.postcode}
          </address>
          <ul className="mt-4 space-y-1 text-sm">
            {contact.social.map((s) => (
              <li key={s.url}>
                <a href={s.url} target="_blank" rel="noopener noreferrer" className="text-fg/90 hover:text-pike-bright">
                  {s.label} <span className="text-muted">{s.handle}</span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="border-t border-line">
        <p className="mx-auto max-w-7xl px-4 py-5 text-xs text-muted sm:px-6">
          © {new Date().getFullYear()} {club.fullName}. Up the Pikes.
        </p>
      </div>
    </footer>
  );
}
