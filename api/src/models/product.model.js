var Sequelize = require('sequelize');
var sequelize = require('../config/mysql.config');
const Joi = require('joi');
const validateRequest = require('../middlewares/validateRequest');

var Products = sequelize.define(
    'product',
    {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        name: Sequelize.STRING,
        price: Sequelize.DOUBLE,
        description: Sequelize.STRING,
        stock: Sequelize.INTEGER,
        image: Sequelize.TEXT,
    },
    {}
);

const ValidateProducts = (req, res, next) => {
    const schema = Joi.object({
        name: Joi.string().min(5).max(100).required().messages({
            'string.empty': 'Ingresar el nombre',
            'string.min': 'El nombre del producto debe ser mayor a 5 caracteres',
            'any.required': 'Ingresa el  nombre',
        }),
        price: Joi.number().required().messages({
            'number.empty': 'Ingresa el precio',
            'any.required': 'Ingresa el precio',
        }),
        description: Joi.string().min(5).max(255).required().messages({
            'string.empty': 'Ingresa la descripción',
            'string.min': 'La descripción debe ser mayor a 5 caracteres',
            'any.required': 'Ingresa la descripción',
        }),
        stock: Joi.number().integer().required().messages({
            'number.empty': 'Ingresa la cantidad de stock',
            'number.integer': 'Ingresa la cantidad de stock',
            'any.required': 'Ingresa la cantidad de stock',
        }),
        Category: Joi.number().integer().required().messages({
            'number.empty': 'Ingresa la categoria',
            'number.integer': 'Ingresa la categoria',
            'any.required': 'Ingresa la categoria',
        }),
    });
    validateRequest(req, res, next, schema);
};

module.exports = {
    Products,
    ValidateProducts,
};
