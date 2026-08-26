"use client";

import { useState } from "react";
import { useCatalog } from "@/hooks/useCatalog";
import { CatalogHeader } from "@/components/catalog/CatalogHeader";
import { FilterSidebar } from "@/components/catalog/FilterSidebar";
import { MobileFilterDrawer } from "@/components/catalog/MobileFilterDrawer";
import { ProductGrid } from "@/components/catalog/ProductGrid";
import { SortControl } from "@/components/catalog/SortControl";
import { ActiveFilters, type ActiveFilterChip } from "@/components/catalog/ActiveFilters";
import { ResultsSummary } from "@/components/catalog/ResultsSummary";
import { Pagination } from "@/components/catalog/Pagination";
import { FilterState, ProductCategory } from "@/types/product";

/**
 * CatalogPage
 *
 * Root client component that:
 *   1. Owns all catalog state via useCatalog().
 *   2. Derives activeFilterChips for display.
 *   3. Distributes state and handlers to child components via props.
 *
 * State ownership:
 *   - catalog query (filters/sort/page) → useCatalog hook
 *   - isDrawerOpen (UI-only mobile state) → local useState
 *
 * All children receive their data and handlers as props.
 * No context or global state is needed — prop depth is only one level.
 */
export default function CatalogPage() {
  const catalog = useCatalog();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  // ── Build active filter chips for display ─────────────────────────
  const filterChips = buildFilterChips(catalog.filters);

  /**
   * Remove a single filter chip by its key.
   * Key format:
   *   "category-{CategoryName}"  → toggle that category off
   *   "price"                    → clear both price bounds
   *   "rating"                   → clear min rating
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

  // Shared props passed to both FilterSidebar and MobileFilterDrawer
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
    <div className="flex min-h-screen flex-col bg-gray-50">
      {/* ── Page header ──────────────────────────────────────────── */}
      <CatalogHeader />

      {/* ── Mobile filter drawer (hidden on lg+) ─────────────────── */}
      <MobileFilterDrawer
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        {...sharedFilterProps}
      />

      {/* ── Main content ─────────────────────────────────────────── */}
      <main className="mx-auto w-full max-w-7xl flex-1 px-4 py-6 sm:px-6 lg:px-8">

        {/* ── Top toolbar: mobile filter toggle + results + sort ─── */}
        <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
          {/* Mobile-only filter toggle button */}
          <button
            type="button"
            id="mobile-filter-open"
            onClick={() => setIsDrawerOpen(true)}
            className="inline-flex items-center gap-2 rounded-md border border-gray-300 bg-white px-3 py-1.5 text-sm text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 lg:hidden"
            aria-expanded={isDrawerOpen}
            aria-controls="mobile-filter-drawer"
            aria-label="Open filters panel"
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

          {/* Results summary — visible on all breakpoints */}
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

        {/* ── Two-column layout: sidebar + product grid ─────────── */}
        <div className="flex flex-col gap-6 lg:flex-row lg:items-start">
          {/* Desktop filter sidebar (hidden on mobile via CSS) */}
          <FilterSidebar {...sharedFilterProps} />

          {/* Product results area */}
          <div className="min-w-0 flex-1">
            <ProductGrid
              products={catalog.result.products}
              onReset={catalog.resetAll}
              hasActiveFilters={catalog.hasActiveFilters}
            />

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
// Helpers (module-level, not inside the component — stable across renders)
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Convert the active FilterState into a flat list of chip descriptors.
 *
 * The key for each chip encodes the filter dimension (and for categories,
 * the specific value), so handleRemoveChip can dispatch the correct setter
 * without needing a switch table here.
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
          : `≤ $${max!}`;
    chips.push({ key: "price", label });
  }

  if (filters.minRating !== null) {
    chips.push({ key: "rating", label: `${filters.minRating}★ & up` });
  }

  return chips;
}
