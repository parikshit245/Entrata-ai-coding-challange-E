"use client";

import { SortOption, SORT_OPTIONS } from "@/types/product";

interface SortControlProps {
  /** Currently active sort option. */
  value: SortOption;
  /** Called when the user selects a different sort. */
  onChange: (sort: SortOption) => void;
}

/**
 * SortControl
 *
 * A <select> dropdown for choosing the product sort order.
 *
 * Accessibility:
 *   - Native <select> — keyboard navigable, announces changes to screen readers.
 *   - Associated <label> via htmlFor.
 */
export function SortControl({ value, onChange }: SortControlProps) {
  return (
    <div className="flex items-center gap-2">
      <label
        htmlFor="sort-control"
        className="whitespace-nowrap text-sm text-gray-600"
      >
        Sort by
      </label>
      <select
        id="sort-control"
        value={value}
        onChange={(e) => onChange(e.target.value as SortOption)}
        className="rounded-md border border-gray-300 bg-white px-3 py-1.5 text-sm shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
        aria-label="Sort products by"
      >
        {SORT_OPTIONS.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </div>
  );
}
