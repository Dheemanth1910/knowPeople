var express = require('express');
var router = express.Router();
router.use(express.urlencoded({ extended: false }));
const loginDetailsModel = require("../models/loginDetails");
const peopleDetailsModel = require("../models/peopleDetails")

router.get('/', function(req, res, next) {
    res.render('register');
  });

router.post('/submit',(req,res)=>{
    let data = {
    email : req.body.email,
    firstName : req.body.firstName,
    lastName : req.body.lastName,
    password : req.body.password, 
    }

    async function send(data){
        await loginDetailsModel.create(data);
    }
    send(data)
    res.send("Data recieved successfully");
    
})

module.exports = router;