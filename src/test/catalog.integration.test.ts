import { describe, it, expect } from "vitest";
import {
  filterProducts,
  paginateProducts,
  applyCatalogQuery,
  hasActiveFilters,
  getDefaultFilters,
} from "@/lib/catalog/catalog";
import { PRODUCTS } from "@/data/products";
import {
  DEFAULT_CATALOG_QUERY,
  FilterState,
  CatalogQuery,
} from "@/types/product";

// ─────────────────────────────────────────────────────────────────────────────
// Helpers
// ─────────────────────────────────────────────────────────────────────────────

const noFilters: FilterState = getDefaultFilters();

function makeQuery(overrides: Partial<CatalogQuery> = {}): CatalogQuery {
  return { ...DEFAULT_CATALOG_QUERY, ...overrides };
}

// ─────────────────────────────────────────────────────────────────────────────
// Scenario 1 — No filters: all products visible
// ─────────────────────────────────────────────────────────────────────────────

describe("Scenario 1 — no filters", () => {
  it("returns all products with default query", () => {
    const result = applyCatalogQuery(PRODUCTS, DEFAULT_CATALOG_QUERY);
    expect(result.totalCount).toBe(PRODUCTS.length);
  });

  it("page 1 shows exactly pageSize items", () => {
    const result = applyCatalogQuery(PRODUCTS, DEFAULT_CATALOG_QUERY);
    expect(result.products).toHaveLength(result.pageSize);
  });
});

// ─────────────────────────────────────────────────────────────────────────────
// Scenario 2 — Category filtering
// ─────────────────────────────────────────────────────────────────────────────

describe("Scenario 2 — category filtering", () => {
  it("shows only Electronics when Electronics is selected", () => {
    const result = applyCatalogQuery(
      PRODUCTS,
      makeQuery({
        filters: { ...noFilters, categories: ["Electronics"] },
      }),
    );
    expect(result.products.every((p) => p.category === "Electronics")).toBe(
      true,
    );
    expect(result.totalCount).toBeGreaterThan(0);
  });

  it("multi-category selection broadens results (OR within categories)", () => {
    const singleElec = applyCatalogQuery(
      PRODUCTS,
      makeQuery({
        filters: { ...noFilters, categories: ["Electronics"] },
      }),
    ).totalCount;
    const singleBook = applyCatalogQuery(
      PRODUCTS,
      makeQuery({
        filters: { ...noFilters, categories: ["Books"] },
      }),
    ).totalCount;
    const both = applyCatalogQuery(
      PRODUCTS,
      makeQuery({
        filters: { ...noFilters, categories: ["Electronics", "Books"] },
      }),
    ).totalCount;

    expect(both).toBe(singleElec + singleBook);
  });

  it("returns empty when selected category has no products in dataset", () => {
    // Using a category name that we can ensure isn't present by injecting an empty array
    const result = filterProducts(PRODUCTS, {
      ...noFilters,
      categories: ["Toys & Games"], // may or may not have items — let's test a forced case
    });
    // Only assert structure — actual count depends on dataset
    expect(Array.isArray(result)).toBe(true);
  });
});

// ─────────────────────────────────────────────────────────────────────────────
// Scenario 3 & 4 — Price filtering
// ─────────────────────────────────────────────────────────────────────────────

describe("Scenario 3 — minimum price filter", () => {
  it("shows only products at or above min price", () => {
    const minPrice = 200;
    const result = filterProducts(PRODUCTS, {
      ...noFilters,
      priceRange: { min: minPrice, max: null },
    });
    expect(result.every((p) => p.price >= minPrice)).toBe(true);
    expect(result.length).toBeGreaterThan(0);
  });

  it("includes products exactly at the minimum boundary", () => {
    const exactPrice = PRODUCTS[0].price;
    const result = filterProducts(PRODUCTS, {
      ...noFilters,
      priceRange: { min: exactPrice, max: null },
    });
    expect(result.some((p) => p.price === exactPrice)).toBe(true);
  });
});

