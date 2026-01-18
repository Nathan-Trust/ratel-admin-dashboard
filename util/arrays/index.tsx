import { useMemo } from 'react';

/**
 * Filters an array of objects by a list of IDs (or any key) and preserves the order of the IDs.
 *
 * @template T - The type of objects in the data array.
 * @template K - The key in the object to match against (must be a string property).
 *
 * @param {T[]} data - The array of objects to filter.
 * @param {string[]} values - The list of values to match against the specified key.
 * @param {K} key - The object key to filter by (defaults to "id").
 * @returns {T[]} - A filtered array containing only objects whose `key` matches one of the provided values, in the same order as `values`.
 *
 * @example
 * const countries = [
 *   { id: "USD", name: "United States" },
 *   { id: "GBP", name: "United Kingdom" },
 *   { id: "EUR", name: "Eurozone" }
 * ];
 * const wantedIds = ["EUR", "GBP"];
 * const filtered = useFilterByIds(countries, wantedIds, "id");
 * // filtered = [
 * //   { id: "EUR", name: "Eurozone" },
 * //   { id: "GBP", name: "United Kingdom" }
 * // ]
 */
export function useFilterByIds<
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  T extends Record<string, any>,
  K extends keyof T,
>(data: T[], values: string[], key: K = 'id' as K): T[] {
  return useMemo(() => {
    if (!Array.isArray(data) || !Array.isArray(values)) return [];
    return values
      .map((value) => data.find((item) => String(item[key]) === value))
      .filter((item): item is T => Boolean(item));
  }, [data, values, key]);
}
