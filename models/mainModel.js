const {Schema, model} = require('mongoose');

const schema = new Schema({
    name: {
        type: String,
        required: true
    },
    field1: {
        type: String,
        default: false
    },
    field2: {
        type: String,
        default: false
    }
});
module.exports = model('Add', schema);
