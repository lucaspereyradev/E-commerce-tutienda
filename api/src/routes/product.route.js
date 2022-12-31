const express = require('express');
const uploadMulter = require('../config/multer.config');
const product = express.Router();
const controller = require('../controllers/productController');
const { ValidateProducts } = require('../models/product.model');

product.get('/', controller.getProduct);
product.post('/', [uploadMulter.single('image'), ValidateProducts], controller.createProduct);
product.get('/:id', controller.getByIdProduct);
product.put('/:id', controller.updateProduct);
product.delete('/:id', controller.deleteProduct);

module.exports = product;
