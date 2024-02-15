const chai = require('chai');
const expect = chai.expect;
const sinon = require('sinon');
const sinonChai = require('sinon-chai');
chai.use(sinonChai);
const rewire = require('rewire'); 
const request = require('supertest');

const sandbox = sinon.createSandbox();
let app = rewire('../app.js');
