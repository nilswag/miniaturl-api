/**
 * Middleware for authentication and authorization.
 * 
 * @module auth_middlewares
 */

const jwt = require("jsonwebtoken");
const { v4 } = require("uuid");
const { log } = require("./log_middleware");

/**
 * Middleware to authenticate requests using a JWT token.
 * If no token is provided, an anonymous token is generated and assigned.
 * 
 * @function authenticate
 * @param {Object} req - The HTTP request object.
 * @param {Object} req.headers - The headers from the request.
 * @param {string} [req.headers.authorization] - The authorization header containing the JWT token.
 * @param {Object} res - The HTTP response object.
 * @param {Function} next - The next middleware function to be called.
 * @throws {Error} If the token is invalid or cannot be verified, an error with status 401 is thrown.
 * @property {Object} req.decoded - The decoded JWT payload added to the request object.
 * 
 * @example
 * // Example usage in an Express app:
 * const { authenticate } = require("./auth_middleware");
 * app.use(authenticate);
 */
const authenticate = (req, res, next) => {
  let token = req.headers.authorization && req.headers.authorization.split(" ")[1];

  if (!token) {
    token = jwt.sign(
      { type: "anonymous", id: v4() },
      process.env.JWT_SECRET,
      { expiresIn: "30d" }
    );

    res.cookie(
      "auth_token",
      token,
      {
        httpOnly: true,
        secure: process.env.NODE_ENV !== "development",
        sameSite: "Lax",
        maxAge: 30 * 24 * 60 * 60 * 1000,
      }
    );
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.decoded = decoded;
    next();
  } catch (error) {
    const err = new Error("Unauthorized");
    err.status = 401;
    throw err;
  }
}

module.exports = { authenticate };