/**
 * Middleware for authentication and authorization.
 *
 * @module auth_middlewares
 */
import jwt from "jsonwebtoken";
import { v4 } from "uuid";

/**
 * Middleware to generate a token for anonymous users.
 * If no token is provided in the request headers, a new token is generated
 * and set as an HTTP-only cookie.
 *
 * @function generate_token
 * @param {Object} req - The HTTP request object.
 * @param {Object} req.headers - The headers from the request.
 * @param {string} [req.headers.authorization] - The authorization header containing the JWT token.
 * @param {Object} res - The HTTP response object.
 * @param {Function} next - The next middleware function to be called.
 *
 * @example
 * // Example usage in an Express app:
 * const { generate_token } = require("./auth_middleware");
 * app.use(generate_token);
 */
export const generate_token = (req, res, next) => {
  let auth_token =
    req.headers.authorization && req.headers.authorization.split(" ")[1];

  if (!auth_token) {
    auth_token = jwt.sign(
      { type: "anonymous", id: v4() },
      process.env.JWT_SECRET,
      {
        expiresIn: "30d",
      }
    );

    res.cookie("auth_token", auth_token, {
      httpOnly: true,
      secure: true,
      sameSite: "Lax",
      maxAge: 30 * 24 * 60 * 60 * 1000,
    });
  }

  req.auth_token = auth_token;

  next();
};

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
export const authenticate = (req, res, next) => {
  try {
    const auth_token = jwt.verify(req.auth_token, process.env.JWT_SECRET);
    req.auth_token = auth_token;
    next();
  } catch (error) {
    const err = new Error("Unauthorized");
    err.status = 401;
    next(err);
  }
};
