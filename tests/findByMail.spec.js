const sinon = require('sinon');
const { expect } = require('chai');
const findOneByEmail = require('../controllers/findByMail.controller'); // Import the function to be tested
const peopleDetailsModel = require('../models/peopleDetails');

describe('findOneByEmail function', () => {
    let findOneStub;

    beforeEach(() => {
        // Create a stub for peopleDetailsModel.findOne
        findOneStub = sinon.stub(peopleDetailsModel, 'findOne');
    });

    afterEach(() => {
        // Restore the original method after each test
        findOneStub.restore();
    });

    it('should throw an error if provided email is invalid', () => {
        const invalidEmail = 'invalidemail';
        expect(() => findOneByEmail(invalidEmail)).to.throw('Not a valid Email');
    });

    it('should call findOne with the provided email', () => {
        const userEmail = 'valid@example.com';
        findOneByEmail(userEmail);
        expect(findOneStub.calledOnce).to.be.true;
        expect(findOneStub.calledWith({ email: userEmail })).to.be.true;
    });

    it('should return the result of findOne', () => {
        const userEmail = 'valid@example.com';
        const expectedResult = {};
        findOneStub.returns(expectedResult);
        const result = findOneByEmail(userEmail);
        expect(result).to.deep.equal(expectedResult);
    });
    it('should throw an error if peopleDetailsModel.findOne rejects', async () => {
        const validEmail = 'valid@example.com';
        const expectedError = new Error('Database error');
        peopleDetailsModel.findOne.withArgs({ email: validEmail }).rejects(expectedError);
      
        try {
          await findOneByEmail(validEmail);
          // If the function doesn't throw, fail the test
          expect.fail('Function should have thrown an error');
        } catch (error) {
          expect(error).to.equal(expectedError);
        }
      })
});
