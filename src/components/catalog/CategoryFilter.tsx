"use client";

import { ProductCategory, PRODUCT_CATEGORIES } from "@/types/product";

interface CategoryFilterProps {
  /** Currently selected categories. */
  selected: ProductCategory[];
  /** Toggle a category on/off. */
  onToggle: (category: ProductCategory) => void;
}

/**
 * CategoryFilter
 *
 * Renders a checkbox list for each available product category.
 * Multi-select — selecting multiple categories broadens results (OR within
 * the category dimension, AND with other filter dimensions).
 *
 * Accessibility:
 *   - Each checkbox has an associated <label> (htmlFor).
 *   - The group is wrapped in a <fieldset> with a <legend>.
 *   - Keyboard operable out of the box via native <input type="checkbox">.
 */
export function CategoryFilter({ selected, onToggle }: CategoryFilterProps) {
  return (
    <fieldset>
      <legend className="text-sm font-semibold text-gray-700">Category</legend>
      <div className="mt-2 space-y-2">
        {PRODUCT_CATEGORIES.map((category) => {
          const id = `category-${category.replace(/\s+/g, "-").toLowerCase()}`;
          const isChecked = selected.includes(category);
          return (
            <label
              key={category}
              htmlFor={id}
              className="flex cursor-pointer items-center gap-2 text-sm text-gray-700 hover:text-gray-900"
            >
              <input
                type="checkbox"
                id={id}
                checked={isChecked}
                onChange={() => onToggle(category)}
                className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                aria-label={category}
              />
              {category}
            </label>
          );
        })}
      </div>
    </fieldset>
  );
}
