const { Pool } = require("pg");

const pool = new Pool({
  user: process.env.PG_USER,
  host: process.env.PG_HOST,
  database: process.env.PG_DATABASE,
  password: process.env.PG_PASSWORD,
  port: process.env.PG_PORT
});

pool.connect()
  .then(client => {
    console.log(`Connected to database '${ process.env.PG_DATABASE }' at '${ process.env.PG_HOST }'`);
  })
  .catch(err => {
    console.error("Connection error", err);
  });

const run_query = async (query, values = []) => {
  try {
    const res = await pool.query(query, values);
    return res;
  } catch (error) { 
    console.error("Database error:", error);
  }
};

module.exports = { pool, run_query };