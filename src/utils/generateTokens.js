const jwt = require('jsonwebtoken')
require('dotenv').config()

const JWT_SECRET = process.env.JWT_SECRET

function generateToken(user) {
    return jwt.sign(
        { userId: user._id, email: user.email },
        JWT_SECRET,
        { expiresIn: '24h' }
    );
}

module.exports = generateToken;