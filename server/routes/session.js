var Router = require('express').Router;
var router = Router();
var User = require('../models/User');

var authRouter = Router()
    .get('/facebook')
    .get('/google')
    .get('/vk');

var callbacksRouter = Router()
    .get('/facebook')
    .get('/google')
    .get('/vk');

module.exports = router
    .use('/auth/', authRouter)
    .use('/auth/callbacks', callbacksRouter)
    .get('/')
    .post('/')
    .delete('/');
