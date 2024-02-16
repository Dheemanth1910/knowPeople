const chai = require('chai');
const expect = chai.expect;
const mongoose = require('mongoose');
const ValidationError = mongoose.Error.ValidationError;

var Item = require('../models/loginDetails.js');

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