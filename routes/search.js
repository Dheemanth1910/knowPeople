const express = require("express");
const router = express.Router() 

const peopleDetailsModel = require("../models/peopleDetails"); 
const { data } = require("jquery");


router.get('/',(req,res)=>{
    if(req.isAuthenticated())
        res.render("search");
    else 
        res.redirect('/login');
})
router.post('/',(req,res)=>{
    let activePreferences = req.body["active[]"]
    peopleDetailsModel.find({interests:{$in : activePreferences}})
    .then((data)=>{
        res.send(data);
    })
    
})


module.exports = router;