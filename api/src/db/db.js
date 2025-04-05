/**
 * Database module for managig PostgreSQL connections and queries.
 * 
 * @module db
 */
import pkg from 'pg';  // Default import for CommonJS
const { Pool } = pkg;

/**
 * Creates a connection pool to the PostgreSQL database using environment variables.
 * 
 * Environment variables:
 * - PG_USER: Database user
 * - PG_HOST: Database host
 * - PG_DATABASE: Database name
 * - PG_PASSWORD: Database password
 * - PG_PORT: Database port
 */
export const pool = new Pool({
  user: process.env.PG_USER,
  host: process.env.PG_HOST,
  database: process.env.PG_DATABASE,
  password: process.env.PG_PASSWORD,
  port: process.env.PG_PORT
});

/**
 * Establishes a connection to the PostgreSQL database and logs the connection status.
 */
pool.connect()
  .then(client => {
    console.log(`Connected to database '${process.env.PG_DATABASE}' at '${process.env.PG_HOST}'`);
    client.release(); // Ensure the client is released back to the pool
  })
  .catch(err => {
    console.error("Connection error", err);
  });

/**
 * Executes a SQL query on the PostgreSQL database.
 * 
 * @async
 * @function run_query
 * @param {string} query - The SQL query to execute.
 * @param {Array} [values=[]] - An array of values to parameterize the query.
 * @returns {Promise<Object>} The result of the query execution.
 * 
 * @example
 * const result = await run_query("SELECT * FROM users WHERE id = $1", [1]);
 * console.log(result.rows);
 */
export const run_query = async (query, values = []) => {
  try {
    const res = await pool.query(query, values);
    return res;
  } catch (error) { 
    const err = new Error("Database error: " + error.message);
    err.status  = 500;  
    throw err;
  }
};
