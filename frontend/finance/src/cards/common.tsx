import { PeriodQuery, ReportPeriod } from "../lib/reportingPeriod";
import React, { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { AccountSeries, RangeKey } from "../lib/types";
import {
  Hass,
  Overview,
  fetchOverview,
  fetchSeries,
} from "../lib/ha";
import { AmbientEffect } from "../components/Ambient";

// Every card carries these; specific cards extend it.
export type BaseCardConfig = {
  type: string;
  entry?: string;
  title?: string;
  theme?: "netwrth" | "ha";
  // Ambient canvas behind the content (the web app's background effects).
  // Unset: plexus on the netwrth theme, off when following the HA theme —
  // a card that blends into someone's theme shouldn't bring its own weather.
  background?: AmbientEffect;
  allowed_user_id?: string;
  month_group?: string;
};

// Overlays (chart hover bubbles) must float above neighbouring cards. No
// z-index inside the card can guarantee that: .card is a stacking context
// (for the ambient layer) and so are HA's own grid wrappers. The element host
// provides a `popover="manual"` layer outside .card; Overlay portals into it
// and shows it, which puts it in the browser's top layer — above every
// stacking context on the page, shadow DOM included.
export const OverlayContext = createContext<HTMLElement | null>(null);

export function Overlay({ children }: { children: React.ReactNode }) {
  const el = useContext(OverlayContext);
  useEffect(() => {
    if (!el) return;
    const anyEl = el as HTMLElement & { showPopover?: () => void; hidePopover?: () => void };
    const n = Number(el.dataset.open ?? 0) + 1;
    el.dataset.open = String(n);
    if (n === 1 && anyEl.showPopover) {
      try {
        anyEl.showPopover();
      } catch {
        /* already open, or popover unsupported: the layer still renders in place */
      }
    }
    return () => {
      const left = Number(el.dataset.open ?? 1) - 1;
      el.dataset.open = String(Math.max(0, left));
      if (left <= 0 && anyEl.hidePopover) {
        try {
          anyEl.hidePopover();
        } catch {
          /* already hidden */
        }
      }
    };
  }, [el]);
  return el ? createPortal(children, el) : <>{children}</>;
}

export function ambientEffect(config: BaseCardConfig): AmbientEffect {
  if (config.background) return config.background;
  return config.theme === "ha" ? "off" : "plexus";
}

const REFRESH_MS = 60_000;

export function useChartWidth() {
  const ref = useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState(820);
  useEffect(() => {
    if (!ref.current) return;
    const observer = new ResizeObserver(([entry]) => {
      if (entry.contentRect.width > 0) setWidth(Math.max(280, entry.contentRect.width));
    });
    observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);
  return { ref, width };
}

// Each card owns its request cycle: overview plus its payload, refreshed every
// minute and when a sleeping screen wakes. Retain current figures on refresh;
// a new period clears them until that period's request completes.
//
// fetchData must be referentially stable across renders (useCallback), or
// the card refetches on every render.
export function useNetwrthCore<T>(
  hass: Hass,
  entry: string | undefined,
  fetchData: (hass: Hass, entry: string | undefined, period?: PeriodQuery) => Promise<{ data: T; censored: boolean }>,
  overviewMonth?: PeriodQuery,
  comparePeriod?: ReportPeriod
) {
  const [result, setResult] = useState<{
    source: typeof fetchData; connection: Hass["connection"]; userId?: string;
    entry?: string; month?: PeriodQuery; comparisonKey?: string; tick: number; overview: Overview | null; data: T | null; error: string | null; comparison: T | null; comparisonOverview: Overview | null;
  } | null>(null);
  const [tick, setTick] = useState(0);
  const refresh = useCallback(() => setTick((t) => t + 1), []);
  useEffect(() => {
    let alive = true;
    const identity = { source: fetchData, connection: hass.connection, userId: hass.user?.id, entry, month: overviewMonth, comparisonKey: comparePeriod?.key, tick };
    Promise.all([fetchOverview(hass, entry, overviewMonth), fetchData(hass, entry, overviewMonth),
      comparePeriod ? fetchOverview(hass, entry, comparePeriod) : null,
      comparePeriod ? fetchData(hass, entry, comparePeriod) : null])
      .then(([ov, out, refOverview, refData]) => {
        if (!alive) return;
        if (ov.currency !== "INR" || (refOverview && refOverview.currency !== "INR")) throw new Error("Finance requires INR data");
        setResult({ ...identity, overview: ov, data: out.data, comparison: refData?.data ?? null, comparisonOverview: refOverview, error: null });
      })
      .catch((e) => {
        if (!alive) return;
        setResult({ ...identity, overview: null, data: null, comparison: null, comparisonOverview: null, error: e?.message ?? "Unable to load finance data" });
      });
    const timer = setInterval(refresh, REFRESH_MS);
    const wake = () => { if (document.visibilityState === "visible") refresh(); };
    document.addEventListener("visibilitychange", wake);
    return () => {
      alive = false;
      clearInterval(timer);
      document.removeEventListener("visibilitychange", wake);
    };
  }, [hass.connection, hass.user?.id, entry, fetchData, overviewMonth, comparePeriod, tick, refresh]);
  // Never label the previous month's figures with a newly selected month.
  const current = result?.source === fetchData && result.connection === hass.connection &&
    result.userId === hass.user?.id && result.entry === entry && result.month === overviewMonth && result.comparisonKey === comparePeriod?.key ? result : null;
  // A result settles only its own refresh. Late results cannot stop a newer
  // spinner, and a failed request settles it just like a successful one.
  const loading = !current || current.tick !== tick;
  return { comparison: current?.comparison ?? null, comparisonOverview: current?.comparisonOverview ?? null, overview: current?.overview ?? null, data: current?.data ?? null, masked: false, error: current?.error ?? null, loading, refresh };
}

// The original account-series cycle, now a thin wrapper over the core.
export function useNetwrth(hass: Hass, entry: string | undefined, range: RangeKey, month?: PeriodQuery, comparePeriod?: ReportPeriod) {
  const fetchData = useCallback(
    (h: Hass, e: string | undefined, target: PeriodQuery | undefined = month) =>
      fetchSeries(h, e, range, target).then((se) => ({ data: se.series, censored: se.censored })),
    [range, month]
  );
  const { overview, data, comparison, comparisonOverview, masked, error, loading, refresh } = useNetwrthCore<AccountSeries[]>(
    hass,
    entry,
    fetchData,
    month,
    comparePeriod
  );
  return { overview, series: data, comparisonSeries: comparison, comparisonOverview, masked, error, loading, refresh };
}

export function Segmented<T extends string>({
  options,
  value,
  onChange,
}: {
  options: readonly T[];
  value: T;
  onChange: (v: T) => void;
}) {
  return (
    <span className="seg">
      {options.map((o) => (
        <button key={o} className={o === value ? "active" : ""} onClick={() => onChange(o)}>
          {o}
        </button>
      ))}
    </span>
  );
}

export function useVisibleAccounts(overview: Overview | null) {
  return useMemo(
    () => (overview ? overview.accounts.filter((a) => !a.hidden) : []),
    [overview]
  );
}
