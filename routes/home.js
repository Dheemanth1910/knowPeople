var express = require('express');
const peopleDetailsModel = require("../models/peopleDetails");
const loginDetailsModel = require("../models/loginDetails");

var router = express.Router();
router.use(express.urlencoded({ extended: false }));

const bcrypt = require('bcrypt');
const saltRounds = 10;

router.post('/',async function(req,res){
    const password = req.body.password 

    await loginDetailsModel.findOne({email : req.body.username})
    .then((result) =>{
      if(result === null){
        res.send("The entered username doesn't exist Please try again , ");
      }
      else{
         bcrypt.compare(password, result.password).then(function(reslt) {
            if(reslt){
              res.render('home');
            }
            else{
              res.send("wrong Password entered, Please try again.");
            }
          });
      }
    })
})


module.exports = router;