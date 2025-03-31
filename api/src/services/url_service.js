const { fetch_url_long, add_entry } = require("../db/url_queries");
const { generate_url } = require("../util/url_generator");

const add_url = async (long_url) => {
  let short_url = generate_url();
  while (await fetch_url_long(long_url).rows) short_url = generate_url();
  let res = await add_entry(long_url, short_url);
  return res;
};

module.exports = { add_url };