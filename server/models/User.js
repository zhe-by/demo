var mongoose = require('mongoose');
module.exports = mongoose.model('User', new mongoose.Schema({
    _id: {
        type: String,
        required: true,
        unique: true
    },
    password: String
}), 'users');
