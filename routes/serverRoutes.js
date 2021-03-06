const express = require('express');
const MainModel = require('../models/mainModel.js');
const CommentModel = require('../models/comments.js');
const User = require('../models/User.js');

const authMiddleware = require('../middleware/authMiddleware.js');
const roleMiddleware = require('../middleware/roleMiddleware.js');

const jwt = require('jsonwebtoken');
//const { secretKey } = require('../config.js');
const secretKey = process.env.secretKey;

const router = express.Router();


function verifyJwt(req) {
    try {
        if (req.headers.cookie === undefined) {
            return [];
        }
        const token = req.headers.cookie.split(';').find(x => x.indexOf('user') !== -1).split('=')[1];
        if (!token) {
            return {message: " Пользователь не авторизован"};
        }
        return jwt.verify(token, secretKey);
    }
    catch (e) {
        return [];
    }
}

function getRoles(req) {
    const { roles : userRoles } = verifyJwt(req);
    return userRoles;
}

async function getName(req) {
    const { id : currentId } = verifyJwt(req);
    if (currentId === undefined)
        return null;
    const {username: user} = await User.findOne({ _id: currentId });
    return user;
}

router.get('/', ( async (req, res) => {
    let isAuth = req.headers.cookie && req.headers.cookie.includes("user");
    let name = await getName(req);
    res.render('../views/layouts/main.ejs', {
        title: "Главная страница",
        isIndex: true,
        isAuth: isAuth,
        name: name
    });
}));

router.get('/register', (async (req, res) => {
    let isAuth = req.headers.cookie && req.headers.cookie.includes("user");
    let name = await getName(req);
    res.render('../views/layouts/registration.ejs',{
        title: "Регистрация",
            isIndex: true,
            isAuth: isAuth,
            name: name
    });
}));

router.get('/login', (async (req, res) => {
    let isAuth = req.headers.cookie && req.headers.cookie.includes("user");
    let name = await getName(req);
    res.render('../views/layouts/authorization.ejs',{
        title: "Авторизация",
        isIndex: true,
        isAuth: isAuth,
        name: name
    });
}));

router.get('/logout', (async (req, res) => {
    let isAuth = req.headers.cookie && req.headers.cookie.includes("user");
    let name = await getName(req);
    res.render('../views/layouts/logout.ejs',{
        title: "Выход",
        isIndex: true,
        isAuth: isAuth,
        name: name
    })
}));

router.get('/profile', (async (req, res) => {
    let isAuth = req.headers.cookie && req.headers.cookie.includes("user");
    let name = await getName(req);
    let role = getRoles(req)[0];
    res.render('../views/layouts/profile.ejs',{
        title: "Профиль",
        isIndex: true,
        isAuth: isAuth,
        name: name,
        role: role
    })
}));

router.get('/table', [authMiddleware], (async (req, res) => {
    const items = await MainModel.find({}).lean();
    const comments = await CommentModel.find({ }).lean();
    let isAuth = req.headers.cookie && req.headers.cookie.includes("user");
    const roles = getRoles(req);
    if (roles === undefined){
        res.redirect('/')
    }
    else {
        let name = await getName(req);
        let role = ""
        if (roles.includes("ADMIN")) {
            role = "ADMIN"
        } else if (roles.includes("EDITOR")) {
            role = "EDITOR"
        } else if (roles.includes("USER")) {
            role = "USER"
        }
        res.render('../views/layouts/mainTable.ejs', {
            title: "Таблица",
            isIndex: true,
            json: items,
            isAuth: isAuth,
            name: name,
            role: role,
            comments: comments
        });
    }
}))

router.get('/graphics', (async (req, res) => {
    let name = await getName(req);
    const items = await MainModel.find({}).lean();
    let isAuth = req.headers.cookie && req.headers.cookie.includes("user");
    res.render('../views/layouts/graphics.ejs', {
        title: "Графики",
        isIndex: true,
        json: items,
        isAuth: isAuth,
        name: name
    });
}));

module.exports = router;