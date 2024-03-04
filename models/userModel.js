const mongoose = require('mongoose')

const chatSchema = new mongoose.Schema({
    id:{
        type : mongoose.Schema.Types.ObjectId,
        ref : 'peopledetailsmodels',
        required : true 
    }
})

const schema = new mongoose.Schema({
    id:{
        type : mongoose.Schema.Types.ObjectId,
        ref : 'peopledetailsmodels',
        required : true 
    },
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