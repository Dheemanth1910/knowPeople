const express = require("express");
const router = express.Router() 
require('dotenv').config();
const fileparser = require('../fileparser');

const peopleDetailsModel = require("../models/peopleDetails"); 
router.use(express.urlencoded({ extended: false }))

router.get('/',(req,res)=>{
    if(req.isAuthenticated()){
        peopleDetailsModel.findOne({email:req.user})
        .then((data)=>{
            res.render("profile", {name :data.first_name,age:data.age, intrests:data.interests,country:data.country,age:data.age});
        })
    }
    else 
        res.redirect('/login');
    
})

router.post("/edit",(req,res)=>{
    console.log(req.body) ;
    res.send('Data-recieved');
})

router.post("/changeProfilePic",async (req,res)=>{
   await fileparser(req)
  .then(data => {
    res.status(200).json({
      message: "Success",
      data
    })
  })
  .catch(error => {
    res.status(400).json({
      message: "An error occurred.",
      error
    })
  })
})
module.exports = router;







