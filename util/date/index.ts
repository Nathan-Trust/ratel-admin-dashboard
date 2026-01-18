import { format, formatDistanceToNow, parseISO } from "date-fns";

export const formattedDate = (date: string) => {
  const newDate = parseISO(date);
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "short",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: undefined,
  };

  return new Intl.DateTimeFormat(undefined, options).format(newDate);
};

export const formattedFnsDate = (date: Date) =>  format(date, "d MMMM yyyy, h:mm a");

/**
 * Converts a given ISO 8601 date string to a human-readable relative time format (e.g., "3 months ago").
 * 
 * @param {string} dateString - The ISO 8601 date string (e.g., "2025-01-24T19:57:43.000000Z").
 * @returns {string} A human-readable relative time (e.g., "3 months ago").
 * 
 * @example
 * const relativeTime = convertToRelativeTime("2025-01-24T19:57:43.000000Z");
 * console.log(relativeTime); // Output: "3 months ago"
 */
export function convertToRelativeTime(dateString: string) {
  const date = parseISO(dateString); // Parse the ISO string to a Date object
  return formatDistanceToNow(date, { addSuffix: true }); // Get the relative time string
}


/**
 * Formats a given ISO date string to "DD-MM-YYYY / HH:mm" format.
 * @param {string} isoString - The ISO date string (e.g., "2025-03-06T01:58:41.000000Z").
 * @returns {string} - The formatted date (e.g., "06-03-2025 / 01:58").
 */
export function formatDateTime(isoString: string): string {
  const date = new Date(isoString);
  const day = String(date.getUTCDate()).padStart(2, "0");
  const month = String(date.getUTCMonth() + 1).padStart(2, "0"); // Months are zero-based
  const year = date.getUTCFullYear();
  const hours = String(date.getUTCHours()).padStart(2, "0");
  const minutes = String(date.getUTCMinutes()).padStart(2, "0");

  return `${day}-${month}-${year} / ${hours}:${minutes}`;
}