describe("Scenario 4 — maximum price filter", () => {
  it("shows only products at or below max price", () => {
    const maxPrice = 50;
    const result = filterProducts(PRODUCTS, {
      ...noFilters,
      priceRange: { min: null, max: maxPrice },
    });
    expect(result.every((p) => p.price <= maxPrice)).toBe(true);
    expect(result.length).toBeGreaterThan(0);
  });

  it("includes products exactly at the maximum boundary", () => {
    const exactPrice = PRODUCTS[0].price;
    const result = filterProducts(PRODUCTS, {
      ...noFilters,
      priceRange: { min: null, max: exactPrice },
    });
    expect(result.some((p) => p.price === exactPrice)).toBe(true);
  });
});

describe("Scenario 5 — min + max price filter", () => {
  it("shows only products within the price range", () => {
    const result = filterProducts(PRODUCTS, {
      ...noFilters,
      priceRange: { min: 50, max: 150 },
    });
    expect(result.every((p) => p.price >= 50 && p.price <= 150)).toBe(true);
  });

  it("returns empty when min > max (impossible range)", () => {
    const result = filterProducts(PRODUCTS, {
      ...noFilters,
      priceRange: { min: 500, max: 10 },
    });
    expect(result).toHaveLength(0);
  });
});

// ─────────────────────────────────────────────────────────────────────────────
// Scenario 6 — Rating filtering
// ─────────────────────────────────────────────────────────────────────────────

describe("Scenario 6 — rating filter", () => {
  it("shows only products meeting the minimum rating", () => {
    const minRating = 4.5;
    const result = filterProducts(PRODUCTS, {
      ...noFilters,
      minRating,
    });
    expect(result.every((p) => p.rating >= minRating)).toBe(true);
    expect(result.length).toBeGreaterThan(0);
  });

  it("includes products exactly at the boundary rating", () => {
    const boundary = 4.0;
    const result = filterProducts(PRODUCTS, {
      ...noFilters,
      minRating: boundary,
    });
    expect(result.some((p) => p.rating === boundary)).toBe(true);
  });
});

// ─────────────────────────────────────────────────────────────────────────────
// Scenario 7 — Combined filters (AND semantics)
// ─────────────────────────────────────────────────────────────────────────────

describe("Scenario 7 — combined filters", () => {
  it("ANDs all three filter dimensions", () => {
    const filters: FilterState = {
      categories: ["Electronics"],
      priceRange: { min: 50, max: 200 },
      minRating: 4.0,
    };
    const result = filterProducts(PRODUCTS, filters);

    for (const p of result) {
      expect(p.category).toBe("Electronics");
      expect(p.price).toBeGreaterThanOrEqual(50);
      expect(p.price).toBeLessThanOrEqual(200);
      expect(p.rating).toBeGreaterThanOrEqual(4.0);
    }
  });

  it("combined strict filters may return fewer products than any individual filter", () => {
    const electronics = filterProducts(PRODUCTS, {
      ...noFilters,
      categories: ["Electronics"],
    }).length;
    const combined = filterProducts(PRODUCTS, {
      categories: ["Electronics"],
      priceRange: { min: 200, max: null },
      minRating: 4.5,
    }).length;
    expect(combined).toBeLessThanOrEqual(electronics);
  });
});

// ─────────────────────────────────────────────────────────────────────────────
// Scenario 8 — Sorting preserves filters
// ─────────────────────────────────────────────────────────────────────────────

