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
  res.render('login');
});

router.post('/',  passport.authenticate("local", {
  successRedirect: "/home",
  failureRedirect: "/login",
  failureFlash: true
}))

router.get('/forgotPassword',(req,res)=>{
  res.render('forgotPassword')
})
let otp;
let username1 ;
router.post('/forgotPassword',(req,res)=>{
  // console.log(req.body);
  username1 = req.body.email,
  otp = sendMail(req.body.email)
  
  res.send("otp sent successfully");
})

router.post('/checkOtp',(req,res)=>{
  console.log(req.body.otpVal);
  if(otp == req.body.otpVal){
    res.send("true")
  }
  else{
    res.send("false");
  }
})

router.post('/updatePassword',async (req,res)=>{
  let password = req.body.password;
  bcrypt.hash(password, saltRounds, async function(err, hash) {
    if(err){
        console.log(err);
        res.send("false")
    }
    
    await loginDetailsModel.updateOne({email:username1},{$set:{password:hash}});
    
    res.send("data recieved successfully, Please login agian. ")
})
})

passport.serializeUser((user, cb) => {
  cb(null, user);
});
passport.deserializeUser((user, cb) => {
  cb(null, user);
});


module.exports = router;