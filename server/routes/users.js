var router = require('express').Router();
var User = require('../models/User');

var acl = require('../middleware/acl');

module.exports = router
    .get('/', acl.admin, function (req, res, next) {
        User.find({}, function (err, result) {
            if (err) {
                return next(err);
            }
            res.json(result);
        });
    })
    .get('/:_id', acl.owner('_id'), function (req, res, next) {
        if (req.user._id === req.params._id) {
            res.json(req.user);
        } else {
            User.findById(req.params._id, function (err, result) {
                if (err) {
                    return next(err);
                }
                res.json(result);
            });
        }
    })
    .post('/', acl.admin, function (req, res, next) {
        User.create(req.body,
            function (err, user) {
                if (err) {
                    return next(err);
                }
                res.json(user);
            });
    })
    .put('/:_id', acl.owner('_id'), function (req, res, next) {
        User.findByIdAndUpdate(req.params._id, req.body,
            function (err, result) {
                if (err) {
                    return next(err);
                }
                res.json(result);
            });
    })
    .delete('/:_id', acl.owner('_id'), function (req, res, next) {
        User.findByIdAndRemove(req.params._id,
            function (err, result) {
                if (err) {
                    return next(err);
                }
                res.json(result);
            });
    });
