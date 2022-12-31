const { User } = require('../models/user.model');
const bcrypt = require('bcrypt');
const usersController = {};

usersController.getUser = async (req, res) => {
    const response = await User.findAll()
        .then((data) => {
            const res = { error: false, data: data };
            return res;
        })
        .catch((error) => {
            const res = { error: true, message: error };
            return res;
        });
    res.json(response);
};

usersController.createUser = async (req, res) => {
    try {
        const modelData = {
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            email: req.body.email,
            password: bcrypt.hashSync(req.body.password, 10),
        };
        const response = await User.create(modelData)
            .then((data) => {
                const res = { error: false, data: data, message: 'User Created' };
                return res;
            })
            .catch((e) => {
                if (
                    e.name == 'SequelizeUniqueConstraintError' ||
                    e.name == 'SequelizeValidationError'
                ) {
                    return { error: true, message: e.errors.map((err) => err.message) };
                } else {
                    return { error: true, message: e };
                }
            });
        res.json(response);
    } catch (e) {
        console.log(e);
    }
};

usersController.getByIdUser = async (req, res) => {
    try {
        const { id } = req.params;
        const response = await User.findAll({
            where: { id: id },
        })
            .then((data) => {
                const res = { error: false, data: data };
                return res;
            })
            .catch((error) => {
                const res = { error: true, message: error };
                return res;
            });
        res.json(response);
    } catch (e) {
        console.log(e);
    }
};

usersController.updateUser = async (req, res) => {
    try {
        const { id } = req.params;
        let modelData = {
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            email: req.body.email,
        };
        if (req.body.password) {
            modelData = { ...modelData, ...{ password: bcrypt.hashSync(req.body.password, 10) } };
        }
        const response = await User.update(modelData, {
            where: { id: id },
        })
            .then((data) => {
                const res = { error: false, data: data, message: 'User Updated' };
                return res;
            })
            .catch((error) => {
                const res = { error: true, message: error };
                return res;
            });
        res.json(response);
    } catch (e) {
        console.log(e);
    }
};

usersController.deleteUser = async (req, res) => {
    try {
        const { id } = req.params;

        const response = await User.destroy({
            where: { id: id },
        })
            .then((data) => {
                const res = { error: false, data: data, message: 'Deleted Successful' };
                return res;
            })
            .catch((error) => {
                const res = { error: true, message: error };
                return res;
            });
        res.json(response);
    } catch (e) {
        console.log(e);
    }
};

module.exports = usersController;
