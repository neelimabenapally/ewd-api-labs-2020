/* eslint-disable import/extensions */
import should from 'should';
import supertest from 'supertest';
import { app } from '../index.js';
import userModel from '../api/users/userModel';

const badToken = 'Bearer 123abc';
const testUser = {};

// Tests begin
describe('Favourites API test', function () {
  this.timeout(120000);

  before((done) => {
    testUser.username = 'user1@gmail.com';
    testUser.password = 'test1';
    userModel.create(testUser).then(() => done()).catch((err) => done(err));
  });
  // test #1: Post Favourite with Authorization Token from Auth0
  it('should post favourite', (done) => {
    supertest(app)
      .post('/api/favourites/tv/12345')
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
  // Post Fav without Valid Authorization Token from Auth0
  it('should prevent user from posting Favourite without valid token', async () => {
    supertest(app)
      .post('/api/favourites/tv/12345')
      .set({ Authorization: badToken },
        { 'Content-type': /json/ })
      .send(testUser)
      .expect(401)
      .then((res) => {
        res.should.have.property('status').equal(401);
      })
      .catch((err) => err);
  });

  // Post Favourite with no Authorization Token from Auth0
  it('should prevent user from posting Favourite without token', async () => {
    supertest(app)
      .post('/api/favourites/tv/12345')
      .send(testUser)
      .expect(401)
      .then((res) => {
        res.should.have.property('status').equal(401);
      })
      .catch((err) => err);
  });

  // test #1: Get Favourites with Authorization Token from Auth0
  it('should Get Favourites', (done) => {
    supertest(app)
      .get(`/api/favourites/${testUser.username}/movie`)
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
  // Get Favourites without Valid Authorization Token from Auth0
  it('should prevent user from getting Favourites without valid token', (done) => {
    supertest(app)
      .get(`/api/favourites/${testUser.username}/movie`)
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

  // Get Favourites with no Authorization Token from Auth0
  it('should prevent user from getting Favourites without token', (done) => {
    supertest(app)
      .get(`/api/favourites/${testUser.username}/movie`)
      .send(testUser)
      .expect(401)
      .then((res) => {
        res.should.have.property('status').equal(401);
        done();
      })
      .catch((err) => done(err));
  });

  //  Delete Favourite with Authorization Token from Auth0
  it('should delete favourite', async () => {
    supertest(app)
      .delete('/api/favourites/tv/12345')
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
      })
      .catch((err) => err);
  });

  // Delete Fav without Valid Authorization Token from Auth0
  it('should prevent user deleting Favourite without valid token', async () => {
    supertest(app)
      .delete('/api/favourites/tv/12345')
      .set({ Authorization: badToken },
        { 'Content-type': /json/ })
      .send(testUser)
      .expect(401)
      .then((res) => {
        res.should.have.property('status').equal(401);
      })
      .catch((err) => err);
  });

  // Delete Favourite with no Authorization Token from Auth0
  it('should prevent user deleting without token', async () => {
    supertest(app)
      .delete('/api/favourites/tv/12345')
      .send(testUser)
      .expect(401)
      .then((res) => {
        res.should.have.property('status').equal(401);
      })
      .catch((err) => err);
  });
});
