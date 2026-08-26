"use client";

import { ProductCategory } from "@/types/product";

interface HeroSectionProps {
  selectedCategories: ProductCategory[];
  onSelectCategory: (category: ProductCategory) => void;
  totalProductsCount: number;
}

const FEATURED_PILLS: { label: string; category: ProductCategory; icon: string }[] = [
  { label: "Electronics", category: "Electronics", icon: "⚡" },
  { label: "Apparel", category: "Clothing", icon: "👔" },
  { label: "Books", category: "Books", icon: "📚" },
  { label: "Home & Garden", category: "Home & Garden", icon: "🪴" },
  { label: "Sports", category: "Sports & Outdoors", icon: "🏋️" },
  { label: "Beauty", category: "Beauty & Health", icon: "✨" },
];

/**
 * HeroSection
 *
 * Premium hero banner featuring dynamic category shortcut pills,
 * trust badges, and an eye-catching modern e-commerce headline.
 */
export function HeroSection({
  selectedCategories,
  onSelectCategory,
  totalProductsCount,
}: HeroSectionProps) {
  const scrollToCatalog = () => {
    const el = document.getElementById("catalog-section");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="relative overflow-hidden border-b border-[var(--border)] bg-gradient-to-b from-[var(--surface)] via-[var(--surface-subtle)]/40 to-[var(--background)] py-12 sm:py-16">
      {/* Decorative background light accents */}
      <div className="pointer-events-none absolute -top-24 left-1/2 h-96 w-96 -translate-x-1/2 rounded-full bg-[var(--accent)]/5 blur-3xl" />
      <div className="pointer-events-none absolute top-1/2 right-10 h-72 w-72 rounded-full bg-blue-400/5 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center text-center">
          {/* Top Announcement Pill */}
          <div className="inline-flex items-center gap-2 rounded-full border border-[var(--border)] bg-[var(--surface)] px-3.5 py-1 text-xs font-medium text-[var(--text-secondary)] shadow-sm">
            <span className="flex h-2 w-2 rounded-full bg-[var(--success)] animate-pulse" />
            <span>Curated Catalog 2026</span>
            <span className="text-[var(--text-muted)]">•</span>
            <span className="font-semibold text-[var(--text-primary)]">{totalProductsCount} Products Listed</span>
          </div>

          {/* Main Headline */}
          <h1 className="mt-5 max-w-3xl text-3xl font-extrabold tracking-tight text-[var(--text-primary)] sm:text-4xl lg:text-5xl">
            Find the perfect product with{" "}
            <span className="bg-gradient-to-r from-[var(--accent)] to-blue-500 bg-clip-text text-transparent">
              real-time filters
            </span>
            .
          </h1>

          {/* Subheading */}
          <p className="mt-3.5 max-w-2xl text-sm leading-relaxed text-[var(--text-secondary)] sm:text-base">
            Instantly refine by multi-category selection, price boundaries, and verified customer ratings with deterministic combination.
          </p>

          {/* Quick Category Shortcut Pills */}
          <div className="mt-6 flex flex-wrap items-center justify-center gap-2">
            <span className="text-xs font-semibold uppercase tracking-wider text-[var(--text-muted)] mr-1 hidden sm:inline">
              Quick Filter:
            </span>
            {FEATURED_PILLS.map((pill) => {
              const isSelected = selectedCategories.includes(pill.category);
              return (
                <button
                  key={pill.category}
                  type="button"
                  onClick={() => {
                    onSelectCategory(pill.category);
                    scrollToCatalog();
                  }}
                  className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium transition-all duration-150 ${
                    isSelected
                      ? "bg-[var(--accent)] text-white shadow-sm ring-2 ring-[var(--accent)]/30 scale-105"
                      : "border border-[var(--border)] bg-[var(--surface)] text-[var(--text-secondary)] hover:border-[var(--accent)] hover:text-[var(--accent)] shadow-xs"
                  }`}
                  aria-pressed={isSelected}
                >
                  <span>{pill.icon}</span>
                  <span>{pill.label}</span>
                </button>
              );
            })}
          </div>

          {/* Key Value Propositions Bar */}
          <div className="mt-10 grid grid-cols-2 gap-4 border-t border-[var(--border)] pt-6 sm:grid-cols-4 sm:gap-8">
            <div className="flex items-center gap-2 text-left">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[var(--accent-subtle)] text-[var(--accent)]">
                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <div>
                <p className="text-xs font-bold text-[var(--text-primary)]">Instant Filtering</p>
                <p className="text-[11px] text-[var(--text-muted)]">Sub-millisecond pipeline</p>
              </div>
            </div>

            <div className="flex items-center gap-2 text-left">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-amber-50 text-amber-600">
                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                </svg>
              </div>
              <div>
                <p className="text-xs font-bold text-[var(--text-primary)]">Verified Reviews</p>
                <p className="text-[11px] text-[var(--text-muted)]">4.5+ average rating</p>
              </div>
            </div>

            <div className="flex items-center gap-2 text-left">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-emerald-50 text-emerald-600">
                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <div>
                <p className="text-xs font-bold text-[var(--text-primary)]">Quality Checked</p>
                <p className="text-[11px] text-[var(--text-muted)]">Premium craftsmanship</p>
              </div>
            </div>

            <div className="flex items-center gap-2 text-left">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-violet-50 text-violet-600">
                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <p className="text-xs font-bold text-[var(--text-primary)]">Fast Delivery</p>
                <p className="text-[11px] text-[var(--text-muted)]">Tracked shipments</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
