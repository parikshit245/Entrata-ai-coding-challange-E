/**
 * Domain model for a product in the catalog.
 */
export interface Product {
  id: string;
  name: string;
  category: ProductCategory;
  price: number;
  rating: number;
  description: string;
  imageUrl?: string;
  reviewCount: number;
}

/**
 * Available product categories.
 */
export type ProductCategory =
  | "Electronics"
  | "Clothing"
  | "Books"
  | "Home & Garden"
  | "Sports & Outdoors"
  | "Toys & Games"
  | "Beauty & Health";

/**
 * All available category values as a constant array for iteration.
 */
export const PRODUCT_CATEGORIES: ProductCategory[] = [
  "Electronics",
  "Clothing",
  "Books",
  "Home & Garden",
  "Sports & Outdoors",
  "Toys & Games",
  "Beauty & Health",
];

/**
 * Sort options for the product catalog.
 */
export type SortOption =
  | "relevance"
  | "price-asc"
  | "price-desc"
  | "rating-desc"
  | "name-asc";

export const SORT_OPTIONS: { value: SortOption; label: string }[] = [
  { value: "relevance", label: "Relevance" },
  { value: "price-asc", label: "Price: Low to High" },
  { value: "price-desc", label: "Price: High to Low" },
  { value: "rating-desc", label: "Highest Rated" },
  { value: "name-asc", label: "Name: A–Z" },
];

/**
 * Shape of the active filter state.
 */
export interface FilterState {
  categories: ProductCategory[];
  priceRange: PriceRange;
  minRating: number | null;
}

export interface PriceRange {
  min: number | null;
  max: number | null;
}

/**
 * Combined catalog query parameters (filters + sort + pagination).
 */
export interface CatalogQuery {
  filters: FilterState;
  sort: SortOption;
  page: number;
  pageSize: number;
}

/**
 * The result of applying a catalog query to the product dataset.
 */
export interface CatalogResult {
  products: Product[];
  totalCount: number;
  totalPages: number;
  currentPage: number;
  pageSize: number;
}

/**
 * Default/empty filter state.
 */
export const DEFAULT_FILTER_STATE: FilterState = {
  categories: [],
  priceRange: { min: null, max: null },
  minRating: null,
};

/**
 * Default catalog query.
 */
export const DEFAULT_CATALOG_QUERY: CatalogQuery = {
  filters: DEFAULT_FILTER_STATE,
  sort: "relevance",
  page: 1,
  pageSize: 12,
};
