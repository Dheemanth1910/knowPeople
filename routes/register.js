var express = require('express');
var router = express.Router();
const bcrypt = require('bcrypt');
const saltRounds = 10;

router.use(express.urlencoded({ extended: false }));
const loginDetailsModel = require("../models/loginDetails");
const peopleDetailsModel = require("../models/peopleDetails")

router.get('/', function(req, res, next) {
    res.render('register');
  });

router.post('/submit',async (req,res)=>{

    const myPlaintextPassword = req.body.password; 
    await loginDetailsModel.findOne({email : req.body.email})
    .then((result) =>{
        console.log(result);
        if(result !== null){
            res.send("Entered email alrready exists ,, Please try loging in or choose a different email .");
        }
        else{
            bcrypt.hash(myPlaintextPassword, saltRounds, async function(err, hash) {
                if(err){
                    console.log(err);
                }
                // Store hash in your password DB.
                let data={email : req.body.email, 
                    password : hash,}
                await loginDetailsModel.create(data);
                res.send("data recieved successfully, Please login agian. ")
            })
        }

    });
    
})

module.exports = router;