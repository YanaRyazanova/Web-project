const CommentModel = require('../models/comments.js');

class commentController {
    async addComment(req, res) {
        const { x, y, comment } = req.body;
        const newComment = new CommentModel({
            "user": "1",
            "x": x,
            "y": y,
            "comment": comment
        });
        await newComment.save();
        res.status(200);
    }
}

module.exports = new commentController();