var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const bcrypt = require('bcrypt');
const loginDetailsModel = require("./models/loginDetails");
var flash = require('connect-flash');
// routers 

var indexRouter = require('./routes/index');
var homeRouter = require('./routes/home.js');
var registerRouter = require("./routes/register.js");
var loginRouter = require('./routes/login.js');
var profileRouter = require('./routes/profile.js');
var searchRouter = require('./routes/search.js');
var logoutRouter = require("./routes/logout.js")


var app = express();
const Strategy = require("passport-local");

const passport = require('passport');
const session = require('express-session');

app.use(session({ secret: 'TOPSECRET', resave: true, saveUninitialized: true ,cookie: {
  maxAge: 24 * 60 * 60 * 1000}}));

app.use(passport.initialize());
app.use(passport.session());
app.use(flash());
passport.use(
  new Strategy(async function verify(username, password, cb) {
    try {
      await loginDetailsModel.findOne({email : username})
      .then((result) =>{
        if(result === null){
          return cb("User not found");;
        }
        else{
          let user = result.email ; 
          bcrypt.compare(password, result.password).then(function(reslt) {
              if(reslt){
                return cb(null, user);
              }
              else{
                return cb(null, false);
              }
            });
        }
      })
    } catch (err) {
      console.log(err);
    }
  })
);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/home',homeRouter);
app.use('/register',registerRouter);
app.use('/login',loginRouter);
app.use('/profile',profileRouter);  
app.use('/search',searchRouter);
app.use('/logout',logoutRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;