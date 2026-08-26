"use client";

import { useState } from "react";
import { useCatalog } from "@/hooks/useCatalog";
import { Navbar } from "@/components/layout/Navbar";
import { HeroSection } from "@/components/layout/HeroSection";
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
 * Root client component coordinating state, responsive drawer, layout,
 * and component tree for the product catalog.
 */
export default function CatalogPage() {
  const catalog = useCatalog();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  // ── Build active filter chips for display ─────────────────────────
  const filterChips = buildFilterChips(catalog.filters);

  /**
   * Remove a single filter chip by its key.
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
    <div className="flex min-h-screen flex-col bg-[var(--background)] selection:bg-[var(--accent-subtle)] selection:text-[var(--accent-text)]">
      {/* ── Top Navigation Bar ───────────────────────────────────── */}
      <Navbar
        onCategorySelect={(cat) => {
          if (!catalog.filters.categories.includes(cat as ProductCategory)) {
            catalog.toggleCategory(cat as ProductCategory);
          }
          const el = document.getElementById("catalog-section");
          if (el) el.scrollIntoView({ behavior: "smooth" });
        }}
      />

      {/* ── Modern Hero Section ──────────────────────────────────── */}
      <HeroSection
        selectedCategories={catalog.filters.categories}
        onSelectCategory={catalog.toggleCategory}
        totalProductsCount={catalog.datasetPriceRange.max > 0 ? 48 : 0}
      />

      {/* ── Mobile filter drawer (hidden on lg+) ─────────────────── */}
      <MobileFilterDrawer
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        {...sharedFilterProps}
      />

      {/* ── Main Catalog Workspace ───────────────────────────────── */}
      <main id="catalog-section" className="mx-auto w-full max-w-7xl flex-1 px-4 py-8 sm:px-6 lg:px-8 scroll-mt-16">
        {/* Section Heading & Subtitle */}
        <div className="mb-6 flex flex-col gap-1">
          <div className="flex items-center gap-2">
            <h2 className="text-xl font-bold tracking-tight text-[var(--text-primary)] sm:text-2xl">
              Explore Collection
            </h2>
            <span className="rounded-full bg-[var(--accent-subtle)] px-2.5 py-0.5 text-xs font-bold text-[var(--accent)]">
              {catalog.result.totalCount} Available
            </span>
          </div>
          <p className="text-xs text-[var(--text-muted)]">
            Use the filters below to refine by specific category, budget, or customer ratings.
          </p>
        </div>

        {/* ── Toolbar Container ────────────────────────────────────── */}
        <div className="mb-5 flex flex-col gap-3 rounded-[var(--radius-md)] border border-[var(--border)] bg-[var(--surface)] p-3.5 shadow-sm sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center justify-between gap-3 sm:justify-start">
            {/* Mobile-only filter button */}
            <button
              type="button"
              id="mobile-filter-open"
              onClick={() => setIsDrawerOpen(true)}
              className="inline-flex items-center gap-1.5 rounded-[var(--radius-sm)] border border-[var(--border-strong)] bg-[var(--surface)] px-3 py-1.5 text-xs font-semibold text-[var(--text-primary)] shadow-sm transition-colors hover:bg-[var(--surface-subtle)] focus:outline-none focus:ring-2 focus:ring-[var(--accent)] lg:hidden"
              aria-expanded={isDrawerOpen}
              aria-controls="mobile-filter-drawer"
              aria-label="Open filters panel"
            >
              <svg className="h-3.5 w-3.5 text-[var(--text-secondary)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
              </svg>
              <span>Filters</span>
              {catalog.hasActiveFilters && (
                <span
                  className="ml-1 flex h-4 min-w-[16px] items-center justify-center rounded-full bg-[var(--accent)] px-1 text-[10px] font-bold text-white"
                  aria-label={`${filterChips.length} active filters`}
                >
                  {filterChips.length}
                </span>
              )}
            </button>

            {/* Results count */}
            <ResultsSummary
              totalCount={catalog.result.totalCount}
              currentPage={catalog.result.currentPage}
              totalPages={catalog.result.totalPages}
              pageSize={catalog.result.pageSize}
            />
          </div>

          {/* Sort control */}
          <div className="flex items-center justify-end">
            <SortControl value={catalog.sort} onChange={catalog.setSort} />
          </div>
        </div>

        {/* ── Active filter chips ───────────────────────────────── */}
        {catalog.hasActiveFilters && (
          <div className="mb-5">
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
          {/* Desktop filter sidebar */}
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
      <footer className="mt-16 border-t border-[var(--border)] bg-[var(--surface)] py-8 text-center text-xs text-[var(--text-muted)]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
            <div className="flex items-center gap-2">
              <span className="font-bold text-[var(--text-primary)]">LUMINA Store</span>
              <span>— Quality Verified Products</span>
            </div>
            <p>© 2026 LUMINA Catalog Inc. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Helpers
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Convert active FilterState into a flat list of chip descriptors.
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
