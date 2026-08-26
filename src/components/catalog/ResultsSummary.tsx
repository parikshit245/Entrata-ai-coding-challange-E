"use client";

interface ResultsSummaryProps {
  /** Total number of products after filters are applied. */
  totalCount: number;
  /** Current page number (1-indexed). */
  currentPage: number;
  /** Total number of pages. */
  totalPages: number;
  /** Number of items per page. */
  pageSize: number;
}

/**
 * ResultsSummary
 *
 * Displays a human-readable summary of the current result state.
 * e.g. "Showing 1–12 of 48 products"
 *
 * Uses aria-live="polite" so screen readers announce updates after filter
 * or page changes without interrupting the user.
 */
export function ResultsSummary({
  totalCount,
  currentPage,
  totalPages,
  pageSize,
}: ResultsSummaryProps) {
  const start = totalCount === 0 ? 0 : (currentPage - 1) * pageSize + 1;
  const end = Math.min(currentPage * pageSize, totalCount);

  return (
    <p
      id="results-summary"
      className="text-sm text-gray-500"
      aria-live="polite"
      aria-atomic="true"
    >
      {totalCount === 0 ? (
        "No products found."
      ) : (
        <>
          Showing{" "}
          <span className="font-semibold text-gray-700">
            {start}–{end}
          </span>{" "}
          of{" "}
          <span className="font-semibold text-gray-700">{totalCount}</span>{" "}
          product{totalCount === 1 ? "" : "s"}
          {totalPages > 1 && (
            <span className="text-gray-400">
              {" "}
              (page {currentPage} of {totalPages})
            </span>
          )}
        </>
      )}
    </p>
  );
}
