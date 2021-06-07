const CommentModel = require('../models/comments.js');
//const { secretKey } = require('../config.js');
const secretKey = process.env.secretKey;
const jwt = require('jsonwebtoken');
const User = require('../models/User.js');


function verifyJwt(req) {
    if (req.headers.cookie === undefined) {
        return [];
    }
    const token = req.headers.cookie.split(';').find(x => x.indexOf('user') !== -1).split('=')[1];
    if (!token){
        return { message: " Пользователь не авторизован"};
    }
    return jwt.verify(token, secretKey);
}

class commentController {
    async addComment(req, res) {
        const { x, y, comment } = req.body;
        const user = verifyJwt(req);
        const curUser = await User.findOne({_id: user.id});
        const newComment = new CommentModel({
            "user": curUser.username,
            "x": x,
            "y": y,
            "comment": comment
        });
        await newComment.save();
        res.status(200).redirect('/table');
    }
}

module.exports = new commentController();