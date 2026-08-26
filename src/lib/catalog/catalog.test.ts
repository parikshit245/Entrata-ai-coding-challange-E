import { describe, it, expect } from "vitest";
import {
  filterProducts,
  sortProducts,
  paginateProducts,
  applyCatalogQuery,
  hasActiveFilters,
  getPriceRange,
  isPriceRangeActive,
} from "./catalog";
import { Product, FilterState, DEFAULT_CATALOG_QUERY } from "@/types/product";
import { PRODUCTS } from "@/data/products";

// ─────────────────────────────────────────────────────────────────────────────
// Fixtures
// ─────────────────────────────────────────────────────────────────────────────

/** Minimal deterministic product list used for unit tests. */
const FIXTURE: Product[] = [
  {
    id: "a",
    name: "Alpha Widget",
    category: "Electronics",
    price: 50,
    rating: 4.5,
    reviewCount: 100,
    description: "desc",
  },
  {
    id: "b",
    name: "Beta Gadget",
    category: "Clothing",
    price: 120,
    rating: 3.8,
    reviewCount: 200,
    description: "desc",
  },
  {
    id: "c",
    name: "Gamma Book",
    category: "Books",
    price: 20,
    rating: 4.9,
    reviewCount: 500,
    description: "desc",
  },
  {
    id: "d",
    name: "Delta Tool",
    category: "Sports & Outdoors",
    price: 200,
    rating: 4.0,
    reviewCount: 80,
    description: "desc",
  },
  {
    id: "e",
    name: "Epsilon Lamp",
    category: "Home & Garden",
    price: 75,
    rating: 3.5,
    reviewCount: 60,
    description: "desc",
  },
];

const noFilters: FilterState = {
  categories: [],
  priceRange: { min: null, max: null },
  minRating: null,
};

// ─────────────────────────────────────────────────────────────────────────────
// filterProducts
// ─────────────────────────────────────────────────────────────────────────────

describe("filterProducts", () => {
  it("returns all products when no filter is active", () => {
    const result = filterProducts(FIXTURE, noFilters);
    expect(result).toHaveLength(FIXTURE.length);
  });

  // Category ──────────────────────────────────────────────────────────────

  it("filters by a single category", () => {
    const result = filterProducts(FIXTURE, {
      ...noFilters,
      categories: ["Electronics"],
    });
    expect(result).toHaveLength(1);
    expect(result[0].id).toBe("a");
  });

  it("filters by multiple categories (OR within category)", () => {
    const result = filterProducts(FIXTURE, {
      ...noFilters,
      categories: ["Electronics", "Books"],
    });
    expect(result).toHaveLength(2);
    expect(result.map((p) => p.id).sort()).toEqual(["a", "c"]);
  });

  it("returns empty array when no product matches the selected category", () => {
    const result = filterProducts(FIXTURE, {
      ...noFilters,
      categories: ["Toys & Games"],
    });
    expect(result).toHaveLength(0);
  });

  // Price ─────────────────────────────────────────────────────────────────

  it("filters by minimum price", () => {
    const result = filterProducts(FIXTURE, {
      ...noFilters,
      priceRange: { min: 100, max: null },
    });
    // b (120) and d (200) qualify
    expect(result).toHaveLength(2);
    expect(result.map((p) => p.id).sort()).toEqual(["b", "d"]);
  });

  it("filters by maximum price", () => {
    const result = filterProducts(FIXTURE, {
      ...noFilters,
      priceRange: { min: null, max: 60 },
    });
    // a (50) and c (20)
    expect(result).toHaveLength(2);
    expect(result.map((p) => p.id).sort()).toEqual(["a", "c"]);
  });

  it("filters by both min and max price", () => {
    const result = filterProducts(FIXTURE, {
      ...noFilters,
      priceRange: { min: 50, max: 130 },
    });
    // a (50), b (120), e (75)
    expect(result).toHaveLength(3);
    expect(result.map((p) => p.id).sort()).toEqual(["a", "b", "e"]);
  });

  it("includes products exactly at the price boundary", () => {
    const result = filterProducts(FIXTURE, {
      ...noFilters,
      priceRange: { min: 50, max: 50 },
    });
    expect(result).toHaveLength(1);
    expect(result[0].id).toBe("a");
  });

  it("returns empty when min > max (impossible range)", () => {
    const result = filterProducts(FIXTURE, {
      ...noFilters,
      priceRange: { min: 200, max: 10 },
    });
    expect(result).toHaveLength(0);
  });

  // Rating ────────────────────────────────────────────────────────────────

  it("filters by minimum rating", () => {
    const result = filterProducts(FIXTURE, {
      ...noFilters,
      minRating: 4.0,
    });
    // a (4.5), c (4.9), d (4.0)
    expect(result).toHaveLength(3);
    expect(result.map((p) => p.id).sort()).toEqual(["a", "c", "d"]);
  });

  it("includes products exactly at the minimum rating boundary", () => {
    const result = filterProducts(FIXTURE, {
      ...noFilters,
      minRating: 3.5,
    });
    // all 5 products are >= 3.5
    expect(result).toHaveLength(5);
  });

  // Combined ──────────────────────────────────────────────────────────────

  it("ANDs category + price + rating filters", () => {
    const result = filterProducts(FIXTURE, {
      categories: ["Electronics", "Books"],
      priceRange: { min: 10, max: 100 },
      minRating: 4.5,
    });
    // a: Electronics, $50, 4.5 ✓   c: Books, $20, 4.9 ✓
    expect(result).toHaveLength(2);
    expect(result.map((p) => p.id).sort()).toEqual(["a", "c"]);
  });

  it("returns empty when combined filters match no products", () => {
    const result = filterProducts(FIXTURE, {
      categories: ["Electronics"],
      priceRange: { min: 200, max: null },
      minRating: null,
    });
    expect(result).toHaveLength(0);
  });

  // Side-effects ──────────────────────────────────────────────────────────

  it("does not mutate the original products array", () => {
    const copy = [...FIXTURE];
    filterProducts(FIXTURE, { ...noFilters, categories: ["Electronics"] });
    expect(FIXTURE).toEqual(copy);
  });
});

