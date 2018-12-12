// REQUIRE MONGOOSE 
var mongoose = require('mongoose');

// SCHEMA SETUP 

let pollSchema = new mongoose.Schema({
    title: String,
    options: [{
      name: String,
      votes: Number
      }]
    });

module.exports = mongoose.model("poll", pollSchema);
