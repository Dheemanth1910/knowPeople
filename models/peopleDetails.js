const mongoose = require("mongoose") ;
const likeSchema = new mongoose.Schema({
    name: String ,
    _id: false ,
    date : {type:Date , default: Date.now()}
});
  
const peopleDetailsSchema = new mongoose.Schema({
    id : Number,
    first_name : String,
    last_name : String ,
    email : String,
    gender : String,
    interests : [String], 
    country : String,
    age : Number,
    profileImg : String,
    bio : String,
    phone : Number,
    liked : [likeSchema],
    likes : [likeSchema]
})

const peopleDetailsModel = mongoose.model('peopleDetailsModel',peopleDetailsSchema);
module.exports = peopleDetailsModel ;