
process.env.NODE_ENV = 'test';

const chai = require ('chai');

const chai_http = require('chai-http');

const server = require('../../server');

const should = chai.should();
const mongoose = require('mongoose');

const User = mongoose.model('User')
chai.use(chai_http);


describe('Login', () => {
  before(function(done) {
    const user = new User({
      name: 'kissa andela',
      username: 'jjjk',
      email : 'kissa@andela',
      password : '123456',
    })
    user.save((err) => {
      if(err) {
        throw err
      }
      done();
    })
  })
  

  it('Should return an error on wrong email address', () => {
    const user = {
      email: 'kissass@andela',
      password: '123456'
    };
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
      email: 'kissa@andela.com',
      password: 'pass'
    };
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
      email: 'kissass@andela',
      password: '1234s'
    };
    chai.request(server)
    .post('/api/auth/login')
    .send(user)
    .end((err, res) => {
      // res.should.have.status(401);
      res.body.should.have.property('message');
      res.body.should.have.property('success');
      res.body.should.have.property('message').eql('Authentication failed. User not found');
    });
  });

  it('Should return JWT on successful login', () => {
    const user = {
      email: 'kissa@andela.com',
      password: '123456'
    };
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

  
});
