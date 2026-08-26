/**
 * CatalogHeader
 *
 * Page heading and sub-heading for the product catalog.
 * Lives at the top of the page, above the filter/product split.
 */
export function CatalogHeader() {
  return (
    <header className="border-b border-gray-200 bg-white px-4 py-6 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
          Product Catalog
        </h1>
        <p className="mt-1 text-sm text-gray-500">
          Browse our collection — filter by category, price, and rating.
        </p>
      </div>
    </header>
  );
}
