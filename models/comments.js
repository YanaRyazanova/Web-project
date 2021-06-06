const {Schema, model} = require('mongoose');

const Comment = new Schema({
    user: {
        type: String,
        required: true
    },
    x: {
        type: String,
        default: false
    },
    y: {
        type: String,
        default: false
    },
    comment: {
        type: String,
        default: false
    }
})

module.exports = model('Comment', Comment);