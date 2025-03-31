const { run_query } = require("./db");

const urls = async () => {
  const res = await run_query(`
    CREATE TABLE IF NOT EXISTS urls (
      id SERIAL PRIMARY KEY,
      long_url TEXT NOT NULL,
      short_url VARCHAR(8) UNIQUE NOT NULL,
      clicks INT DEFAULT 0,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
  `);
};

module.exports = { urls };