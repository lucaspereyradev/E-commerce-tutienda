const { Products } = require('../models/product.model');
const Controller = {};

Controller.getProduct = async (req, res) => {
    const response = await Products.findAll({
        include: ['categories'],
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
};

Controller.createProduct = async (req, res) => {
    try {
        if (req.file === null) {
            return res.status(400).send({ message: 'No file was uploaded' });
        }
        console.log(req.body);
        const url = req.protocol + '://' + req.get('host');
        const urlImage = url + '/upload/' + req.file.filename;
        const modelData = {
            name: req.body.name,
            price: req.body.price,
            description: req.body.description,
            stock: req.body.stock,
            image: urlImage,
            Category: req.body.Category,
        };
        const response = await Products.create(modelData)
            .then((data) => {
                const res = { error: false, data: data, message: 'Product Created' };
                return res;
            })
            .catch((e) => {
                if (
                    e.name == 'SequelizeUniqueConstraintError' ||
                    e.name == 'SequelizeValidationError'
                ) {
                    return { error: true, message: e.errors.map((err) => err.message) };
                } else if (e.name == 'SequelizeForeignKeyConstraintError') {
                    return { error: true, message: ['The category does not exist'] };
                }
                return { error: true, message: e };
            });
        res.json(response);
    } catch (e) {
        console.log(e);
    }
};

Controller.getByIdProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const response = await Products.findAll({
            include: ['categories'],
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

Controller.updateProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const response = await Products.update(req.body, {
            where: { id: id },
        })
            .then((data) => {
                const res = { error: false, data: data, message: 'Product Updated' };
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

Controller.deleteProduct = async (req, res) => {
    try {
        const { id } = req.params;

        const response = await Products.destroy({
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

module.exports = Controller;
