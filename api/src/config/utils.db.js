const { Category } = require('../models/category.model');
const { Products } = require('../models/product.model');
const { User } = require('../models/user.model');
const databaseMysql = require('./mysql.config');

Products.belongsTo(Category, {
    foreignKey: 'Category',
    as: 'categories',
});
Category.sync();
User.sync();
Products.sync();
databaseMysql.sync();
