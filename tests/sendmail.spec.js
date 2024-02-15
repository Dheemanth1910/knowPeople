const chai = require('chai');
const expect = chai.expect;

const {
  sendMail
} = require('../controllers/sendMail.controller');

describe('Test sendMail', () => {
    /**
     * Uncomment below to see hooks in action
     */
    // before('before', () => {
    //   console.log('Ran before all the test suites');
    // });
  
    // after('after', () => {
    //   console.log('Ran after all the test suites');
    // });
  
    // beforeEach('beforeEach', () => {
    //  let sampleEmail = "dheemanth1910@gmail.com"
    //   console.log('Ran before EACH test suite');
    // });
  
    // afterEach('afterEach', () => {
    //   console.log('Ran after EACH test suite');
    // });
    
    describe('send mail on valid mail-id', () => {
      let sampleEmail="sample@gmail.com"
      it('mail should be sent', () => {
        const actualResult = sendMail(sampleEmail);
        expect(actualResult).to.be.a('string').and.to.have.lengthOf(4);
      });
    });
  
    describe('throw error on invalid email', () => {
      it('On error the function catches and returns not ok', () => {
        expect(() => {
            sendMail("");
        }).to.throw();
      });
    });
  });