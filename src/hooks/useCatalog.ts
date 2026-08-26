"use client";

import { useCallback, useMemo, useState } from "react";
import { PRODUCTS } from "@/data/products";
import {
  applyCatalogQuery,
  getDefaultFilters,
  getPriceRange,
  hasActiveFilters,
} from "@/lib/catalog/catalog";
import {
  CatalogQuery,
  CatalogResult,
  FilterState,
  ProductCategory,
  SortOption,
  DEFAULT_CATALOG_QUERY,
} from "@/types/product";

// ─────────────────────────────────────────────────────────────────────────────
// Public interface
// ─────────────────────────────────────────────────────────────────────────────

export interface UseCatalogReturn {
  /** The current computed catalog result (filtered + sorted + paginated). */
  result: CatalogResult;

  /** True when at least one filter differs from the default. */
  hasActiveFilters: boolean;

  /** The current filter values. */
  filters: FilterState;

  /** The current sort option. */
  sort: SortOption;

  /** The current page number (1-indexed, already clamped). */
  page: number;

  /** The number of items per page. */
  pageSize: number;

  /** Min/max price across the full (unfiltered) dataset — for UI bounds. */
  datasetPriceRange: { min: number; max: number };

  // ── Setters ────────────────────────────────────────────────────────────

  /** Toggle a single category on/off. Resets page to 1. */
  toggleCategory: (category: ProductCategory) => void;

  /** Set both price bounds at once. Resets page to 1. */
  setPriceRange: (min: number | null, max: number | null) => void;

  /** Set the minimum rating filter. Resets page to 1. */
  setMinRating: (rating: number | null) => void;

  /** Change the sort option. Resets page to 1. */
  setSort: (sort: SortOption) => void;

  /** Navigate to a specific page. Preserves all filters and sort. */
  setPage: (page: number) => void;

  /** Reset filters, sort, and page to their defaults. */
  resetAll: () => void;
}

// ─────────────────────────────────────────────────────────────────────────────
// Hook
// ─────────────────────────────────────────────────────────────────────────────

/**
 * useCatalog
 *
 * Single source of truth for all catalog state.
 *
 * State model:
 *   - `query` (CatalogQuery) — the only piece of React state.
 *     Contains: filters, sort, page, pageSize.
 *   - `result` (CatalogResult) — fully derived via useMemo from query + data.
 *
 * State synchronization rules:
 *   - Any filter change resets page to 1 (Scenarios A, B).
 *   - Sort change resets page to 1.
 *   - Page change preserves filters and sort (Scenario E).
 *   - Reset sets everything back to DEFAULT_CATALOG_QUERY (Scenario C).
 *   - If filters reduce available pages below the current page,
 *     paginateProducts() clamps automatically (Scenario D).
 *
 * Why a single `query` object instead of separate useState calls:
 *   - Prevents inconsistent intermediate states where, say, filters have
 *     updated but page hasn't yet reset.
 *   - A single setState is atomic — React batches it into one render.
 *   - The query object maps 1:1 to applyCatalogQuery() inputs.
 *
 * Why useMemo for result:
 *   - The filtering/sorting/pagination pipeline runs on every state change.
 *   - With 48 products this is negligible, but useMemo is still idiomatic
 *     for expensive derived computations and makes the dependency explicit.
 *   - It avoids computing the result during event handlers.
 */
export function useCatalog(): UseCatalogReturn {
  const [query, setQuery] = useState<CatalogQuery>(DEFAULT_CATALOG_QUERY);

  // Derived — recomputed only when query changes
  const result = useMemo(
    () => applyCatalogQuery(PRODUCTS, query),
    [query],
  );

  // Static — never changes (dataset is static)
  const datasetPriceRange = useMemo(() => getPriceRange(PRODUCTS), []);

  const activeFilters = useMemo(
    () => hasActiveFilters(query.filters),
    [query.filters],
  );

  // ── Filter setters (all reset page to 1) ─────────────────────────────

  const toggleCategory = useCallback((category: ProductCategory) => {
    setQuery((prev) => {
      const current = prev.filters.categories;
      const next = current.includes(category)
        ? current.filter((c) => c !== category)
        : [...current, category];
      return {
        ...prev,
        page: 1, // Scenario A
        filters: { ...prev.filters, categories: next },
      };
    });
  }, []);

  const setPriceRange = useCallback(
    (min: number | null, max: number | null) => {
      setQuery((prev) => ({
        ...prev,
        page: 1, // Scenario A
        filters: { ...prev.filters, priceRange: { min, max } },
      }));
    },
    [],
  );

  const setMinRating = useCallback((rating: number | null) => {
    setQuery((prev) => ({
      ...prev,
      page: 1, // Scenario A
      filters: { ...prev.filters, minRating: rating },
    }));
  }, []);

  // ── Sort setter (resets page) ─────────────────────────────────────────

  const setSort = useCallback((sort: SortOption) => {
    setQuery((prev) => ({
      ...prev,
      sort,
      page: 1, // Scenario B
    }));
  }, []);

  // ── Page setter (preserves everything else) ───────────────────────────

  const setPage = useCallback((page: number) => {
    setQuery((prev) => ({
      ...prev,
      page, // Scenario E — filters/sort untouched
    }));
  }, []);

  // ── Reset ─────────────────────────────────────────────────────────────

  const resetAll = useCallback(() => {
    setQuery({
      filters: getDefaultFilters(),
      sort: DEFAULT_CATALOG_QUERY.sort,
      page: 1, // Scenario C
      pageSize: DEFAULT_CATALOG_QUERY.pageSize,
    });
  }, []);

  return {
    result,
    hasActiveFilters: activeFilters,
    filters: query.filters,
    sort: query.sort,
    page: result.currentPage, // Use clamped page from result
    pageSize: query.pageSize,
    datasetPriceRange,
    toggleCategory,
    setPriceRange,
    setMinRating,
    setSort,
    setPage,
    resetAll,
  };
}
