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
    peopleDetailsModel.findOne({email:req.user})
    .then((data)=>{
        res.render("home", {first_name :data.first_name,last_name : data.last_name});
    })
}
  else 
    res.redirect('/login')
})
router.post('/getLiked',async (req,res)=>{
  await peopleDetailsModel.findOne({email:req.user},{liked:1,_id:0}).then((data)=>{
    res.send(data);
  })
  .catch((err)=>{
    res.send(err);
  })
})

module.exports = router;