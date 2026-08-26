"use client";

import { FilterState, ProductCategory } from "@/types/product";
import { CategoryFilter } from "./CategoryFilter";
import { PriceFilter } from "./PriceFilter";
import { RatingFilter } from "./RatingFilter";

interface FilterSidebarProps {
  filters: FilterState;
  datasetMin: number;
  datasetMax: number;
  onToggleCategory: (category: ProductCategory) => void;
  onPriceChange: (min: number | null, max: number | null) => void;
  onRatingChange: (rating: number | null) => void;
  onReset: () => void;
  hasActiveFilters: boolean;
}

/**
 * FilterSidebar
 *
 * Desktop sidebar container that composes the three filter controls.
 * On mobile this panel is hidden; the MobileFilterDrawer provides
 * the same controls in a slide-in overlay.
 */
export function FilterSidebar({
  filters,
  datasetMin,
  datasetMax,
  onToggleCategory,
  onPriceChange,
  onRatingChange,
  onReset,
  hasActiveFilters,
}: FilterSidebarProps) {
  return (
    <aside
      id="filter-sidebar"
      aria-label="Product filters"
      className="hidden w-64 shrink-0 xl:w-72 lg:block"
    >
      <div className="rounded-lg border border-gray-200 bg-white p-4">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-semibold uppercase tracking-wide text-gray-500">
            Filters
          </h2>
          {hasActiveFilters && (
            <button
              type="button"
              id="sidebar-reset-filters"
              onClick={onReset}
              className="text-xs text-blue-600 hover:text-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1"
              aria-label="Reset all filters"
            >
              Reset all
            </button>
          )}
        </div>

        <div className="mt-4 space-y-6">
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
    </aside>
  );
}
