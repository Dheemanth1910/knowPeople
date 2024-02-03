var express = require('express');
const peopleDetailsModel = require("../models/peopleDetails");
var router = express.Router();
router.use(express.urlencoded({ extended: false }));

peopleDetailsModel.fin
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('home', { title: 'Express' });
});

router.post('/',function(req,res){
    const username = req.body.username 
    const password = req.body.password 
    res.send("data sent successfully");
})


module.exports = router;