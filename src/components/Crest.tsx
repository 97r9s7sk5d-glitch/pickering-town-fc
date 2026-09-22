/**
 * Placeholder crest in club colours. Swap for the official badge: drop the file in /public and replace
 * this component's contents with <img src="/crest.svg" alt="" />.
 */
export function Crest({ className = "h-10 w-10" }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 72" className={className} aria-hidden="true">
      <defs>
        <linearGradient id="crest-blue" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="oklch(0.66 0.18 252)" />
          <stop offset="1" stopColor="oklch(0.45 0.18 262)" />
        </linearGradient>
        <clipPath id="crest-shield">
          <path d="M32 2 60 10v24c0 18-12 30-28 36C16 64 4 52 4 34V10Z" />
        </clipPath>
      </defs>
      <g clipPath="url(#crest-shield)">
        <rect width="64" height="72" fill="white" />
        <rect x="0" width="16" height="72" fill="url(#crest-blue)" />
        <rect x="32" width="16" height="72" fill="url(#crest-blue)" />
        <rect y="0" width="64" height="24" fill="oklch(0.14 0.03 262)" />
      </g>
      <path d="M32 2 60 10v24c0 18-12 30-28 36C16 64 4 52 4 34V10Z" fill="none" stroke="white" strokeWidth="2.5" />
      <text x="32" y="19" textAnchor="middle" fontFamily="Barlow Condensed, Arial Narrow, sans-serif" fontWeight="700" fontSize="13" fill="white" letterSpacing="1">
        PTFC
      </text>
      <text x="32" y="52" textAnchor="middle" fontFamily="Barlow Condensed, Arial Narrow, sans-serif" fontWeight="700" fontSize="11" fill="oklch(0.14 0.03 262)" stroke="white" strokeWidth="3" paintOrder="stroke" letterSpacing="1">
        1888
      </text>
    </svg>
  );
}
