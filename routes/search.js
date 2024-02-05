const express = require("express");
const router = express.Router() 

const peopleDetailsModel = require("../models/peopleDetails"); 


router.get('/',(req,res)=>{
    if(req.isAuthenticated())
        res.render("search");
    else 
        res.redirect('/login');
})



module.exports = router;