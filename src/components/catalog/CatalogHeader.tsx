/**
 * CatalogHeader
 *
 * Page-level heading. Clean, purposeful — communicates what this page is
 * without consuming excessive vertical real estate.
 */
export function CatalogHeader() {
  return (
    <header className="border-b border-[var(--border)] bg-[var(--surface)]">
      <div className="mx-auto max-w-7xl px-4 py-5 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-0.5">
          <h1 className="text-xl font-semibold tracking-tight text-[var(--text-primary)] sm:text-2xl">
            Product Catalog
          </h1>
          <p className="text-sm text-[var(--text-muted)]">
            Filter by category, price, and rating to find exactly what you need.
          </p>
        </div>
      </div>
    </header>
  );
}
