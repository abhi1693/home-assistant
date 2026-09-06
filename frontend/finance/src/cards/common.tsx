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

// Shared load/refresh cycle: overview (key state + accounts) plus whatever
// payload the card's fetcher pulls, re-pulled every minute and after
// reveal/conceal.
//
// The server is the authority on the reveal window (it re-censors lazily per
// request); the two effects below only make the *display* converge promptly:
// a local deadline drops revealed data the moment the window lapses, and a
// visibility hook refetches when a sleeping screen wakes up instead of
// waiting out a throttled interval.
//
// fetchData must be referentially stable across renders (useCallback), or
// the card refetches on every render.
export function useNetwrthCore<T>(
  hass: Hass,
  entry: string | undefined,
  fetchData: (hass: Hass, entry: string | undefined) => Promise<{ data: T; censored: boolean }>
) {
  const [overview, setOverview] = useState<Overview | null>(null);
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [tick, setTick] = useState(0);
  const refresh = useCallback(() => setTick((t) => t + 1), []);
  useEffect(() => {
    let alive = true;
    Promise.all([fetchOverview(hass, entry), fetchData(hass, entry)])
      .then(([ov, out]) => {
        if (!alive) return;
        if (ov.currency !== "INR") throw new Error("Finance requires INR data");
        setOverview(ov);
        setData(out.data);
        setError(null);
      })
      .catch((e) => {
        if (!alive) return;
        setData(null);
        setOverview(null);
        setError(e?.message ?? "Unable to load finance data");
      });
    const timer = setInterval(refresh, REFRESH_MS);
    const wake = () => { if (document.visibilityState === "visible") refresh(); };
    document.addEventListener("visibilitychange", wake);
    return () => {
      alive = false;
      clearInterval(timer);
      document.removeEventListener("visibilitychange", wake);
    };
  }, [hass.connection, hass.user?.id, entry, fetchData, tick, refresh]);
  return { overview, data, masked: false, error, refresh };
}

// The original account-series cycle, now a thin wrapper over the core.
export function useNetwrth(hass: Hass, entry: string | undefined, range: RangeKey) {
  const fetchData = useCallback(
    (h: Hass, e: string | undefined) =>
      fetchSeries(h, e, range).then((se) => ({ data: se.series, censored: se.censored })),
    [range]
  );
  const { overview, data, masked, error, refresh } = useNetwrthCore<AccountSeries[]>(
    hass,
    entry,
    fetchData
  );
  return { overview, series: data, masked, error, refresh };
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
