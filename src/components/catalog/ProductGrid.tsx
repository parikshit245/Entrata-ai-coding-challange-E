import { Product } from "@/types/product";
import { ProductCard } from "./ProductCard";

interface ProductGridProps {
  products: Product[];
  /** Called when the user clicks "Reset filters" in the empty state. */
  onReset?: () => void;
  /** Whether any filter is currently active (to decide whether to show reset). */
  hasActiveFilters?: boolean;
}

/**
 * ProductGrid
 *
 * Renders a responsive grid of ProductCard components.
 *
 * Empty state:
 *   - When no products match the active query, shows a clear message.
 *   - If filters are active, offers a "Reset filters" button so the user
 *     can return to the full catalog without hunting for the sidebar reset.
 *
 * Accessibility:
 *   - aria-live="polite" on the section announces updates to screen readers
 *     after filter or page changes without being disruptive.
 */
export function ProductGrid({
  products,
  onReset,
  hasActiveFilters = false,
}: ProductGridProps) {
  if (products.length === 0) {
    return (
      <div
        id="product-grid-empty"
        role="status"
        className="flex flex-col items-center justify-center rounded-lg border border-dashed border-gray-300 bg-white py-16 text-center"
      >
        <p className="text-lg font-medium text-gray-500">No products found.</p>
        <p className="mt-1 text-sm text-gray-400">
          {hasActiveFilters
            ? "No products match your current filters."
            : "The catalog appears to be empty."}
        </p>
        {hasActiveFilters && onReset && (
          <button
            type="button"
            id="empty-state-reset"
            onClick={onReset}
            className="mt-4 rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            aria-label="Reset all filters to see all products"
          >
            Reset filters
          </button>
        )}
      </div>
    );
  }

  return (
    <section
      id="product-grid"
      aria-label="Product results"
      aria-live="polite"
      aria-atomic="false"
      className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3"
    >
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </section>
  );
}
