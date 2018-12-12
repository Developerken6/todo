//REQUIRING THINGS
var express               = require('express');
var mongoose              = require('mongoose');
var bodyParser            = require('body-parser');
var methodOverride        = require('method-override');
var path                  = require('path')
var todo                  = require('./models/item');
var list                  = require('./models/list');
var User                  = require('./models/user');
var passport              = require('passport');
var LocalStrategy         = require('passport-local');
var passportLocalMongoose = require('passport-local-mongoose');
var expressSession        = require('express-session');

// REQUIRING THE ROUTE FILES 

var itemRoutes = require('./routes/item');
var listRoutes = require('./routes/list');
var indexRoutes = require('./routes/index');

//BODY PARSER CONFIG
var urlencodedParser = bodyParser.urlencoded({ extended: false })

// APP CONFIG
var app                   = express();
mongoose.connect('mongodb://localhost/todolist');
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static('public'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(methodOverride("_method"));
app.use(require('express-session')({
  secret: "ik ben de beste",
  resave: false,
  saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// MIDDLEWARE THAT RUNS ON EVERY ROUTE
app.use(function(req,res, next){
  res.locals.currentUser = req.user;
  next();
});


// SETTING UP APP VAR TO USE ROUTES

app.use(listRoutes);
app.use(itemRoutes);
app.use(indexRoutes);



//SERVER CONFIG
let port = 3000
app.listen(port);
console.log('Server is listening on port ' + port);
