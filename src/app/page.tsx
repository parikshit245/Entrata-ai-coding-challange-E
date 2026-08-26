"use client";

import { useState } from "react";
import { useCatalog } from "@/hooks/useCatalog";
import { CatalogHeader } from "@/components/catalog/CatalogHeader";
import { FilterSidebar } from "@/components/catalog/FilterSidebar";
import { MobileFilterDrawer } from "@/components/catalog/MobileFilterDrawer";
import { ProductGrid } from "@/components/catalog/ProductGrid";
import { SortControl } from "@/components/catalog/SortControl";
import { ActiveFilters } from "@/components/catalog/ActiveFilters";
import { ResultsSummary } from "@/components/catalog/ResultsSummary";
import { Pagination } from "@/components/catalog/Pagination";
import { ProductCategory } from "@/types/product";
import { type ActiveFilterChip } from "@/components/catalog/ActiveFilters";

/**
 * CatalogPage
 *
 * Root client component that:
 *   1. Owns all catalog state via useCatalog().
 *   2. Derives activeFilterChips for display.
 *   3. Distributes state and handlers to child components via props.
 *
 * Why this is a single "use client" component:
 *   All children receive their data as props from this component.
 *   There is no need for context or global state — prop depth is shallow
 *   (one level from CatalogPage to leaf components via FilterSidebar/Grid).
 *
 * Mobile filter drawer state (isDrawerOpen) is kept local here because
 * it is UI-only and does not affect the catalog query.
 */
export default function CatalogPage() {
  const catalog = useCatalog();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  // ── Build active filter chips for display ─────────────────────────
  const filterChips = buildFilterChips(catalog.filters);

  /**
   * Remove a single filter chip by its key.
   * Each key encodes the filter type (and for categories, the value).
   */
  function handleRemoveChip(key: string) {
    if (key.startsWith("category-")) {
      const category = key.replace("category-", "") as ProductCategory;
      catalog.toggleCategory(category);
    } else if (key === "price") {
      catalog.setPriceRange(null, null);
    } else if (key === "rating") {
      catalog.setMinRating(null);
    }
  }

  const sharedFilterProps = {
    filters: catalog.filters,
    datasetMin: catalog.datasetPriceRange.min,
    datasetMax: catalog.datasetPriceRange.max,
    onToggleCategory: catalog.toggleCategory,
    onPriceChange: catalog.setPriceRange,
    onRatingChange: catalog.setMinRating,
    onReset: catalog.resetAll,
    hasActiveFilters: catalog.hasActiveFilters,
  };

  return (
    <div className="flex min-h-screen flex-col">
      {/* ── Page header ──────────────────────────────────────────── */}
      <CatalogHeader />

      {/* ── Mobile filter drawer ──────────────────────────────────── */}
      <MobileFilterDrawer
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        {...sharedFilterProps}
      />

      {/* ── Main content area ─────────────────────────────────────── */}
      <main className="mx-auto w-full max-w-7xl flex-1 px-4 py-6 sm:px-6 lg:px-8">
        {/* ── Toolbar row: mobile filter button + sort ─────────── */}
        <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
          {/* Mobile filter toggle */}
          <button
            type="button"
            id="mobile-filter-open"
            onClick={() => setIsDrawerOpen(true)}
            className="inline-flex items-center gap-2 rounded-md border border-gray-300 bg-white px-3 py-1.5 text-sm text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 lg:hidden"
            aria-expanded={isDrawerOpen}
            aria-controls="mobile-filter-drawer"
            aria-label="Open filters"
          >
            <span aria-hidden="true">⚙</span>
            Filters
            {catalog.hasActiveFilters && (
              <span
                className="ml-1 rounded-full bg-blue-600 px-1.5 py-0.5 text-xs font-medium text-white"
                aria-label={`${filterChips.length} active filters`}
              >
                {filterChips.length}
              </span>
            )}
          </button>

          {/* Results summary */}
          <ResultsSummary
            totalCount={catalog.result.totalCount}
            currentPage={catalog.result.currentPage}
            totalPages={catalog.result.totalPages}
            pageSize={catalog.result.pageSize}
          />

          {/* Sort control */}
          <SortControl value={catalog.sort} onChange={catalog.setSort} />
        </div>

        {/* ── Active filter chips ───────────────────────────────── */}
        {catalog.hasActiveFilters && (
          <div className="mb-4">
            <ActiveFilters
              hasActiveFilters={catalog.hasActiveFilters}
              filterSummary={filterChips}
              onRemove={handleRemoveChip}
              onReset={catalog.resetAll}
            />
          </div>
        )}

        {/* ── Two-column layout: sidebar + grid ─────────────────── */}
        <div className="flex flex-col gap-6 lg:flex-row lg:items-start">
          {/* Desktop filter sidebar */}
          <FilterSidebar {...sharedFilterProps} />

          {/* Product grid + pagination */}
          <div className="min-w-0 flex-1">
            <ProductGrid products={catalog.result.products} />

            <Pagination
              currentPage={catalog.result.currentPage}
              totalPages={catalog.result.totalPages}
              onPageChange={catalog.setPage}
            />
          </div>
        </div>
      </main>

      {/* ── Footer ───────────────────────────────────────────────── */}
      <footer className="border-t border-gray-200 bg-white py-4 text-center text-xs text-gray-400">
        Product Catalog — AI Coding Challenge
      </footer>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Helpers
// ─────────────────────────────────────────────────────────────────────────────

import { FilterState } from "@/types/product";

/**
 * Convert the active filter state into a flat list of chip descriptors.
 * The key encodes both the filter type and (for categories) the specific value,
 * allowing handleRemoveChip to dispatch the correct setter.
 */
function buildFilterChips(filters: FilterState): ActiveFilterChip[] {
  const chips: ActiveFilterChip[] = [];

  for (const category of filters.categories) {
    chips.push({
      key: `category-${category}`,
      label: category,
    });
  }

  const { min, max } = filters.priceRange;
  if (min !== null || max !== null) {
    const label =
      min !== null && max !== null
        ? `$${min} – $${max}`
        : min !== null
          ? `≥ $${min}`
          : `≤ $${max}`;
    chips.push({ key: "price", label });
  }

  if (filters.minRating !== null) {
    chips.push({ key: "rating", label: `${filters.minRating}★ & up` });
  }

  return chips;
}
