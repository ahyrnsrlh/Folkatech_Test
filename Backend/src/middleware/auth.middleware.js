"use strict";

const jwt = require("jsonwebtoken");
const {
  wantsJsonApi,
  sendJsonApi,
  errorDocument,
} = require("../utils/json-api");

function unauthorized(req, res, message) {
  if (wantsJsonApi(req)) {
    return sendJsonApi(res, 401, errorDocument(401, "Unauthorized", message));
  }

  return res.status(401).json({ message });
}

function authenticate(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return unauthorized(req, res, "Unauthorized");
  }

  const token = authHeader.slice(7).trim();
  if (!token) {
    return unauthorized(req, res, "Unauthorized");
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    return next();
  } catch (err) {
    return unauthorized(req, res, "Invalid or expired token");
  }
}

module.exports = {
  authenticate,
  authenticateJWT: authenticate,
};
