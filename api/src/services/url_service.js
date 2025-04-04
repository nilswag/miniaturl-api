/**
 * Service module for handling URL-related business logic.
 * 
 * @module url_service
 */

const queries = require("../db/url_queries");
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
      if (await queries.fetch_long(long_url)) short_url = generate_url();
      else break;
      tries++;
    } catch (error) {
      const err = new Error("Error fetching URL: " + error);
      err.status = 501;
      throw err;
    }
  }

  // Add the URL entry to the database
  try {
    let res = await queries.add_entry(long_url, short_url);
    return res;
  } catch (error) {
    const err = new Error("Error adding URL: " + error);
    err.status = 501;
    throw err; 
  }
};

/**
 * Retrieves all URLs from the database.
 * 
 * @async
 * @function get_urls
 * @returns {Promise<Object[]>} An array of URL entries if successful.
 * @throws {Error} If the URLs cannot be fetched from the database.
 * 
 * @example
 * const urls = await get_urls();
 * console.log(urls);
 * // Output:
 * // [
 * //   { id: 1, long_url: "https://example.com", short_url: "abc123", clicks: 0, created_at: "2025-03-31T12:00:00.000Z" },
 * //   { id: 2, long_url: "https://another.com", short_url: "xyz789", clicks: 5, created_at: "2025-03-31T12:05:00.000Z" }
 * // ]
 */
const get_urls = async () => {
  try {
    let res = await queries.fetch_all();
    return res;
  } catch (error) {
    const err = new Error("Error fetching URLs: " + error);
    err.status = 501;
    throw err;
  }
}

module.exports = { add_url, get_urls };