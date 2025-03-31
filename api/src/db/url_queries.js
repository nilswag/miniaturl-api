/**
 * Database query module for interacting with the `urls` table.
 * 
 * @module url_queries
 */

const { run_query } = require("./db")

/**
 * Adds a new entry to the `urls` table.
 * 
 * @async
 * @function add_entry
 * @param {string} long_url - The original long URL.
 * @param {string} short_url - The shortened URL.
 * @returns {Promise<Object|null>} The inserted row if successful, or `null` if no row was inserted.
 * @throws {Error} If the query fails, an error is thrown to be handled by the middleware.
 * 
 * @example
 * const result = await add_entry("https://example.com", "abc123");
 * console.log(result);
 */
const add_entry = async (long_url, short_url) => {
  try {
    const res = await run_query(
      `
        INSERT INTO urls (long_url, short_url)
        VALUES ($1, $2)
        RETURNING *
      `,
      [ long_url, short_url ]
    );
    return res.rows[0] ? res : null;
  } catch (error) {
    console.log("Error inserting URL:", error);
    throw error;
  }
};

/**
 * Fetches a URL entry by its ID.
 * 
 * @async
 * @function fetch_url_id
 * @param {number} id - The ID of the URL entry.
 * @returns {Promise<Object|null>} The fetched row if found, or `null` if no row was found.
 * @throws {Error} If the query fails, an error is thrown to be handled by the middleware.
 * 
 * @example
 * const result = await fetch_url_id(1);
 * console.log(result);
 */
const fetch_url_id = async (id) => {
  try {
    const res = await run_query(
      `
      SELECT * FROM urls
      WHERE id = $1
      `,
      [ id ]
    );
  
    return res.rows[0] ? res : null;
  } catch (error) {
    console.error("Error fetching URL by ID:", error);
    throw error;
  }
};

/**
 * Fetches a URL entry by its long URL.
 * 
 * @async
 * @function fetch_url_long
 * @param {string} long_url - The original long URL.
 * @returns {Promise<Object|null>} The fetched row if found, or `null` if no row was found.
 * @throws {Error} If the query fails, an error is thrown to be handled by the middleware.
 * 
 * @example
 * const result = await fetch_url_long("https://example.com");
 * console.log(result);
 */
const fetch_url_long = async (long_url) => {
  try {
    const res = await run_query(
      `
      SELECT * FROM urls
      WHERE long_url = $1
      `,
      [ long_url ]
    );
  
    return res.rows[0] ? res : null;
  } catch (error) {
    console.log("Error fetching URL by long URL:", error);
    throw error;
  }
};

/**
 * Fetches a URL entry by its short URL.
 * 
 * @async
 * @function fetch_url_short
 * @param {string} short_url - The shortened URL.
 * @returns {Promise<Object|null>} The fetched row if found, or `null` if no row was found.
 * @throws {Error} If the query fails, an error is thrown to be handled by the middleware.
 * 
 * @example
 * const result = await fetch_url_short("abc123");
 * console.log(result);
 */
const fetch_url_short = async (short_url) => {
  try {
    const res = await run_query(`
      SELECT * FROM urls
      WHERE short_url = $1
      `,
      [ short_url ]
    );
  
    return res.rows[0] ? res : null;
  } catch (error) {
    console.log("Error fetching URL by short URL:", error);
    throw error;
  }
};

module.exports = { add_entry, fetch_url_id, fetch_url_long, fetch_url_short };