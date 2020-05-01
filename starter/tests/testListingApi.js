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
describe('Listing API test', function () {
  this.timeout(120000);

  before((done) => {
    testUser.username = 'neelima@gmail.com';
    testUser.password = 'test1';
    userModel.create(testUser).then(() => done()).catch((err) => done(err));
  });

  // test #1: Get Lists with Authorization Token from Auth0
  it('should Get Lists', (done) => {
    supertest(app)
      .get('/api/listing/movie')
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
  // Get Lists without Valid Authorization Token from Auth0
  it('should prevent user from getting Lists without valid token', (done) => {
    supertest(app)
      .get('/api/listing/movie')
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

  // Get Lists with no Authorization Token from Auth0
  it('should prevent user from getting Lists without token', (done) => {
    supertest(app)
      .get('/api/listing/movie')
      .send(testUser)
      .expect(401)
      .then((res) => {
        res.should.have.property('status').equal(401);
        done();
      })
      .catch((err) => done(err));
  });

  // test #2: Get Detail and Cast with Authorization Token from Auth0
  it('should Get Detail and Cast Lists', (done) => {
    supertest(app)
      .get('/api/listing/movie/view/12344')
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
  // Get  Detail and Cast  without Valid Authorization Token from Auth0
  it('should prevent user from getting Detail and Cast Lists without valid token', (done) => {
    supertest(app)
      .get('/api/listing/movie/view/12344')
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

  // Get  Detail and Cast  with no Authorization Token from Auth0
  it('should prevent user from getting Detail and Cast Lists without token', (done) => {
    supertest(app)
      .get('/api/listing/movie/view/12344')
      .send(testUser)
      .expect(401)
      .then((res) => {
        res.should.have.property('status').equal(401);
        done();
      })
      .catch((err) => done(err));
  });

  // test #2: Get Similar List with Authorization Token from Auth0
  it('should Get Similar List', (done) => {
    supertest(app)
      .get('/api/listing/similar/movie/12344')
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
  // Get Similar List  without Valid Authorization Token from Auth0
  it('should prevent user from getting Similar List without valid token', (done) => {
    supertest(app)
      .get('/api/listing/similar/movie/12344')
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

  // Get Similar List  with no Authorization Token from Auth0
  it('should prevent user from getting Similar List without token', (done) => {
    supertest(app)
      .get('/api/listing/similar/movie/12344')
      .send(testUser)
      .expect(401)
      .then((res) => {
        res.should.have.property('status').equal(401);
        done();
      })
      .catch((err) => done(err));
  });
});
