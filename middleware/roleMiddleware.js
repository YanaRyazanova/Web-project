const jwt = require('jsonwebtoken');
//const { secretKey } = require('../config.js');
const { secretKey } = process.env.secretKey;

module.exports = function (roles) {
    return function (req, res, next) {
        if (req.method === 'OPTIONS') {
            next();
        }
        try {
            const token = req.headers.cookie.split(';').find(x => x.indexOf('user') !== -1).split('=')[1];
            if (!token){
                res.status(403).json({ message: " Пользователь не авторизован"});
            }
            const { roles: userRoles} = jwt.verify(token, secretKey);
            let hasRole = false;
            userRoles.forEach(role => {
                if (roles.includes(role)) {
                    hasRole = true;
                }
            });
            if (!hasRole){
                res.status(403).json({ message: "У вас нет доступа"});
            }
            next();
        }
        catch (e) {
            console.log(e);
            res.status(403).json({ message: " Пользователь не авторизован"});
        }
    }
}