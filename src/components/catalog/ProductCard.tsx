import { Product } from "@/types/product";

interface ProductCardProps {
  product: Product;
}

/**
 * ProductCard
 *
 * Displays a single product's key details.
 * Kept intentionally simple at this stage — styling and interactivity
 * will be refined in later phases.
 */
export function ProductCard({ product }: ProductCardProps) {
  const formattedPrice = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(product.price);

  return (
    <article
      id={`product-card-${product.id}`}
      aria-label={product.name}
      className="flex flex-col rounded-lg border border-gray-200 bg-white p-4 transition-shadow hover:shadow-md"
    >
      {/* Category badge */}
      <span className="inline-block w-fit rounded-full bg-blue-50 px-2 py-0.5 text-xs font-medium text-blue-700">
        {product.category}
      </span>

      {/* Product name */}
      <h3 className="mt-2 text-sm font-semibold leading-snug text-gray-900">
        {product.name}
      </h3>

      {/* Description */}
      <p className="mt-1 line-clamp-2 text-xs text-gray-500">
        {product.description}
      </p>

      {/* Footer — price and rating */}
      <div className="mt-auto flex items-center justify-between pt-3">
        <span className="text-base font-bold text-gray-900">
          {formattedPrice}
        </span>

        <div
          className="flex items-center gap-1 text-xs text-gray-500"
          aria-label={`${product.rating} out of 5 stars — ${product.reviewCount} reviews`}
        >
          <span className="text-yellow-400" aria-hidden="true">
            ★
          </span>
          <span className="font-medium text-gray-700">{product.rating}</span>
          <span>({product.reviewCount.toLocaleString()})</span>
        </div>
      </div>
    </article>
  );
}
