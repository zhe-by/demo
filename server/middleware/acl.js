var config = require('config');
module.exports = {
    admin: function (req, res, next) {
        if (req.user && req.user._id === config.admin.email) {
            return next();
        } else {
            res.sendStatus(401);
        }
    },
    auth: function (req, res, next) {
        if (req.user && req.user._id === config.admin.email) {
            return next();
        }
        if (req.user) {
            return next();
        } else {
            res.sendStatus(401);
        }
    },
    owner: function (userIdParamFieldName) {
        return function (req, res, next) {
            if (req.user && req.user._id === config.admin.email) {
                return next();
            }
            if (req.user && req.user._id === req.params[userIdParamFieldName]) {
                return next();
            } else {
                res.sendStatus(401);
            }
        };
    }
};
