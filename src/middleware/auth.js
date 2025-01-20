const jwt = require("../lib/jwt");
const User = require("../models/user.model");
const createError = require("http-errors");

async function auth(req, res, next) {
  try {
    const authorization = req.headers.authorization;

    if (!authorization) {
      throw createError(401, "Authorization header is required");
    }

    const token = authorization.replace("Bearer ", "");

    if (!token) {
      throw createError(401, "Token is required");
    }

    const decoded = await jwt.verify(token);
    const user = await User.findById(decoded.id);
    if (!user) {
      throw createError(401, "Unauthorized");
    }

    // Genera un nuevo token
    const newToken = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "24h",
    });

    req.user = user;
    res.locals.newToken = newToken;
    next();
  } catch (error) {
    res.status(401).json({
      success: false,
      message: "Unauthorized",
    });
  }
}

module.exports = auth;
