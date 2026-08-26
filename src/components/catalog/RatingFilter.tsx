"use client";

const RATING_OPTIONS = [4.5, 4.0, 3.5, 3.0] as const;

interface RatingFilterProps {
  /** Currently active minimum rating (null = any). */
  minRating: number | null;
  /** Called when the user selects or deselects a minimum rating. */
  onChange: (rating: number | null) => void;
}

/**
 * RatingFilter
 *
 * Radio-style buttons for selecting a minimum star rating.
 * Clicking the active selection again clears it (acts as a toggle).
 *
 * Accessibility:
 *   - Native <input type="radio"> — keyboard navigable with arrow keys.
 *   - Wrapped in <fieldset> / <legend>.
 *   - Each option's aria-label includes the star count for screen readers.
 */
export function RatingFilter({ minRating, onChange }: RatingFilterProps) {
  return (
    <fieldset>
      <legend className="text-sm font-semibold text-gray-700">
        Minimum Rating
      </legend>
      <div className="mt-2 space-y-2">
        {RATING_OPTIONS.map((rating) => {
          const id = `rating-${rating}`;
          const isSelected = minRating === rating;
          return (
            <label
              key={rating}
              htmlFor={id}
              className="flex cursor-pointer items-center gap-2 text-sm text-gray-700 hover:text-gray-900"
            >
              <input
                type="radio"
                id={id}
                name="min-rating"
                checked={isSelected}
                onChange={() => onChange(isSelected ? null : rating)}
                className="h-4 w-4 border-gray-300 text-blue-600 focus:ring-blue-500"
                aria-label={`${rating} stars and above`}
              />
              <span className="text-yellow-400">{"★".repeat(Math.floor(rating))}</span>
              <span>{rating}+ stars</span>
            </label>
          );
        })}
      </div>
    </fieldset>
  );
}
