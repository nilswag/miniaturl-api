/**
 * Utility module for formatting timestamps.
 * 
 * @module timestamp
 */

/**
 * Formats the current date and time as a timestamp.
 * 
 * @function format_timestamp
 * @returns {string} The formatted timestamp in the format `YYYY-MM-DD HH:MM:SS`.
 * 
 * @example
 * const timestamp = format_timestamp();
 * console.log(timestamp);
 * // Output: "2025-03-31 12:00:00"
 */
const format_timestamp = () => {
  return new Date().toISOString().replace("T", " ").split(".")[0];
};

module.exports = format_timestamp;