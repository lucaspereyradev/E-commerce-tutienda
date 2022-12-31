const express = require('express');
const users = express.Router();
const controller = require('../controllers/usersController');
const { ValidateUser } = require('../models/user.model');
const login = require('../controllers/authController');

users.get('/', controller.getUser);
users.post('/', ValidateUser, controller.createUser);
users.get('/:id', controller.getByIdUser);
users.put('/:id', controller.updateUser);
users.delete('/:id', controller.deleteUser);
users.post('/login', login);

module.exports = users;
