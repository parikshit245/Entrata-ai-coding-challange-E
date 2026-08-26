"use client";

interface PriceFilterProps {
  /** Current min price value (null = unset). */
  min: number | null;
  /** Current max price value (null = unset). */
  max: number | null;
  /** Absolute minimum price in the dataset (for placeholder/hint). */
  datasetMin: number;
  /** Absolute maximum price in the dataset (for placeholder/hint). */
  datasetMax: number;
  /** Called when either bound changes. */
  onChange: (min: number | null, max: number | null) => void;
}

/**
 * PriceFilter
 *
 * Two text inputs (min / max) for entering a price range.
 * Empty input = unset bound (null in state).
 *
 * Accessibility:
 *   - Each input has an associated <label>.
 *   - type="number" provides numeric keyboard on mobile.
 *   - aria-label adds context for screen readers.
 */
export function PriceFilter({
  min,
  max,
  datasetMin,
  datasetMax,
  onChange,
}: PriceFilterProps) {
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
          placeholder={`$${datasetMin}`}
          value={min ?? ""}
          onChange={(e) => handleMin(e.target.value)}
          className="w-full rounded-md border border-gray-300 px-2 py-1.5 text-sm shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
          aria-label="Minimum price"
        />
        <span className="text-gray-400">–</span>
        <label htmlFor="price-max" className="sr-only">
          Maximum price
        </label>
        <input
          type="number"
          id="price-max"
          name="price-max"
          min={0}
          placeholder={`$${datasetMax}`}
          value={max ?? ""}
          onChange={(e) => handleMax(e.target.value)}
          className="w-full rounded-md border border-gray-300 px-2 py-1.5 text-sm shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
          aria-label="Maximum price"
        />
      </div>
    </fieldset>
  );
}
