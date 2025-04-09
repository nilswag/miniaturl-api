/**
 * Service module for handling URL-related business logic.
 *
 * This module provides functions to add and retrieve URLs from the database.
 * It ensures that short URLs are unique and handles database interactions.
 *
 * @module url_service
 */
import * as queries from "../db/url_queries.js";
import generate_url from "../util/url_generator.js";

/**
 * Adds a new URL entry to the database.
 *
 * @async
 * @function add_url
 * @param {string} long_url - The long URL to be added.
 * @param {number} user_id - The ID of the user associated with the URL.
 * @returns {Promise<Object|null>} The inserted row if successful, or `null` if no row was inserted.
 * @throws {Error} If an error occurs while adding the URL to the database.
 *
 * @example
 * const result = await add_url("https://example.com", 1);
 * console.log(result);
 */
export const add_url = async (long_url, user_id) => {
  let short_url = generate_url();

  // Ensure the generated short URL is unique
  let max_tries = 10;
  let tries = 0;
  while (tries < max_tries) {
    try {
      if (await queries.fetch_short(short_url)) short_url = generate_url();
      else break;
      tries++;
    } catch (error) {
      const err = new Error("Error fetching URL: " + error.message);
      err.status = 500;
      throw err;
    }
  }

  // Add the URL entry to the database
  try {
    let res = await queries.add_entry(long_url, short_url, user_id);
    return res;
  } catch (error) {
    const err = new Error("Error adding URL: " + error.message);
    err.status = 500;
    throw err;
  }
};

/**
 * Retrieves all URLs from the database.
 *
 * @async
 * @function get_urls
 * @returns {Promise<Object[]|null>} An array of URL entries if successful, or `null` if no rows are found.
 * @throws {Error} If an error occurs while fetching URLs from the database.
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
export const get_urls = async () => {
  try {
    let res = await queries.fetch_all();
    return res;
  } catch (error) {
    const err = new Error("Error fetching URLs: " + error.message);
    err.status = 500;
    throw err;
  }
};

/**
 * Retrieves URLs associated with a specific user from the database.
 *
 * @async
 * @function get_urls_user
 * @param {number} user_id - The ID of the user whose URLs are to be retrieved.
 * @returns {Promise<Object[]|null>} An array of URL entries associated with the user if successful, or `null` if no rows are found.
 * @throws {Error} If an error occurs while fetching URLs from the database.
 *
 * @example
 * const urls = await get_urls_user(1);
 * console.log(urls);
 * // Output:
 * // [
 * //   { id: 1, long_url: "https://example.com", short_url: "abc123", clicks: 0, created_at: "2025-03-31T12:00:00.000Z" },
 * //   { id: 2, long_url: "https://another.com", short_url: "xyz789", clicks: 5, created_at: "2025-03-31T12:05:00.000Z" }
 * // ]
 */
export const get_urls_user = async (user_id) => {
  try {
    let res = await queries.fetch_user_id(user_id);
    return res;
  } catch (error) {
    const err = new Error("Error fetching URLs: " + error.message);
    err.status = 500;
    throw err;
  }
};
