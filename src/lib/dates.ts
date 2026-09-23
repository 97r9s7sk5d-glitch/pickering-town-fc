import { monthName } from "@/lib/matches";

/** "22 September 2026" from "2026-09-22", identical on the build server and in the browser. */
export function formatDate(iso: string) {
  const [y, m, d] = iso.split("-").map(Number);
  return `${d} ${monthName(m - 1)} ${y}`;
}
