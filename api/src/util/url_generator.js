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
 * import generate_url from "./url_generator.js";
 * const short_url = generate_url();
 * console.log(short_url);
 * // Example output: "aBc123Xy" (output will vary)
 */
const generate_url = () => {
  const characters = "ABCDEFGHIJLKMNOPQRSTUVWXYZabcdefghijlkmnopqrstuvwxyz0123456789";
  let short_url = "";
  for (let i = 0; i < 8; i++) 
    short_url += characters.charAt(Math.floor(Math.random() * characters.length));
  return short_url;
};

export default generate_url;