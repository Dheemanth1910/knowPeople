require("../database/connection");

var express = require('express');
const session = require("express-session");
const bcrypt = require('bcrypt');
const saltRounds = 10;
const loginDetailsModel = require("../models/loginDetails");
const passport = require("passport");

const {sendMail} = require("../controllers/sendMail.controller");

const peopleDetailsModel = require("../models/peopleDetails");


var router = express.Router();
router.use(express.urlencoded({ extended: false }));


/* GET home page. */
router.get('/', function(req, res, next) {
  res.status(200).render('login',{messages: req.flash('error')} );
});

router.post('/',  passport.authenticate("local", {
  successRedirect: "/home",
  failureRedirect: "/login",
  failureFlash: 'Username or password incorrect , Please try again.',
}))

router.get('/forgotPassword',(req,res)=>{
  res.status(200).render('forgotPassword')
})

const forgotPasswordUsers = new Set();
const otpToMail = {};
router.post('/forgotPassword',(req,res)=>{
  // console.log(req.body);
  let otp;
  let username1 ;
  username1 = req.body.email;
  otp = sendMail(username1);
  otpToMail[otp] = username1
  hashedObj = (username1 + otp ) 
  forgotPasswordUsers.add(hashedObj);
  console.log(forgotPasswordUsers);
  res.status(200).send("otp sent successfully");
})

router.post('/checkOtp',(req,res)=>{
  console.log(req.body.otpVal);
  const mail = otpToMail[req.body.otpVal] 
  const actual = mail + req.body.otpVal ;
  console.log(actual);

  if(forgotPasswordUsers.has(actual)){
    res.send("true")
  }
  else{
    res.send("false");
  }
})

router.post('/updatePassword',async (req,res)=>{
  let username1 = req.body.email;
  let password = req.body.password;
  bcrypt.hash(password, saltRounds, async function(err, hash) {
    if(err){
        console.log(err);
        res.send("false")
    }  
    await loginDetailsModel.updateOne({email:username1},{$set:{password:hash}});
    res.redirect('/login');
})
})

passport.serializeUser((user, cb) => {
  cb(null, user);
});
passport.deserializeUser((user, cb) => {
  cb(null, user);
});


module.exports = router;