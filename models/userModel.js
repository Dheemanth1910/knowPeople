const mongoose = require('mongoose')

const chatSchema = {
    id:{
        type : mongoose.Schema.Types.ObjectId,
        ref : 'peopledetailsmodels',
        required : true 
    },
    name:{
        type : String ,
        required : true 
    }
}

const schema = mongoose.Schema({
    name:{
        type : String,
        required : true
    },
    email:{
        type:String,
        required : true
    }
    ,
    isOnline:{
        type:String,
        default:'0',
        required : true
    },
    isChattingWith:{
        type:[chatSchema],
        unique: true,
        sparse: true,
        required:true
    }
})

module.exports  = mongoose.model('User',schema);