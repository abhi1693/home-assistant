// Card chrome styles injected into each card's shadow root. Two token sets:
// "netwrth" carries the app's own dark identity; "ha" maps the tokens onto the
// active Home Assistant theme instead — including the theme's card chrome
// (ha-card-* background, border, shadow, backdrop blur), so a glass theme
// makes netwrth cards glass too. Chart chrome (grid, axes, tooltip, the
// total line's accent→green gradient) rides the same tokens; the per-account
// and per-theme series palettes stay fixed so a color keeps meaning something.
export type ThemeMode = "netwrth" | "ha";

const NETWRTH_TOKENS = `
  --nb-bg: #121a27;
  --nb-panel-2: #17202f;
  --nb-border: #223047;
  --nb-text: #e6edf7;
  --nb-muted: #8b9bb4;
  --nb-green: #34d399;
  --nb-red: #f87171;
  --nb-accent: #60a5fa;
  --nb-ink: #7ea8dc;
  --nb-warn: #fbbf24;
  --nb-radius: 12px;
  --nb-font: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
    "Helvetica Neue", Arial, sans-serif;
  --nb-border-width: 1px;
  --nb-shadow: none;
  --nb-backdrop: none;
`;

const HA_TOKENS = `
  --nb-bg: var(--ha-card-background, var(--card-background-color, #fff));
  --nb-panel-2: var(--secondary-background-color, #f0f0f0);
  --nb-border: var(--divider-color, #e0e0e0);
  --nb-text: var(--primary-text-color, #212121);
  --nb-muted: var(--secondary-text-color, #727272);
  --nb-green: var(--success-color, #34d399);
  --nb-red: var(--error-color, #f87171);
  --nb-accent: var(--primary-color, #60a5fa);
  --nb-ink: #4a7cc0;
  --nb-warn: var(--warning-color, #b45309);
  --nb-radius: var(--ha-card-border-radius, 12px);
  --nb-font: var(--ha-card-font-family, var(--primary-font-family, Roboto, sans-serif));
  --nb-border-width: var(--ha-card-border-width, 1px);
  --nb-shadow: var(--ha-card-box-shadow, none);
  --nb-backdrop: var(--ha-card-backdrop-filter, none);
`;

