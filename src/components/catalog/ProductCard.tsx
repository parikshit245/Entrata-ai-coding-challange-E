import { Product } from "@/types/product";

interface ProductCardProps {
  product: Product;
}

/** Map each category to a subtle tint badge for visual scanning. */
const CATEGORY_COLORS: Record<string, { bg: string; text: string }> = {
  Electronics: { bg: "bg-blue-50", text: "text-blue-700" },
  Clothing: { bg: "bg-violet-50", text: "text-violet-700" },
  Books: { bg: "bg-amber-50", text: "text-amber-700" },
  "Home & Garden": { bg: "bg-emerald-50", text: "text-emerald-700" },
  "Sports & Outdoors": { bg: "bg-orange-50", text: "text-orange-700" },
  "Toys & Games": { bg: "bg-pink-50", text: "text-pink-700" },
  "Beauty & Health": { bg: "bg-rose-50", text: "text-rose-700" },
};

const DEFAULT_BADGE = { bg: "bg-slate-50", text: "text-slate-600" };

/**
 * StarRating
 *
 * Renders filled/empty stars visually based on a 0–5 numeric rating.
 * Uses half-star rounding for display only.
 */
function StarRating({ rating }: { rating: number }) {
  const filled = Math.round(rating);
  return (
    <span aria-hidden="true" className="text-[var(--star)] text-sm tracking-tight">
      {"★".repeat(filled)}
      {"☆".repeat(Math.max(0, 5 - filled))}
    </span>
  );
}

/**
 * ProductCard
 *
 * Typography-focused card design — no external images required.
 *
 * Visual hierarchy:
 *   1. Category badge — scanning aid
 *   2. Product name — primary text
 *   3. Description — secondary, clamped
 *   4. Rating row — trust signal
 *   5. Price — purchase signal, visually distinct
 *
 * Interactions:
 *   - Subtle lift + stronger shadow on hover
 *   - Border highlights accent color on hover
 *   - Smooth 150ms transition
 */
export function ProductCard({ product }: ProductCardProps) {
  const badge = CATEGORY_COLORS[product.category] ?? DEFAULT_BADGE;

  const formattedPrice = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  }).format(product.price);

  return (
    <article
      id={`product-card-${product.id}`}
      aria-label={product.name}
      className="group flex flex-col rounded-[var(--radius-lg)] border border-[var(--border)] bg-[var(--surface)] p-5 transition-all duration-150 ease-out hover:-translate-y-0.5 hover:border-[var(--border-strong)] hover:shadow-[0_4px_20px_rgba(0,0,0,0.08)]"
    >
      {/* Category badge */}
      <span
        className={`inline-flex w-fit items-center rounded-full px-2.5 py-0.5 text-[11px] font-semibold uppercase tracking-wide ${badge.bg} ${badge.text}`}
      >
        {product.category}
      </span>

      {/* Product name */}
      <h3 className="mt-3 text-[15px] font-semibold leading-snug text-[var(--text-primary)] line-clamp-2">
        {product.name}
      </h3>

      {/* Description */}
      <p className="mt-1.5 line-clamp-2 text-[13px] leading-relaxed text-[var(--text-secondary)]">
        {product.description}
      </p>

      {/* Spacer pushes footer to bottom */}
      <div className="flex-1" />

      {/* Footer */}
      <div className="mt-4 flex items-end justify-between border-t border-[var(--border)] pt-4">
        {/* Price */}
        <span className="text-lg font-bold text-[var(--text-primary)]">
          {formattedPrice}
        </span>

        {/* Rating */}
        <div
          className="flex flex-col items-end gap-0.5"
          aria-label={`Rated ${product.rating} out of 5 stars from ${product.reviewCount.toLocaleString()} reviews`}
        >
          <StarRating rating={product.rating} />
          <span className="text-[11px] text-[var(--text-muted)]">
            {product.rating.toFixed(1)} · {product.reviewCount.toLocaleString()} reviews
          </span>
        </div>
      </div>
    </article>
  );
}
