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

async function sendRoomChat(roomName, data){
    model = nameToModelMapper[roomName] ;
    await model.create(data) ;
}

module.exports = sendRoomChat;