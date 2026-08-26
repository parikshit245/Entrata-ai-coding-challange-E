"use client";

import { ProductCategory } from "@/types/product";

interface HeroSectionProps {
  selectedCategories: ProductCategory[];
  onSelectCategory: (category: ProductCategory) => void;
  totalProductsCount: number;
}

interface CategoryPill {
  label: string;
  category: ProductCategory;
  icon: (props: { className?: string }) => React.ReactNode;
}

const FEATURED_PILLS: CategoryPill[] = [
  {
    label: "Electronics",
    category: "Electronics",
    icon: ({ className }) => (
      <svg
        className={className}
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M13 10V3L4 14h7v7l9-11h-7z"
        />
      </svg>
    ),
  },
  {
    label: "Apparel",
    category: "Clothing",
    icon: ({ className }) => (
      <svg
        className={className}
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
        />
      </svg>
    ),
  },
  {
    label: "Books",
    category: "Books",
    icon: ({ className }) => (
      <svg
        className={className}
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
        />
      </svg>
    ),
  },
  {
    label: "Home & Garden",
    category: "Home & Garden",
    icon: ({ className }) => (
      <svg
        className={className}
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
        />
      </svg>
    ),
  },
  {
    label: "Sports",
    category: "Sports & Outdoors",
    icon: ({ className }) => (
      <svg
        className={className}
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
    ),
  },
  {
    label: "Beauty & Health",
    category: "Beauty & Health",
    icon: ({ className }) => (
      <svg
        className={className}
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"
        />
      </svg>
    ),
  },
];

/**
 * HeroSection
 *
 * Professional hero banner featuring SVG icons, dynamic category pills,
 * live metrics, and clean modern styling with zero emojis.
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
            <span className="flex h-2 w-2 animate-pulse rounded-full bg-[var(--success)]" />
            <span>Curated Catalog 2026</span>
            <span className="text-[var(--text-muted)]">•</span>
            <span className="font-semibold text-[var(--text-primary)]">
              {totalProductsCount} Products Listed
            </span>
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
            Instantly refine by multi-category selection, price boundaries, and
            verified customer ratings with deterministic combination.
          </p>

          {/* Quick Category Shortcut Pills */}
          <div className="mt-6 flex flex-wrap items-center justify-center gap-2">
            <span className="mr-1 hidden text-xs font-semibold tracking-wider text-[var(--text-muted)] uppercase sm:inline">
              Quick Filter:
            </span>
            {FEATURED_PILLS.map((pill) => {
              const isSelected = selectedCategories.includes(pill.category);
              const Icon = pill.icon;
              return (
                <button
                  key={pill.category}
                  type="button"
                  onClick={() => {
                    onSelectCategory(pill.category);
                    scrollToCatalog();
                  }}
                  className={`inline-flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-xs font-medium transition-all duration-150 ${
                    isSelected
                      ? "scale-105 bg-[var(--accent)] text-white shadow-sm ring-2 ring-[var(--accent)]/30"
                      : "border border-[var(--border)] bg-[var(--surface)] text-[var(--text-secondary)] shadow-xs hover:border-[var(--accent)] hover:text-[var(--accent)]"
                  }`}
                  aria-pressed={isSelected}
                >
                  <Icon className="h-3.5 w-3.5" />
                  <span>{pill.label}</span>
                </button>
              );
            })}
          </div>

          {/* Key Value Propositions Bar */}
          <div className="mt-10 grid grid-cols-2 gap-4 border-t border-[var(--border)] pt-6 sm:grid-cols-4 sm:gap-8">
            <div className="flex items-center gap-2 text-left">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[var(--accent-subtle)] text-[var(--accent)]">
                <svg
                  className="h-4 w-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M13 10V3L4 14h7v7l9-11h-7z"
                  />
                </svg>
              </div>
              <div>
                <p className="text-xs font-bold text-[var(--text-primary)]">
                  Instant Filtering
                </p>
                <p className="text-[11px] text-[var(--text-muted)]">
                  Sub-millisecond pipeline
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 text-left">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-amber-50 text-amber-600">
                <svg
                  className="h-4 w-4"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              </div>
              <div>
                <p className="text-xs font-bold text-[var(--text-primary)]">
                  Verified Reviews
                </p>
                <p className="text-[11px] text-[var(--text-muted)]">
                  4.5+ average rating
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 text-left">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-emerald-50 text-emerald-600">
                <svg
                  className="h-4 w-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                  />
                </svg>
              </div>
              <div>
                <p className="text-xs font-bold text-[var(--text-primary)]">
                  Quality Checked
                </p>
                <p className="text-[11px] text-[var(--text-muted)]">
                  Premium craftsmanship
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 text-left">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-violet-50 text-violet-600">
                <svg
                  className="h-4 w-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <div>
                <p className="text-xs font-bold text-[var(--text-primary)]">
                  Fast Delivery
                </p>
                <p className="text-[11px] text-[var(--text-muted)]">
                  Tracked shipments
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
