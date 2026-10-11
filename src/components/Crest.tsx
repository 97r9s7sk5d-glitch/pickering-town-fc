/**
 * The official club badge (public/badge.webp, and a 160px copy for small sizes). A faint light edge keeps its navy
 * lettering readable on dark pages. `sizes` is roughly how wide it shows, so phones fetch the small copy.
 */
export function Crest({ className = "h-10 w-10", sizes = "64px" }: { className?: string; sizes?: string }) {
  return (
    <img
      src="/badge.webp"
      srcSet="/badge-160.webp 160w, /badge.webp 331w"
      sizes={sizes}
      alt=""
      width={331}
      height={302}
      className={`object-contain [filter:drop-shadow(0_0_1px_rgb(255_255_255/0.9))_drop-shadow(0_0_2px_rgb(255_255_255/0.35))] ${className}`}
    />
  );
}
