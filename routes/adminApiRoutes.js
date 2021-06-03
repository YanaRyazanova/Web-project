const express = require('express');
const MainModel = require('../models/mainModel.js');
const mongoose = require('mongoose');
const authMiddleware = require('../middleware/authMiddleware.js');
const roleMiddleware = require('../middleware/roleMiddleware.js');
const controller = require('../controllers/bdChangesControl.js');

const router = express.Router();

router.post('/api/addColumn', controller.updateField);

router.post('/api/addRow', controller.addObject);

module.exports = router;