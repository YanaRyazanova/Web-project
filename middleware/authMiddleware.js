const jwt = require('jsonwebtoken');
const { secretKey } = require('../config.js');
const cookieParser = require("cookie-parser");

module.exports = function (req, res, next) {
    if (req.method === 'OPTIONS') {
        next();
    }
    try {
        if (req.headers.cookie === undefined) {
            res.status(403).json({message: "Пользователь не авторизован"});
        }
        else {
            const token = req.headers.cookie.split(';').find(x => x.indexOf('user') !== -1).split('=')[1];
            if (!token){
                res.status(403).json({ message: "Пользователь не авторизован"});
            }
            else {
                req.user = jwt.verify(token, secretKey);
            }
        }
        next();
    }
    catch (e) {
        console.log(e);
        res.status(403).json({ message: " Пользователь не авторизован"});
    }
}