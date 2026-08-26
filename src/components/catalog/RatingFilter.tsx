"use client";

const RATING_OPTIONS = [
  { value: 4.5, label: "4.5+ stars", stars: 5 },
  { value: 4.0, label: "4.0+ stars", stars: 4 },
  { value: 3.5, label: "3.5+ stars", stars: 4 },
  { value: 3.0, label: "3.0+ stars", stars: 3 },
] as const;

interface RatingFilterProps {
  minRating: number | null;
  onChange: (rating: number | null) => void;
}

/**
 * RatingFilter
 *
 * Radio-style minimum rating selector with vector SVG stars.
 */
export function RatingFilter({ minRating, onChange }: RatingFilterProps) {
  return (
    <fieldset className="border-none p-0">
      <legend className="text-xs font-semibold uppercase tracking-wider text-[var(--text-muted)]">
        Minimum Rating
      </legend>

      <div className="mt-3 space-y-1">
        {RATING_OPTIONS.map((option) => {
          const isSelected = minRating === option.value;
          const id = `rating-${option.value}`;

          return (
            <label
              key={option.value}
              htmlFor={id}
              className={`flex cursor-pointer items-center gap-3 rounded-[var(--radius-sm)] px-2.5 py-2 text-sm transition-colors duration-100 ${
                isSelected
                  ? "bg-[var(--accent-subtle)] text-[var(--accent-text)] font-medium"
                  : "text-[var(--text-secondary)] hover:bg-[var(--surface-subtle)]"
              }`}
            >
              {/* Custom radio indicator */}
              <span
                className={`flex h-4 w-4 shrink-0 items-center justify-center rounded-full border transition-colors duration-100 ${
                  isSelected
                    ? "border-[var(--accent)] bg-[var(--accent)]"
                    : "border-[var(--border-strong)] bg-white"
                }`}
                aria-hidden="true"
              >
                {isSelected && (
                  <span className="h-1.5 w-1.5 rounded-full bg-white" />
                )}
              </span>

              <input
                type="radio"
                id={id}
                name="min-rating"
                checked={isSelected}
                onChange={() => onChange(isSelected ? null : option.value)}
                className="sr-only"
                aria-label={option.label}
              />

              {/* Star display with vector SVGs */}
              <div className="flex items-center gap-0.5 text-[var(--star)]" aria-hidden="true">
                {[1, 2, 3, 4, 5].map((star) => (
                  <svg
                    key={star}
                    className={`h-3 w-3 ${star <= option.stars ? "fill-amber-400 text-amber-400" : "fill-gray-200 text-gray-200"}`}
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>

              <span className={`text-xs ${isSelected ? "font-semibold text-[var(--text-primary)]" : "text-[var(--text-secondary)]"}`}>
                {option.value}+
              </span>
            </label>
          );
        })}
      </div>
    </fieldset>
  );
}
