// eslint-disable-next-line import/no-extraneous-dependencies
import should from 'should';
import ReviewModel from '../reviewModel';

describe('ReviewModelTests', () => {
  const testReview = {};
  const badReview = {};
  before(() => {
    // valid Review object
    testReview.username = 'neelima.benapally@gmail.com';
    testReview.mediaType = 'movie/tv';
    testReview.mediaId = 12345;
    testReview.review = 'Good Stuff!!';
    // invalid favourite object
    badReview.username = null;
    badReview.mediaType = null;
    badReview.mediaId = null;
    badReview.review = null;
  });

  it('should validate a review with a username, review, mediatype and mediaid', (done) => {
    const m = new ReviewModel(testReview);
    m.validate((err) => {
      should.not.exist(err);
      m.username.should.equal(testReview.username);
      m.mediaType.should.equal(testReview.mediaType);
      m.mediaId.should.equal(testReview.mediaId);
      m.review.should.equal(testReview.review);
      done();
    });
  });

  it('should require a username, mediaType, mediaId', (done) => {
    const m = new ReviewModel(badReview);
    m.validate((err) => {
      should.exist(err);
      const { errors } = err;
      errors.should.have.property('username');
      errors.should.have.property('mediaType');
      errors.should.have.property('mediaId');
      errors.should.have.property('review');
      done();
    });
  });
});
