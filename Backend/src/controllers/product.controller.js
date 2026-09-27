"use strict";

const productService = require("../services/product.service");
const { getValidationErrors } = require("../validators/product.validator");
const {
  wantsJsonApi,
  sendJsonApi,
  validationErrorsDocument,
  errorDocument,
  productListDocument,
  productDetailDocument,
} = require("../utils/json-api");

async function listProducts(req, res, next) {
  try {
    const validationErrors = getValidationErrors(req);
    if (validationErrors) {
      if (wantsJsonApi(req)) {
        return sendJsonApi(
          res,
          422,
          validationErrorsDocument(validationErrors),
        );
      }
      return res.status(422).json(validationErrors);
    }

    const result = await productService.listProducts(req.query);
    if (wantsJsonApi(req)) {
      return sendJsonApi(res, 200, productListDocument(result));
    }

    return res.status(200).json(result);
  } catch (err) {
    next(err);
  }
}

async function getProduct(req, res, next) {
  try {
    const validationErrors = getValidationErrors(req);
    if (validationErrors) {
      if (wantsJsonApi(req)) {
        return sendJsonApi(
          res,
          422,
          validationErrorsDocument(validationErrors),
        );
      }
      return res.status(422).json(validationErrors);
    }

    const product = await productService.getProductById(req.params.id);
    if (!product) {
      if (wantsJsonApi(req)) {
        return sendJsonApi(
          res,
          404,
          errorDocument(404, "Not Found", "Product not found"),
        );
      }
      return res.status(404).json({ message: "Product not found" });
    }

    if (wantsJsonApi(req)) {
      return sendJsonApi(res, 200, productDetailDocument(product));
    }

    return res.status(200).json({ data: product });
  } catch (err) {
    next(err);
  }
}

module.exports = {
  listProducts,
  getProduct,
};
