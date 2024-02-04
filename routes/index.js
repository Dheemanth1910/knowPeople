require("../database/connection");
var express = require('express');
const peopleDetailsModel = require("../models/peopleDetails");
var router = express.Router();

peopleDetailsModel.fin
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
  
});


module.exports = router;
