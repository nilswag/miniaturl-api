/**
 * Middleware for logging HTTP requests and handling errors.
 * 
 * @module log_middlewares
 */
import format_timestamp from "../util/timestamp.js";

/**
 * Logs incoming HTTP requests to the console.
 * 
 * @function log
 * @param {Object} req - The HTTP request object.
 * @param {Object} res - The HTTP response object.
 * @param {Function} next - The next middleware function in the stack.
 * 
 * @example
 * app.use(log);
 * // Logs: [2025-03-31 12:00:00] GET request at /api/resource
 */
export const log = (req, res, next) => {
  console.log(`[${format_timestamp()}] ${req.method} request at ${req.url}`);
  
  next();
};

/**
 * Handles errors and sends a formatted error response.
 * 
 * @function error
 * @param {Error} err - The error object.
 * @param {Object} req - The HTTP request object.
 * @param {Object} res - The HTTP response object.
 * @param {Function} next - The next middleware function in the stack.
 * 
 * @example
 * app.use(error);
 * // Sends: { error: "Error message", timestamp: "2025-03-31 12:00:00" }
 */
export const error = (err, req, res, next) => {
  const timestamp = format_timestamp();

  console.error(`[${timestamp}] Error: ${err.message || "Internal server error"}`);

  res.status(err.status || 500).json({
    error: err.message || "Internal server error",
    timestamp: timestamp
  });
};
