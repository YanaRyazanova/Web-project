const express = require('express');
const MainModel = require('../models/mainModel.js');
const mongoose = require('mongoose');
const authMiddleware = require('../middleware/authMiddleware.js');
const roleMiddleware = require('../middleware/roleMiddleware.js');

const router = express.Router();

router.get('/api/getAll', (async (req, res) => {
    const items = await MainModel.find({}).lean();
    res.status(200).json(items);
}));

router.post('/api/addColumn', (async (req, res) => {
    try{
        const { newColumn, defaultValue } = req.body;
        let value = {};
        value[newColumn] = defaultValue;
        const res_ = await MainModel.updateMany({},
            [ {$set : value } ]);
        console.log(res_);
        res.status(200).json('Success!');
    }
    catch (e) {
        console.log(e);
        res.status(403).json("Не получилось добавить колонку");
    }
}));

router.post('/api/addRow', (async (req, res) => {
    try{
        const { newUser } = req.body;
        const newRow = new MainModel({ name: newUser });
        await newRow.save();
        res.status(200).json('Super!');
    }
    catch (e) {
        console.log(e);
        res.status(403).json("Не получилось добавить строчку");
    }
}))

module.exports = router;