import { useMemo, useSyncExternalStore } from "react";
import { currentMonth, FIRST_REPORTING_MONTH } from "../cards/spendingCommon";
import { Hass } from "./ha";

function createMonthStore() {
  let month = currentMonth();
  const listeners = new Set<() => void>();
  return {
    snapshot: () => month,
    subscribe: (listener: () => void) => {
      listeners.add(listener);
      return () => { listeners.delete(listener); };
    },
    select: (next: string) => {
      if (!/^\d{4}-(0[1-9]|1[0-2])$/.test(next) || next < FIRST_REPORTING_MONTH || next > currentMonth() || next === month) return;
      month = next;
      for (const listener of listeners) listener();
    },
  };
}

// Separate React roots share only a month, scoped to this HA connection,
// account and configured group. Nothing is stored in HA or browser storage.
const groups = new WeakMap<Hass["connection"], Map<string, ReturnType<typeof createMonthStore>>>();

export function useReportingMonth(hass: Hass, group?: string) {
  const store = useMemo(() => {
    if (!group) return createMonthStore();
    let connectionGroups = groups.get(hass.connection);
    if (!connectionGroups) groups.set(hass.connection, connectionGroups = new Map());
    const key = JSON.stringify([hass.user?.id, group]);
    let shared = connectionGroups.get(key);
    if (!shared) connectionGroups.set(key, shared = createMonthStore());
    return shared;
  }, [hass.connection, hass.user?.id, group]);
  return [useSyncExternalStore(store.subscribe, store.snapshot), store.select] as const;
}
