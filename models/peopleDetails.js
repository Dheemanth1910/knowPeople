const mongoose = require("mongoose") ;

const peopleDetailsSchema = new mongoose.Schema({
    id : Number,
    first_name : String,
    last_name : String ,
    email : String,
    gender : String,
    interests : String, 
    country : String,
    age : Number,
    profileImg : String,
})

const peopleDetailsModel = mongoose.model('peopleDetailsModel',peopleDetailsSchema);

module.exports = peopleDetailsModel ;