/**
 * Controller for handling URL-related operations.
 * 
 * @module url_controller
 */

const url_service = require("../services/url_service");

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
    return next(new Error("Invalid or missing URL"));
  }

  try {
    let confirm = await url_service.add_url(long_url);
    res.status(200).send(confirm);
  } catch (error) {
    console.error("Error adding URL:", error);
    return next(new Error("Failed to add URL"));
  }
};

module.exports = { add_url };