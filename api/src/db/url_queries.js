/**
 * Database query module for interacting with the `urls` table.
 * 
 * @module url_queries
 */
import { run_query } from "./db.js";

/**
 * Adds a new entry to the `urls` table.
 * 
 * @async
 * @function add_entry
 * @param {string} long_url - The original long URL.
 * @param {string} short_url - The shortened URL.
 * @returns {Promise<Object[]|null>} The inserted row(s) if successful, or `null` if no row was inserted.
 * @throws {Error} If the query fails, an error is thrown to be handled by the middleware.
 * 
 * @example
 * const result = await add_entry("https://example.com", "abc123");
 * console.log(result);
 */
export const add_entry = async (long_url, short_url) => {
  try {
    const res = await run_query(
      `
        INSERT INTO urls (long_url, short_url)
        VALUES ($1, $2)
        RETURNING *
      `,
      [ long_url, short_url ]
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
      SELECT * FROM urls
      WHERE id = $1
      `,
      [ id ]
    );
  
    return res.rows[0] || null;
  } catch (error) {
    const err = new Error("Error running query: " + error.message);
    err.status = 500;
    throw err;
  }
};

/**
 * Fetches a URL entry by its long URL.
 * 
 * @async
 * @function fetch_long
 * @param {string} long_url - The original long URL.
 * @returns {Promise<Object|null>} The fetched row if found, or `null` if no row was found.
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
      SELECT * FROM urls
      WHERE long_url = $1
      `,
      [ long_url ]
    );
  
    return res.rows[0] || null;
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
    const res = await run_query(`
      SELECT * FROM urls
      WHERE short_url = $1
      `,
      [ short_url ]
    );
  
    return res.rows[0] || null;
  } catch (error) {
    const err = new Error("Error running query: " + error.message);
    err.status = 500;
    throw err;
  }
};

/**
 * Fetches all URL entries from the `urls` table.
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
    const res = await run_query(`SELECT * FROM urls`);
    
    return res.rows[0] ? res.rows : null;
  } catch (error) {
    const err = new Error("Error running query: " + error.message);
    err.status = 500;
    throw err;
  }
}
