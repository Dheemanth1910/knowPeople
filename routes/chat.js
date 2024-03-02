var express = require('express');
var router = express.Router();
router.use(express.urlencoded({ extended: false }));
const peopleDetailsModel = require('../models/peopleDetails');
const userModel = require('../models/userModel');
router.get('/',(req,res)=>{
    res.render('chat');
//     if(req.isAuthenticated()){
//       findOneByEmail(req.user)
//       .then((data)=>{
//           res.status(200).render("chat", {first_name :data.first_name,last_name : data.last_name,email : data.email});
//       })
//   }
//     else 
//       res.redirect('/login')
})
router.get('/getUsers',async (req,res)=>{
    await userModel.findOne({email:req.user},{isChattingWith:1,_id:0}).then((data)=>{
        console.log(data);
        res.send(data);
    })
})
module.exports = router;