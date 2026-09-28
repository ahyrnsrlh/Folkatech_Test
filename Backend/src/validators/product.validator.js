"use strict";

const { param, query, validationResult } = require("express-validator");

function getValidationErrors(req) {
  const errors = validationResult(req);
  if (errors.isEmpty()) return null;

  return {
    message: "Validation failed",
    errors: errors.array().map((e) => ({
      field: e.path,
      message: e.msg,
    })),
  };
}

const listProductValidator = [
  query("page")
    .optional()
    .isInt({ min: 1 })
    .withMessage("Page must be an integer greater than or equal to 1")
    .toInt(),
  query("limit")
    .optional()
    .isInt({ min: 1, max: 100 })
    .withMessage("Limit must be an integer between 1 and 100")
    .toInt(),
  query("min_price")
    .optional({ checkFalsy: true })
    .isFloat({ min: 0 })
    .withMessage("Minimum price must be a non-negative number")
    .toFloat(),
  query("max_price")
    .optional({ checkFalsy: true })
    .isFloat({ min: 0 })
    .withMessage("Maximum price must be a non-negative number")
    .toFloat()
    .custom((maxPrice, { req }) => {
      if (req.query.min_price === undefined) return true;
      return maxPrice >= Number(req.query.min_price);
    })
    .withMessage("Maximum price must be greater than or equal to minimum price"),
  query("sort")
    .optional()
    .isIn(["name", "price", "rating", "review_count", "created_at", "id"])
    .withMessage(
      "Sort must be one of: name, price, rating, review_count, created_at, id",
    ),
  query("order")
    .optional()
    .toLowerCase()
    .isIn(["asc", "desc"])
    .withMessage("Order must be either asc or desc"),
  query("search").optional().trim(),
  query("origin").optional().trim(),
  query("species").optional().trim(),
  query("roast_level").optional().trim(),
  query("tasted").optional().trim(),
  query("processing").optional().trim(),
];

const productIdValidator = [
  param("id")
    .isInt({ min: 1 })
    .withMessage("Product ID must be a positive integer")
    .toInt(),
];

module.exports = {
  listProductValidator,
  productIdValidator,
  getValidationErrors,
};
