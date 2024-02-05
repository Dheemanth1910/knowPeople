require("../database/connection");

var express = require('express');
const session = require("express-session");
const bcrypt = require('bcrypt');
const passport = require("passport");
const Strategy = require("passport-local");

const peopleDetailsModel = require("../models/peopleDetails");
const loginDetailsModel = require("../models/loginDetails");

var router = express.Router();
router.use(express.urlencoded({ extended: false }));

const saltRounds = 10;

router.use(session({
  secret:"passwordOfUSer",
  resave : false ,
  saveUninitialized : true ,

}))
router.use(passport.initialize())
router.use(passport.session())

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});

router.post('/login',  passport.authenticate("local", {
  successRedirect: "/home",
  failureRedirect: "/",
}))


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


passport.serializeUser((user, cb) => {
  cb(null, user);
});
passport.deserializeUser((user, cb) => {
  cb(null, user);
});


module.exports = router;
