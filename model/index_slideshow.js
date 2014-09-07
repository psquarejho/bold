var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/boldsite');

var schema = new mongoose.Schema({
  caption: String,
  path: String
});

module.exports = mongoose.model('Slideshow', schema);
