const { run_query } = require("./db")

const add_entry = async (long_url, short_url) => {
  const res = await run_query(
    `
      INSERT INTO urls (long_url, short_url)
      VALUES ($1, $2)
      RETURNING *
    `,
    [ long_url, short_url ]
  );
  return res.rows[0] ? res : null;
};

const fetch_url_id = async (id) => {
  const res = await run_query(
    `
    SELECT * FROM urls
    WHERE id = $1
    `,
    [ id ]
  );

  return res.rows[0] ? res : null;
};

const fetch_url_long = async (long_url) => {
  const res = await run_query(
    `
    SELECT * FROM urls
    WHERE long_url = $1
    `,
    [ long_url ]
  );

  return res.rows[0] ? res : null;
};

const fetch_url_short = async (short_url) => {
  const res = await run_query(`
    SELECT * FROM urls
    WHERE short_url = $1
    `,
    [ short_url ]
  );

  return res.rows[0] ? res : null;
};

module.exports = { add_entry, fetch_url_id, fetch_url_long, fetch_url_short };