// ─────────────────────────────────────────────────────────────────────────────
// sortProducts
// ─────────────────────────────────────────────────────────────────────────────

describe("sortProducts", () => {
  it("price-asc: sorts from lowest to highest price", () => {
    const result = sortProducts(FIXTURE, "price-asc");
    const prices = result.map((p) => p.price);
    expect(prices).toEqual([...prices].sort((a, b) => a - b));
  });

  it("price-desc: sorts from highest to lowest price", () => {
    const result = sortProducts(FIXTURE, "price-desc");
    const prices = result.map((p) => p.price);
    expect(prices).toEqual([...prices].sort((a, b) => b - a));
  });

  it("rating-desc: sorts from highest to lowest rating", () => {
    const result = sortProducts(FIXTURE, "rating-desc");
    for (let i = 0; i < result.length - 1; i++) {
      expect(result[i].rating).toBeGreaterThanOrEqual(result[i + 1].rating);
    }
  });

  it("name-asc: sorts alphabetically by name", () => {
    const result = sortProducts(FIXTURE, "name-asc");
    const names = result.map((p) => p.name);
    expect(names).toEqual([...names].sort((a, b) => a.localeCompare(b)));
  });

  it("relevance: preserves original order", () => {
    const result = sortProducts(FIXTURE, "relevance");
    expect(result.map((p) => p.id)).toEqual(FIXTURE.map((p) => p.id));
  });

  it("does not mutate the original array", () => {
    const copy = [...FIXTURE];
    sortProducts(FIXTURE, "price-asc");
    expect(FIXTURE.map((p) => p.id)).toEqual(copy.map((p) => p.id));
  });

  it("is deterministic — same input produces same output", () => {
    const a = sortProducts(FIXTURE, "rating-desc");
    const b = sortProducts(FIXTURE, "rating-desc");
    expect(a.map((p) => p.id)).toEqual(b.map((p) => p.id));
  });
});

