const chai = require('chai');
const expect = chai.expect;

const {
  sendMail
} = require('../controllers/sendMail.controller');

describe('Test sendMail', () => {
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