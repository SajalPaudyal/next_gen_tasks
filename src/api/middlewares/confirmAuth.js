const jwt = require('jsonwebtoken')
const User = require('../../models/users.model')
require('dotenv').config()

const confirmAuth = (req, res, next) => {
    const token = req.header('x-auth-token');
    if (!token) {
         res.sendStatus('No token found.');
    }
    try {
        const verifiedToken = jwt.verify(token, process.env.JWT_SECRET);
        req.user = verifiedToken.user;
        next();

    } catch (error) {
        res.sendStatus('No valid token found.');
    }
}

module.exports = confirmAuth;