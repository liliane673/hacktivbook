require('dotenv').config()
const jwt = require('jsonwebtoken');
const SECRET_KEY = process.env.SECRET_KEY_JWT

function signToken(data) {
    return jwt.sign(data, SECRET_KEY);
}

function verifyToken(token) {
    return jwt.verify(token, SECRET_KEY)
}

module.exports = {
    signToken, verifyToken
}