export function cardCss(mode: ThemeMode): string {
  return `
  :host {
    display: block;
    position: relative;
    ${mode === "ha" ? HA_TOKENS : NETWRTH_TOKENS}
  }
  * { box-sizing: border-box; }
  /* Overlay layer: sibling of .card, so it escapes the card's stacking
     context and floats over neighbouring cards. */
  .overlay {
    position: fixed;
    inset: 0;
    width: auto;
    height: auto;
    margin: 0;
    padding: 0;
    border: 0;
    background: transparent;
    overflow: visible;
    z-index: 20;
    pointer-events: none;
    color: var(--nb-text);
    font-family: var(--nb-font);
    font-size: 14px;
  }
  .overlay::backdrop { display: none; }
  .overlay > * { pointer-events: auto; }
  .card {
    position: relative;
    /* Own stacking context so the ambient layer's z-index -1 sits between
       the card background and the content instead of under the page. */
    isolation: isolate;
    background: var(--nb-bg);
    border: var(--nb-border-width) solid var(--nb-border);
    border-radius: var(--nb-radius);
    box-shadow: var(--nb-shadow);
    -webkit-backdrop-filter: var(--nb-backdrop);
    backdrop-filter: var(--nb-backdrop);
    padding: 14px 16px;
    color: var(--nb-text);
    font-family: var(--nb-font);
    font-size: 14px;
  }
  /* Ambient background: the app's canvas effect clipped to the card, plus
     a faint accent wash in the top-right corner. Content stays clickable
     (pointer-events none) and readable (low alpha strokes only). */
  .ambient {
    position: absolute;
    inset: 0;
    z-index: -1;
    border-radius: inherit;
    overflow: hidden;
    pointer-events: none;
  }
  .ambient::after {
    content: "";
    position: absolute;
    inset: 0;
    background: radial-gradient(70% 55% at 100% 0%,
      color-mix(in srgb, var(--nb-accent) 9%, transparent), transparent 70%);
  }
  .ambient canvas {
    display: block;
    width: 100%;
    height: 100%;
    color: var(--nb-accent);
  }
  .head {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    gap: 8px 10px;
    margin-bottom: 10px;
  }
  .head h2 {
    margin: 0;
    font-size: 13px;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    color: var(--nb-muted);
    flex: 1;
    /* Never wrap the title; the toggle group wraps below it instead. */
    white-space: nowrap;
  }
  .muted { color: var(--nb-muted); }
  /* Toggles + lock live in one right-aligned group; margin-left auto keeps it
     pinned to the right edge even when a narrow card wraps it onto its own
     line under the title. */
  .head-right {
    display: flex;
    align-items: center;
    gap: 6px;
    flex-wrap: wrap;
    justify-content: flex-end;
    margin-left: auto;
  }
  .controls { display: flex; gap: 6px; flex-wrap: wrap; justify-content: flex-end; }
  .seg {
    display: inline-flex;
    border: 1px solid var(--nb-border);
    border-radius: 8px;
    overflow: hidden;
  }
  .seg button {
    background: transparent;
    border: none;
    color: var(--nb-muted);
    padding: 4px 9px;
    font-size: 12px;
    cursor: pointer;
    font-family: inherit;
  }
  .seg button.active { background: var(--nb-panel-2); color: var(--nb-text); }
  .lock {
    background: transparent;
    border: 1px solid var(--nb-border);
    border-radius: 8px;
    color: var(--nb-muted);
    width: 34px;
    height: 30px;
    cursor: pointer;
    font-size: 13px;
    line-height: 1;
  }
  .lock:hover { color: var(--nb-text); border-color: var(--nb-muted); }
  .status { text-align: center; padding: 40px 0; color: var(--nb-muted); }
  .panel-loading { pointer-events: none; }
  .panel-loading-refresh {
    position: absolute;
    inset: 0;
    z-index: 2;
    display: grid;
    place-items: center;
    border-radius: inherit;
    overflow: hidden;
    background: color-mix(in srgb, var(--nb-bg) 20%, transparent);
  }
  .loading-indicator {
    display: inline-flex;
    align-items: center;
    gap: 10px;
    padding: 8px 12px;
    border-radius: 24px;
    background: var(--nb-panel-2);
    color: var(--nb-muted);
    font-size: 12px;
  }
  .loading-spinner {
    width: 20px;
    height: 20px;
    flex: 0 0 20px;
    border: 2px solid var(--nb-border);
    border-top-color: var(--nb-accent);
    border-radius: 50%;
    animation: finance-spin 0.8s linear infinite;
  }
  @keyframes finance-spin { to { transform: rotate(360deg); } }
  @media (prefers-reduced-motion: reduce) {
    .loading-spinner { animation: none; }
  }
  .error-box {
    background: rgba(248, 113, 113, 0.12);
    border: 1px solid var(--nb-red);
    color: var(--nb-red);
    border-radius: 8px;
    padding: 8px 12px;
    font-size: 13px;
  }
  .reveal-note { font-size: 11px; color: var(--nb-muted); }

  /* stat card (the web hero, card-sized): one big number, its change as a
     tinted chip, and — uncensored — the composition bar under it. */
  .stat-value {
    font-size: 30px;
    font-weight: 800;
    letter-spacing: -0.02em;
    font-variant-numeric: tabular-nums;
  }
  .stat-delta {
    display: flex;
    align-items: center;
    gap: 8px;
    margin-top: 6px;
    font-size: 12px;
    color: var(--nb-muted);
  }
  .chip {
    display: inline-block;
    padding: 3px 10px;
    border-radius: 999px;
    font-size: 13px;
    font-weight: 600;
    font-variant-numeric: tabular-nums;
    background: color-mix(in srgb, var(--nb-green) 14%, transparent);
    color: var(--nb-green);
  }
  .chip.down {
    background: color-mix(in srgb, var(--nb-red) 14%, transparent);
    color: var(--nb-red);
  }
  .up { color: var(--nb-green); }
  .down { color: var(--nb-red); }
  .comp { margin-top: 14px; display: flex; flex-direction: column; gap: 8px; }
  .comp-bar { display: flex; height: 8px; border-radius: 4px; overflow: hidden; gap: 3px; }
  .comp-bar span { display: block; height: 100%; min-width: 4px; border-radius: 2px; }
  .comp-legend { display: flex; flex-wrap: wrap; gap: 4px 16px; }
  .comp-item {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    font-size: 12px;
    color: var(--nb-muted);
    white-space: nowrap;
  }
  .comp-item b { color: var(--nb-text); font-weight: 600; font-variant-numeric: tabular-nums; }
  .comp-dot { width: 8px; height: 8px; border-radius: 2.5px; flex: none; }
  /* Banner layout: everything on one row. The header keeps its place at
     the left (title) and right (lock), the number and chip sit between,
     and the composition bar takes whatever width is left. */
  .stat-banner { padding: 10px 16px; display: flex; align-items: center; flex-wrap: wrap; gap: 6px 18px; }
  .stat-banner .head { margin: 0; flex: none; display: contents; }
  .stat-banner .head h2 { flex: none; order: 0; }
  .stat-banner .head .head-right { order: 10; margin-left: auto; }
  .stat-banner .stat-value { order: 1; font-size: 24px; }
  .stat-banner .stat-delta { order: 2; margin-top: 0; }
  .stat-banner .comp { order: 3; flex: 1 1 260px; margin-top: 0; gap: 5px; min-width: 200px; }
  .stat-banner .status, .stat-banner .error-box { order: 1; flex: 1; padding: 6px 0; }

  /* accounts card */
  .account-groups { display: grid; gap: 22px; margin-top: 18px; }
  .account-group h3 {
    display: flex; align-items: center; gap: 8px; margin: 0 0 10px;
    color: var(--nb-muted); text-transform: uppercase; font-size: 11px;
    font-weight: 500; letter-spacing: 0.08em;
  }
  .account-group h3 span { border: 1px solid var(--nb-border); border-radius: 5px; padding: 2px 5px; }
  .account-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(min(100%, 280px), 1fr)); gap: 10px; }
  .account-item { min-width: 0; padding: 14px; border: 1px solid var(--nb-border); border-radius: 10px; }
  .account-figures { display: flex; align-items: baseline; justify-content: space-between; gap: 8px; margin-top: 12px; }
  .account-balance { font-size: 17px; font-weight: 600; font-variant-numeric: tabular-nums; }
  .row-delta { font-size: 12px; white-space: nowrap; font-variant-numeric: tabular-nums; }
  .dot {
    display: inline-block;
    width: 7px;
    height: 7px;
    border-radius: 50%;
    margin-right: 7px;
    background: var(--nb-green);
  }
  .dot.stale { background: var(--nb-warn); }
  .name-cell { display: flex; align-items: center; gap: 10px; min-width: 0; }
  .name-cell .dot { margin: 0; flex: none; }
  .name-text { min-width: 0; font-size: 13px; line-height: 1.4; overflow-wrap: anywhere; }
  .name-text .muted { font-size: 11px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
  /* Institution monogram: the web's account-card tile, row-sized. */
  .mono {
    width: 28px;
    height: 28px;
    border-radius: 8px;
    flex: none;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    font-size: 12px;
    font-weight: 700;
    color: #fff;
    background: linear-gradient(135deg, var(--mono-a, #3b82f6), var(--mono-b, #2563eb));
  }

  /* pin pad overlay */
  .pin-wrap {
    position: absolute;
    top: 48px;
    right: 12px;
    z-index: 20;
  }
  .pinpad {
    background: var(--nb-bg);
    border: 1px solid color-mix(in srgb, var(--nb-green) 45%, var(--nb-border));
    border-radius: 12px;
    padding: 14px;
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.45),
      0 0 0 1px color-mix(in srgb, var(--nb-green) 18%, transparent),
      0 0 16px color-mix(in srgb, var(--nb-green) 25%, transparent);
  }
  .pin-label {
    text-align: center;
    color: var(--nb-muted);
    font-size: 12px;
    margin-bottom: 10px;
    white-space: nowrap;
  }
  .pin-dots { display: flex; justify-content: center; gap: 10px; margin-bottom: 12px; }
  .pin-dot { width: 10px; height: 10px; border-radius: 50%; border: 1px solid var(--nb-muted); }
  .pin-dot.filled { background: var(--nb-text); border-color: var(--nb-text); }
  .pin-grid { display: grid; grid-template-columns: repeat(3, 48px); gap: 8px; }
  .pin-grid button {
    height: 48px;
    border-radius: 50%;
    border: 1px solid var(--nb-border);
    background: var(--nb-panel-2);
    color: var(--nb-text);
    font-size: 17px;
    cursor: pointer;
    font-family: inherit;
  }
  .pin-grid button:hover { border-color: var(--nb-muted); }
  .pin-grid button:disabled { opacity: 0.5; cursor: default; }
  .pw-err { display: block; margin: 10px 0 0; text-align: center; font-size: 12px; color: var(--nb-red); }
  .pin-footer {
    display: block;
    width: 100%;
    margin-top: 10px;
    background: transparent;
    border: none;
    color: var(--nb-muted);
    font-size: 12px;
    cursor: pointer;
    text-align: center;
    font-family: inherit;
  }
  .pin-footer:hover { color: var(--nb-text); }

  /* ---- spending cards (styles mirror the app's globals.css spend-* set,
     retargeted onto the --nb tokens) ---- */
  .spend-month-label { min-width: 120px; cursor: default; }
  .reporting-month-card, .reporting-month-controls {
    display: flex; align-items: center; gap: 10px; flex-wrap: wrap;
  }
  .reporting-month-card { justify-content: space-between; }
  .reporting-month-card h2 { margin: 0; }
  .month-picker {
    color-scheme: dark; color: var(--nb-text); background: var(--nb-panel-2);
    border: 0; font: inherit; padding: 6px 8px; width: 172px; min-height: 36px;
    box-sizing: border-box;
  }
  .month-picker:focus-visible { outline: 2px solid var(--nb-accent); outline-offset: -2px; }
  .spending-card { container: spending / inline-size; }
  /* Separate the monthly totals from the category comparisons. */
  .spend-stats {
    display: grid; grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: 12px; margin: 20px 0 24px;
  }
  .spend-stat {
    display: flex; flex-wrap: wrap; align-content: start; align-items: baseline; gap: 6px 9px;
    padding: 14px 16px; background: var(--nb-panel-2); border-radius: 10px; min-width: 0;
  }
  .spend-stat-label {
    width: 100%;
    font-size: 11px;
    text-transform: uppercase;
    letter-spacing: 0.08em;
    color: var(--nb-muted);
  }
  .spend-stat-value { font-size: 24px; font-weight: 600; font-variant-numeric: tabular-nums; overflow-wrap: anywhere; }
  .spend-stat .muted { font-size: 12px; }
  .spend-stat-delta { font-size: 11px; }
  .spend-income-trigger { border: 1px solid var(--nb-border); color: var(--nb-text); text-align: left; font-family: inherit; cursor: pointer; }
  .spend-income-trigger:hover { border-color: var(--nb-accent); }
  .spend-income-trigger .spend-stat-label { display: flex; flex-wrap: wrap; justify-content: space-between; gap: 6px; }
  .income-trigger-hint { color: var(--nb-accent); text-transform: none; letter-spacing: normal; }
  .income-breakdown { border: 1px solid var(--nb-border); border-radius: 10px; padding: 16px; margin-bottom: 22px; }
  .income-breakdown-head, .income-group-head { display: flex; justify-content: space-between; align-items: baseline; flex-wrap: wrap; gap: 8px; }
  .income-breakdown-head { margin-bottom: 18px; }
  .income-breakdown-head h3 { margin: 0; font-size: 15px; font-weight: 600; }
  .income-breakdown-head > span { font-size: 12px; }
  .income-breakdown-head strong { margin-left: 6px; color: var(--nb-text); }
  .income-group-head { font-size: 13px; margin-bottom: 8px; }
  .income-source { border-top: 1px solid var(--nb-border); }
  .income-source > summary { display: flex; align-items: center; gap: 10px; min-height: 52px; padding: 10px 0; list-style: none; cursor: pointer; font-size: 13px; }
  .income-source > summary::-webkit-details-marker { display: none; }
  .income-source > summary::before { content: "›"; color: var(--nb-accent); flex: none; }
  .income-source[open] > summary::before { transform: rotate(90deg); }
  .income-source > summary:focus-visible { outline: 2px solid var(--nb-accent); outline-offset: 2px; }
  .income-source-name { flex: 1; min-width: 0; overflow-wrap: anywhere; line-height: 1.5; }
  .income-source-amount { text-align: right; white-space: nowrap; font-variant-numeric: tabular-nums; }
  .income-source-amount small { display: block; font-size: 11px; margin-top: 3px; }
  .income-transactions { padding: 0 10px 8px; background: var(--nb-panel-2); border-radius: 8px; }
  .income-transaction { display: grid; grid-template-columns: minmax(0, 1fr) auto; gap: 12px; padding-top: 10px; font-size: 12px; }
  .income-transaction-description { overflow-wrap: anywhere; line-height: 1.5; }
  .income-transaction-meta { margin-top: 4px; line-height: 1.5; }
  .income-transaction strong { white-space: nowrap; font-variant-numeric: tabular-nums; }

  .spend-themes-split { display: flex; gap: 28px; align-items: flex-start; }
  .spend-breakdown-summary { width: 210px; flex: none; text-align: center; padding: 8px 0; }
  .spend-donut { width: 200px; max-width: 100%; display: block; margin: 0 auto 12px; }
  .spend-category-caption { font-size: 13px; font-weight: 500; }
  .spend-breakdown-summary p { font-size: 12px; line-height: 1.6; margin: 8px 10px; }
  .spend-themes-bars { flex: 1; min-width: 0; }
  .spend-category-grid { display: grid; gap: 6px 22px; }
  .spend-category-entry { min-width: 0; border-bottom: 1px solid var(--nb-border); }
  .spend-category-entry.expanded { grid-column: 1 / -1; }
  .spend-theme-dot {
    display: inline-block;
    width: 8px;
    height: 8px;
    border-radius: 50%;
    flex: none;
    vertical-align: 1px;
  }
  /* Each category gets a complete label, amount and a separate comparison bar. */
  .spend-row {
    display: grid;
    grid-template-columns: minmax(0, 1fr) auto;
    gap: 10px 14px;
    align-items: center;
    width: 100%;
    padding: 12px 8px;
    background: none;
    border: none;
    border-radius: 8px;
    color: var(--nb-text);
    font-size: 13px;
    font-family: inherit;
    cursor: pointer;
    text-align: left;
  }
  .spend-row:hover, .spend-row.open { background: var(--nb-panel-2); }
  .spend-row-label { display: flex; align-items: center; gap: 8px; min-width: 0; line-height: 1.45; }
  .spend-row-label > span:last-child { overflow-wrap: anywhere; }
  .spend-row-bar { height: 5px; border-radius: 4px; overflow: hidden; background: var(--nb-panel-2); }
  .spend-row-fill {
    display: block;
    height: 100%;
    border-radius: 4px;
    background: var(--bar-color, var(--nb-accent));
    min-width: 2px;
  }
  .spend-row-amount { text-align: right; font-weight: 600; font-variant-numeric: tabular-nums; white-space: nowrap; }
  .spend-row-count { text-align: right; font-size: 11px; }
  .spend-show-all {
    display: flex; justify-content: center; align-items: center; gap: 10px; width: 100%; min-height: 44px;
    margin-top: 10px; border: 1px solid var(--nb-border); border-radius: 8px;
    color: var(--nb-accent); background: transparent; cursor: pointer; font: inherit; font-size: 12px;
  }
  .spend-show-all:hover { background: var(--nb-panel-2); }
  .spend-txns { padding: 8px; }
  .spend-txn {
    display: grid;
    grid-template-columns: 52px 18px 1fr 84px;
    gap: 10px;
    align-items: center;
    padding: 4px 0;
    font-size: 12px;
    border-bottom: 1px solid color-mix(in srgb, var(--nb-border) 50%, transparent);
  }
  .spend-txn:last-child { border-bottom: none; }
  .spend-txn-desc { min-width: 0; overflow-wrap: anywhere; line-height: 1.5; }
  .spend-txn-amount { text-align: right; font-variant-numeric: tabular-nums; }
  .spend-txn-logo {
    width: 18px;
    height: 18px;
    border-radius: 50%;
    flex: none;
    object-fit: cover;
    background: var(--nb-panel-2);
  }
  /* Neutral chip; the thin theme-colored ring carries the color system. */
  .spend-txn-initial {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    background: var(--nb-panel-2);
    border: 2px solid var(--nb-border);
    color: var(--nb-text);
    font-size: 10px;
    font-weight: 600;
  }

  /* bills calendar + card cycle */
  .bills-empty { display: flex; align-items: center; gap: 10px; padding: 12px 0 4px; font-size: 13px; color: var(--nb-muted); }
  .bills-empty > span { display: grid; place-items: center; width: 28px; height: 28px; border-radius: 50%; background: var(--nb-panel-2); }
  .spend-cal-svg { width: 100%; height: auto; display: block; }
  .spend-cal-mark { transition: opacity 120ms ease; }
  .spend-strip { display: flex; flex-wrap: wrap; gap: 8px; margin-top: 10px; }
  .spend-strip-item {
    background: var(--nb-panel-2);
    border: 1px solid var(--nb-border);
    border-radius: 999px;
    padding: 4px 12px;
    font-size: 12px;
  }
  .spend-strip-item.lapsed { opacity: 0.55; }
  .spend-card-row { margin-bottom: 12px; }
  .spend-card-head {
    display: flex;
    justify-content: space-between;
    align-items: baseline;
    gap: 8px;
    font-size: 13px;
    margin-bottom: 4px;
  }
  .spend-card-chips { display: flex; gap: 6px; flex-wrap: wrap; margin-bottom: 8px; }
  .spend-card-chip {
    background: none;
    border: 1px solid var(--nb-border);
    border-radius: 999px;
    color: var(--nb-muted);
    font-size: 12px;
    padding: 2px 10px;
    cursor: pointer;
    font-family: inherit;
    opacity: 0.55;
  }
  .spend-card-chip.on {
    color: inherit;
    border-color: color-mix(in srgb, var(--nb-accent) 50%, transparent);
    opacity: 1;
  }
  /* Hover bubble: passive readout that follows the cursor. */
  .spend-hoverbubble {
    position: fixed;
    z-index: 60;
    width: 220px;
    background: var(--nb-panel-2);
    border: 1px solid var(--nb-border);
    border-radius: 10px;
    padding: 10px 12px;
    box-shadow: 0 12px 32px rgba(0, 0, 0, 0.5);
    font-size: 13px;
    pointer-events: none;
  }
  .spend-bubble-title { font-weight: 600; font-size: 14px; }
  .spend-bubble-rows { margin: 8px 0 2px; }
  .spend-bubble-row { display: flex; justify-content: space-between; gap: 12px; padding: 2px 0; }
  .spend-hoverbubble-note { margin-top: 6px; font-size: 11px; line-height: 1.35; }
  /* Finance controls remain usable on phones and keyboard navigation. */
  .seg button, .spend-card-chip { min-height: 36px; }
  button:focus-visible { outline: 2px solid var(--nb-accent); outline-offset: 2px; }
  @container spending (min-width: 1050px) {
    .spend-category-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); }
  }
  @container spending (max-width: 650px) {
    .income-breakdown { padding: 12px; }
    .income-transaction { grid-template-columns: minmax(0, 1fr); gap: 4px; }
    .spend-stats { grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 8px; margin: 16px 0; }
    .spend-stat { padding: 12px; }
    .spend-stat:last-child { grid-column: 1 / -1; align-items: center; }
    .spend-stat:last-child .spend-stat-label { width: auto; margin-right: auto; }
    .spend-stat:last-child .spend-stat-value { font-size: 17px; }
    .spend-stat-value { font-size: 21px; }
    .spend-themes-split { flex-direction: column; gap: 12px; }
    .spend-breakdown-summary { display: grid; grid-template-columns: 130px 1fr; width: 100%; column-gap: 18px; text-align: left; align-items: center; }
    .spend-donut { width: 130px; grid-row: 1 / 3; margin: 0; }
    .spend-category-caption { align-self: end; }
    .spend-breakdown-summary p { margin: 6px 0 0; align-self: start; }
    .spend-themes-bars { width: 100%; }
    .spend-row { padding: 12px 0; gap: 9px; }
    .spend-txn { grid-template-columns: 44px minmax(0, 1fr) auto; gap: 6px; }
    .spend-txn-logo { display: none; }
  }
  @media (max-width: 600px) {
    .head, .head-right { flex-wrap: wrap; }
    .head-right { max-width: 100%; }
    .head { align-items: flex-start; }
    .seg { max-width: 100%; flex-wrap: wrap; }
    .seg button { min-height: 44px; min-width: 34px; }
    .stat-banner { flex-wrap: wrap; }
    .spend-card-head { flex-wrap: wrap; }
    .name-cell { min-width: 0; }
    .name-text { min-width: 0; overflow-wrap: anywhere; }
    .accounts { font-size: 12px; }
  }
  `;
}
