const express = require('express');
const MainModel = require('../models/mainModel.js');

const authMiddleware = require('../middleware/authMiddleware.js');
const roleMiddleware = require('../middleware/roleMiddleware.js');

const router = express.Router();

router.get('/', [
        authMiddleware,
        roleMiddleware(["REDACTOR", "ADMIN"])
    ],( async (req, res) => {
    const items = await MainModel.find({}).lean();
    res.render('../views/layouts/main.ejs', {
        title: "Главная страница",
        isIndex: true,
        json: items
    });
}))
router.get('/register', (async (req, res) => {
    res.render('../views/layouts/registration.ejs')
}));

router.get('/login', (async (req, res) => {
    res.render('../views/layouts/authorization.ejs')
}));

module.exports = router;