const express = require("express");
const router = express.Router() 

const peopleDetailsModel = require("../models/peopleDetails"); 


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



module.exports = router;