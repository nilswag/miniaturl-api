/**
 * Express router module for handling URL-related routes.
 * 
 * @module url_routes
 */

const express = require("express");
const router = express.Router();
const controller = require("../controllers/url_controller");

/**
 * Route to add a new URL.
 * 
 * @name POST /add
 * @function
 * @memberof module:url_routes
 * @inner
 * @param {Object} req - The HTTP request object.
 * @param {Object} req.body - The request body containing the URL data.
 * @param {string} req.body.long_url - The original long URL.
 * @param {string} req.body.short_url - The shortened URL (optional).
 * @param {Object} res - The HTTP response object.
 * @param {Function} next - The next middleware function.
 * 
 * @example
 * // Request body:
 * // { "long_url": "https://example.com", "short_url": "abc123" }
 * 
 * // Response:
 * // { "id": 1, "long_url": "https://example.com", "short_url": "abc123", "clicks": 0, "created_at": "2025-03-31T12:00:00.000Z" }
 */
router.post("/add", controller.add_url);

/**
 * Route to retrieve all URLs.
 * 
 * @name GET /urls
 * @function
 * @memberof module:url_routes
 * @inner
 * @param {Object} req - The HTTP request object.
 * @param {Object} res - The HTTP response object.
 * @param {Function} next - The next middleware function.
 * 
 * @example
 * // Example request:
 * // GET /urls
 * 
 * // Example response:
 * // {
 * //   "urls": [
 * //     { "id": 1, "long_url": "https://example.com", "short_url": "abc123", "clicks": 0 },
 * //     { "id": 2, "long_url": "https://another.com", "short_url": "xyz789", "clicks": 5 }
 * //   ]
 * // }
 */
router.get("/all", controller.get_urls);

module.exports = { router };