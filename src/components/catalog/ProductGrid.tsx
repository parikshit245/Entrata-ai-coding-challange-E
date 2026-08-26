import { Product } from "@/types/product";
import { ProductCard } from "./ProductCard";

interface ProductGridProps {
  products: Product[];
}

/**
 * ProductGrid
 *
 * Renders the product card grid.
 * At this phase it simply renders all provided products.
 * Phase 2 will wire this up to filtered/sorted/paginated results.
 */
export function ProductGrid({ products }: ProductGridProps) {
  if (products.length === 0) {
    return (
      <div
        id="product-grid-empty"
        className="flex flex-col items-center justify-center py-16 text-center"
      >
        <p className="text-lg font-medium text-gray-500">No products found.</p>
        <p className="mt-1 text-sm text-gray-400">
          Try adjusting or resetting your filters.
        </p>
      </div>
    );
  }

  return (
    <section
      id="product-grid"
      aria-label="Product results"
      aria-live="polite"
      className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3"
    >
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </section>
  );
}
