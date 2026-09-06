import ComparisonHistory from "../components/ComparisonHistory";
import { useReportingPeriod } from "../lib/reportingPeriod";
import PanelLoading from "../components/PanelLoading";
import { useMemo, useState } from "react";
import Chart from "../components/Chart";
import Ambient from "../components/Ambient";
import { Hass } from "../lib/ha";
import { alignSeries } from "../lib/series";
import { ChartMode, RANGES, RangeKey } from "../lib/types";
import { VIEWS, ViewKey } from "../lib/views";
import {
  BaseCardConfig,
  Segmented,
  useNetwrth,
  useVisibleAccounts,
  ambientEffect,
} from "./common";

export type WorthCardConfig = BaseCardConfig & {
  view?: ViewKey;
  mode?: ChartMode;
  range?: RangeKey;
  // Master switch for both selectors (legacy) plus per-selector overrides, so
  // a card can pin mode and/or range via config and hide either toggle.
  show_controls?: boolean;
  show_mode_selector?: boolean;
  show_range_selector?: boolean;
  // Short K/M notation on the y-axis (default on); tooltips stay exact.
  compact?: boolean;
};

// The flagship chart card: the web dashboard's views (day-to-day /
// investments / everything) and chart modes, rendered by the same code.
export default function WorthCard({
  hass,
  config,
}: {
  hass: Hass;
  config: WorthCardConfig;
}) {
  const view = VIEWS.find((v) => v.key === (config.view ?? "all")) ?? VIEWS[2];
  const [range, setRange] = useState<RangeKey>(config.range ?? "6m");
  const [mode, setMode] = useState<ChartMode>(
    config.mode && view.modes.includes(config.mode) ? config.mode : view.defaultMode
  );
  const {period,comparison}=useReportingPeriod(hass,config.month_group);
  const reporting=config.month_group && (period.mode!=="month"||comparison) ? period : undefined;
  const { overview, series, comparisonSeries, comparisonOverview, masked, error, loading } = useNetwrth(hass, config.entry, range, reporting, reporting?comparison:undefined);
  const visible = useVisibleAccounts(overview);
  const accounts = useMemo(() => visible.filter(view.pick), [visible, view]);

  const rows = useMemo(() => {
    if (!series) return [];
    const ids = new Set(accounts.map((a) => a.id));
    return alignSeries(series.filter((s) => ids.has(s.account_id)));
  }, [series, accounts]);

  const showControls = config.show_controls !== false;
  const showMode =
    showControls && !comparison && config.show_mode_selector !== false && view.modes.length > 1;
  const showRange = !reporting && showControls && config.show_range_selector !== false;

  return (
    <div aria-busy={loading} className="card">
      <Ambient effect={ambientEffect(config)} />
      <div className="head">
        <h2>{config.title ?? view.label}</h2>
        <span className="head-right">
          {reporting&&<span className="muted">{period.label}</span>}
          {(showMode || showRange) && (
            <span className="controls">
              {showMode && (
                <Segmented options={view.modes} value={mode} onChange={setMode} />
              )}
              {showRange && <Segmented options={RANGES} value={range} onChange={setRange} />}
            </span>
          )}
        </span>
      </div>
      {error && <div className="error-box">{error}</div>}
      <PanelLoading loading={loading} refreshing={!!overview} />
      {!error && overview && series && rows.length === 0 && (
        <div className="status">No data for this view yet.</div>
      )}
      {!error && overview && series && rows.length > 0 && (
        reporting&&comparison&&comparisonSeries&&comparisonOverview ? <ComparisonHistory rows={rows} accounts={accounts}
          referenceRows={alignSeries(comparisonSeries.filter(s=>comparisonOverview.accounts.some(a=>a.id===s.account_id&&!a.hidden&&view.pick(a))))}
          referenceAccounts={comparisonOverview.accounts.filter(a=>!a.hidden&&view.pick(a))} period={period} comparison={comparison}/> : <Chart
          rows={rows}
          accounts={accounts}
          mode={mode}
          range={reporting?"1y":range}
          masked={masked}
          compact={config.compact !== false}
        />
      )}
    </div>
  );
}
