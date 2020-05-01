// eslint-disable-next-line import/no-extraneous-dependencies
import should from 'should';
// eslint-disable-next-line import/no-extraneous-dependencies
import supertest from 'supertest';
import {
  app,
// eslint-disable-next-line import/extensions
} from '../index.js';
import userModel from '../api/users/userModel';

const badToken = 'Bearer 123abc';
const testUser = {};

// Tests begin
describe('Genres API test', function () {
  this.timeout(120000);

  before((done) => {
    testUser.username = 'neelimab@gmail.com';
    testUser.password = 'test1';
    userModel.create(testUser).then(() => done()).catch((err) => done(err));
  });

  // test #1: Get Genres with Authorization Token from Auth0
  it('should Get Genres', (done) => {
    supertest(app)
      .get('/api/genres/movie')
      .set(
        { Authorization: `Bearer ${process.env.AUTH0_TEST_TOKEN}` }, // Temporary Access Token For Auth0
        { 'Content-type': /json/ },
      )
      .send(testUser)
      .expect('Content-type', /json/)
      .expect(200) // This is the HTTP response
      .then((res) => {
        // HTTP status should be 200
        res.should.have.property('status').equal(200);
        done();
      })
      .catch((err) => done(err));
  });
  // Get Genres without Valid Authorization Token from Auth0
  it('should prevent user from getting Genres without valid token', (done) => {
    supertest(app)
      .get('/api/genres/movie')
      .set({ Authorization: badToken },
        { 'Content-type': /json/ })
      .send(testUser)
      .expect(401)
      .then((res) => {
        res.should.have.property('status').equal(401);
        done();
      })
      .catch((err) => done(err));
  });

  // Get Genres with no Authorization Token from Auth0
  it('should prevent user from getting Genres without token', (done) => {
    supertest(app)
      .get('/api/genres/movie')
      .send(testUser)
      .expect(401)
      .then((res) => {
        res.should.have.property('status').equal(401);
        done();
      })
      .catch((err) => done(err));
  });
});
