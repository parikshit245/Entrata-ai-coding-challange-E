"use client";

interface PriceFilterProps {
  min: number | null;
  max: number | null;
  datasetMin: number;
  datasetMax: number;
  onChange: (min: number | null, max: number | null) => void;
}

/**
 * PriceFilter
 *
 * Paired numeric inputs for min/max price.
 * Shows an inline error when min > max (impossible range) rather than
 * silently returning empty results.
 */
export function PriceFilter({
  min,
  max,
  datasetMin,
  datasetMax,
  onChange,
}: PriceFilterProps) {
  const isInvalidRange = min !== null && max !== null && min > max;

  return (
    <fieldset className="border-none p-0">
      <legend className="text-xs font-semibold uppercase tracking-wider text-[var(--text-muted)]">
        Price Range
      </legend>

      <div className="mt-3 flex items-center gap-2">
        {/* Min input */}
        <div className="relative flex-1">
          <span className="pointer-events-none absolute left-2.5 top-1/2 -translate-y-1/2 text-xs text-[var(--text-muted)]">
            $
          </span>
          <label htmlFor="price-min" className="sr-only">
            Minimum price
          </label>
          <input
            type="number"
            id="price-min"
            name="price-min"
            min={0}
            step={1}
            placeholder={String(datasetMin)}
            value={min ?? ""}
            onChange={(e) =>
              onChange(e.target.value === "" ? null : Number(e.target.value), max)
            }
            aria-label="Minimum price"
            aria-invalid={isInvalidRange}
            className={`w-full rounded-[var(--radius-sm)] border py-2 pl-6 pr-2 text-sm text-[var(--text-primary)] transition-colors focus:outline-none focus:ring-2 focus:ring-offset-0 ${
              isInvalidRange
                ? "border-[var(--error)] focus:ring-red-200"
                : "border-[var(--border)] focus:border-[var(--accent)] focus:ring-[var(--accent-subtle)]"
            }`}
          />
        </div>

        <span className="text-[var(--text-muted)] text-xs select-none" aria-hidden="true">
          to
        </span>

        {/* Max input */}
        <div className="relative flex-1">
          <span className="pointer-events-none absolute left-2.5 top-1/2 -translate-y-1/2 text-xs text-[var(--text-muted)]">
            $
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
            placeholder={String(datasetMax)}
            value={max ?? ""}
            onChange={(e) =>
              onChange(min, e.target.value === "" ? null : Number(e.target.value))
            }
            aria-label="Maximum price"
            aria-invalid={isInvalidRange}
            className={`w-full rounded-[var(--radius-sm)] border py-2 pl-6 pr-2 text-sm text-[var(--text-primary)] transition-colors focus:outline-none focus:ring-2 focus:ring-offset-0 ${
              isInvalidRange
                ? "border-[var(--error)] focus:ring-red-200"
                : "border-[var(--border)] focus:border-[var(--accent)] focus:ring-[var(--accent-subtle)]"
            }`}
          />
        </div>
      </div>

      {isInvalidRange && (
        <p
          role="alert"
          id="price-range-error"
          className="mt-1.5 flex items-center gap-1 text-xs text-[var(--error)]"
        >
          <span aria-hidden="true">⚠</span>
          Min cannot exceed max price.
        </p>
      )}
    </fieldset>
  );
}
