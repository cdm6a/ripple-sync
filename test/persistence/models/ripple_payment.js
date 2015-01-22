var chai           = require('chai');
var should         = chai.should();
var assert         = chai.assert;
var chaiAsPromised = require("chai-as-promised");
var datasource     = require(__dirname + '/../../../persistence/');
var fixtures       = require(__dirname + '/../../fixtures/persistence/ripple_payments.json');

chai.use(chaiAsPromised);

describe('RipplePayment Model', function() {

  it('should successfully persist a ripple payment', function(done) {
    datasource.models.ripplePayments.create(fixtures.valid)
      .should.be.fulfilled.then(function(ripplePayment) {
        assert.strictEqual(ripplePayment.source_amount_value, fixtures.valid.source_amount_value);
      }).should.notify(done);
  });
});