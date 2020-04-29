// eslint-disable-next-line import/no-extraneous-dependencies
import should from 'should';
// eslint-disable-next-line import/no-extraneous-dependencies
import sinon from 'sinon';
// eslint-disable-next-line import/no-extraneous-dependencies
import sinonTestFactory from 'sinon-test';
import userModel from '../userModel';

const sinonTest = sinonTestFactory(sinon);

describe('userModelTests', () => {
  const testUser = {};
  const badUser = {};
  const uniqueUser = {};
  before(() => {
    // valid user object
    testUser.username = 'neelima.benapally@gmail.com';
    testUser.password = 'testpass';
    // invalid user object
    badUser.name = 'dodgy';
    // no unique user object
    uniqueUser.username = 'neelima.benapally@gmail.com';
  });

  it('should validate a user with a username and password', (done) => {
    // eslint-disable-next-line new-cap
    const m = new userModel(testUser);
    m.validate((err) => {
      should.not.exist(err);
      m.username.should.equal(testUser.username);
      m.password.should.equal(testUser.password);
      done();
    });
  });

  it('should require a username', (done) => {
    // eslint-disable-next-line new-cap
    const m = new userModel(badUser);
    m.validate((err) => {
      should.exist(err);
      const { errors } = err;
      errors.should.have.property('username');
      done();
    });
  });

  it('should require a unique username', (done) => {
    // eslint-disable-next-line new-cap
    const m = new userModel(uniqueUser.username);
    m.validate((err) => {
      should.exist(err);
      const { errors } = err;
      errors.should.have.property('username');
      done();
    });
  });

  it('should search using username', sinonTest(function () {
    this.stub(userModel, 'findOne');
    userModel.findByUserName(testUser.username);
    sinon.assert.calledWith(userModel.findOne, {
      username: testUser.username,
    });
  }));
});
