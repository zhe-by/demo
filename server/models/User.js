var crypto = require('crypto');
var config = require('config');
var mongoose = require('mongoose');

module.exports = mongoose.model(
    'User',
    new mongoose.Schema({
        email: {
            type: String,
            required: true,
            unique: true
        },
        password: {
            type: String,
            select: false
        },
        firstName: String,
        lastName: String
    })
    .pre('save', function (next) {
        var hash = crypto.createHash('md5')
            .update(this.password)
            .update(config.secret)
            .digest('hex');
        this.password = hash;
        next();
    })
    .method({
        validPassword: function (password) {
            var hash = crypto.createHash('md5')
                .update(password)
                .update(config.secret)
                .digest('hex');
            return this.password === hash;
        }
    }),
    'users');
