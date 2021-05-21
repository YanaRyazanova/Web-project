const express = require('express');
const MainModel = require('../models/mainModel.js');
const authMiddleware = require('../middleware/authMiddleware.js');
const roleMiddleware = require('../middleware/roleMiddleware.js');

const router = express.Router();

router.get('/',( async (req, res) => {
    const items = await MainModel.find({}).lean();
    res.render('../views/layouts/editor.ejs', {
        title: "Главная страница",
        isIndex: true,
        items
    });
}))
//     , [
//     authMiddleware,
//     roleMiddleware(["REDACTOR", "ADMIN"])
// ]
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