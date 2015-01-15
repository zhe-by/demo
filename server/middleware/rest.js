module.exports = function (Model) {
    return {
        getAll: function (req, res, next) {
            // todo filters
            Model.find({}, function (err, result) {
                if (err) {
                    return next(err);
                }
                res.json(result);
            });
        },
        getOne: function (req, res, next) {
            Model.findById(req.params._id, function (err, result) {
                if (err) {
                    return next(err);
                }
                res.json(result);
            });
        },
        create: function (req, res, next) {
            Model.create(req.body, function (err, result) {
                if (err) {
                    return next(err);
                }
                res.json(result);
            });
        },
        updateAll: function (req, res, next) {
            Model.update({}, req.body, function (err, result) {
                if (err) {
                    return next(err);
                }
                res.json(result);
            });
        },
        updateOne: function (req, res, next) {
            Model.findByIdAndUpdate(req.params._id, req.body,
                function (err, result) {
                    if (err) {
                        return next(err);
                    }
                    res.json(result);
                });
        },
        removeAll: function (req, res, next) {
            Model.remove({}, function (err, result) {
                if (err) {
                    return next(err);
                }
                res.json(result);
            });
        },
        removeOne: function (req, res, next) {
            Model.findByIdAndRemove(req.params._id,
                function (err, result) {
                    if (err) {
                        return next(err);
                    }
                    res.json(result);
                });
        }
    };
};
