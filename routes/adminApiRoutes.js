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
        const {newColumn, defaultValue} = req.body;
        const res_ = await MainModel.updateMany({},
            { $set: { newColumn:  defaultValue }},
            { upsert: true});
        console.log(res_);
        res.status(200).json('Success!');
    }
    catch (e) {
        console.log(e);
        res.status(403).json("Не получилось добавить колонку");
    }
}))

module.exports = router;