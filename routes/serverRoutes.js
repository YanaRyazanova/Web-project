const express = require('express');
const MainModel = require('../models/mainModel.js');

const router = express.Router();

router.get('/', ( async (req, res) => {
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

router.get('/api/getAll', (async (req, res) => {
    const items = await MainModel.find({}).lean();
    res.status(200).json(items);
}));

router.post('/api/create', (async (req, res) => {
    const newItem = new MainModel({
        name: req.body.name
    });
    await newItem.save();
    res.redirect('/');
}));

module.exports = router;