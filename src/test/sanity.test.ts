import { describe, it, expect } from "vitest";
import { PRODUCTS } from "@/data/products";
import { PRODUCT_CATEGORIES } from "@/types/product";

/**
 * Sanity tests — verify the test environment is working and the mock
 * dataset meets the minimum structural requirements for the challenge.
 */
describe("Test environment", () => {
  it("should pass a trivial assertion", () => {
    expect(1 + 1).toBe(2);
  });

  it("should import TypeScript modules correctly", () => {
    expect(typeof PRODUCTS).toBe("object");
    expect(Array.isArray(PRODUCTS)).toBe(true);
  });
});

describe("Mock product dataset", () => {
  it("should contain at least 30 products for meaningful pagination", () => {
    expect(PRODUCTS.length).toBeGreaterThanOrEqual(30);
  });

  it("should have products from every defined category", () => {
    const categoriesInData = new Set(PRODUCTS.map((p) => p.category));
    for (const category of PRODUCT_CATEGORIES) {
      expect(categoriesInData.has(category)).toBe(true);
    }
  });

  it("should have every product with required fields", () => {
    for (const product of PRODUCTS) {
      expect(product.id).toBeTruthy();
      expect(product.name).toBeTruthy();
      expect(product.category).toBeTruthy();
      expect(typeof product.price).toBe("number");
      expect(product.price).toBeGreaterThan(0);
      expect(typeof product.rating).toBe("number");
      expect(product.rating).toBeGreaterThanOrEqual(0);
      expect(product.rating).toBeLessThanOrEqual(5);
      expect(typeof product.reviewCount).toBe("number");
      expect(product.reviewCount).toBeGreaterThanOrEqual(0);
    }
  });

  it("should have unique product IDs", () => {
    const ids = PRODUCTS.map((p) => p.id);
    const uniqueIds = new Set(ids);
    expect(uniqueIds.size).toBe(ids.length);
  });

  it("should contain products across a range of prices", () => {
    const prices = PRODUCTS.map((p) => p.price);
    const minPrice = Math.min(...prices);
    const maxPrice = Math.max(...prices);
    // There should be a meaningful price spread
    expect(maxPrice - minPrice).toBeGreaterThan(50);
  });

  it("should contain products with different rating values", () => {
    const ratings = new Set(PRODUCTS.map((p) => p.rating));
    expect(ratings.size).toBeGreaterThan(3);
  });
});
