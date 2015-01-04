var router = require('express').Router();
var User = require('../models/User');

function isEmailUsed(email, cb) {
    User.where('id', email)
        .count(cb);
}

module.exports = router
    .get('/email/exist', function (req, res, next) {
        isEmailUsed(req.query.email, function (err, isUsed) {
            if (err) {
                return next(err);
            }
            res.sendStatus(isUsed ? 409 : 204);
        });
    })
    .post('/password/reset', function (req, res, next) {

    });
