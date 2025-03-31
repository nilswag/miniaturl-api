/**
 * Utility module for generating random short URLs.
 * 
 * @module url_generator
 */

/**
 * Generates a random short URL string.
 * 
 * @function generate_url
 * @returns {string} A randomly generated short URL consisting of 8 alphanumeric characters.
 * 
 * @example
 * const { generate_url } = require("./url_generator");
 * const short_url = generate_url();
 * console.log(short_url);
 * // Output: "aBc123Xy" (example output, will vary)
 */
const generate_url = () => {
  const characters = "ABCDEFGHIJLKMNOPQRSTUVWXYZabcdefghijlkmnopqrstuvwxyz0123456789";
  let short_url = "";
  for (let i = 0; i < 8; i++) 
    short_url += characters.charAt(Math.floor(Math.random() * characters.length));
  return short_url;
};

module.exports = generate_url;