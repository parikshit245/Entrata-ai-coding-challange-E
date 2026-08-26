"use client";

interface PaginationProps {
  /** Current page number (1-indexed). */
  currentPage: number;
  /** Total number of pages. */
  totalPages: number;
  /** Called when the user navigates to a page. */
  onPageChange: (page: number) => void;
}

/**
 * Pagination
 *
 * Polished pagination bar with subtle active state, accessible buttons,
 * and elegant keyboard interactions.
 */
export function Pagination({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationProps) {
  if (totalPages <= 1) return null;

  const pages = buildPageRange(currentPage, totalPages);

  return (
    <nav
      id="pagination"
      aria-label="Pagination"
      className="mt-8 flex items-center justify-center gap-1.5 border-t border-[var(--border)] pt-6"
    >
      {/* Previous */}
      <button
        type="button"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        aria-label="Go to previous page"
        aria-disabled={currentPage === 1}
        className="flex items-center gap-1 rounded-[var(--radius-sm)] border border-[var(--border)] bg-[var(--surface)] px-3 py-1.5 text-xs font-medium text-[var(--text-secondary)] shadow-sm transition-colors hover:bg-[var(--surface-subtle)] hover:text-[var(--text-primary)] disabled:pointer-events-none disabled:opacity-40 focus:outline-none focus:ring-2 focus:ring-[var(--accent)]"
      >
        <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
        </svg>
        <span>Prev</span>
      </button>

      {/* Page numbers */}
      <div className="flex items-center gap-1">
        {pages.map((item, idx) =>
          item === "ellipsis" ? (
            <span
              key={`ellipsis-${idx}`}
              className="px-2 text-xs text-[var(--text-muted)] select-none"
              aria-hidden="true"
            >
              …
            </span>
          ) : (
            <button
              key={item}
              type="button"
              onClick={() => onPageChange(item)}
              aria-label={`Go to page ${item}`}
              aria-current={item === currentPage ? "page" : undefined}
              className={`min-w-[32px] rounded-[var(--radius-sm)] px-2.5 py-1.5 text-xs font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-[var(--accent)] ${
                item === currentPage
                  ? "bg-[var(--accent)] text-white shadow-sm"
                  : "border border-[var(--border)] bg-[var(--surface)] text-[var(--text-secondary)] hover:bg-[var(--surface-subtle)] hover:text-[var(--text-primary)]"
              }`}
            >
              {item}
            </button>
          ),
        )}
      </div>

      {/* Next */}
      <button
        type="button"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        aria-label="Go to next page"
        aria-disabled={currentPage === totalPages}
        className="flex items-center gap-1 rounded-[var(--radius-sm)] border border-[var(--border)] bg-[var(--surface)] px-3 py-1.5 text-xs font-medium text-[var(--text-secondary)] shadow-sm transition-colors hover:bg-[var(--surface-subtle)] hover:text-[var(--text-primary)] disabled:pointer-events-none disabled:opacity-40 focus:outline-none focus:ring-2 focus:ring-[var(--accent)]"
      >
        <span>Next</span>
        <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
        </svg>
      </button>
    </nav>
  );
}

/**
 * Build a windowed page range with ellipsis markers.
 */
function buildPageRange(
  current: number,
  total: number,
): (number | "ellipsis")[] {
  if (total <= 7) {
    return Array.from({ length: total }, (_, i) => i + 1);
  }

  const pages: (number | "ellipsis")[] = [1];

  if (current > 3) pages.push("ellipsis");

  const rangeStart = Math.max(2, current - 1);
  const rangeEnd = Math.min(total - 1, current + 1);
  for (let i = rangeStart; i <= rangeEnd; i++) {
    pages.push(i);
  }

  if (current < total - 2) pages.push("ellipsis");

  pages.push(total);
  return pages;
}
