const express = require('express');
const MainModel = require('../models/mainModel.js');

const router = express.Router();

router.get('/', ( async (req, res) => {
    const items = await MainModel.find({}).lean();
    res.render('index', {
        title: "Главная страница",
        isIndex: true,
        items
    });
}))

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