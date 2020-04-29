/* eslint-disable import/no-extraneous-dependencies */
import should from 'should';
import sinon from 'sinon';
import sinonTestFactory from 'sinon-test';
import listingModel from '../listingModel';

const sinonTest = sinonTestFactory(sinon);

describe('listingModelTests', () => {
  const testListingSchema = {};
  const badListingSchema = {};
  before(() => {
    // valid ListingSchema object
    testListingSchema.id = 12345;
    // invalid ListingSchema object
    badListingSchema.id = null;
  });

  it('should validate a listing with a id ', (done) => {
    // eslint-disable-next-line new-cap
    const m = new listingModel(testListingSchema);
    m.validate((err) => {
      should.not.exist(err);
      m.id.should.equal(testListingSchema.id);
      done();
    });
  });

  it('should require a id in listing schema', (done) => {
    // eslint-disable-next-line new-cap
    const m = new listingModel(badListingSchema);
    m.validate((err) => {
      should.exist(err);
      const { errors } = err;
      errors.should.have.property('id');
      done();
    });
  });

  it('should search using id', sinonTest(function () {
    this.stub(listingModel, 'findOne');
    listingModel.findByListingDBId(testListingSchema.id);
    sinon.assert.calledWith(listingModel.findOne, {
      id: testListingSchema.id,
    });
  }));
});
