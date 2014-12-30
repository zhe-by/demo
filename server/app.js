var path = require('path');
var config = require('config');
var express = require('express');

var app = express();

app.use(require('./config/nocache'));


app.use(function (err, req, res, next) {
    console.error(err);
    next(err);
});

app.get('/', function (req, res, next) {
    res.sendFile(path.join(__dirname, '../frontend/static/landing.html'));
});

app.use(express.static(path.join(__dirname, '../frontend/static')));

app.listen(config.get('port'), function () {
    console.log('deployed on port: ' + config.get('port'));
});
