const peopleDetailsModel = require("../models/peopleDetails");

function findOneByEmail(user){
    return peopleDetailsModel.findOne({email:user});
}
module.exports = findOneByEmail ;