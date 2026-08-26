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
 * Responsive grid for displaying ProductCard instances with a thoughtful empty state.
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
        className="flex min-h-[320px] flex-col items-center justify-center rounded-[var(--radius-lg)] border border-dashed border-[var(--border-strong)] bg-[var(--surface)] p-8 text-center"
      >
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[var(--surface-subtle)] text-[var(--text-muted)] mb-3">
          <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
        <p className="text-base font-semibold text-[var(--text-primary)]">No products match your criteria</p>
        <p className="mt-1 max-w-sm text-xs text-[var(--text-muted)]">
          {hasActiveFilters
            ? "Try loosening or removing some of your filters to discover more items."
            : "No products are currently available in the catalog."}
        </p>
        {hasActiveFilters && onReset && (
          <button
            type="button"
            id="empty-state-reset"
            onClick={onReset}
            className="mt-5 inline-flex items-center gap-1.5 rounded-[var(--radius-sm)] bg-[var(--accent)] px-4 py-2 text-xs font-semibold text-white shadow-sm transition-colors hover:bg-[var(--accent-hover)] focus:outline-none focus:ring-2 focus:ring-[var(--accent)] focus:ring-offset-2"
            aria-label="Reset all filters to view all products"
          >
            Clear all filters
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
      className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3"
    >
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </section>
  );
}
