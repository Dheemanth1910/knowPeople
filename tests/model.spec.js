const chai = require('chai');
const expect = chai.expect;
const mongoose = require('mongoose');
const ValidationError = mongoose.Error.ValidationError;

var Item = require('../models/loginDetails.js');
var peopleItem = require('../models/peopleDetails.js'); 

describe('Testing Login model', () => {
    // this.timeout=2==;
    let sampleItemVal;
    beforeEach(() => {
      sampleItemVal = {
        email: 'sampleEmail@gmail.com',
        password : '@#@$$DL:SFS;ldfdsfgds;l)!#)(#9$#%'
      };
    });
    it('it should throw an error due to missing fields', async () => {
        let item = new Item();
        try {
          await item.validate();
          // Validation succeeded, which is unexpected
          // Fail the test as there should have been validation errors
          throw new Error('Validation succeeded unexpectedly');
        } catch (err) {
          // console.log(err)
          // Validation failed, as expected
          expect(err.errors.email).to.exist;
          expect(err.errors.password).to.exist;
        }
      });

      it('it should create the item successfully with correct parameters',(done) => {
        let item = new Item(sampleItemVal);
        item.validate().then(()=>{done();}).catch((err)=>{throw new Error('⚠️ Unexpected failure!')})
    //     try{
    //         await item.validate() ; 
    //     }
    //     catch{
    //         throw new Error('⚠️ Unexpected failure!') ; 
    //     }
        
      });
    
  })
  describe("Testing peopleDetails Model",()=>{
    beforeEach(() => {
      sampleItemVal = {
        id: 1,
        last_name : 'User',
        email: 'sampleEmail@gmail.com',
        gender : 'male',
        country : 'SampleCountry',
        profileImg : 'Sample Profile Img',
        phone : 1234567890,
      };
    })
    it('it should throw error if first name or lsat name is missing ',async ()=>{
      let item = new peopleItem({...sampleItemVal, age : 21});
      try{
        await item.validate();
        throw new Error("validated unexpectedly")
      }
      catch(err){
        expect(err.errors.first_name).to.exist;
        expect(err._message).to.have.string('peopleDetailsModel validation failed');
      }
  });
    it('it should throw error on giving wrong input to age or number',async ()=>{
      let item = new peopleItem({...sampleItemVal,first_name : 'Sample',age:'abc'});
      try{
        await item.validate();
        throw new Error("Validated unexpectedly")
      }
      catch(err){
        expect(err.errors.age).to.exist; 
      }
    }) 
    it('it should throw error on giving non-array types for liked or interests or likes',async ()=>{
      let item = new peopleItem({...sampleItemVal,first_name:"Sample",liked:{0:"art"}}) ;
      try{
        await item.validate() ;
        throw new Error("Validated Unexpectedly");
      }
      catch(err){
        expect(err.errors['liked.0.name']).to.exist;
      }
    })
    it('It should pass on giving first_name and last_name Only',async ()=>{
      let item = new peopleItem({first_name:"Sample" , last_name :"User"});
      try{
        await item.validate();
      }
      catch(err){
        throw new Error(err);
      }
    })
});   
