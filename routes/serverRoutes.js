const express = require('express');
const MainModel = require('../models/mainModel.js');

const authMiddleware = require('../middleware/authMiddleware.js');
const roleMiddleware = require('../middleware/roleMiddleware.js');

const jwt = require('jsonwebtoken');
const { secretKey } = require('../config.js');

const router = express.Router();

function getRoles(req) {
    const token = req.headers.cookie.split(';').find(x => x.indexOf('user') !== -1).split('=')[1];
    if (!token){
        return { message: " Пользователь не авторизован"};
    }
    const { roles: userRoles} = jwt.verify(token, secretKey);
    return userRoles;
}

router.get('/', ( async (req, res) => {
    const items = await MainModel.find({}).lean();
    res.render('../views/layouts/main.ejs', {
        title: "Главная страница",
        isIndex: true,
        json: items
    });
}));

router.get('/register', (async (req, res) => {
    res.render('../views/layouts/registration.ejs')
}));

router.get('/login', (async (req, res) => {
    res.render('../views/layouts/authorization.ejs')
}));

router.get('/table', [authMiddleware], (async (req, res) => {
    const items = await MainModel.find({}).lean();
    const roles = getRoles(req);
    if (roles.includes("ADMIN")){
        res.render('../views/layouts/adminDashboard.ejs', {
            title: "Главная страница",
            isIndex: true,
            json: items
        });
    }
    else if (roles.includes("EDITOR")){
        res.render('../views/layouts/editTable.ejs', {
            title: "Главная страница",
            isIndex: true,
            json: items
        });
    }
    else if (roles.includes("USER")){
        res.render('../views/layouts/readTable.ejs', {
            title: "Таблица",
            isIndex: true,
            json: items
        });
    }
}))

// router.get('/adminDashboard', [authMiddleware, roleMiddleware(["ADMIN"])], (async (req, res) => {
//     const items = await MainModel.find({}).lean();
//     res.render('../views/layouts/adminDashboard.ejs', {
//         title: "Главная страница",
//         isIndex: true,
//         json: items
//     });
// }));

// router.get('/readTable', [authMiddleware, roleMiddleware(["USER", "ADMIN", "EDITOR"])], (async (req, res) => {
//     const items = await MainModel.find({}).lean();
//     res.render('../views/layouts/readTable.ejs', {
//         title: "Таблица",
//         isIndex: true,
//         json: items
//     });
// }));

module.exports = router;