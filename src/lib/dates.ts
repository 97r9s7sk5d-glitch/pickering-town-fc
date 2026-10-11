import { monthName } from "@/lib/matches";

/** "22 September 2026" from "2026-09-22", identical on the build server and in the browser. */
export function formatDate(iso: string) {
  const [y, m, d] = iso.split("-").map(Number);
  return `${d} ${monthName(m - 1)} ${y}`;
}

/**
 * The UTC offset for a UK local time like "2026-10-03T15:00": "+01:00" in British Summer Time (from 1am GMT on the
 * last Sunday in March to 1am GMT on the last Sunday in October), otherwise "+00:00". Worked out by hand, not with
 * Intl, so it's the same on the build server and in the browser.
 */
export function ukOffset(local: string) {
  const [y, mo, d, h, mi] = local.split(/[-T:]/).map(Number);
  const lastSunday = (month: number) => {
    const last = new Date(Date.UTC(y, month + 1, 0));
    return last.getUTCDate() - last.getUTCDay();
  };
  const t = Date.UTC(y, mo - 1, d, h, mi);
  const start = Date.UTC(y, 2, lastSunday(2), 1);
  const end = Date.UTC(y, 9, lastSunday(9), 2); // 1am GMT is 2am BST, local time
  return t >= start && t < end ? "+01:00" : "+00:00";
}
