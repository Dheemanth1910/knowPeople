const chai = require('chai');
const chaiHttp = require('chai-http');
const express = require('express');



// const app = require('../app'); 
const expect = chai.expect;



const app = express()
const indexRouter = require('../routes/index');
const loginRouter = require('../routes/login.js');
const homeRouter = require('../routes/home.js')

const sinonChai = require('sinon-chai');
const sinon = require('sinon')
const passport = require('passport');
const bcrypt = require('bcrypt');

app.use('/',indexRouter )
app.use('/login',loginRouter);
app.use('/home',homeRouter);

app.set('views','/home/dheemanth.g/Projects/knowPeople/views');
app.set('view engine', 'ejs');

chai.use(chaiHttp);
describe('Testing routes ',()=>{
  describe('Testing / router', () => {
    it('should return status 200 for GET /', (done) => {
      chai.request(app)
        .get('/')
        .end((err, res) => {
          expect(err).to.be.null;
          expect(res).to.have.status(200);
          done();
        });
    });
  })
  describe('Testing /login router',()=>{
    beforeEach(() => {
      let userame = sinon.stub() ;
      let password = sinon.stub();
    })
    afterEach(() => {
      sinon.restore();
    });
    it(' should return status 200 for GET /login',(done)=>{
      chai.request(app)
        .get('/login')
        .end((err, res) => {
          expect(err).to.be.null;
          expect(res).to.have.status(200);
          done();
        });
    })
    it(' should return status 200 for GET /login/forgotPassword',(done)=>{
      chai.request(app)
        .get('/login/forgotPassword')
        .end((err, res) => {
          expect(err).to.be.null;
          expect(res).to.have.status(200);
          done();
        });
    })
});
const chai = require('chai');
const chaiHttp = require('chai-http');
const loginDetailsModel = require("../models/loginDetails");
const { transporter, sendMail } = require('../controllers/sendMail.controller');
describe('Login Router', () => {
  afterEach(() => {
    sinon.restore();
  });

  it('should render forgotPassword page on GET /login/forgotPassword', (done) => {
    chai.request(app)
      .get('/login/forgotPassword')
      .end((err, res) => {
        expect(err).to.be.null;
        expect(res).to.have.status(200);
        // Add more assertions as needed
        done();
      });
  });

  it('should check OTP and respond with true on POST /login/checkOtp', (done) => {
    chai.request(app)
      .post('/login/checkOtp')
      .send({ otpVal: '1234' }) // Assuming OTP value
      .end((err, res) => {
        expect(err).to.be.null;
        expect(res).to.have.status(200);
        expect(res.text).to.equal("true");
        // Add more assertions as needed
        done();
      });
  });
  });
}); 







const peopleDetailsModel = require('../models/peopleDetails');
describe("Testing /home Routes : ",()=>{
  afterEach(() => {
    sinon.restore();
  });

  it('should render home page on GET /', (done) => {
    // Stub isAuthenticated method to return true
    const isAuthenticatedStub = sinon.stub().returns(true);
    const req = { isAuthenticated: isAuthenticatedStub, user: 'test@example.com' };
    const res = {
      render: sinon.spy(),
      redirect: sinon.spy()
    };

    // Stub the findOne method of peopleDetailsModel
    const findOneStub = sinon.stub(peopleDetailsModel, 'findOne').resolves({ first_name: 'John', last_name: 'Doe', email: 'test@example.com' });
    chai.request(app)
      .get('/')
      .send(req)
      .end((err, res) => {
        expect(err).to.be.null;
        expect(res).to.have.status(200);
        expect(res).to.be.html;

        // Ensure that findOneStub was called with the correct parameters
        done();
      });
  });
  it('should redirect to /login if not authenticated on GET /', (done) => {
    // Stub isAuthenticated method to return false
    const isAuthenticatedStub = sinon.stub().returns(false);
    const req = { isAuthenticated: isAuthenticatedStub };
    const res = { redirect: sinon.spy() };

    chai.request(app)
      .get('/')
      .send(req)
      .end((err, res) => {
        // console.log("result",res);
        expect(err).to.be.null;
        done();
      });
  });

})