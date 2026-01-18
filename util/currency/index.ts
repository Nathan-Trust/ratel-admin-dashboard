/**
 * Formats a given number as a currency string in Nigerian Naira (NGN),
 * including comma separators for thousands.
 * 
 * @param amount - The numeric value to format.
 * @returns A formatted string in the format "NGN X,XXX.XX".
 */
export const formatCurrency = (amount: number): string => {
  return `NGN ${amount.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}`;
};


/**
 * Formats a number with comma separators and exactly two decimal places.
 *
 * @param {number} n - The number to format (e.g., 1000).
 * @returns {string} The formatted number as a string (e.g., "1,000.00").
 */
export function formatNumber(n: number): string {
  return n.toLocaleString(undefined, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}

/**
 * Formats a number with comma separators and exactly two decimal places.
 *
 * @param {number} n - The number to format (e.g., 1000).
 * @returns {string} The formatted number as a string (e.g., "1,000.00").
 */
export function formatNumberWithoutMin(n: number): string {
  return n.toLocaleString(undefined, {
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  });
}