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
    min-width: 0;
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
    min-width: 0;
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

  /* Net worth: balance first, then a signed account breakdown. */
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
  .stat-card .head { margin-bottom: 8px; }
  .stat-banner { padding: 20px 22px; }
  .worth-summary { display: grid; gap: 22px; }
  .stat-banner .worth-summary { grid-template-columns: minmax(250px, .8fr) minmax(0, 1.6fr); align-items: center; gap: 30px; }
  .stat-banner .stat-value { font-size: 34px; line-height: 1.3; }
  .stat-card .stat-delta { flex-wrap: wrap; gap: 6px 10px; margin-top: 10px; }
  .change-explainer { cursor: help; font-family: inherit; border: 1px solid transparent; min-height: 36px; }
  .change-explainer:hover { border-color: currentColor; }
  .worth-breakdown { min-width: 0; }
  .stat-banner .worth-breakdown { border-left: 1px solid var(--nb-border); padding-left: 26px; }
  .worth-breakdown-heading { color: var(--nb-muted); font-size: 12px; margin: 0 0 10px 22px; }
  .worth-equation { display: flex; gap: 12px; }
  .worth-term { flex: 1; min-width: 0; display: flex; align-items: center; gap: 6px; --worth-color: var(--nb-accent); }
  .worth-investments { --worth-color: #a78bfa; }
  .worth-other { --worth-color: #34d399; }
  .worth-negative { --worth-color: var(--nb-red); }
  .worth-operator { flex: 0 0 16px; text-align: center; font-size: 21px; color: var(--nb-muted); }
  .worth-negative .worth-operator { color: var(--nb-red); }
  .worth-component { appearance: none; width: 100%; min-width: 0; background: transparent; color: var(--nb-text); border: 1px solid transparent; border-radius: 9px; padding: 10px 8px; text-align: left; font-family: inherit; cursor: pointer; }
  .worth-component:hover { background: var(--nb-panel-2); border-color: var(--nb-border); }
  .worth-component-label { display: flex; align-items: center; gap: 7px; font-size: 12px; color: var(--nb-muted); line-height: 1.4; }
  .worth-component-label i { width: 6px; height: 6px; border-radius: 50%; background: var(--worth-color); flex: none; }
  .worth-component-value { display: block; margin-top: 7px; font-size: 22px; font-weight: 650; letter-spacing: -.025em; font-variant-numeric: tabular-nums; overflow-wrap: anywhere; }
  .worth-component-detail { display: block; margin-top: 7px; font-size: 11px; color: var(--nb-muted); }
  .worth-component:focus-visible, .change-explainer:focus-visible { outline: 2px solid var(--nb-accent); outline-offset: 3px; }
  .finance-info-tooltip { position: fixed; width: min(380px, calc(100vw - 24px)); max-height: min(520px, calc(100vh - 24px)); overflow-y: auto; padding: 18px; background: var(--nb-panel-2); color: var(--nb-text); border: 1px solid var(--nb-border); border-radius: 12px; box-shadow: 0 12px 38px rgba(0,0,0,.4); font-size: 12px; line-height: 1.6; }
  .finance-info-tooltip h3 { margin: 0 0 8px; font-size: 14px; font-weight: 650; }
  .finance-info-tooltip p { margin: 8px 0 12px; color: var(--nb-muted); }
  .finance-info-tooltip dl { margin: 14px 0 0; }
  .finance-info-tooltip dl > div, .worth-tooltip-total { display: flex; align-items: baseline; justify-content: space-between; gap: 14px; padding: 7px 0; }
  .finance-info-tooltip dt { min-width: 0; color: var(--nb-muted); overflow-wrap: anywhere; }
  .finance-info-tooltip dd { margin: 0; flex: none; font-variant-numeric: tabular-nums; }
  .worth-tooltip-total { border-top: 1px solid var(--nb-border); margin-top: 8px; font-weight: 600; }
  .finance-info-tooltip .worth-formula { padding: 10px 12px; border-radius: 7px; background: var(--nb-bg); color: var(--nb-text); }
  .finance-info-tooltip .worth-change-note { margin-bottom: 0; font-size: 11px; }
  @media (max-width: 1000px) {
    .stat-banner .worth-summary { grid-template-columns: 1fr; gap: 20px; }
    .stat-banner .worth-breakdown { border-left: 0; border-top: 1px solid var(--nb-border); padding: 16px 0 0; }
    .worth-breakdown-heading { margin-left: 0; }
    .worth-term:first-child .worth-operator:empty { display: none; }
  }
  @media (max-width: 500px) {
    .stat-banner { padding: 18px 16px; }
    .stat-banner .stat-value { font-size: 32px; }
    .worth-equation { flex-direction: column; gap: 3px; }
    .worth-term { align-items: center; gap: 4px; }
    .worth-term:first-child .worth-operator:empty { display: block; }
    .worth-component { display: grid; grid-template-columns: 1fr auto; gap: 4px 8px; padding: 10px 6px; }
    .worth-component-value { margin: 0; font-size: 20px; grid-row: span 2; align-self: center; }
    .worth-component-detail { margin: 0 0 0 13px; }
    .worth-component-label { font-size: 12px; }
  }

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
  .investments-card { container: investments / inline-size; }
  .investment-overview { display: grid; grid-template-columns: 160px minmax(150px, .6fr) minmax(0, 1.4fr); align-items: center; gap: 24px; margin: 14px 0; }
  .investment-donut-wrap { position: relative; width: 160px; max-width: 100%; aspect-ratio: 1; }
  .investment-donut { display: block; width: 100%; height: 100%; }
  .investment-donut-total { position: absolute; inset: 30%; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 4px; pointer-events: none; }
  .investment-total { font-size: clamp(13px, 1.7cqw, 20px); white-space: nowrap; font-variant-numeric: tabular-nums; }
  .investment-donut-total > span { font-size: 10px; color: var(--nb-muted); text-align: center; white-space: nowrap; }
  .investment-stats { display: grid; gap: 18px; }
  .investment-stats > div { display: flex; flex-direction: column; gap: 5px; min-width: 0; }
  .investment-stats .spend-stat-label { font-size: 10px; line-height: 1.5; }
  .investment-stats strong { font-size: 21px; font-variant-numeric: tabular-nums; overflow-wrap: anywhere; }
  .investment-recorded { color: var(--nb-green); }
  .investment-pending { color: var(--nb-muted); }
  .investment-allocation { min-width: 0; }
  .investment-provider-list { max-height: 184px; overflow-y: auto; }
  .investment-provider { width: 100%; display: grid; grid-template-columns: 8px minmax(0,1fr) auto 12px; align-items: center; gap: 3px 9px; padding: 8px 10px; border: 1px solid transparent; border-radius: 8px; background: transparent; color: var(--nb-text); font: inherit; font-size: 13px; text-align: left; cursor: pointer; }
  .investment-provider:hover, .investment-provider[aria-expanded="true"] { background: var(--nb-panel-2); border-color: var(--nb-border); }
  .investment-provider:focus-visible, .investment-details-toggle:focus-visible, .investment-details-head button:focus-visible, .investment-remaining-label:focus-visible { outline: 2px solid var(--nb-accent); outline-offset: -2px; }
  .investment-provider-dot { width: 8px; height: 8px; border-radius: 50%; grid-row: 1 / 3; }
  .investment-provider-name { grid-column: 2; overflow-wrap: anywhere; }
  .investment-provider > strong { grid-column: 3; white-space: nowrap; font-variant-numeric: tabular-nums; }
  .investment-provider-meta { grid-column: 2 / 4; font-size: 11px; color: var(--nb-muted); }
  .investment-provider-chevron { grid-column: 4; grid-row: 1 / 3; color: var(--nb-muted); }
  .investment-details-toggle, .investment-details-head button { border: 0; background: transparent; color: var(--nb-accent); font: inherit; font-size: 12px; cursor: pointer; padding: 7px 10px; border-radius: 6px; }
  .investment-payment-details { border: 1px solid var(--nb-border); background: var(--nb-panel-2); border-radius: 10px; padding: 2px 12px 8px; margin: 12px 0; }
  .investment-details-head { display: flex; align-items: center; justify-content: space-between; gap: 12px; padding: 4px 0; font-size: 12px; }
  .investment-list { max-height: 224px; overflow-y: auto; padding-right: 6px; }
  .investment-row { display: grid; grid-template-columns: 84px minmax(0, 1fr) auto; gap: 12px; align-items: center; padding: 8px 0; border-top: 1px solid var(--nb-border); font-size: 12px; }
  .investment-row time { color: var(--nb-muted); }
  .investment-name { overflow-wrap: anywhere; }
  .investment-status { display: block; margin-top: 4px; color: var(--nb-muted); font-size: 11px; }
  .investment-status.recorded { color: var(--nb-green); }
  .investment-row > strong { white-space: nowrap; font-variant-numeric: tabular-nums; }
  .investment-remaining { display: flex; justify-content: space-between; flex-wrap: wrap; gap: 8px 16px; align-items: center; padding-top: 12px; margin-top: 8px; border-top: 1px solid var(--nb-border); }
  .investment-remaining-label { border: 0; background: transparent; color: var(--nb-text); font: inherit; font-size: 12px; font-weight: 600; padding: 4px 0; cursor: pointer; text-align: left; }
  .investment-remaining > strong { font-size: 19px; white-space: nowrap; }
  @container investments (max-width: 600px) {
    .investment-overview { grid-template-columns: 140px minmax(0,1fr); gap: 14px 20px; }
    .investment-donut-wrap { width: 140px; }
    .investment-total { font-size: 16px; }
    .investment-allocation { grid-column: 1 / -1; }
    .investment-provider-list { display: grid; grid-template-columns: repeat(2,minmax(0,1fr)); max-height: 164px; }
  }
  @container investments (max-width: 480px) {
    .investment-overview { grid-template-columns: 130px minmax(0,1fr); gap: 12px; margin: 12px 0; }
    .investment-donut-wrap { width: 130px; }
    .investment-total { font-size: 15px; }
    .investment-stats { gap: 12px; }
    .investment-stats strong { font-size: 19px; }
    .investment-provider-list { display: block; }
    .investment-provider { padding: 7px 4px; font-size: 12px; }
    .investment-row { grid-template-columns: 62px minmax(0, 1fr) auto; gap: 8px; font-size: 11px; }
    .investment-remaining > strong { font-size: 18px; }
  }
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
  .spend-category-grid { display: grid; gap: 6px 22px; align-items: start; }
  .spend-category-entry { min-width: 0; border-bottom: 1px solid var(--nb-border); }
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
  .spend-txn-category { display: block; margin-top: 2px; font-size: 10px; }
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

  .reporting-period-card { display: block; }
  .period-selector-top, .period-trend-head { display: flex; justify-content: space-between; align-items: center; gap: 16px; flex-wrap: wrap; }
  .period-controls { margin-top: 16px; justify-content: flex-start; }
  .period-controls select, .period-controls input[type="date"] { font: inherit; font-size: 13px; color: var(--nb-text); background: var(--nb-panel-2); border: 1px solid var(--nb-border); border-radius: 7px; padding: 9px 12px; min-height: 38px; color-scheme: dark; }
  .period-controls select:focus-visible, .period-controls input:focus-visible { outline: 2px solid var(--nb-accent); }
  .period-controls option { background: var(--nb-panel); }
  .period-year-nav select { border: 0; }
  .period-compare-select, .period-custom label { display: flex; align-items: center; gap: 10px; color: var(--nb-muted); font-size: 12px; }
  .period-compare-select { margin-left: auto; }
  .period-custom { display: flex; gap: 12px; align-items: center; flex-wrap: wrap; }
  .period-apply { background: var(--nb-panel-2); color: var(--nb-text); border: 1px solid var(--nb-border); border-radius: 7px; padding: 10px 14px; cursor: pointer; }
  .period-apply:disabled { opacity: .45; }
  .period-context { display: flex; flex-wrap: wrap; gap: 6px 20px; font-size: 12px; color: var(--nb-muted); border-top: 1px solid var(--nb-border); margin-top: 14px; padding-top: 12px; }
  .period-trend { margin: 22px 0; padding: 18px 0 8px; border-top: 1px solid var(--nb-border); border-bottom: 1px solid var(--nb-border); }
  .period-trend h3 { margin: 0; font-size: 13px; font-weight: 600; }
  .period-legend { display: flex; align-items: center; flex-wrap: wrap; gap: 8px 20px; color: var(--nb-muted); font-size: 11px; margin: 14px 0 10px; }
  .period-legend span { display: inline-flex; align-items: center; gap: 7px; }
  .period-legend i { width: 8px; height: 8px; border-radius: 3px; display: inline-block; }
  .period-total-comparison { display: flex; flex-wrap: wrap; gap: 6px 12px; font-size: 12px; color: var(--nb-muted); margin-top: 8px; }
  .period-total-comparison strong { color: var(--nb-text); }
  .period-trend-scroll { overflow-x: auto; width: 100%; max-width: 100%; contain: inline-size; }
  .period-scroll-hint { display: none; }
  .period-detail-list { max-height: 320px; overflow-y: auto; padding-right: 8px; }
  .period-detail-list .investment-row { grid-template-columns: 92px minmax(0,1fr) auto; }
  .spend-comparison { grid-column: 1 / -1; display: grid; grid-template-columns: minmax(0,1fr) auto; gap: 14px; align-items: center; color: var(--nb-muted); }
  .spend-comparison small { font-size: 10px; }
  .spend-comparison .spend-row-bar { height: 3px; }
  .history-comparison-tooltip { background: var(--nb-panel-2); border: 1px solid var(--nb-border); border-radius: 8px; padding: 8px 14px; font-size: 12px; }
  .history-comparison-tooltip p { display: flex; gap: 18px; justify-content: space-between; }
  .worth-year-comparison { display: flex; flex-wrap: wrap; gap: 7px; color: var(--nb-muted); font-size: 11px; margin-top: 10px; }
  .worth-year-comparison strong { color: #fbbf24; }
  .account-sparkline { display: block; width: 100%; height: 46px; margin-top: 12px; }
  .account-comparison { display: flex; justify-content: space-between; gap: 10px; font-size: 11px; margin-top: 8px; color: var(--nb-muted); }
  .account-comparison strong { color: #fbbf24; }
  @media(max-width:600px) {
    .period-scroll-hint { display: block; font-size: 11px; color: var(--nb-muted); margin: 5px 0; }
    .period-selector-top { align-items: flex-start; }
    .period-modes { display: grid; grid-template-columns: 1fr 1fr; width: 100%; }
    .period-modes button { font-size: 12px; }
    .period-compare-select { margin-left: 0; flex-wrap: wrap; width: 100%; justify-content: space-between; }
    .period-custom label { width: 100%; justify-content: space-between; }
    .period-custom input { min-width: 0; max-width: 220px; }
    .period-trend-head .seg { width: 100%; }
    .period-detail-list .investment-row { grid-template-columns: 66px minmax(0,1fr) auto; font-size: 12px; }
  }
  `;
}
