// REQUIRE MONGOOSE FIRST
var mongoose = require('mongoose');

// SCHEMA SETUP

var todoSchema = new mongoose.Schema({
  item: String
});

// EXPORT THE SCHEMA TO MODEL
module.exports = mongoose.model('todo', todoSchema);