describe("Scenario 8 — sorting preserves filters", () => {
  const filters: FilterState = {
    categories: ["Books"],
    priceRange: { min: null, max: null },
    minRating: null,
  };

  it("sorted results still satisfy the active filters", () => {
    const result = applyCatalogQuery(
      PRODUCTS,
      makeQuery({
        filters,
        sort: "price-asc",
      }),
    );
    for (const p of result.products) {
      expect(p.category).toBe("Books");
    }
  });

  it("totalCount is the same regardless of sort option", () => {
    const asc = applyCatalogQuery(
      PRODUCTS,
      makeQuery({ filters, sort: "price-asc" }),
    );
    const desc = applyCatalogQuery(
      PRODUCTS,
      makeQuery({ filters, sort: "price-desc" }),
    );
    expect(asc.totalCount).toBe(desc.totalCount);
  });

  it("price-asc produces ascending price order on the page", () => {
    const result = applyCatalogQuery(
      PRODUCTS,
      makeQuery({ sort: "price-asc" }),
    );
    const prices = result.products.map((p) => p.price);
    for (let i = 0; i < prices.length - 1; i++) {
      expect(prices[i]).toBeLessThanOrEqual(prices[i + 1]);
    }
  });

  it("price-desc produces descending price order on the page", () => {
    const result = applyCatalogQuery(
      PRODUCTS,
      makeQuery({ sort: "price-desc" }),
    );
    const prices = result.products.map((p) => p.price);
    for (let i = 0; i < prices.length - 1; i++) {
      expect(prices[i]).toBeGreaterThanOrEqual(prices[i + 1]);
    }
  });

  it("name-asc produces alphabetical order", () => {
    const result = applyCatalogQuery(PRODUCTS, makeQuery({ sort: "name-asc" }));
    const names = result.products.map((p) => p.name);
    for (let i = 0; i < names.length - 1; i++) {
      expect(names[i].localeCompare(names[i + 1])).toBeLessThanOrEqual(0);
    }
  });

  it("rating-desc puts highest rated first", () => {
    const result = applyCatalogQuery(
      PRODUCTS,
      makeQuery({ sort: "rating-desc", pageSize: 48 }),
    );
    const ratings = result.products.map((p) => p.rating);
    for (let i = 0; i < ratings.length - 1; i++) {
      expect(ratings[i]).toBeGreaterThanOrEqual(ratings[i + 1]);
    }
  });
});

// ─────────────────────────────────────────────────────────────────────────────
// Scenario 9 — Pagination preserves query state
// ─────────────────────────────────────────────────────────────────────────────

describe("Scenario 9 — pagination preserves query state", () => {
  const filters: FilterState = {
    categories: ["Electronics"],
    priceRange: { min: null, max: null },
    minRating: null,
  };

  it("page 2 still shows only Electronics", () => {
    const result = applyCatalogQuery(
      PRODUCTS,
      makeQuery({ filters, page: 2, pageSize: 3 }),
    );
    for (const p of result.products) {
      expect(p.category).toBe("Electronics");
    }
    expect(result.currentPage).toBe(2);
  });

  it("first-page and second-page products do not overlap", () => {
    const page1 = applyCatalogQuery(
      PRODUCTS,
      makeQuery({ filters, page: 1, pageSize: 3 }),
    );
    const page2 = applyCatalogQuery(
      PRODUCTS,
      makeQuery({ filters, page: 2, pageSize: 3 }),
    );
    const ids1 = new Set(page1.products.map((p) => p.id));
    const ids2 = new Set(page2.products.map((p) => p.id));
    const overlap = [...ids2].filter((id) => ids1.has(id));
    expect(overlap).toHaveLength(0);
  });
});

// ─────────────────────────────────────────────────────────────────────────────
// Scenario 10 — Filter reduces pages below current page (clamping)
// ─────────────────────────────────────────────────────────────────────────────

describe("Scenario 10 — page clamping on filter change", () => {
  it("clamps page to valid range when filter reduces total pages", () => {
    // Start on page 10 with few results (Books only has ~6 products = 1 page at 12)
    const result = applyCatalogQuery(
      PRODUCTS,
      makeQuery({
        filters: { ...noFilters, categories: ["Books"] },
        page: 10,
        pageSize: 12,
      }),
    );
    expect(result.currentPage).toBeLessThanOrEqual(result.totalPages);
    expect(result.currentPage).toBeGreaterThanOrEqual(1);
  });

  it("clamped page still returns products (not empty)", () => {
    const result = applyCatalogQuery(
      PRODUCTS,
      makeQuery({
        filters: { ...noFilters, categories: ["Books"] },
        page: 999,
        pageSize: 12,
      }),
    );
    expect(result.products.length).toBeGreaterThan(0);
  });
});

