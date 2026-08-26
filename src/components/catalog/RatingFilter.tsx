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
 * Radio-style minimum rating selector.
 * Clicking the active option again clears it (toggle behaviour).
 *
 * Each option shows filled/empty stars so the threshold is immediately
 * understandable at a glance.
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

              {/* Star display */}
              <span
                className="text-sm tracking-tight text-[var(--star)]"
                aria-hidden="true"
              >
                {"★".repeat(option.stars)}
                {"☆".repeat(5 - option.stars)}
              </span>

              <span className={isSelected ? "" : "text-[var(--text-secondary)]"}>
                {option.value}+
              </span>
            </label>
          );
        })}
      </div>
    </fieldset>
  );
}
