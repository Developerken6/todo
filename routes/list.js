var list     = require('../models/list');
var express  = require('express');
var router   = express.Router();

// ===========================================================================
// LIST
// ===========================================================================
// SHOW NEW LIST PAGE

router.get('/list', function(req, res){
  res.render('newList');
});

// CREATE NEW LIST PAGE

router.post('/newList', function(req, res){
  list.create({'title': req.body.title}, function(err, newList){
    if (err) {
      console.log(err)
    } else {
      res.redirect('/index');
    }
  })
});

// DETAIL LIST PAGE

router.get('/index/:id', function(req,res){
  list.findById(req.params.id).populate('item').exec(function(err, foundList){
      if (err){
        console.log(err)
      } else {
        res.render('todos/todo', {list: foundList})
      }
  })
});

//DELETE LIST

router.delete('/:id', function(req,res){
  console.log(req.params.id);
  list.findByIdAndRemove(req.params.id, function(err){
    if (err) {
      console.log(err)
      res.send("there has been an error")
    } else {
      res.redirect('/index')
    }
  })
});

module.exports = router;