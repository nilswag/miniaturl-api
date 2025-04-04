/**
 * Controller for handling URL-related operations.
 * 
 * @module url_controller
 */

const service = require("../services/url_service");

/**
 * Adds a new URL to the database.
 * 
 * @param {*} req - The HTTP request object.
 * @param {*} res - The HTTP response object.
 */
const add_url = async (req, res, next) => {
  const long_url = req.body.long_url;

  try {
    new URL(long_url);
  } catch (error) {
    const err = new Error("Invalid or missing URL");
    err.status = 404;
    return next(err);
  }

  try {
    let confirm = await service.add_url(long_url);
    res.status(200).send(confirm);
  } catch (error) {
    const err = new Error("Failed to add URL");
    err.status = 500;
    return next(err);
  }
};

/**
 * Retrieves all URLs from the database and sends them in the response.
 * 
 * @async
 * @function get_urls
 * @param {Object} req - The HTTP request object.
 * @param {Object} res - The HTTP response object.
 * @param {Function} next - The middleware function to handle errors.
 * @returns {Promise<void>} Sends a JSON response containing all URLs or an error message.
 * 
 * @example
 * // Example response:
 * // {
 * //   "urls": [
 * //     { "id": 1, "long_url": "https://example.com", "short_url": "abc123", "clicks": 0 },
 * //     { "id": 2, "long_url": "https://another.com", "short_url": "xyz789", "clicks": 5 }
 * //   ]
 * // }
 */
const get_urls = async (req, res, next) => {
  try {
    let confirm = await service.get_urls();
    res.status(200).send(confirm);
  } catch (error) {
    const err = new Error("Failed to fetch urls");
    err.status = 404;
    return next(err);
  }
}

module.exports = { add_url, get_urls };