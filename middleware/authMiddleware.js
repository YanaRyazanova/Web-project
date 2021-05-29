const jwt = require('jsonwebtoken');
const { secretKey } = require('../config.js');

module.exports = function (req, res, next) {
    if (req.method === 'OPTIONS') {
        next();
    }
    try {
        const token = req.headers.authorization.split(' ')[1];
        if (!token){
            res.status(403).json({ message: "Пользователь не авторизован"});
        }
        const decodedData = jwt.verify(token, secretKey);
        req.user = decodedData;
        next();
    }
    catch (e) {
        console.log(e);
        res.status(403).json({ message: " Пользователь не авторизован"});
    }
}