'use strict';

const productService = require('../services/product.service');
const { getValidationErrors } = require('../validators/product.validator');

async function listProducts(req, res, next) {
  try {
    const validationErrors = getValidationErrors(req);
    if (validationErrors) {
      return res.status(422).json(validationErrors);
    }

    const result = await productService.listProducts(req.query);
    return res.status(200).json(result);
  } catch (err) {
    next(err);
  }
}

module.exports = {
  listProducts,
};
