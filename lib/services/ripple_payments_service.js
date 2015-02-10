var Promise          = require('bluebird');
var logger           = require(__dirname + '/../../logger.js');
var RipplePayments   = require(__dirname + '/../../persistence/models/ripple_payments.js');
var PersistenceError = require(__dirname + '/../errors/persistence_error.js');

module.exports = {
  find: find,
  findById: findById,
  createRecordFromRippleRestResponse: createRecordFromRippleRestResponse
};

function find(query) {
  return new Promise(function(resolve, reject) {
    RipplePayments.forge(query).fetchAll().then(function(ripplePayments) {
      resolve(ripplePayments);
    }).error(function(error) {
      logger.error('[ripple_payments_service.js:find] Unable to fetch ripple_payments with query [%s]', query, error);
      reject(new PersistenceError('Unable to fetch ripple_payments'));
    });
  });
}

function findById(id) {
  return new Promise(function(resolve, reject) {
    RipplePayments.forge({id: id}).fetch().then(function(ripplePayment) {
      resolve(ripplePayment);
    }).error(function(error) {
      logger.error('[ripple_payments_service.js:findById] Unable to fetch ripple_payment with id [%s]', id, error);
      reject(new PersistenceError('Unable to fetch ripple_payment'));
    });
  });
}

function createRecordFromRippleRestResponse(rippleRestResponse) {
  if (rippleRestResponse.payment) {
    var paymentRecord = createPaymentRecordFromResponse(rippleRestResponse);
    return RipplePayments.forge(paymentRecord).save();
  } else {
    return Promise.resolve(rippleRestResponse);
  }
}

function createPaymentRecordFromResponse(paymentResponse) {
  var payment = paymentResponse.payment;
  return {
    hash: paymentResponse.hash,
    ledger: paymentResponse.ledger,
    state: paymentResponse.state,
    source_account: payment.source_account,
    source_tag: payment.source_tag,
    source_amount_value: payment.source_amount.value,
    source_amount_currency: payment.source_amount.currency,
    source_amount_issuer: payment.source_amount.issuer,
    source_slippage: payment.source_slippage,
    destination_account: payment.destination_account,
    destination_tag: payment.destination_tag,
    destination_amount_value: payment.destination_amount.value,
    destination_amount_currency: payment.destination_amount.currency,
    destination_amount_issuer: payment.destination_amount.issuer,
    invoice_id: payment.invoice_id,
    paths: payment.paths,
    no_direct_ripple: payment.no_direct_ripple,
    partial_payment: payment.partial_payment,
    direction: payment.direction,
    result: payment.result,
    timestamp: payment.timestamp,
    fee: payment.fee,
    source_balance_changes: payment.source_balance_changes,
    destination_balance_changes: payment.destination_balance_changes
  };
}
