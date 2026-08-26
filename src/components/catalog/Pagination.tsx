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
 * Renders previous/next controls plus page number buttons.
 * Hidden when there is only 1 page.
 *
 * Accessibility:
 *   - Wrapped in a <nav> with aria-label="Pagination".
 *   - Current page button has aria-current="page".
 *   - Disabled buttons carry aria-disabled="true".
 *   - All buttons have descriptive aria-labels.
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
      className="flex items-center justify-center gap-1 pt-6"
    >
      {/* Previous */}
      <button
        type="button"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        aria-label="Go to previous page"
        aria-disabled={currentPage === 1}
        className="rounded-md border border-gray-300 px-3 py-1.5 text-sm text-gray-700 hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-40 focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        ← Prev
      </button>

      {/* Page numbers */}
      {pages.map((item, idx) =>
        item === "ellipsis" ? (
          <span
            key={`ellipsis-${idx}`}
            className="px-2 text-gray-400"
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
            className={`min-w-[36px] rounded-md border px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              item === currentPage
                ? "border-blue-600 bg-blue-600 font-semibold text-white"
                : "border-gray-300 text-gray-700 hover:bg-gray-50"
            }`}
          >
            {item}
          </button>
        ),
      )}

      {/* Next */}
      <button
        type="button"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        aria-label="Go to next page"
        aria-disabled={currentPage === totalPages}
        className="rounded-md border border-gray-300 px-3 py-1.5 text-sm text-gray-700 hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-40 focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        Next →
      </button>
    </nav>
  );
}

/**
 * Build a windowed page range with ellipsis markers.
 * e.g. [1, "ellipsis", 4, 5, 6, "ellipsis", 10]
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
