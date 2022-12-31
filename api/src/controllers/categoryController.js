const { Category } = require('../models/category.model');
const categoryController = {};

categoryController.getCategory = async (req, res) => {
    const response = await Category.findAll()
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

categoryController.createCategory = async (req, res) => {
    try {
        const modelData = {
            name: req.body.name,
        };
        const response = await Category.create(modelData)
            .then((data) => {
                const res = { error: false, data: data, message: 'Category Create' };
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

categoryController.getByIdCategory = async (req, res) => {
    try {
        const { id } = req.params;
        const response = await Category.findAll({
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

categoryController.updateCategory = async (req, res) => {
    try {
        const { id } = req.params;
        const response = await Category.update(req.body, {
            where: { id: id },
        })
            .then((data) => {
                const res = { error: false, data: data, message: 'Category Update' };
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

categoryController.deleteCategory = async (req, res) => {
    try {
        const { id } = req.params;

        const response = await Category.destroy({
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

module.exports = categoryController;
