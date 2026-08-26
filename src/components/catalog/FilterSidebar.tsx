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
 * Desktop sticky filter panel. Hidden on mobile — MobileFilterDrawer
 * provides the same controls on smaller screens.
 *
 * Layout: header with reset button, then divider-separated filter sections.
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
      className="hidden w-56 shrink-0 lg:block xl:w-60"
    >
      {/* Sticky wrapper */}
      <div className="sticky top-6">
        <div className="rounded-[var(--radius-lg)] border border-[var(--border)] bg-[var(--surface)]">
          {/* Panel header */}
          <div className="flex items-center justify-between border-b border-[var(--border)] px-4 py-3">
            <span className="text-sm font-semibold text-[var(--text-primary)]">
              Filters
            </span>
            {hasActiveFilters && (
              <button
                type="button"
                id="sidebar-reset-filters"
                onClick={onReset}
                className="text-xs font-medium text-[var(--accent)] transition-colors hover:text-[var(--accent-hover)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)]"
                aria-label="Reset all filters"
              >
                Reset all
              </button>
            )}
          </div>

          {/* Filter sections */}
          <div className="divide-y divide-[var(--border)]">
            <div className="px-4 py-4">
              <CategoryFilter
                selected={filters.categories}
                onToggle={onToggleCategory}
              />
            </div>

            <div className="px-4 py-4">
              <PriceFilter
                min={filters.priceRange.min}
                max={filters.priceRange.max}
                datasetMin={datasetMin}
                datasetMax={datasetMax}
                onChange={onPriceChange}
              />
            </div>

            <div className="px-4 py-4">
              <RatingFilter
                minRating={filters.minRating}
                onChange={onRatingChange}
              />
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
}
