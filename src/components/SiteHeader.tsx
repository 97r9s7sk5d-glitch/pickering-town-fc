import { useEffect, useRef, useState } from "react";
import { Link, useRouterState } from "@tanstack/react-router";
import { Menu, X } from "lucide-react";
import { Crest } from "@/components/Crest";
import { RoutePillNav, type NavItem } from "@/components/RoutePillNav";
import { club } from "@/content/club";
import { siteCredit } from "@/content/site";

export const navItems: NavItem[] = [
  { to: "/", label: "Home" },
  { to: "/fixtures", label: "Fixtures" },
  { to: "/table", label: "Table" },
  { to: "/news", label: "News" },
  { to: "/teams", label: "Teams" },
  { to: "/club", label: "Club" },
  { to: "/legends", label: "Legends" },
  { to: "/matchday", label: "Matchday" },
  { to: "/sponsors", label: "Sponsors" },
  { to: "/shop", label: "Shop" },
];

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const headerRef = useRef<HTMLElement>(null);
  // The mobile menu opens just below the header, wherever the header sits (the credit line above it scrolls away).
  const [menuTop, setMenuTop] = useState(69);
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  // Close the mobile menu after navigating, and let Escape close it.
  useEffect(() => setOpen(false), [pathname]);
  useEffect(() => {
    if (!open) return;
    if (headerRef.current) setMenuTop(Math.round(headerRef.current.getBoundingClientRect().bottom));
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
    {siteCredit && (
      <aside aria-label="Website credit" className="bg-black">
        <p className="mx-auto max-w-7xl px-4 py-1 text-[11px] leading-5 sm:px-6">
          {/* Silver on black, The Chairman's colours rather than the club's. */}
          <a href={siteCredit.url} target="_blank" rel="noopener" className="text-[#c0c0c0] transition-colors hover:text-white">
            Website by <span className="font-semibold">{siteCredit.label}</span>
            <span className="sr-only"> (opens in a new tab)</span>
          </a>
        </p>
      </aside>
    )}
    <header ref={headerRef} className="sticky top-0 z-40 border-b border-line bg-ink/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 sm:px-6">
        <Link to="/" className="flex items-center gap-3" aria-label={`${club.name} home`}>
          <Crest className="h-12 w-auto shrink-0" />
          <span className="leading-none">
            <span className="display block text-xl sm:text-2xl">Pickering Town</span>
            <span className="eyebrow block !text-[11px] text-pike-bright">{club.nickname} · Est. {club.founded}</span>
          </span>
        </Link>
        <nav aria-label="Main" className="hidden xl:block">
          <RoutePillNav items={navItems} />
        </nav>
        <div className="hidden items-center gap-2 xl:flex">
          <Link
            to="/donate"
            className="eyebrow inline-flex rounded-full bg-white px-4 py-2 text-ink transition-colors hover:bg-pike-bright"
          >
            Donate
          </Link>
          <Link
            to="/contact"
            className="eyebrow inline-flex rounded-full border border-line-strong px-4 py-2 text-fg transition-colors hover:border-pike-bright hover:text-pike-bright"
          >
            Contact
          </Link>
        </div>
        <button
          type="button"
          onClick={() => setOpen((o) => !o)}
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? "Close menu" : "Open menu"}
          className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-line-strong xl:hidden"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>
    </header>
      {/* Outside <header>: its backdrop blur would otherwise trap this fixed panel inside the header. */}
      {open && (
        <nav
          id="mobile-menu"
          aria-label="Main"
          style={{ top: menuTop }}
          className="animate-rise fixed inset-x-0 bottom-0 z-30 overflow-y-auto border-t border-line bg-ink px-4 pb-10 pt-4 xl:hidden"
        >
          <ul className="flex flex-col">
            {[...navItems, { to: "/donate", label: "Donate" } as NavItem, { to: "/contact", label: "Contact" } as NavItem].map((item) => (
              <li key={item.label} className="border-b border-line">
                <Link
                  to={item.to}
                  activeOptions={{ exact: item.to === "/" }}
                  className="display flex items-center justify-between py-4 text-4xl text-fg data-[status=active]:text-pike-bright"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </>
  );
}
