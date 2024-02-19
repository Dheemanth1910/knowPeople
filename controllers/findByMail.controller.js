const peopleDetailsModel = require("../models/peopleDetails");

function findOneByEmail(user){
    var validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    if(!user.match(validRegex)){
        throw new Error('Not a valid Email');
    }
    const res = peopleDetailsModel.findOne({email:user});
    return res;
}
module.exports = findOneByEmail ;