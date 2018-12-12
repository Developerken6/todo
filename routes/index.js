var User = require('../models/user');
var passport = require('passport');
var list = require('../models/list');
var express = require('express');
var router = express.router();

// ===========================================================================
// INDEX
// ===========================================================================
//INDEX ROUTE PAGE

router.get('/index', function(req, res){
  list.find({}, function(err, foundList){
    if (err) {
      console.log(err)
    } else {
      res.render('index', {list: foundList, currentUser: req.user});
    }
  })
});

// ------------authenticate Routes ------------------

router.get('/register', function(req, res){
  res.render('register');
});

router.post('/register', function(req,res){
  req.body.username
  req.body.password
  User.register(new User({username: req.body.username}), req.body.password, function(err, user){
    if (err) {
      console.log(err);
      return res.render('register');
    } else {
      passport.authenticate('local')(req, res, function(){
        res.redirect('/index');
      });
    }

  });
})

router.get('/login', function(req, res){
  res.render('login');
});

router.post('/login', passport.authenticate('local', { successRedirect: "/index",
                                                       failureRedirect: "/login"}));
                                                       
// function(req, res){
// });

// function isLoggedIn(req, res, next){
// 	if (req.isAuthenticated()){
// 		return next();
// 	}
// 	res.redirect('/login');
// }

module.exports = router;