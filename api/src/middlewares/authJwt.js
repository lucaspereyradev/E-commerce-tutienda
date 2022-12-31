const jwt = require('jsonwebtoken');
const { User } = require('../models/user.model');

verifyToken = (req, res, next) => {
    let token = req.headers['x-access-token'];
    if (!token) {
        return res.status(403).send({ message: 'Error not Token Access' });
    }
    jwt.verify(token, process.env.SECRET, (err, decode) => {
        if (err) {
            return res.status(403).send({ message: 'Error Token Access not Found' });
        }
        req.userId = decode.id;
        next();
    });
};

module.exports = verifyToken;
