var express = require('express');
var router = express.Router();
const peopleDetailsModel = require("../models/peopleDetails");

/* GET users listing. */
function getDetails(obj,res){
  let username= obj.userName ;
  let countryName= obj.country;
  let startAge = parseInt(obj.startAge);
  let endAge = parseInt(obj.endAge);
  if(username !== ""){
    peopleDetailsModel.find({ first_name: username,age:{$gte : startAge, $lte : endAge}})
      .then((result) =>{ 
        res.status(201).send(result);
      })
      .catch((err)=>{
        console.log(err) ;
        res.status(500).send("Error");
      })
  }
  else{
    peopleDetailsModel.find({ $or : [ {first_name: username},{country:countryName},{age: {$gte : startAge, $lte : endAge}} ]}).limit(9)
    .then((result) =>{ 
      res.status(201).send(result);
    })
    .catch((err)=>{
      console.log(err) ;
      res.status(500).send("Error");
    })
  }
  // else if(country!==""){
  //   peopleDetailsModel.find({ country: countryName })
  //   .then((result) =>{ 
  //     res.status(201).send(result);
  //   })
  //   .catch((err)=>{
  //     console.log(err) ;
  //     res.status(500).send("Error");
  //   })
  // }


}
router.get('/', function(req, res, next) {
  peopleDetailsModel.find({}).limit(20).then((result)=>{
    res.status(201).send(result);
  })
});

router.post('/', function(req, res, next) {
  let result = getDetails(req.body,res);
});

module.exports = router;
