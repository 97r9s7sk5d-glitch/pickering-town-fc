# AGENTS.md: handoff notes for AI coding tools

Static club website for Pickering Town FC. TanStack Start + React 19 + Tailwind v4, prerendered at build time
(`vite.config.ts`: `prerender.crawlLinks`, and query-string URLs are filtered out so they don't overwrite pages).

- Content is data-only in `src/content/*.ts`. Pages in `src/routes/` read from it. Keep copy out of components.
- Design tokens live in `src/styles.css` (`--pike*` blues on a navy `--ink` base). Utilities: `display`, `eyebrow`,
  `pitch-backdrop`, `pike-rule`, `.reveal` (scroll-in, driven by `useRevealOnScroll` in `__root.tsx`).
- Dates: never use `Intl` for anything rendered. Node and browsers disagree ("Sept" vs "Sep"), which breaks
  hydration. Use the helpers in `src/lib/matches.ts` and `src/lib/dates.ts`.
- `/404` is prerendered to `404.html` for static hosts. It logs a harmless hydration warning when served at another URL.
- Verify with `npm run typecheck && npm run build`. The build fails if any crawled page errors.
