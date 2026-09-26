'use strict';

const { Router } = require('express');
const productController = require('../controllers/product.controller');
const { listProductValidator } = require('../validators/product.validator');
const { authenticate } = require('../middleware/auth.middleware');

const router = Router();

router.get('/list-product', authenticate, listProductValidator, productController.listProducts);

module.exports = router;
