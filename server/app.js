var path = require('path');
var config = require('config');
var express = require('express');

var app = express();

app.use(require('./config/nocache'));

require('./config/passport')(app);

var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(require('compression')());

app.get('/', function (req, res, next) {
    var page = req.user ? 'index' : 'landing';
    res.sendFile(path.join(__dirname, '../frontend/static/' + page + '.html'));
});

app.use(express.static(path.join(__dirname, '../frontend/static')));

require('fs').readdirSync('routes').forEach(function (fileName) {
    var routeName = fileName.substr(0, fileName.indexOf('.js'));
    app.use('/api/' + routeName, require('./routes/' + routeName));
});

app.use(function (err, req, res, next) {
    console.error(err);
    next(err);
});

app.listen(config.get('port'), function () {
    console.log('deployed on port: ' + config.get('port'));
});
