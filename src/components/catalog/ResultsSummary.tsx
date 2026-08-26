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
 * Clean and compact count summary that integrates smoothly into the toolbar.
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
    <div
      id="results-summary"
      className="text-xs text-[var(--text-secondary)]"
      aria-live="polite"
      aria-atomic="true"
    >
      {totalCount === 0 ? (
        <span className="font-medium text-[var(--text-muted)]">No products matching criteria</span>
      ) : (
        <div className="flex items-center gap-1.5">
          <span className="font-semibold text-[var(--text-primary)]">{totalCount}</span>
          <span>{totalCount === 1 ? "product" : "products"} found</span>
          {totalPages > 1 && (
            <span className="text-[var(--text-muted)]">
              (showing {start}–{end})
            </span>
          )}
        </div>
      )}
    </div>
  );
}
