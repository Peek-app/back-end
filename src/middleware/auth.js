const jwt = require("../lib/jwt");
const User = require("../models/user.model");
const createError = require("http-errors");

async function auth(req, res, next) {
  try {
    const authorization = req.headers.authorization;

    if (!authorization) {
      throw createError(401, "Authorization header is required");
    }

    const token = authorization?.replace("Bearer ", "");

    if (!token) {
      throw createHttpError(401, "Token is required");
    }

    const decoded = await jwt.verify(token);
    const user = await User.findById(decoded.id);
    if (!user) {
      throw createError(401, "Unauthorized");
    }

    req.user = user;
    next();
  } catch {
    res.status(401).json({
      success: false,
      message: "Unauthorized",
    });
  }
}

module.exports = auth;
