// eslint-disable-next-line import/no-extraneous-dependencies
import should from 'should';
import favouriteModel from '../favouriteModel';

describe('FavouriteModelTests', () => {
  const testFavourite = {};
  const badFavourite = {};
  before(() => {
    // valid favourite object
    testFavourite.username = 'neelima.benapally@gmail.com';
    testFavourite.mediaType = 'movie';
    testFavourite.mediaId = 12345;
    // invalid favourite object
    badFavourite.username = null;
  });

  it('should post a fav with a username, mediatype and mediaid', (done) => {
    // eslint-disable-next-line new-cap
    const m = new favouriteModel(testFavourite);
    m.validate((err) => {
      should.not.exist(err);
      m.username.should.equal(testFavourite.username);
      m.mediaType.should.equal(testFavourite.mediaType);
      m.mediaId.should.equal(testFavourite.mediaId);
      done();
    });
  });

  it('should require a username', (done) => {
    // eslint-disable-next-line new-cap
    const m = new favouriteModel(badFavourite);
    m.validate((err) => {
      should.exist(err);
      const { errors } = err;
      errors.should.have.property('username');
      done();
    });
  });
});
