var express = require('express');
var router = express.Router();
router.use(express.urlencoded({ extended: false }));
const peopleDetailsModel = require('../models/peopleDetails');
const userModel = require('../models/userModel');
const findOneByEmail = require('../controllers/findByMail.controller');

router.get('/',(req,res)=>{
    if(req.isAuthenticated()){
      findOneByEmail(req.user)
      .then((data)=>{
          res.status(200).render("chat", {id:data._id,email : data.email });
      })
  }
    else 
      res.redirect('/login')
})
router.get('/getUsers',async (req,res)=>{
    let uid = req.query.id; 
    await userModel.findOne({id:uid},{isChattingWith:1,_id:0}).then((data)=>{
        res.send(data);
    })
})
module.exports = router;