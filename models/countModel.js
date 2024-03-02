const mongoose = require("mongoose") ; 

const schema = mongoose.Schema({
    id : {
        type:Number ,
        required: true
    }
})

module.exports  = mongoose.model('countmodel',schema);