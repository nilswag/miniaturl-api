/**
 * Middleware for authentication and authorization.
 * 
 * @module auth_middlewares
 */

const jwt = require("jsonwebtoken");
const { v4 } = require("uuid");
const { log } = require("./log_middleware");

const authenticate = (req, res, next) => {
  let token = req.headers.authorization && req.headers.authorization.split(" ")[1];

  if (!token) {
    token = jwt.sign(
      { type: "anonymous", id: v4() },
      process.env.JWT_SECRET,
      { expiresIn: "14d" }
    );
  }

  try {
    
  } catch (error) {
    const err = new Error("Unauthorized");
    err.status = 401;
    return next(err);
  }

  return next();
}

module.exports = { authenticate };