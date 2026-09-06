import { Account, ChartMode } from "./types";

// A view is a lens over the same account set: which accounts belong, whether
// they behave as flows (day-to-day pipes: dollars matter, % is noise) or
// stocks (reservoirs: level and % growth are the story), and which chart
// modes make sense. The dashboard renders whatever the active definition
// says, so recomposing later (separate pages, sections, a single mixed tab)
// means changing these definitions, not the components.
export type ViewKey = "daily" | "invest" | "all";

export type ViewDef = {
  key: ViewKey;
  label: string;
  // flow views show $ only (no % anywhere) and default to net-flow bars
  flow: boolean;
  pick: (a: Account) => boolean;
  modes: ChartMode[];
  defaultMode: ChartMode;
};

export const VIEWS: ViewDef[] = [
  {
    key: "daily",
    label: "Day-to-day",
    flow: true,
    pick: (a) => a.kind === "cash" || a.kind === "credit",
    modes: ["flow", "total", "stacked"],
    defaultMode: "flow",
  },
  {
    key: "invest",
    label: "Investments",
    flow: false,
    pick: (a) => a.kind === "investment",
    modes: ["total", "stacked", "category"],
    defaultMode: "total",
  },
  {
    key: "all",
    label: "Everything",
    flow: false,
    pick: () => true,
    modes: ["total", "stacked", "category"],
    defaultMode: "total",
  },
];
