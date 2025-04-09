/**
 * Database query module for interacting with the `urls` table.
 *
 * @module url_queries
 */
import { run_query } from "./db.js";

/**
 * Adds a new URL entry to the `url` table.
 *
 * @async
 * @function add_entry
 * @param {string} long_url - The original long URL.
 * @param {string} short_url - The shortened URL.
 * @param {number} user_id - The ID of the user associated with the URL.
 * @returns {Promise<Object|null>} The inserted row if successful, or `null` if no row was inserted.
 * @throws {Error} If the query fails, an error is thrown to be handled by the middleware.
 *
 * @example
 * const result = await add_entry("https://example.com", "abc123", 1);
 * console.log(result);
 */
export const add_entry = async (long_url, short_url, user_id) => {
  try {
    const res = await run_query(
      `
        INSERT INTO url (long_url, short_url, user_id)
        VALUES ($1, $2, $3)
        RETURNING *
      `,
      [long_url, short_url, user_id]
    );
    return res.rows[0] || null;
  } catch (error) {
    const err = new Error("Error running query: " + error.message);
    err.status = 500;
    throw err;
  }
};

/**
 * Fetches a URL entry by its ID.
 *
 * @async
 * @function fetch_id
 * @param {number} id - The ID of the URL entry.
 * @returns {Promise<Object|null>} The fetched row if found, or `null` if no row was found.
 * @throws {Error} If the query fails, an error is thrown to be handled by the middleware.
 *
 * @example
 * const result = await fetch_id(1);
 * console.log(result);
 */
export const fetch_id = async (id) => {
  try {
    const res = await run_query(
      `
      SELECT * FROM url
      WHERE id = $1
      `,
      [id]
    );

    return res.rows[0] || null;
  } catch (error) {
    const err = new Error("Error running query: " + error.message);
    err.status = 500;
    throw err;
  }
};

/**
 * Fetches URL entries by their long URLs.
 *
 * @async
 * @function fetch_long
 * @param {string} long_url - The original long URL.
 * @returns {Promise<Object|null>} The fetched rows if found, or `null` if no rows were found.
 * @throws {Error} If the query fails, an error is thrown to be handled by the middleware.
 *
 * @example
 * const result = await fetch_long("https://example.com");
 * console.log(result);
 */
export const fetch_long = async (long_url) => {
  try {
    const res = await run_query(
      `
      SELECT * FROM url
      WHERE long_url = $1
      `,
      [long_url]
    );

    return res.rows[0] ? res.rows : null;
  } catch (error) {
    const err = new Error("Error running query: " + error.message);
    err.status = 500;
    throw err;
  }
};

/**
 * Fetches a URL entry by its short URL.
 *
 * @async
 * @function fetch_short
 * @param {string} short_url - The shortened URL.
 * @returns {Promise<Object|null>} The fetched row if found, or `null` if no row was found.
 * @throws {Error} If the query fails, an error is thrown to be handled by the middleware.
 *
 * @example
 * const result = await fetch_short("abc123");
 * console.log(result);
 */
export const fetch_short = async (short_url) => {
  try {
    const res = await run_query(
      `
      SELECT * FROM url
      WHERE short_url = $1
      `,
      [short_url]
    );

    return res.rows[0] || null;
  } catch (error) {
    const err = new Error("Error running query: " + error.message);
    err.status = 500;
    throw err;
  }
};

/**
 * Fetches all URL entries from the `url` table.
 *
 * @async
 * @function fetch_all
 * @returns {Promise<Object[]|null>} An array of rows if successful, or `null` if no rows are found.
 * @throws {Error} If the query fails, an error is thrown to be handled by the middleware.
 *
 * @example
 * const result = await fetch_all();
 * console.log(result);
 */
export const fetch_all = async () => {
  try {
    const res = await run_query(`SELECT * FROM url`);

    return res.rows[0] ? res.rows : null;
  } catch (error) {
    const err = new Error("Error running query: " + error.message);
    err.status = 500;
    throw err;
  }
};

/**
 * Fetches URL entries by their user ID.
 *
 * @async
 * @function fetch_user_id
 * @param {number} user_id - The ID of the user associated with the URLs.
 * @returns {Promise<Object[]|null>} An array of rows if successful, or `null` if no rows are found.
 * @throws {Error} If the query fails, an error is thrown to be handled by the middleware.
 *
 * @example
 * const result = await fetch_user_id(1);
 * console.log(result);
 */
export const fetch_user_id = async (user_id) => {
  try {
    const res = await run_query(`SELECT * FROM url WHERE user_id=$1`, [
      user_id,
    ]);

    return res.rows[0] ? res.rows : null;
  } catch (error) {
    const err = new Error("Error running query: " + error.message);
    err.status = 500;
    throw err;
  }
};
