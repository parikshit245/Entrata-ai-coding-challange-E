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
 * Displays a row of dismissible chips for every active filter,
 * plus a "Clear all" button when any filter is active.
 *
 * Accessibility:
 *   - Each remove button has an aria-label describing what it removes.
 *   - aria-live="polite" on the container announces changes to screen readers.
 */
export function ActiveFilters({
  hasActiveFilters,
  filterSummary,
  onRemove,
  onReset,
}: ActiveFiltersProps) {
  if (!hasActiveFilters) return null;

  return (
    <div
      id="active-filters"
      className="flex flex-wrap items-center gap-2"
      aria-live="polite"
      aria-label="Active filters"
    >
      {filterSummary.map((chip) => (
        <span
          key={chip.key}
          className="inline-flex items-center gap-1 rounded-full bg-blue-100 px-3 py-1 text-xs font-medium text-blue-800"
        >
          {chip.label}
          <button
            type="button"
            onClick={() => onRemove(chip.key)}
            aria-label={`Remove ${chip.label} filter`}
            className="ml-1 rounded-full hover:text-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1"
          >
            ✕
          </button>
        </span>
      ))}

      <button
        type="button"
        id="reset-all-filters"
        onClick={onReset}
        className="ml-1 text-xs text-gray-500 underline hover:text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1"
        aria-label="Clear all filters"
      >
        Clear all
      </button>
    </div>
  );
}
