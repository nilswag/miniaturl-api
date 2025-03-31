/**
 * Service module for handling URL-related business logic.
 * 
 * @module url_service
 */

const { fetch_url_long, add_entry } = require("../db/url_queries");
const generate_url = require("../util/url_generator");

/**
 * Adds a new URL to the database.
 * 
 * @async
 * @function add_url
 * @param {string} long_url - The original long URL to be shortened.
 * @returns {Promise<Object>} The inserted URL entry, including the generated short URL.
 * @throws {Error} If the URL cannot be added to the database.
 * 
 * @example
 * const result = await add_url("https://example.com");
 * console.log(result);
 * // Output:
 * // {
 * //   id: 1,
 * //   long_url: "https://example.com",
 * //   short_url: "abc123",
 * //   clicks: 0,
 * //   created_at: "2025-03-31T12:00:00.000Z"
 * // }
 */
const add_url = async (long_url) => {
  let short_url = generate_url();

  // Ensure the generated short URL is unique
  let max_tries = 10;
  let tries = 0;
  while (tries < max_tries) {
    try {
      if (await fetch_url_long(long_url).rows) short_url = generate_url();
      else break;
      tries++;
    } catch (error) {
      console.error("Error fetching URL:", error);
      throw new Error("Failed to check URL uniqueness");
    }
  }

  // Add the URL entry to the database
  try {
    let res = await add_entry(long_url, short_url);
    return res;
  } catch (error) {
    console.log("Error adding URL:", error);
    throw new Error("Failed to add URL"); 
  }
};

module.exports = { add_url };