"use client";

import { FilterState, ProductCategory } from "@/types/product";
import { CategoryFilter } from "./CategoryFilter";
import { PriceFilter } from "./PriceFilter";
import { RatingFilter } from "./RatingFilter";

interface MobileFilterDrawerProps {
  isOpen: boolean;
  filters: FilterState;
  datasetMin: number;
  datasetMax: number;
  onClose: () => void;
  onToggleCategory: (category: ProductCategory) => void;
  onPriceChange: (min: number | null, max: number | null) => void;
  onRatingChange: (rating: number | null) => void;
  onReset: () => void;
  hasActiveFilters: boolean;
}

/**
 * MobileFilterDrawer
 *
 * Full-height slide-in overlay for mobile filter access (< lg breakpoint).
 * Shares the same filter control components as FilterSidebar.
 *
 * Accessibility:
 *   - role="dialog" + aria-modal="true"
 *   - Backdrop click closes drawer
 *   - Close button at top-right
 */
export function MobileFilterDrawer({
  isOpen,
  filters,
  datasetMin,
  datasetMax,
  onClose,
  onToggleCategory,
  onPriceChange,
  onRatingChange,
  onReset,
  hasActiveFilters,
}: MobileFilterDrawerProps) {
  if (!isOpen) return null;

  return (
    <>
      {/* Dimmed backdrop */}
      <div
        className="fixed inset-0 z-40 bg-black/30 backdrop-blur-sm lg:hidden"
        aria-hidden="true"
        onClick={onClose}
      />

      {/* Drawer panel */}
      <div
        id="mobile-filter-drawer"
        role="dialog"
        aria-modal="true"
        aria-label="Product filters"
        className="fixed inset-y-0 left-0 z-50 flex w-80 max-w-[90vw] flex-col bg-[var(--surface)] shadow-2xl lg:hidden"
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-[var(--border)] px-5 py-4">
          <span className="text-sm font-semibold text-[var(--text-primary)]">
            Filters
          </span>
          <button
            type="button"
            id="mobile-filter-close"
            onClick={onClose}
            aria-label="Close filters panel"
            className="flex h-7 w-7 items-center justify-center rounded-full text-[var(--text-muted)] transition-colors hover:bg-[var(--surface-subtle)] hover:text-[var(--text-primary)] focus-visible:ring-2 focus-visible:ring-[var(--accent)] focus-visible:outline-none"
          >
            <svg
              className="h-4 w-4"
              viewBox="0 0 16 16"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            >
              <line x1="3" y1="3" x2="13" y2="13" />
              <line x1="13" y1="3" x2="3" y2="13" />
            </svg>
          </button>
        </div>

        {/* Scrollable filter sections */}
        <div className="flex-1 divide-y divide-[var(--border)] overflow-y-auto">
          <div className="px-5 py-4">
            <CategoryFilter
              selected={filters.categories}
              onToggle={onToggleCategory}
            />
          </div>
          <div className="px-5 py-4">
            <PriceFilter
              min={filters.priceRange.min}
              max={filters.priceRange.max}
              datasetMin={datasetMin}
              datasetMax={datasetMax}
              onChange={onPriceChange}
            />
          </div>
          <div className="px-5 py-4">
            <RatingFilter
              minRating={filters.minRating}
              onChange={onRatingChange}
            />
          </div>
        </div>

        {/* Sticky footer actions */}
        <div className="border-t border-[var(--border)] bg-[var(--surface)] px-5 py-4">
          <div className="flex gap-2">
            {hasActiveFilters && (
              <button
                type="button"
                id="mobile-reset-filters"
                onClick={() => {
                  onReset();
                  onClose();
                }}
                className="flex-1 rounded-[var(--radius-md)] border border-[var(--border-strong)] py-2.5 text-sm font-medium text-[var(--text-secondary)] transition-colors hover:bg-[var(--surface-subtle)] focus-visible:ring-2 focus-visible:ring-[var(--accent)] focus-visible:outline-none"
                aria-label="Reset all filters"
              >
                Reset
              </button>
            )}
            <button
              type="button"
              id="mobile-filter-apply"
              onClick={onClose}
              className="flex-1 rounded-[var(--radius-md)] bg-[var(--accent)] py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[var(--accent-hover)] focus-visible:ring-2 focus-visible:ring-[var(--accent)] focus-visible:ring-offset-2 focus-visible:outline-none"
              aria-label="Apply filters and see results"
            >
              Show results
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
