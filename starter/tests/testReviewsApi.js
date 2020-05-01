/* eslint-disable quote-props */
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
const testReview = 'Great Movie!!';

// Tests begin
describe('Reviews API test', function () {
  this.timeout(120000);

  before((done) => {
    testUser.username = 'user2@gmail.com';
    testUser.password = 'test1';
    userModel.create(testUser).then(() => done()).catch((err) => done(err));
  });
  // test #1: Post Review with Authorization Token from Auth0
  it('should post Review', (done) => {
    supertest(app)
      .post('/api/reviews/movie/12345')
      .set(
        { Authorization: `Bearer ${process.env.AUTH0_TEST_TOKEN}` }, // Temporary Access Token For Auth0
        { 'Content-type': /json/ },
      )
      .send({ username: testUser.username })
      .send({ review: testReview })
      .expect('Content-type', /json/)
      .expect(200) // This is the HTTP response
      .then((res) => {
        // HTTP status should be 200
        res.should.have.property('status').equal(200);
        done();
      })
      .catch((err) => done(err));
  });
  // Post Review without Valid Authorization Token from Auth0
  it('should prevent user from posting Review without valid token', async () => {
    supertest(app)
      .post('/api/reviews/movie/12345')
      .set({ Authorization: badToken },
        { 'Content-type': /json/ })
      .send(testUser.username)
      .send(testReview)
      .expect(401)
      .then((res) => {
        res.should.have.property('status').equal(401);
      })
      .catch((err) => err);
  });

  // Post Review with no Authorization Token from Auth0
  it('should prevent user from posting Review without token', async () => {
    supertest(app)
      .post('/api/reviews/movie/12345')
      .send(testUser.username)
      .send(testReview)
      .expect(401)
      .then((res) => {
        res.should.have.property('status').equal(401);
      })
      .catch((err) => err);
  });

  // test #1: Get Reviews with Authorization Token from Auth0
  it('should Get Reviews', (done) => {
    supertest(app)
      .get('/api/reviews/movie/1234')
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
  // Get Reviews without Valid Authorization Token from Auth0
  it('should prevent user from getting Reviews without valid token', (done) => {
    supertest(app)
      .get('/api/reviews/movie/1234')
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

  // Get Reviews with no Authorization Token from Auth0
  it('should prevent user from getting Reviews without token', (done) => {
    supertest(app)
      .get('/api/reviews/movie/1234')
      .send(testUser)
      .expect(401)
      .then((res) => {
        res.should.have.property('status').equal(401);
        done();
      })
      .catch((err) => done(err));
  });
});
