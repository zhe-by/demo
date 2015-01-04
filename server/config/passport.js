var async = require('async');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
var FacebookStrategy = require('passport-facebook').Strategy;
var config = require('config');

var Auth = require('../models/Auth');
var User = require('../models/User');

module.exports = function (app) {
    function handle(provider, authId, firstName, lastName, email, done) {
        async.auto({
            checkAuth: function (done) {
                Auth.findOne({
                        authId: authId,
                        provider: provider
                    })
                    .exec(done);
            },
            user: ['checkAuth',
                function (done, results) {
                    if (results.checkAuth == null) {
                        User.create({
                                firstName: firstName,
                                lastName: lastName,
                                _id: email
                            })
                            .exec(done);
                    } else {
                        User.findById(results.checkAuth.userId)
                            .exec(done);
                    }
                }
            ],
            auth: ['checkAuth', 'user',
                function (done, results) {
                    if (results.checkAuth == null) {
                        Auth.create({
                                authId: authId,
                                userId: results.user._id,
                                provider: provider
                            })
                            .exec(done);
                    } else {
                        done(results.checkAuth);
                    }
                }
            ]
        }, function (err, results) {
            if (err) {
                done(err);
            } else {
                done(null, results.user);
            }
        });
    }

    passport.use(new LocalStrategy({
            usernameField: 'email',
            passwordField: 'password'
        },
        function (email, password, done) {
            User.findById(email, '+password')
                .exec(function (err, user) {
                    if (err) {
                        return done(err);
                    }
                    if (!user) {
                        return done(null, false, {
                            message: 'Incorrect username.'
                        });
                    }
                    if (!user.validPassword(password)) {
                        return done(null, false, {
                            message: 'Incorrect password.'
                        });
                    }
                    return done(null, user);
                });
        }
    ));

    passport.use(new FacebookStrategy({
            clientID: config.auth.facebook.id,
            clientSecret: config.auth.facebook.secret,
            callbackURL: 'http://' + config.host +
                '/api/session/callbacks/facebook'
        },
        function (accessToken, refreshToken, profile, done) {
            var id = profile.id;
            var email = profile._json.email;
            var firstName = profile.name.givenName;
            var lastName = profile.name.familyName;
            handle('facebook', id, firstName, lastName, email, done);
        }
    ));

    passport.use(new GoogleStrategy({
            clientID: config.auth.google.id,
            clientSecret: config.auth.google.secret,
            callbackURL: 'http://' + config.host +
                '/api/session/callbacks/google'
        },
        function (accessToken, refreshToken, profile, done) {
            var id = profile.id;
            var email = profile._json.email;
            /*jshint camelcase:false*/
            var firstName = profile._json.given_name;
            var lastName = profile._json.family_name;
            handle('google', id, firstName, lastName, email, done);
        }
    ));

    passport.serializeUser(function (user, done) {
        done(null, user._id);
    });

    passport.deserializeUser(function (userId, done) {
        User.findById(userId)
            .exec(done);
    });

    app.use(require('cookie-parser')());
    app.use(require('cookie-session')({
        secret: config.secret
    }));

    app.use(passport.initialize());
    app.use(passport.session());
};
