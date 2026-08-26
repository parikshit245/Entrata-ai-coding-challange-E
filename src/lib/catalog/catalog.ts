import {
  Product,
  FilterState,
  SortOption,
  CatalogResult,
  CatalogQuery,
  DEFAULT_FILTER_STATE,
} from "@/types/product";

// ─────────────────────────────────────────────────────────────────────────────
// Filter
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Apply all active filters to the full product list.
 *
 * All conditions are ANDed together — a product must satisfy every
 * active filter to appear in the result.
 *
 * @pure — never mutates the input array
 */
export function filterProducts(
  products: Product[],
  filters: FilterState,
): Product[] {
  return products.filter((product) => {
    // ── Category ────────────────────────────────────────────────────
    if (
      filters.categories.length > 0 &&
      !filters.categories.includes(product.category)
    ) {
      return false;
    }

    // ── Min price ───────────────────────────────────────────────────
    if (
      filters.priceRange.min !== null &&
      product.price < filters.priceRange.min
    ) {
      return false;
    }

    // ── Max price ───────────────────────────────────────────────────
    if (
      filters.priceRange.max !== null &&
      product.price > filters.priceRange.max
    ) {
      return false;
    }

    // ── Min rating ──────────────────────────────────────────────────
    if (
      filters.minRating !== null &&
      product.rating < filters.minRating
    ) {
      return false;
    }

    return true;
  });
}

// ─────────────────────────────────────────────────────────────────────────────
// Sort
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Sort a product list according to the chosen sort option.
 *
 * "relevance" preserves the original dataset order (insertion order of the
 * static array), which acts as an editorial/default ordering.
 *
 * @pure — returns a new sorted array; does not mutate input
 */
export function sortProducts(
  products: Product[],
  sort: SortOption,
): Product[] {
  // Slice so we never mutate the caller's reference
  const sorted = products.slice();

  switch (sort) {
    case "price-asc":
      return sorted.sort((a, b) => a.price - b.price);

    case "price-desc":
      return sorted.sort((a, b) => b.price - a.price);

    case "rating-desc":
      // Secondary sort by reviewCount for ties — more reviews = more trustworthy
      return sorted.sort(
        (a, b) => b.rating - a.rating || b.reviewCount - a.reviewCount,
      );

    case "name-asc":
      return sorted.sort((a, b) => a.name.localeCompare(b.name));

    case "relevance":
    default:
      // No-op — preserve original array order
      return sorted;
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// Paginate
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Slice the already-filtered-and-sorted product list to the requested page.
 *
 * Page numbers are 1-indexed.
 * If `page` exceeds the available pages the last page is returned.
 *
 * @pure — does not mutate input
 */
export function paginateProducts(
  products: Product[],
  page: number,
  pageSize: number,
): { pageProducts: Product[]; totalPages: number; clampedPage: number } {
  const totalPages = Math.max(1, Math.ceil(products.length / pageSize));
  // Clamp page to [1, totalPages] — handles Scenario D automatically
  const clampedPage = Math.min(Math.max(1, page), totalPages);
  const startIndex = (clampedPage - 1) * pageSize;
  const pageProducts = products.slice(startIndex, startIndex + pageSize);

  return { pageProducts, totalPages, clampedPage };
}

// ─────────────────────────────────────────────────────────────────────────────
// Derived helpers
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Returns true if the supplied FilterState differs from the default (no-op) state.
 * Used to determine whether the reset button should be visible.
 */
export function hasActiveFilters(filters: FilterState): boolean {
  return (
    filters.categories.length > 0 ||
    filters.priceRange.min !== null ||
    filters.priceRange.max !== null ||
    filters.minRating !== null
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Orchestrator
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Apply a complete CatalogQuery to the raw product list.
 *
 * Pipeline:
 *   1. filterProducts    — narrows the full set
 *   2. count             — captured AFTER filter, BEFORE pagination
 *   3. sortProducts      — orders the filtered set
 *   4. paginateProducts  — slices to the requested page
 *
 * Keeping count and sort BEFORE pagination ensures:
 *   - totalCount reflects filtered (not paginated) results
 *   - sorting operates on the complete filtered set so results are globally ordered
 *   - pagination sees the correct total for page-count calculation
 */
export function applyCatalogQuery(
  products: Product[],
  query: CatalogQuery,
): CatalogResult {
  // Step 1 — Filter
  const filtered = filterProducts(products, query.filters);

  // Step 2 — Count (before sort/paginate — this is the true result count)
  const totalCount = filtered.length;

  // Step 3 — Sort
  const sorted = sortProducts(filtered, query.sort);

  // Step 4 — Paginate (clamps page if filters shrunk the result set)
  const { pageProducts, totalPages, clampedPage } = paginateProducts(
    sorted,
    query.page,
    query.pageSize,
  );

  return {
    products: pageProducts,
    totalCount,
    totalPages,
    currentPage: clampedPage,
    pageSize: query.pageSize,
  };
}

// ─────────────────────────────────────────────────────────────────────────────
// Price range helpers
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Derive the min and max price across the full (unfiltered) product list.
 * Used to set sensible bounds on the price range input.
 */
export function getPriceRange(products: Product[]): {
  min: number;
  max: number;
} {
  if (products.length === 0) return { min: 0, max: 0 };
  const prices = products.map((p) => p.price);
  return {
    min: Math.floor(Math.min(...prices)),
    max: Math.ceil(Math.max(...prices)),
  };
}

/**
 * Returns true when the price range filter represents a no-op
 * (i.e. both bounds are null or equal to the dataset extremes).
 */
export function isPriceRangeActive(
  filters: FilterState,
  datasetMin: number,
  datasetMax: number,
): boolean {
  const { min, max } = filters.priceRange;
  if (min === null && max === null) return false;
  if (min !== null && min > datasetMin) return true;
  if (max !== null && max < datasetMax) return true;
  return false;
}

/**
 * Return the default (empty) filter state.
 * Centralised here so that the hook always references the same object shape.
 */
export function getDefaultFilters(): FilterState {
  return {
    ...DEFAULT_FILTER_STATE,
    categories: [],
    priceRange: { min: null, max: null },
    minRating: null,
  };
}
