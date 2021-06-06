const CommentModel = require('../models/comments.js');

class commentController {
    async addComment(req, res) {
        const { user, x, y, comment } = req.body;
        const newComment = new CommentModel({
            "user": user,
            "x": x,
            "y": y,
            "comment": comment
        });
        await newComment.save();
        res.status(200);
    }
}

module.exports = new commentController();