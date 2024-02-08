const mongoose = require("mongoose") ;

const loginDetailsSchema = new mongoose.Schema({
    email : {
        type: String,
        required: true
      },
    password : {
        type: String,
        required: true
      },
})

const loginDetailsModel = mongoose.model('loginDetails',loginDetailsSchema);
module.exports = loginDetailsModel ;