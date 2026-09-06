// Kept in the card's own shadow tree, never in the page-level tooltip portal.
export default function PanelLoading({ loading = true, refreshing = false, label }: {
  loading?: boolean;
  refreshing?: boolean;
  label?: string;
}) {
  if (!loading) return null;
  return (
    <div className={`panel-loading ${refreshing ? "panel-loading-refresh" : "status"}`} role="status">
      <span className="loading-indicator">
        <span className="loading-spinner" aria-hidden="true" />
        <span>{label ?? (refreshing ? "Refreshing…" : "Loading…")}</span>
      </span>
    </div>
  );
}
