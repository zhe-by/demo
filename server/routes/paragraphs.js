var router = require('express').Router();
var Paragraph = require('../models/Paragraph');
var rest = require('../middleware/rest');
var ParagraphRest = rest(Paragraph);

module.exports = router
    .get('/', ParagraphRest.getAll);