var express = require('express');
var findOneByEmail = require('../controllers/findByMail.controller');
var router = express.Router();
router.use(express.urlencoded({ extended: false }));
const peopleDetailsModel = require("../models/peopleDetails"); 

router.get('/',(req,res)=>{
  if(req.isAuthenticated()){
    findOneByEmail(req.user)
    .then((data)=>{
        res.status(200).render("home", {first_name :data.first_name,last_name : data.last_name,email : data.email});
    })
}
  else 
    res.redirect('/login')
})
router.post('/getLiked',async (req,res)=>{
  await peopleDetailsModel.findOne({email:req.user},{ liked: { $slice: -10 }, _id: 0 })
  .then((data)=>{
    // console.log(data);
    res.send(data);
  })
  .catch((err)=>{
    res.send(err);
  })
})
router.post('/getlikes',async(req,res)=>{
  await peopleDetailsModel.findOne({email:req.user},{ likes: { $slice: -10 }, _id: 0 })
  .then((data)=>{
    // console.log(data);
    res.send(data);
  })
  .catch((err)=>{
    res.send(err);
  })
})
module.exports = router;