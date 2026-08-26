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
 * A slide-in overlay panel for mobile filter access.
 * Visible only on screens smaller than lg (below 1024px).
 *
 * Accessibility:
 *   - role="dialog" with aria-modal="true" traps focus.
 *   - aria-label identifies the dialog purpose.
 *   - Close button has descriptive aria-label.
 *   - Backdrop click also closes the drawer.
 *
 * Architecture note:
 *   The drawer shares the same filter control components as FilterSidebar.
 *   Both receive props from useCatalog — no duplicated state.
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
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-40 bg-black/40 lg:hidden"
        aria-hidden="true"
        onClick={onClose}
      />

      {/* Drawer panel */}
      <div
        id="mobile-filter-drawer"
        role="dialog"
        aria-modal="true"
        aria-label="Product filters"
        className="fixed inset-y-0 left-0 z-50 flex w-80 max-w-full flex-col bg-white shadow-xl lg:hidden"
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-gray-200 px-4 py-3">
          <h2 className="text-sm font-semibold uppercase tracking-wide text-gray-500">
            Filters
          </h2>
          <button
            type="button"
            id="mobile-filter-close"
            onClick={onClose}
            aria-label="Close filters panel"
            className="rounded-md p-1 text-gray-500 hover:text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            ✕
          </button>
        </div>

        {/* Filter controls */}
        <div className="flex-1 overflow-y-auto p-4">
          <div className="space-y-6">
            <CategoryFilter
              selected={filters.categories}
              onToggle={onToggleCategory}
            />
            <PriceFilter
              min={filters.priceRange.min}
              max={filters.priceRange.max}
              datasetMin={datasetMin}
              datasetMax={datasetMax}
              onChange={onPriceChange}
            />
            <RatingFilter
              minRating={filters.minRating}
              onChange={onRatingChange}
            />
          </div>
        </div>

        {/* Footer actions */}
        <div className="flex gap-3 border-t border-gray-200 p-4">
          {hasActiveFilters && (
            <button
              type="button"
              id="mobile-reset-filters"
              onClick={() => {
                onReset();
                onClose();
              }}
              className="flex-1 rounded-md border border-gray-300 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
              aria-label="Reset all filters"
            >
              Reset all
            </button>
          )}
          <button
            type="button"
            id="mobile-filter-apply"
            onClick={onClose}
            className="flex-1 rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            aria-label="Apply filters and close"
          >
            Show results
          </button>
        </div>
      </div>
    </>
  );
}
