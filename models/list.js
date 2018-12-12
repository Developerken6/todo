// REQUIRE MONGOOSE
var mongoose = require('mongoose');

// SCHEMA SETUP

let listSchema = new mongoose.Schema({
  title: String,
  item: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "todo"
  }]

});


module.exports = mongoose.model("list", listSchema);
