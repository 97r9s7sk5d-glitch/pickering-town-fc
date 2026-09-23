/** The official club badge (public/badge.webp). A faint light edge keeps its navy lettering readable on dark pages. */
export function Crest({ className = "h-10 w-10" }: { className?: string }) {
  return (
    <img
      src="/badge.webp"
      alt=""
      width={331}
      height={302}
      className={`object-contain [filter:drop-shadow(0_0_1px_rgb(255_255_255/0.9))_drop-shadow(0_0_2px_rgb(255_255_255/0.35))] ${className}`}
    />
  );
}
