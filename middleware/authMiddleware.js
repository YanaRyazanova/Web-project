const jwt = require('jsonwebtoken');
const { secretKey } = require('../config.js');
const cookieParser = require("cookie-parser");

module.exports = function (req, res, next) {
    if (req.method === 'OPTIONS') {
        next();
    }
    try {
        const token = req.headers.cookie.split(';').find(x => x.indexOf('user') !== -1).split('=')[1];
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