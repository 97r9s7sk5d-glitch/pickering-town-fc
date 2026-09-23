import type { ReactNode } from "react";
import { Link } from "@tanstack/react-router";

export function Centered({ title, text, children }: { title: string; text: string; children: ReactNode }) {
  return (
    <div className="pitch-backdrop flex min-h-[70vh] items-center justify-center px-4">
      <div className="max-w-md text-center">
        <h1 className="display text-6xl sm:text-7xl">{title}</h1>
        <p className="mt-4 text-muted">{text}</p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">{children}</div>
      </div>
    </div>
  );
}

export const button = "eyebrow inline-flex items-center rounded-full bg-pike px-5 py-2.5 text-white hover:bg-pike-bright hover:text-ink";

export function NotFound() {
  return (
    <Centered title="Offside!" text="That page doesn't exist or has moved. Let's get you back in play.">
      <Link to="/" className={button}>Home</Link>
      <Link to="/fixtures" className={button}>Fixtures</Link>
    </Centered>
  );
}

