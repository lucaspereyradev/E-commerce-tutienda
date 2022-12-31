var Sequelize = require('sequelize');
var sequelize = require('../config/mysql.config');
const Joi = require('joi');
const validateRequest = require('../middlewares/validateRequest');

var User = sequelize.define(
    'users',
    {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        first_name: Sequelize.STRING,
        last_name: Sequelize.STRING,
        email: {
            type: Sequelize.STRING,
            unique: true,
            validate: {
                isEmail: {
                    msg: 'Must be a valid email address',
                },
            },
        },
        password: Sequelize.STRING,
        status: {
            type: Sequelize.BOOLEAN,
            defaultValue: true,
        },
    },
    {
        indexes: [
            {
                fields: ['email'],
                unique: true,
            },
        ],
        defaultScope: {
            attributes: {},
        },
    }
);
const ValidateUser = (req, res, next) => {
    const schema = Joi.object({
        first_name: Joi.string().min(2).max(100).required().messages({
            'string.empty': 'Ingresa el Nombre',
            'string.min': 'El nombre debe ser mayor a 5 caracteres',
            'any.required': 'Ingresa el Nombre',
        }),
        last_name: Joi.string().min(2).max(100).required().messages({
            'string.empty': 'Ingresa el Apellido',
            'string.min': 'El Apellido debe ser mayor a 5 caracteres',
            'any.required': 'Ingresa el Apellido',
        }),
        email: Joi.string().email().required().messages({
            'email.empty': 'Ingresa el email',
            'any.required': 'Ingresa el email',
        }),
        password: Joi.string().min(5).max(100).required().messages({
            'password.empty': 'Ingresa el password',
            'password.min': 'El password debe ser mayor a 5 caracteres',
            'any.required': 'Ingresa el password',
        }),
    });
    validateRequest(req, res, next, schema);
};

module.exports = {
    User,
    ValidateUser,
};
