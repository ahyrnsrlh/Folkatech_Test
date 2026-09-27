"use strict";

const { Router } = require("express");
const productController = require("../controllers/product.controller");
const {
  listProductValidator,
  productIdValidator,
} = require("../validators/product.validator");
const { authenticate } = require("../middleware/auth.middleware");

const router = Router();

router.get(
  "/list-product",
  authenticate,
  listProductValidator,
  productController.listProducts,
);
router.get(
  "/product/:id",
  authenticate,
  productIdValidator,
  productController.getProduct,
);

module.exports = router;
