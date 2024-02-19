const chai = require('chai');
const chaiHttp = require('chai-http');
const express = require('express');
var flash = require('connect-flash');
const session = require('express-session');



// const app = require('../app'); 
const expect = chai.expect;



const app = express()
const indexRouter = require('../routes/index');
const loginRouter = require('../routes/login.js');
const homeRouter = require('../routes/home.js')
const logoutRouter = require('../routes/logout.js');

const sinon = require('sinon')

app.use('/',indexRouter )
app.use('/login',loginRouter);
app.use('/home',homeRouter);
app.use('/logout', logoutRouter);


app.use(session({ secret: 'TOPSECRET', resave: true, saveUninitialized: true ,cookie: {
  maxAge: 24 * 60 * 60 * 1000}}));
app.use(flash());



app.set('views','/home/dheemanth.g/Projects/knowPeople/views');
app.set('view engine', 'ejs');

chai.use(chaiHttp);
describe('Testing routes ',()=>{
  describe('Testing / router', () => {
    it('should return status 200 for GET /', (done) => {
      chai.request(app)
        .get('/')
        .end((err,res)=>{
          expect(res.status).to.be.equal(200);
          done();
        })
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
    it('should render forgotPassword page on GET /login/forgotPassword', (done) => {
      chai.request(app)
        .get('/login/forgotPassword')
        .end((err, res) => {
          expect(err).to.be.null;
          expect(res).to.have.status(200);
          done();
        });
    });
    it('should check OTP and respond with "false" on POST /login/checkOtp with random email & pwd', (done) => {
      chai.request(app)
        .post('/login/checkOtp')
        .send({ email:"sample-email",otpVal: '1234' }) // Assuming OTP value
        .end((err, res) => {
          expect(err).to.be.null;
          expect(res).to.have.status(200);
          expect(res.text).to.equal("false");
          done();
        });
    });
  });
}); 
const peopleDetailsModel = require('../models/peopleDetails');


