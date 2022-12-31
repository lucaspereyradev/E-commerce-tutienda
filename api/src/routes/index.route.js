const mysqlProductRouter = require('./product.route');
const mysqlCategoryRouter = require('./category.route');
const mysqlUsersRouter = require('./users.route');

const express = require('express');
const indexRoutes = express.Router();

indexRoutes.use('/product', mysqlProductRouter);
indexRoutes.use('/category', mysqlCategoryRouter);
indexRoutes.use('/users', mysqlUsersRouter);

module.exports = indexRoutes;
