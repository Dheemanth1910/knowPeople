var express = require('express');
var router = express.Router();
const bcrypt = require('bcrypt');
const saltRounds = 10;

router.use(express.urlencoded({ extended: false }));
const loginDetailsModel = require("../models/loginDetails");
const peopleDetailsModel = require("../models/peopleDetails");
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
                    password : hash,}
                await loginDetailsModel.create(data);
                await peopleDetailsModel.aggregate([
                    {
                        $group: {
                            _id: null,
                            maxNumber: { $max: '$id' } // Replace 'fieldName' with the name of your field
                        }
                    }
                ])
                .then(async (result)=>{
                    let uid = result[0].maxNumber +1 ;
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
                    await peopleDetailsModel.create(person) ;
                    res.redirect("/login")
                });
                
            })
        }

    });
})
module.exports = router;