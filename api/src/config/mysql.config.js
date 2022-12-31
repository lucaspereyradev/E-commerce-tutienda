require('dotenv').config();
var Sequelize = require('sequelize');
const path = require('path');

const databaseMysql = new Sequelize(
    process.env.DATABASE,
    process.env.DATABASE_USER,
    process.env.DATABASE_PASSWORD,
    {
        host: process.env.DATABASE_HOST,
        dialect: process.env.DATABASE_DIALECT,
    }
);

module.exports = databaseMysql;
