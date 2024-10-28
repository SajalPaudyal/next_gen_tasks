const jwt = require('jsonwebtoken')
const User = require('../../models/users.model')
require('dotenv').config()

const confirmAuth = (req, res, next) => {
    const token = req.header('x-auth-token');
    if (!token) {
        return res.status(401).json({error:"No token provided. Access denied"})
    }
    try {
        const verifiedToken = jwt.verify(token, process.env.JWT_SECRET);
        if(!verifiedToken) {
            return res.status(401).json({error:"No token provided. Access denied"})
        }
        req.user = {_id: verifiedToken.userId, email: verifiedToken.email};
        next();

    } catch (error) {
        res.status(500).json({error: error.message});
    }
}

module.exports = confirmAuth;