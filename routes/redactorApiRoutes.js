const express = require('express');
const MainModel = require('../models/mainModel.js');
const authMiddleware = require('../middleware/authMiddleware.js');
const roleMiddleware = require('../middleware/roleMiddleware.js');


const router = express.Router();

router.post('/api/update', (async (req, res) => {
    /*const newItem = new MainModel({
        name: req.body.name
    });
    await newItem.save();
    res.redirect('/');*/
    res.status(200).json('OK')
}));

module.exports = router;