// ─────────────────────────────────────────────────────────────────────────────
// paginateProducts
// ─────────────────────────────────────────────────────────────────────────────

describe("paginateProducts", () => {
  // Use a 10-item list for easy page arithmetic
  const TEN: Product[] = FIXTURE.concat(FIXTURE)
    .slice(0, 10)
    .map((p, i) => ({
      ...p,
      id: `p${i}`,
    }));

  it("returns the first page correctly", () => {
    const { pageProducts, clampedPage } = paginateProducts(TEN, 1, 3);
    expect(pageProducts).toHaveLength(3);
    expect(pageProducts[0].id).toBe("p0");
    expect(clampedPage).toBe(1);
  });

  it("returns a middle page correctly", () => {
    const { pageProducts, clampedPage } = paginateProducts(TEN, 2, 3);
    expect(pageProducts).toHaveLength(3);
    expect(pageProducts[0].id).toBe("p3");
    expect(clampedPage).toBe(2);
  });

  it("returns a partial last page correctly", () => {
    const { pageProducts, totalPages, clampedPage } = paginateProducts(
      TEN,
      4,
      3,
    );
    // page 4 of pageSize 3 = items 10..12 but list only has 10 → 1 item
    expect(pageProducts).toHaveLength(1);
    expect(totalPages).toBe(4);
    expect(clampedPage).toBe(4);
  });

  it("clamps page beyond available pages to the last page (Scenario D)", () => {
    const { clampedPage, pageProducts } = paginateProducts(TEN, 99, 3);
    expect(clampedPage).toBe(4); // 10 items / 3 per page = 4 pages
    expect(pageProducts.length).toBeGreaterThan(0);
  });

  it("clamps page 0 or negative to page 1", () => {
    const { clampedPage } = paginateProducts(TEN, 0, 3);
    expect(clampedPage).toBe(1);
  });

  it("returns at least 1 total page even for an empty list", () => {
    const { totalPages, pageProducts } = paginateProducts([], 1, 12);
    expect(totalPages).toBe(1);
    expect(pageProducts).toHaveLength(0);
  });

  it("calculates totalPages correctly", () => {
    const { totalPages } = paginateProducts(TEN, 1, 3);
    expect(totalPages).toBe(4); // ceil(10/3) = 4
  });
});

// ─────────────────────────────────────────────────────────────────────────────
// applyCatalogQuery (orchestrator)
// ─────────────────────────────────────────────────────────────────────────────

describe("applyCatalogQuery", () => {
  it("with default query returns all 48 products, page 1", () => {
    const result = applyCatalogQuery(PRODUCTS, DEFAULT_CATALOG_QUERY);
    expect(result.totalCount).toBe(PRODUCTS.length);
    expect(result.currentPage).toBe(1);
    expect(result.products).toHaveLength(result.pageSize);
  });

  it("totalCount reflects filtered count, not paginated count", () => {
    const result = applyCatalogQuery(PRODUCTS, {
      ...DEFAULT_CATALOG_QUERY,
      filters: { ...noFilters, categories: ["Books"] },
    });
    const booksInDataset = PRODUCTS.filter(
      (p) => p.category === "Books",
    ).length;
    expect(result.totalCount).toBe(booksInDataset);
    expect(result.products.length).toBeLessThanOrEqual(booksInDataset);
  });

  it("combined filters narrow the result set correctly", () => {
    const result = applyCatalogQuery(PRODUCTS, {
      ...DEFAULT_CATALOG_QUERY,
      filters: {
        categories: ["Electronics"],
        priceRange: { min: null, max: 100 },
        minRating: 4.3,
      },
    });
    // All returned products must satisfy every condition
    for (const p of result.products) {
      expect(p.category).toBe("Electronics");
      expect(p.price).toBeLessThanOrEqual(100);
      expect(p.rating).toBeGreaterThanOrEqual(4.3);
    }
  });

  it("clamps page when filter reduces available pages (Scenario D)", () => {
    // Request page 10 but after filtering only 1 page of results exists
    const result = applyCatalogQuery(PRODUCTS, {
      ...DEFAULT_CATALOG_QUERY,
      page: 10,
      filters: { ...noFilters, categories: ["Books"] },
    });
    expect(result.currentPage).toBeLessThanOrEqual(result.totalPages);
  });

  it("sorting is applied across the full filtered set", () => {
    const result = applyCatalogQuery(PRODUCTS, {
      ...DEFAULT_CATALOG_QUERY,
      sort: "price-asc",
      pageSize: 5,
      page: 1,
    });
    const prices = result.products.map((p) => p.price);
    for (let i = 0; i < prices.length - 1; i++) {
      expect(prices[i]).toBeLessThanOrEqual(prices[i + 1]);
    }
  });

  it("returns empty products array when filters match nothing", () => {
    const result = applyCatalogQuery(PRODUCTS, {
      ...DEFAULT_CATALOG_QUERY,
      filters: {
        categories: ["Electronics"],
        priceRange: { min: 9999, max: null },
        minRating: null,
      },
    });
    expect(result.products).toHaveLength(0);
    expect(result.totalCount).toBe(0);
    expect(result.totalPages).toBe(1);
  });
});

