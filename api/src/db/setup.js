/**
 * Database setup module for creating necessary tables.
 *
 * @module setup
 */
import { run_query } from "./db.js";

/**
 * Ensures the `urls` table exists in the database. If the table does not exist, it will be created.
 *
 * Table Schema:
 * - `id` (SERIAL PRIMARY KEY): Unique identifier for each URL entry.
 * - `long_url` (TEXT NOT NULL): The original long URL to be shortened.
 * - `short_url` (VARCHAR(8) UNIQUE NOT NULL): The shortened URL, must be unique and limited to 8 characters.
 * - `clicks` (INT DEFAULT 0): Tracks the number of times the shortened URL has been accessed.
 * - `created_at` (TIMESTAMP DEFAULT CURRENT_TIMESTAMP): Automatically records the creation timestamp of the URL entry.
 *
 * @async
 * @function urls
 * @throws {Error} Throws an error with status 500 if the table creation fails.
 * @returns {Promise<void>} Resolves when the `urls` table is successfully created or already exists.
 *
 * @example
 * import { urls } from "./setup.js";
 * await urls(); // Ensures the `url` table exists in the database.
 */
export const url = async () => {
  try {
    await run_query(`
      CREATE TABLE IF NOT EXISTS url (
        id SERIAL PRIMARY KEY,
        long_url TEXT NOT NULL,
        short_url VARCHAR(8) UNIQUE NOT NULL,
        clicks INT DEFAULT 0,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);
  } catch (error) {
    const err = new Error("Error creating url table: " + error.message);
    err.status = 500;
    throw err;
  }
};
