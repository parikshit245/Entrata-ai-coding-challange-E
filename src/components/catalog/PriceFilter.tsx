"use client";

interface PriceFilterProps {
  /** Current min price value (null = unset). */
  min: number | null;
  /** Current max price value (null = unset). */
  max: number | null;
  /** Absolute minimum price in the dataset — used for input placeholder. */
  datasetMin: number;
  /** Absolute maximum price in the dataset — used for input placeholder. */
  datasetMax: number;
  /** Called when either bound changes. */
  onChange: (min: number | null, max: number | null) => void;
}

/**
 * PriceFilter
 *
 * Two numeric inputs (min / max) for a price range filter.
 * An empty input represents an unset bound (stored as null in state).
 *
 * Validation:
 *   When min > max both bounds are non-null, an inline error is displayed
 *   and the filter still applies (products satisfying min AND max will be
 *   empty, which is the correct AND-semantics result — not a silent failure).
 *   This makes the impossible range visible rather than confusing.
 *
 * Accessibility:
 *   - Inputs are labelled with sr-only <label> + aria-label for screen readers.
 *   - type="number" gives mobile a numeric keyboard.
 *   - Error message has role="alert" so it is announced immediately.
 */
export function PriceFilter({
  min,
  max,
  datasetMin,
  datasetMax,
  onChange,
}: PriceFilterProps) {
  const isInvalidRange =
    min !== null && max !== null && min > max;

  const handleMin = (value: string) => {
    const parsed = value === "" ? null : Number(value);
    onChange(parsed, max);
  };

  const handleMax = (value: string) => {
    const parsed = value === "" ? null : Number(value);
    onChange(min, parsed);
  };

  return (
    <fieldset>
      <legend className="text-sm font-semibold text-gray-700">
        Price Range
      </legend>

      <div className="mt-2 flex items-center gap-2">
        <label htmlFor="price-min" className="sr-only">
          Minimum price
        </label>
        <input
          type="number"
          id="price-min"
          name="price-min"
          min={0}
          step={1}
          placeholder={`$${datasetMin}`}
          value={min ?? ""}
          onChange={(e) => handleMin(e.target.value)}
          aria-label="Minimum price"
          aria-invalid={isInvalidRange}
          className={`w-full rounded-md border px-2 py-1.5 text-sm shadow-sm focus:outline-none focus:ring-1 ${
            isInvalidRange
              ? "border-red-400 focus:border-red-500 focus:ring-red-500"
              : "border-gray-300 focus:border-blue-500 focus:ring-blue-500"
          }`}
        />

        <span className="text-gray-400" aria-hidden="true">
          –
        </span>

        <label htmlFor="price-max" className="sr-only">
          Maximum price
        </label>
        <input
          type="number"
          id="price-max"
          name="price-max"
          min={0}
          step={1}
          placeholder={`$${datasetMax}`}
          value={max ?? ""}
          onChange={(e) => handleMax(e.target.value)}
          aria-label="Maximum price"
          aria-invalid={isInvalidRange}
          className={`w-full rounded-md border px-2 py-1.5 text-sm shadow-sm focus:outline-none focus:ring-1 ${
            isInvalidRange
              ? "border-red-400 focus:border-red-500 focus:ring-red-500"
              : "border-gray-300 focus:border-blue-500 focus:ring-blue-500"
          }`}
        />
      </div>

      {isInvalidRange && (
        <p
          role="alert"
          id="price-range-error"
          className="mt-1 text-xs text-red-600"
        >
          Min price cannot exceed max price.
        </p>
      )}
    </fieldset>
  );
}
