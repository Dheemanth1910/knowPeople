const mongoose = require("mongoose") ;

const peopleDetailsSchema = new mongoose.Schema({
    id : Number,
    first_name : String,
    last_name : String ,
    email : String,
    gender : String,
    skill : String, 
    age : Number,
    country : String,
    salary : Number
})

const peopleDetailsModel = mongoose.model('peopleDetailsModel',peopleDetailsSchema);

module.exports = peopleDetailsModel ;