// ─────────────────────────────────────────────────────────────────────────────
// hasActiveFilters
// ─────────────────────────────────────────────────────────────────────────────

describe("hasActiveFilters", () => {
  it("returns false when no filter is active", () => {
    expect(hasActiveFilters(noFilters)).toBe(false);
  });

  it("returns true when a category is selected", () => {
    expect(
      hasActiveFilters({ ...noFilters, categories: ["Electronics"] }),
    ).toBe(true);
  });

  it("returns true when min price is set", () => {
    expect(
      hasActiveFilters({ ...noFilters, priceRange: { min: 10, max: null } }),
    ).toBe(true);
  });

  it("returns true when max price is set", () => {
    expect(
      hasActiveFilters({ ...noFilters, priceRange: { min: null, max: 100 } }),
    ).toBe(true);
  });

  it("returns true when minRating is set", () => {
    expect(hasActiveFilters({ ...noFilters, minRating: 4 })).toBe(true);
  });
});

// ─────────────────────────────────────────────────────────────────────────────
// getPriceRange
// ─────────────────────────────────────────────────────────────────────────────

describe("getPriceRange", () => {
  it("returns correct min and max from fixture", () => {
    const { min, max } = getPriceRange(FIXTURE);
    expect(min).toBe(20); // Gamma Book
    expect(max).toBe(200); // Delta Tool
  });

  it("returns 0,0 for an empty array", () => {
    const { min, max } = getPriceRange([]);
    expect(min).toBe(0);
    expect(max).toBe(0);
  });

  it("floors min and ceils max", () => {
    const products: Product[] = [
      { ...FIXTURE[0], price: 19.99 },
      { ...FIXTURE[1], price: 199.01 },
    ];
    const { min, max } = getPriceRange(products);
    expect(min).toBe(19);
    expect(max).toBe(200);
  });
});

// ─────────────────────────────────────────────────────────────────────────────
// isPriceRangeActive
// ─────────────────────────────────────────────────────────────────────────────

describe("isPriceRangeActive", () => {
  it("returns false when both bounds are null", () => {
    expect(
      isPriceRangeActive(
        { ...noFilters, priceRange: { min: null, max: null } },
        0,
        500,
      ),
    ).toBe(false);
  });

  it("returns true when min is above dataset minimum", () => {
    expect(
      isPriceRangeActive(
        { ...noFilters, priceRange: { min: 50, max: null } },
        0,
        500,
      ),
    ).toBe(true);
  });

  it("returns true when max is below dataset maximum", () => {
    expect(
      isPriceRangeActive(
        { ...noFilters, priceRange: { min: null, max: 300 } },
        0,
        500,
      ),
    ).toBe(true);
  });

  it("returns false when bounds equal dataset extremes", () => {
    expect(
      isPriceRangeActive(
        { ...noFilters, priceRange: { min: 0, max: 500 } },
        0,
        500,
      ),
    ).toBe(false);
  });
});
