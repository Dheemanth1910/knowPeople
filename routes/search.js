const express = require("express");
const router = express.Router() 

const peopleDetailsModel = require("../models/peopleDetails"); 
const { data } = require("jquery");


router.get('/',(req,res)=>{

    if(req.isAuthenticated()){
        peopleDetailsModel.findOne({email:req.user})
        .then((data)=>{
            res.render("search", {name:data.first_name,age:data.age, intrests:data.interests,country:data.country,age:data.age,bio:data.bio,imgSrc:data.profileImg,email : data.email});
        })

    }
    else 
        res.redirect('/login');
})
router.post('/',(req,res)=>{
    let activePreferences = req.body["active[]"]
    peopleDetailsModel.find({interests:{$in : activePreferences}},{_id:0})
    .then((data)=>{
        // console.log(data)
        res.send(data);
    })
    
})
router.post('/like',async (req,res)=>{
    console.log(req.user) 
    const userId = req.body.id; 
    let likedName = "" ;
    await peopleDetailsModel.findOneAndUpdate({id:userId},{$push:{likes:{name:req.user}}}).then((data)=>{
        likedName = data.first_name + " " +data.last_name ;
    })
    await peopleDetailsModel.updateOne({email:req.user},{$push:{liked:{name:likedName}}}).exec()
    res.send("data Recieved")
})

module.exports = router;