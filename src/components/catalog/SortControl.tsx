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
 * Polished dropdown for selecting product sort order.
 * Follows the design system with subtle border, clear label, and smooth focus states.
 */
export function SortControl({ value, onChange }: SortControlProps) {
  return (
    <div className="flex items-center gap-2">
      <label
        htmlFor="sort-control"
        className="text-xs font-medium whitespace-nowrap text-[var(--text-secondary)]"
      >
        Sort by:
      </label>
      <div className="relative">
        <select
          id="sort-control"
          value={value}
          onChange={(e) => onChange(e.target.value as SortOption)}
          className="appearance-none rounded-[var(--radius-sm)] border border-[var(--border)] bg-[var(--surface)] py-1.5 pr-8 pl-3 text-xs font-medium text-[var(--text-primary)] shadow-sm transition-colors hover:border-[var(--border-strong)] focus:border-[var(--accent)] focus:ring-2 focus:ring-[var(--accent-subtle)] focus:outline-none"
          aria-label="Sort products by"
        >
          {SORT_OPTIONS.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2 text-[var(--text-muted)]">
          <svg
            className="h-4 w-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </div>
      </div>
    </div>
  );
}
