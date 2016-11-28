//Set test envirnoment to test
process.env.NODE_ENV = 'test';

const mongoose = require ('mongoose');

const Users = require('./../../app/models/user');

//require dependencies
const chai = require ('chai');

const chai_http = require('chai-http');

const server = require('../../server');

const should = chai.should();

chai.use(chai_http);

describe('Login', () => {
  it('Should return an error on wrong email address', () => {
    const user = {
      email: 'ngozi.eke',
      password: 'veronica1'
    }
    chai.request(server)
    .post('/api/auth/login')
    .send(user)
    .end((err, res) => {
      res.should.have.status(401);
      res.body.should.have.property('message');
      res.body.should.have.property('success');
      res.body.should.have.property('message').eql('Authentication failed. User not found');
    });

  });

  it('Should return an error if password is invalid', () => {
    const user = {
      email: 'ekekwe.ngozi1@gmail.com',
      password: 'pass'
    } 
    chai.request(server)
    .post('/api/auth/login')
    .send(user)
    .end((err, res) => {
      res.should.have.status(401);
      res.body.should.have.property('message');
      res.body.should.have.property('success');
      res.body.should.have.property('message').eql('Authentication failed. Invalid Password');
    });

  });

  it('Should return an error on wrong email address and password', () => {
    const user = {
      email : 'ngozi.eke',
      password : 'veroni'
    }
    chai.request(server)
    .post('/api/auth/login')
    .send(user)
    .end((err, res) => {
      res.should.have.status(401);
      res.body.should.have.property('message');
      res.body.should.have.property('success');
      res.body.should.have.property('message').eql('Authentication failed. User not found');
    });

  });

  it('Should return JWT on successful login', () => {
    const user = {
      email: 'kissa@andela.com',
      password: '123456'
    }
    chai.request(server)
    .post('/api/auth/login')
    .send(user)
    .end((err, res) => {
      res.should.have.status(200);
      res.body.should.have.property('message');
      res.body.should.have.property('success');
      res.body.should.have.property('token');
    });
  });

  
})

