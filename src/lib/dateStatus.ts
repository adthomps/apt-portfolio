export type StatusBucket = "Recent" | "Scheduled" | "Archived";

// Read from Vite env if provided; fallback to 60
const days = Number(import.meta.env.VITE_RECENT_WINDOW_DAYS || import.meta.env.RECENT_WINDOW_DAYS || 60);
export const RECENT_WINDOW_DAYS = Number.isFinite(days) && days > 0 ? Math.floor(days) : 60;

export const parseDateSafe = (raw: string): number => {
  const trimmed = (raw || "").trim();
  if (!trimmed) return NaN;
  if (/^\d{4}-\d{2}-\d{2}$/.test(trimmed)) return Date.parse(trimmed + "T00:00:00Z");
  if (/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}(:\d{2})?$/.test(trimmed)) return Date.parse(trimmed + "Z");
  const t = Date.parse(trimmed);
  return isNaN(t) ? NaN : t;
};

export const getStatusBucket = (
  iso: string,
  override?: "scheduled" | "published" | "archived"
): StatusBucket => {
  if (override === "scheduled") return "Scheduled";
  if (override === "archived") return "Archived";
  if (override === "published") {
    // Force published -> use date heuristic
  }
  const ts = parseDateSafe(iso);
  if (isNaN(ts)) return "Archived";
  const now = Date.now();
  if (ts > now) return "Scheduled";
  const days = (now - ts) / (1000 * 60 * 60 * 24);
  return days <= RECENT_WINDOW_DAYS ? "Recent" : "Archived";
};
