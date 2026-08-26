"use client";

import { useState } from "react";
import Image from "next/image";
import { Product } from "@/types/product";

interface ProductCardProps {
  product: Product;
}

/** Map each category to a subtle tint badge for visual scanning. */
const CATEGORY_COLORS: Record<string, { bg: string; text: string; border: string }> = {
  Electronics: { bg: "bg-blue-50/90", text: "text-blue-700", border: "border-blue-200/60" },
  Clothing: { bg: "bg-violet-50/90", text: "text-violet-700", border: "border-violet-200/60" },
  Books: { bg: "bg-amber-50/90", text: "text-amber-700", border: "border-amber-200/60" },
  "Home & Garden": { bg: "bg-emerald-50/90", text: "text-emerald-700", border: "border-emerald-200/60" },
  "Sports & Outdoors": { bg: "bg-orange-50/90", text: "text-orange-700", border: "border-orange-200/60" },
  "Toys & Games": { bg: "bg-pink-50/90", text: "text-pink-700", border: "border-pink-200/60" },
  "Beauty & Health": { bg: "bg-rose-50/90", text: "text-rose-700", border: "border-rose-200/60" },
};

const DEFAULT_BADGE = { bg: "bg-slate-50/90", text: "text-slate-600", border: "border-slate-200/60" };

/**
 * StarRating
 *
 * Renders filled/empty stars visually based on a 0–5 numeric rating.
 */
function StarRating({ rating }: { rating: number }) {
  const filled = Math.round(rating);
  return (
    <span aria-hidden="true" className="text-[var(--star)] text-xs tracking-tight">
      {"★".repeat(filled)}
      {"☆".repeat(Math.max(0, 5 - filled))}
    </span>
  );
}

/**
 * ProductCard
 *
 * E-commerce product card with photography, hover zoom, category badge,
 * clamped typography, star ratings, and interactive CTA.
 */
export function ProductCard({ product }: ProductCardProps) {
  const [imageError, setImageError] = useState(false);
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
      className="group flex flex-col overflow-hidden rounded-[var(--radius-lg)] border border-[var(--border)] bg-[var(--surface)] shadow-sm transition-all duration-200 ease-out hover:-translate-y-1 hover:border-[var(--border-strong)] hover:shadow-lg"
    >
      {/* Product Image Section */}
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-[var(--surface-subtle)]">
        {product.imageUrl && !imageError ? (
          <Image
            src={product.imageUrl}
            alt={product.name}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
            onError={() => setImageError(true)}
            priority={false}
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-[var(--surface-subtle)] text-[var(--text-muted)]">
            <svg className="h-10 w-10 opacity-40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
        )}

        {/* Category Pill floating top-left */}
        <div className="absolute left-3 top-3">
          <span
            className={`inline-flex items-center rounded-full border backdrop-blur-md px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider shadow-sm ${badge.bg} ${badge.text} ${badge.border}`}
          >
            {product.category}
          </span>
        </div>
      </div>

      {/* Content Section */}
      <div className="flex flex-1 flex-col p-4">
        {/* Title */}
        <h3 className="text-sm font-semibold leading-snug text-[var(--text-primary)] line-clamp-2 transition-colors group-hover:text-[var(--accent)]">
          {product.name}
        </h3>

        {/* Description */}
        <p className="mt-1 line-clamp-2 text-xs leading-relaxed text-[var(--text-secondary)]">
          {product.description}
        </p>

        {/* Rating row */}
        <div
          className="mt-3 flex items-center gap-1.5"
          aria-label={`Rated ${product.rating} out of 5 stars from ${product.reviewCount.toLocaleString()} reviews`}
        >
          <StarRating rating={product.rating} />
          <span className="text-xs font-semibold text-[var(--text-primary)]">
            {product.rating.toFixed(1)}
          </span>
          <span className="text-[11px] text-[var(--text-muted)]">
            ({product.reviewCount.toLocaleString()})
          </span>
        </div>

        {/* Spacer */}
        <div className="flex-1 min-h-[12px]" />

        {/* Card Footer: Price & CTA */}
        <div className="mt-3 flex items-center justify-between border-t border-[var(--border)] pt-3">
          <div className="flex flex-col">
            <span className="text-[10px] uppercase font-bold tracking-wider text-[var(--text-muted)]">
              Price
            </span>
            <span className="text-base font-bold text-[var(--text-primary)]">
              {formattedPrice}
            </span>
          </div>

          <button
            type="button"
            className="inline-flex items-center gap-1 rounded-[var(--radius-sm)] bg-[var(--surface-subtle)] px-2.5 py-1.5 text-xs font-medium text-[var(--text-primary)] transition-all hover:bg-[var(--accent)] hover:text-white focus:outline-none focus:ring-2 focus:ring-[var(--accent)]"
            aria-label={`Quick view ${product.name}`}
          >
            <span>View</span>
            <svg className="h-3 w-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>
    </article>
  );
}
