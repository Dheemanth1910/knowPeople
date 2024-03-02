let {outdoorModel,cookingModel,gamingModel,artModel,travelModel,fitnessModel,readingModel,musicModel,techModel,fashionModel,photographyModel,scienceModel} = require('../models/outdoorRoom');
nameToModelMapper = {} ;
nameToModelMapper['outdoor'] = outdoorModel ;
nameToModelMapper['cooking'] = cookingModel ;
nameToModelMapper['gaming'] = gamingModel ;
nameToModelMapper['art'] = artModel;
nameToModelMapper['travel'] = travelModel ;
nameToModelMapper['fitness'] =  fitnessModel ;
nameToModelMapper['reading'] = readingModel ;
nameToModelMapper['music'] =  musicModel;
nameToModelMapper['technology'] = techModel;
nameToModelMapper['fashion'] = fashionModel ;
nameToModelMapper['photography'] = photographyModel  ;
nameToModelMapper['science'] =  scienceModel;

async function getRoomChat(roomName,pageNo){

    let limit = 10 ;
    let skip = (pageNo -1)*limit
    let model = nameToModelMapper[roomName];

    return model.aggregate([
        {
        $lookup:
            {
            from: "peopledetailsmodels",
            localField: "sentBy",
            foreignField: "_id",
            as: "result",
            },
        },
        {
        $unwind:
            {
            path: "$result",
            },
        },
        {
            $sort :{
                updatedAt:-1
            }
        }
    ]).skip(skip).limit(limit);
}
module.exports= getRoomChat;