/**
 * Database setup module for creating necessary tables.
 * 
 * @module setup
 */

const { run_query } = require("./db");

/**
 * Creates the `urls` table in the database if it does not already exist.
 * 
 * Table Schema:
 * - `id` (SERIAL PRIMARY KEY): Unique identifier for each URL.
 * - `long_url` (TEXT NOT NULL): The original long URL.
 * - `short_url` (VARCHAR(8) UNIQUE NOT NULL): The shortened URL, must be unique.
 * - `clicks` (INT DEFAULT 0): The number of times the shortened URL has been clicked.
 * - `created_at` (TIMESTAMP DEFAULT CURRENT_TIMESTAMP): The timestamp when the URL was created.
 * 
 * @async
 * @function urls
 * @returns {Promise<void>} Resolves when the table is successfully created.
 * 
 * @example
 * const { urls } = require("./setup");
 * await urls(); // Ensures the `urls` table exists in the database.
 */
const urls = async () => {
  try {
    await run_query(`
      CREATE TABLE IF NOT EXISTS urls (
        id SERIAL PRIMARY KEY,
        long_url TEXT NOT NULL,
        short_url VARCHAR(8) UNIQUE NOT NULL,
        clicks INT DEFAULT 0,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);
  } catch (error) {
    const err = new Error("Error creating urls table: " + error.message);
    err.status = 500;
    throw err;
  }
};

module.exports = { urls };