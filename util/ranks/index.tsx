/**
 * Returns a number with its ordinal suffix (1st, 2nd, 3rd, 4th, etc.).
 *
 * Handles special cases like 11th, 12th, 13th correctly.
 *
 * @example
 * getOrdinalSuffix(1); // "1st"
 * getOrdinalSuffix(2); // "2nd"
 * getOrdinalSuffix(3); // "3rd"
 * getOrdinalSuffix(4); // "4th"
 * getOrdinalSuffix(11); // "11th"
 * getOrdinalSuffix(21); // "21st"
 *
 * @param {number} n - The number to format.
 * @returns {string} The number with its ordinal suffix.
 */
export function getOrdinalSuffix(n: number): string {
  const j = n % 10;
  const k = n % 100;

  if (j === 1 && k !== 11) {
    return `${n}st`;
  }
  if (j === 2 && k !== 12) {
    return `${n}nd`;
  }
  if (j === 3 && k !== 13) {
    return `${n}rd`;
  }
  return `${n}th`;
}
