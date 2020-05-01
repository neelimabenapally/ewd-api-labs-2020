// eslint-disable-next-line import/no-extraneous-dependencies
import should from 'should';
// eslint-disable-next-line import/no-extraneous-dependencies
import supertest from 'supertest';
import {
  app,
// eslint-disable-next-line import/extensions
} from '../index.js';

const badToken = 'Bearer 123abc';
const newUser = {
  username: 'neelima@gmail.com',
  password: 'apass',
};

// Tests begin
describe('Users API test', function () {
  this.timeout(120000);

  // test #1: Register a User with Authorization Token from Auth0
  it('should register a user', (done) => {
    supertest(app)
      .post('/api/users')
      .set('Authorization', `Bearer ${process.env.AUTH0_TEST_TOKEN}`) // Temporary Access Token For Auth0
      .set('Content-type', 'application/json')
      .send(newUser)
      .query({
        action: 'register',
      })
      .expect('Content-type', /json/)
      .expect(200) // This is the HTTP response
      .then((res) => {
        // HTTP status should be 200
        res.should.have.property('status').equal(200);
        done();
      })
      .catch((err) => done(err));
  });

  // Register user with no Authorization Token from Auth0
  it('should prevent user registering without any username', (done) => {
    supertest(app)
      .post('/api/users')
      .set('Content-Type', 'application/json')
      .send({})
      .query({
        action: 'register',
      })
      .expect(401)
      .then((res) => {
        res.should.have.property('status').equal(401);
        done();
      })
      .catch((err) => done(err));
  });
});
