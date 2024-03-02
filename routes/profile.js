const express = require("express");
const router = express.Router() 
require('dotenv').config();
const fileparser = require('../fileparser');
var findOneByEmail = require('../controllers/findByMail.controller');

const peopleDetailsModel = require("../models/peopleDetails"); 
router.use(express.urlencoded({ extended: false }))

router.get('/',(req,res)=>{
    if(req.isAuthenticated()){
        findOneByEmail(req.user)
        .then((data)=>{
            res.render("profile", {name :data.first_name,age:data.age, intrests:data.interests,country:data.country,age:data.age,bio:data.bio,imgSrc:data.profileImg,email:data.email});
        })
    }
    else 
        res.redirect('/login');
    
})

router.post("/edit",async (req,res)=>{
  console.log(req.body) ;
  if(req.body.bio!=undefined){
    await peopleDetailsModel.updateOne({email:req.user},{bio:req.body.bio}).exec()
  }
  if(req.body.phone!=undefined){
    await peopleDetailsModel.updateOne({email:req.user},{phone:req.body.phone}).exec()
  }
  const keysWithValueOn = Object.keys(req.body).filter(key => req.body[key] === 'on');

  // console.log(keysWithValueOn);
  await peopleDetailsModel.updateOne({email:req.user},{$set:{interests:keysWithValueOn}}).exec();
  res.redirect('/profile');
})

router.post("/changeProfilePic",async (req,res)=>{
  console.log(req); 
   await fileparser(req)
  .then(async data => {
    await peopleDetailsModel.updateOne({email:req.user},{$set:{profileImg:data.Location}}).exec();
    console.log(data);
    res.redirect('/profile');
  })
  .catch(error => {
    res.status(400).json({
      message: "An error occurred.",
      error
    })
  })
})
module.exports = router;







