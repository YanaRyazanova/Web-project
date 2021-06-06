const express = require('express');
const MainModel = require('../models/mainModel.js');
const authMiddleware = require('../middleware/authMiddleware.js');
const roleMiddleware = require('../middleware/roleMiddleware.js');
const controller = require('../controllers/bdChangesControl.js');
const commentController = require('../controllers/commentControl.js');
const bodyParser = require("body-parser");
const CommentModel = require('../models/comments.js');


const router = express.Router();
let jsonParser = bodyParser.json();

router.post('/api/update', jsonParser, controller.changeFieldValue);
router.post('/api/addComment', jsonParser, commentController.addComment);
router.get('/api/getAllComments', (async (req, res) => {
    const comments = await CommentModel.find({ }).lean();
    res.render('../views/layouts/comments.ejs', {
        comments: comments
    })
}));

module.exports = router;