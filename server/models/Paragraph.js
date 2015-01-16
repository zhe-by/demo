var mongoose = require('mongoose');

module.exports = mongoose.model(
    'Paragraph',
    new mongoose.Schema({
        title: {
            type: String,
            required: true
        }
    }),
    'paragraphs'
);
