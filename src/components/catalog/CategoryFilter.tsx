"use client";

import { ProductCategory, PRODUCT_CATEGORIES } from "@/types/product";

interface CategoryFilterProps {
  selected: ProductCategory[];
  onToggle: (category: ProductCategory) => void;
}

/**
 * CategoryFilter
 *
 * Multi-select checkbox list. Selected state uses the accent color with
 * a filled chip appearance to make active selections immediately obvious.
 */
export function CategoryFilter({ selected, onToggle }: CategoryFilterProps) {
  return (
    <fieldset className="border-none p-0">
      <legend className="text-xs font-semibold tracking-wider text-[var(--text-muted)] uppercase">
        Category
      </legend>
      <div className="mt-3 space-y-1">
        {PRODUCT_CATEGORIES.map((category) => {
          const id = `category-${category.replace(/\s+/g, "-").toLowerCase()}`;
          const isChecked = selected.includes(category);
          return (
            <label
              key={category}
              htmlFor={id}
              className={`flex cursor-pointer items-center gap-3 rounded-[var(--radius-sm)] px-2.5 py-2 text-sm transition-colors duration-100 ${
                isChecked
                  ? "bg-[var(--accent-subtle)] font-medium text-[var(--accent-text)]"
                  : "text-[var(--text-secondary)] hover:bg-[var(--surface-subtle)]"
              }`}
            >
              {/* Custom checkbox visual */}
              <span
                className={`flex h-4 w-4 shrink-0 items-center justify-center rounded border transition-colors duration-100 ${
                  isChecked
                    ? "border-[var(--accent)] bg-[var(--accent)]"
                    : "border-[var(--border-strong)] bg-white"
                }`}
                aria-hidden="true"
              >
                {isChecked && (
                  <svg
                    className="h-2.5 w-2.5 text-white"
                    viewBox="0 0 10 8"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <polyline points="1,4 4,7 9,1" />
                  </svg>
                )}
              </span>

              <input
                type="checkbox"
                id={id}
                checked={isChecked}
                onChange={() => onToggle(category)}
                className="sr-only"
                aria-label={category}
              />

              <span>{category}</span>
            </label>
          );
        })}
      </div>
    </fieldset>
  );
}
