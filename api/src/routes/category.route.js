const express = require('express');
const category = express.Router();
const controller = require('../controllers/categoryController');
const { ValidateCategory } = require('../models/category.model');

category.get('/', controller.getCategory);
category.post('/', ValidateCategory, controller.createCategory);
category.get('/:id', controller.getByIdCategory);
category.put('/:id', controller.updateCategory);
category.delete('/:id', controller.deleteCategory);

module.exports = category;
