var todo     = require('../models/item');
var list     = require('../models/list')
var express  = require('express');
var router   = express.Router();

// ==========================================================================
// ITEMS
// ==========================================================================

// DELETE ITEM

router.delete('/item/:id', function(req,res){
    todo.findByIdAndRemove(req.params.id, function(err){
      if (err) {
        console.log(err)
        res.send("there has been an error")
      } else {
        res.redirect('/index/:id')
      }
    })
  });
  
  // ADD TO LIST
  
  router.post('/index/:id/add', function(req, res){
    todo.create({item: req.body.item}, function(err, item){
        if (err) {
          console.log(err)
        } else {
          list.findById(req.params.id, function(err, foundList){
            if (err) {
              console.log(err)
          } else {
            foundList.item.push(item._id)
            foundList.save()
            res.redirect('/index/' + foundList._id);
          }
        });
        }
    })
  });

  function isLoggedIn(req, res, next){
    if (req.isAuthenticated()){
      return next();
    }
    res.redirect('/login');
  }

  module.exports = router;