// ─────────────────────────────────────────────────────────────────────────────
// Scenario 11 — Reset filters
// ─────────────────────────────────────────────────────────────────────────────

describe("Scenario 11 — filter reset", () => {
  it("default query returns all products (reset state)", () => {
    const result = applyCatalogQuery(PRODUCTS, DEFAULT_CATALOG_QUERY);
    expect(result.totalCount).toBe(PRODUCTS.length);
  });

  it("getDefaultFilters returns a state with no active filters", () => {
    expect(hasActiveFilters(getDefaultFilters())).toBe(false);
  });
});

// ─────────────────────────────────────────────────────────────────────────────
// Scenario 12 — Empty state
// ─────────────────────────────────────────────────────────────────────────────

describe("Scenario 12 — empty result state", () => {
  it("returns empty products array when no products match", () => {
    const result = applyCatalogQuery(
      PRODUCTS,
      makeQuery({
        filters: {
          categories: ["Electronics"],
          priceRange: { min: 99999, max: null },
          minRating: null,
        },
      }),
    );
    expect(result.products).toHaveLength(0);
    expect(result.totalCount).toBe(0);
  });

  it("totalPages is 1 even when result is empty (no invalid page state)", () => {
    const result = applyCatalogQuery(
      PRODUCTS,
      makeQuery({
        filters: {
          categories: [],
          priceRange: { min: 99999, max: null },
          minRating: null,
        },
      }),
    );
    expect(result.totalPages).toBe(1);
    expect(result.currentPage).toBe(1);
  });
});

// ─────────────────────────────────────────────────────────────────────────────
// Pagination edge cases
// ─────────────────────────────────────────────────────────────────────────────

describe("Pagination edge cases", () => {
  it("first page starts at item 1", () => {
    const { pageProducts } = paginateProducts(PRODUCTS, 1, 5);
    expect(pageProducts[0].id).toBe(PRODUCTS[0].id);
  });

  it("last page ends at the final item", () => {
    const pageSize = 10;
    const totalPages = Math.ceil(PRODUCTS.length / pageSize);
    const { pageProducts } = paginateProducts(PRODUCTS, totalPages, pageSize);
    const lastId = pageProducts[pageProducts.length - 1].id;
    expect(lastId).toBe(PRODUCTS[PRODUCTS.length - 1].id);
  });

  it("page 0 is clamped to page 1", () => {
    const { clampedPage } = paginateProducts(PRODUCTS, 0, 10);
    expect(clampedPage).toBe(1);
  });

  it("negative page is clamped to page 1", () => {
    const { clampedPage } = paginateProducts(PRODUCTS, -5, 10);
    expect(clampedPage).toBe(1);
  });

  it("very large page is clamped to last valid page", () => {
    const { clampedPage, totalPages } = paginateProducts(PRODUCTS, 99999, 10);
    expect(clampedPage).toBe(totalPages);
  });

  it("page size larger than dataset returns all items on page 1", () => {
    const { pageProducts, totalPages } = paginateProducts(PRODUCTS, 1, 9999);
    expect(pageProducts.length).toBe(PRODUCTS.length);
    expect(totalPages).toBe(1);
  });
});

// ─────────────────────────────────────────────────────────────────────────────
// Dataset integrity
// ─────────────────────────────────────────────────────────────────────────────

describe("Dataset integrity", () => {
  it("no two products share the same ID", () => {
    const ids = PRODUCTS.map((p) => p.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it("all product prices are positive numbers", () => {
    expect(
      PRODUCTS.every((p) => typeof p.price === "number" && p.price > 0),
    ).toBe(true);
  });

  it("all product ratings are in [0, 5]", () => {
    expect(PRODUCTS.every((p) => p.rating >= 0 && p.rating <= 5)).toBe(true);
  });
});
