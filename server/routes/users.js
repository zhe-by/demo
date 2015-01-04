var router = require('express').Router();
var User = require('../models/User');

module.exports = router
    .get('/')
    .get('/:_id')
    .post('/')
    .put('/:_id')
    .delete('/:_id');
