import type { Day } from "@/data/menu";

export type DemoState = "open" | "closed" | "special-sold-out";

export const DAYS: readonly Day[] = ["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"];

/** Fixed "now" per demo state so the three states are reproducible. Swap for real Lisbon time in production. */
export const DEMO_NOW: Record<DemoState, { day: Day; minutes: number }> = {
  open: { day: "tuesday", minutes: 11 * 60 + 30 },
  "special-sold-out": { day: "tuesday", minutes: 11 * 60 + 30 },
  closed: { day: "monday", minutes: 11 * 60 + 30 },
};

export function parseState(value: string | string[] | undefined): DemoState {
  const v = Array.isArray(value) ? value[0] : value;
  return v === "closed" || v === "special-sold-out" ? v : "open";
}

export const capitalise = (s: string): string => s.charAt(0).toUpperCase() + s.slice(1);

interface Range { open: number; close: number; openLabel: string; closeLabel: string }

function parseRange(text: string): Range | null {
  const m = /(\d{2}):(\d{2})\s*[–-]\s*(\d{2}):(\d{2})/.exec(text);
  if (!m) return null;
  const [, oh = "0", om = "0", ch = "0", cm = "0"] = m;
  return { open: Number(oh) * 60 + Number(om), close: Number(ch) * 60 + Number(cm), openLabel: `${oh}:${om}`, closeLabel: `${ch}:${cm}` };
}

export interface OpenStatus { isOpen: boolean; closesAt?: string; nextOpening?: string }

export function getStatus(hours: Record<Day, string>, day: Day, minutes: number): OpenStatus {
  const today = parseRange(hours[day]);
  if (today && minutes >= today.open && minutes < today.close) return { isOpen: true, closesAt: today.closeLabel };
  if (today && minutes < today.open) return { isOpen: false, nextOpening: `today at ${today.openLabel}` };
  const start = DAYS.indexOf(day);
  for (let i = 1; i <= 7; i++) {
    const nextDay = DAYS[(start + i) % 7];
    const range = nextDay ? parseRange(hours[nextDay]) : null;
    if (nextDay && range) return { isOpen: false, nextOpening: `${i === 1 ? "tomorrow" : capitalise(nextDay)} at ${range.openLabel}` };
  }
  return { isOpen: false };
}

const eur = new Intl.NumberFormat("en-IE", { style: "currency", currency: "EUR" });
export const formatEUR = (n: number): string => eur.format(n);
