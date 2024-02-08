require("../database/connection");

var express = require('express');
const session = require("express-session");
const bcrypt = require('bcrypt');
const passport = require("passport");


const peopleDetailsModel = require("../models/peopleDetails");


var router = express.Router();
router.use(express.urlencoded({ extended: false }));


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('login');
});

router.post('/',  passport.authenticate("local", {
  successRedirect: "/home",
  failureRedirect: "/login",
  failureFlash: true
}))




passport.serializeUser((user, cb) => {
  cb(null, user);
});
passport.deserializeUser((user, cb) => {
  cb(null, user);
});


module.exports = router;