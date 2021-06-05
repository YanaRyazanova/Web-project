const express = require('express');
const MainModel = require('../models/mainModel.js');
const authMiddleware = require('../middleware/authMiddleware.js');
const roleMiddleware = require('../middleware/roleMiddleware.js');
const controller = require('../controllers/bdChangesControl.js');
const commentController = require('../controllers/commentControl.js');
const bodyParser = require("body-parser");


const router = express.Router();
let jsonParser = bodyParser.json();

router.post('/api/update', jsonParser, controller.changeFieldValue);
router.post('/api/addComment', jsonParser, commentController.addComment)

module.exports = router;