var express = require('express');
const session = require("express-session");
const bcrypt = require('bcrypt');
const passport = require("passport");

const peopleDetailsModel = require("../models/peopleDetails");
const loginDetailsModel = require("../models/loginDetails");

var router = express.Router();
router.use(express.urlencoded({ extended: false }));

router.get('/',(req,res)=>{
  if(req.isAuthenticated()){
    res.render('home');
  }
  else 
    res.redirect('/login')
})
module.exports = router;