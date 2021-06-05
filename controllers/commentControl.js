const commentModel = require('../models/comments.js');

class commentController {
    async addComment(req, res) {
        const { user, x, y, comment } = req.body;
        res.status(200);
    }
}

module.exports = new commentController();