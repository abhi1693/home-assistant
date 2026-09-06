const inr = new Intl.NumberFormat("en-IN", {
  style: "currency",
  currency: "INR",
  maximumFractionDigits: 0,
});

const inrCents = new Intl.NumberFormat("en-IN", {
  style: "currency",
  currency: "INR",
});

// Placeholder shown instead of dollar amounts while censor mode is on. The
// backend only serves rescaled values then, so this is cosmetic on top of
// server-side redaction, not the redaction itself.
export const MASK = "•••••";

export function money(v: number, cents = false): string {
  return (cents ? inrCents : inr).format(v);
}

const inrCompact = new Intl.NumberFormat("en-IN", {
  style: "currency",
  currency: "INR",
  notation: "compact",
  maximumFractionDigits: 1,
});

// Axis-friendly short notation: ₹95K, ₹1.2L.
export function moneyCompact(v: number): string {
  return inrCompact.format(v);
}

export function signedMoney(v: number): string {
  return `${v >= 0 ? "+" : ""}${inr.format(v)}`;
}

export function pct(v: number): string {
  if (!isFinite(v)) return "–";
  return `${v >= 0 ? "+" : ""}${(v * 100).toFixed(1)}%`;
}

const yearFormat = new Intl.DateTimeFormat("en-IN", {
  timeZone: "Asia/Kolkata",
  year: "numeric",
});

export function calendarYear(ts: number): string {
  return yearFormat.format(ts);
}

export function shortDate(ts: number, withTime = false, withYear = false): string {
  const d = new Date(ts);
  return d.toLocaleDateString("en-IN", {
    timeZone: "Asia/Kolkata",
    month: "short",
    day: "numeric",
    ...(withYear ? { year: "numeric" as const } : {}),
    ...(withTime ? { hour: "numeric", minute: "2-digit" } : {}),
  });
}
