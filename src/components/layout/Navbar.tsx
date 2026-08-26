"use client";

interface NavbarProps {
  onCategorySelect?: (category: string) => void;
}

/**
 * Navbar
 *
 * Modern top navigation bar with brand identity, search mockup,
 * category links, and e-commerce utility badges.
 */
export function Navbar({ onCategorySelect }: NavbarProps) {
  return (
    <header className="sticky top-0 z-30 border-b border-[var(--border)] bg-[var(--surface)]/90 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        {/* Brand */}
        <div className="flex items-center gap-8">
          <a href="#" className="text-decoration-none flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-[var(--radius-md)] bg-[var(--accent)] text-white shadow-sm">
              <svg
                className="h-5 w-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2.5"
                  d="M13 10V3L4 14h7v7l9-11h-7z"
                />
              </svg>
            </div>
            <div className="flex flex-col">
              <span className="text-base font-bold tracking-tight text-[var(--text-primary)]">
                LUMINA<span className="text-[var(--accent)]">.</span>
              </span>
              <span className="-mt-1 text-[10px] font-semibold tracking-widest text-[var(--text-muted)] uppercase">
                Store
              </span>
            </div>
          </a>

          {/* Navigation Links (Desktop) */}
          <nav className="hidden items-center gap-6 text-xs font-medium text-[var(--text-secondary)] md:flex">
            <a
              href="#catalog-section"
              className="font-semibold text-[var(--accent)] transition-colors hover:text-[var(--accent-hover)]"
            >
              All Products
            </a>
            <button
              type="button"
              onClick={() => onCategorySelect?.("Electronics")}
              className="transition-colors hover:text-[var(--text-primary)]"
            >
              Electronics
            </button>
            <button
              type="button"
              onClick={() => onCategorySelect?.("Clothing")}
              className="transition-colors hover:text-[var(--text-primary)]"
            >
              Apparel
            </button>
            <button
              type="button"
              onClick={() => onCategorySelect?.("Books")}
              className="transition-colors hover:text-[var(--text-primary)]"
            >
              Books
            </button>
            <button
              type="button"
              onClick={() => onCategorySelect?.("Home & Garden")}
              className="transition-colors hover:text-[var(--text-primary)]"
            >
              Home & Living
            </button>
          </nav>
        </div>

        {/* Right Action Icons */}
        <div className="flex items-center gap-3">
          {/* Wishlist */}
          <button
            type="button"
            className="relative flex h-8 w-8 items-center justify-center rounded-full text-[var(--text-secondary)] transition-colors hover:bg-[var(--surface-subtle)] hover:text-[var(--text-primary)]"
            aria-label="Wishlist"
          >
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
                d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
              />
            </svg>
            <span className="absolute -top-0.5 -right-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-[var(--accent)] text-[9px] font-bold text-white">
              3
            </span>
          </button>

          {/* Cart */}
          <button
            type="button"
            className="relative flex h-8 w-8 items-center justify-center rounded-full text-[var(--text-secondary)] transition-colors hover:bg-[var(--surface-subtle)] hover:text-[var(--text-primary)]"
            aria-label="Cart"
          >
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
                d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
              />
            </svg>
            <span className="absolute -top-0.5 -right-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-[var(--text-primary)] text-[9px] font-bold text-white">
              2
            </span>
          </button>

          {/* Profile / Account badge */}
          <div className="hidden items-center gap-2 border-l border-[var(--border)] pl-3 sm:flex">
            <div className="flex h-7 w-7 items-center justify-center rounded-full bg-[var(--accent-subtle)] text-[11px] font-bold text-[var(--accent)]">
              PR
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
