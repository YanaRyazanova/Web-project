const express = require('express');
const MainModel = require('../models/mainModel.js');

const router = express.Router();

router.get('/', ( async (req, res) => {
    const items = await MainModel.find({});
    res.render('index', {
        title: "Главная страница",
        isIndex: true,
        items
    });
}))
// router.get('/api/create', ((req, res) => {
//     res.render('create');
// }));

module.exports = router;