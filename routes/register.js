var express = require('express');
var router = express.Router();
const bcrypt = require('bcrypt');
const saltRounds = 10;

router.use(express.urlencoded({ extended: false }));
const loginDetailsModel = require("../models/loginDetails");
const peopleDetailsModel = require("../models/peopleDetails");
const userModel = require('../models/userModel');
const countModel = require('../models/countModel');
router.get('/', function(req, res, next) {
    res.render('register');
  });

router.post('/submit',async (req,res)=>{

    const myPlaintextPassword = req.body.password; 
    await loginDetailsModel.findOne({email : req.body.email})
    .then((result) =>{
        console.log(result);
        if(result !== null){
            // req.flash(messages , "Entered email alrready exists ,, Please try loging in or choose a different email .")
            res.redirect('/register');
        }
        else{
            bcrypt.hash(myPlaintextPassword, saltRounds, async function(err, hash) {
                if(err){
                    console.log(err);
                }
                // Store hash in your password DB.
                let data={email : req.body.email, 
                    password : hash}
                await loginDetailsModel.create(data);
                countModel.findOne()
                .then(async (result)=>{
                    console.log(result);
                    let uid = result.id +1 ;
                    let person = {id:uid,
                        first_name:req.body.firstName,
                        last_name:req.body.lastName,
                        email:req.body.email,
                        gender:req.body.gender,
                        interests : [],
                        country:req.body.country,
                        age:parseInt(req.body.age),
                        profileImg : "",
                        bio : "",
                        phone : 0,
                        liked : [],
                        likes :[]
                        };
                    await countModel.updateOne({id:result.id},{$inc:{id:1}}).exec();
                    await peopleDetailsModel.create(person) ;
                });
                let userData = {name:req.body.firstName,email:req.body.email,isOnline:'1',isChattingWith:[]};
                await userModel.create(userData);
                res.redirect('/login');
            })
        }
    });
})
module.exports = router;