var Router = require('express').Router;
var router = Router();
var passport = require('passport');
var User = require('../models/User');

var acl = require('../middleware/acl');

var oauthRouter = Router()
    .get('/facebook',
        passport.authenticate('facebook', {
            scope: 'email'
        }),
        function (req, res) {})
    .get('/vkontakte',
        passport.authenticate('vkontakte', {
            scope: ['email']
        }),
        function (req, res) {})
    .get('/google',
        passport.authenticate('google', {
            scope: ['profile', 'email']
        }),
        function (req, res) {});

var callbacksRouter = Router()
    .get('/facebook',
        passport.authenticate('facebook', {
            successRedirect: '/',
            failureRedirect: '/'
        }))
    .get('/vkontakte',
        passport.authenticate('vkontakte', {
            successRedirect: '/',
            failureRedirect: '/'
        }))
    .get('/google',
        passport.authenticate('google', {
            successRedirect: '/',
            failureRedirect: '/'
        }));

module.exports = router
    .use('/oauth', oauthRouter)
    .use('/oauth/callbacks', callbacksRouter)
    .get('/email/exist', function (req, res, next) {
        User.findById(req.query.email, function (err, result) {
            if (err) {
                return next(err);
            }
            res.sendStatus(result ? 409 : 204);
        });
    })
    .post('/password/reset', function (req, res, next) {
        res.redirect('/reset.html');
    })
    .post('/register',
        function (req, res, next) {
            User.create(req.body,
                function (err, user) {
                    if (err) {
                        return next(err);
                    }
                    next();
                });
        },
        passport.authenticate('local', {}),
        function (req, res, next) {
            res.redirect('/');
        }
    )
    .post('/login', passport.authenticate('local', {}),
        function (req, res, next) {
            res.redirect('/');
        })
    .post('/logout', function (req, res, next) {
        req.logout();
        res.redirect('/');
    })
    .get('/session', acl.auth, function (req, res, next) {
        res.json(req.user);
    });
