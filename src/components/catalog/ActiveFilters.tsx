"use client";

interface ActiveFiltersProps {
  /** Whether any filter is active (controls visibility). */
  hasActiveFilters: boolean;
  /** The current filter state summary for display. */
  filterSummary: ActiveFilterChip[];
  /** Called when the user removes a single filter chip. */
  onRemove: (key: string) => void;
  /** Called when the user clicks "Reset all". */
  onReset: () => void;
}

export interface ActiveFilterChip {
  /** Unique key for this chip (e.g. "category-Electronics", "price", "rating"). */
  key: string;
  /** Human-readable label displayed on the chip. */
  label: string;
}

/**
 * ActiveFilters
 *
 * Displays pill-shaped chips for each active filter with smooth dismiss actions
 * and a subtle 'Clear all' button.
 */
export function ActiveFilters({
  hasActiveFilters,
  filterSummary,
  onRemove,
  onReset,
}: ActiveFiltersProps) {
  if (!hasActiveFilters || filterSummary.length === 0) return null;

  return (
    <div
      id="active-filters"
      className="flex flex-wrap items-center gap-1.5 pt-1"
      aria-live="polite"
      aria-label="Active filters"
    >
      <span className="text-xs font-medium text-[var(--text-muted)] mr-1">
        Active filters:
      </span>
      {filterSummary.map((chip) => (
        <span
          key={chip.key}
          className="inline-flex items-center gap-1.5 rounded-full border border-[var(--accent)]/20 bg-[var(--accent-subtle)] px-2.5 py-0.5 text-xs font-medium text-[var(--accent-text)] transition-colors hover:bg-[var(--accent)]/15"
        >
          {chip.label}
          <button
            type="button"
            onClick={() => onRemove(chip.key)}
            aria-label={`Remove ${chip.label} filter`}
            className="flex h-3.5 w-3.5 items-center justify-center rounded-full text-[var(--accent-text)] hover:bg-[var(--accent)]/20 focus:outline-none focus:ring-2 focus:ring-[var(--accent)]"
          >
            <span className="text-[10px] leading-none">✕</span>
          </button>
        </span>
      ))}

      <button
        type="button"
        id="reset-all-filters"
        onClick={onReset}
        className="ml-2 text-xs font-medium text-[var(--text-muted)] underline decoration-dotted underline-offset-2 transition-colors hover:text-[var(--error)] focus:outline-none focus:ring-2 focus:ring-[var(--accent)]"
        aria-label="Clear all filters"
      >
        Clear all
      </button>
    </div>
  );
}
