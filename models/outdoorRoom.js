const mongoose = require('mongoose') ;

const schema = mongoose.Schema({
    sentBy : {
        type : mongoose.Types.ObjectId,
        ref: 'peopleDetailsModel',
        required: true,
    },
    message :{
        type : String ,
        required : true ,
    }
},{timestamps : true }) 

module.exports = {  outdoorModel : mongoose.model('outdoor-room',schema),
                    cookingModel : mongoose.model('cooking-room',schema),
                    gamingModel : mongoose.model('gaming-room',schema),
                    artModel : mongoose.model('art-room',schema),
                    travelModel :mongoose.model('travel-room',schema),
                    fitnessModel: mongoose.model('fitness-room',schema),
                    readingModel :mongoose.model('reading-room',schema),
                    musicModel : mongoose.model('music-room',schema),
                    techModel : mongoose.model('technology-room',schema),
                    fashionModel : mongoose.model('fashion-room',schema),
                    photographyModel : mongoose.model('photo-room',schema),
                    scienceModel : mongoose.model('science-room',schema)
                }  
