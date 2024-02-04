const mongoose = require("mongoose") ;

const loginDetailsSchema = new mongoose.Schema({
    email : String,
    password : String,
})

const loginDetailsModel = mongoose.model('loginDetails',loginDetailsSchema);
module.exports = loginDetailsModel ;