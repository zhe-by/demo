var mongoose = require('mongoose');

module.exports = mongoose.model(
    'Auth',
    new mongoose.Schema({
        authId: {
            type: String,
            required: true
        },
        userId: {
            type: String,
            required: true
        },
        provider: {
            type: String,
            required: true
        }
    }),
    'auth');
