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
    let isAuth = false;
    if (req.headers.cookie && req.headers.cookie.includes("user"))
        isAuth = true;
    res.render('../views/layouts/main.ejs', {
        title: "Главная страница",
        isIndex: true,
        isAuth: isAuth
    });
}));

router.get('/register', (async (req, res) => {
    const isAuth = !req.headers.cookie;
    res.render('../views/layouts/registration.ejs',{
        title: "Главная страница",
            isIndex: true,
            isAuth: isAuth
    });
}));

router.get('/login', (async (req, res) => {
    const isAuth = !req.headers.cookie;
    res.render('../views/layouts/authorization.ejs',{
        title: "Главная страница",
        isIndex: true,
        isAuth: isAuth})
}));

router.get('/logout', (async (req, res) => {
    const isAuth = !req.headers.cookie;
    res.render('../views/layouts/logout.ejs',{
        title: "Выход",
        isIndex: true,
        isAuth: isAuth})
}));

router.get('/table', [authMiddleware], (async (req, res) => {
    const items = await MainModel.find({}).lean();
    const isAuth = !req.headers.cookie;
    const roles = getRoles(req);
    if (roles.includes("ADMIN")){
        res.render('../views/layouts/adminDashboard.ejs', {
            title: "Главная страница",
            isIndex: true,
            json: items,
            isAuth: isAuth
        });
    }
    else if (roles.includes("EDITOR")){
        res.render('../views/layouts/editTable.ejs', {
            title: "Главная страница",
            isIndex: true,
            json: items,
            isAuth: isAuth
        });
    }
    else if (roles.includes("USER")){
        res.render('../views/layouts/readTable.ejs', {
            title: "Таблица",
            isIndex: true,
            json: items,
            isAuth: isAuth
        });
    }
}))

module.exports = router;