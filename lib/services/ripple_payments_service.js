const Promise          = require('bluebird');
const logger           = require(__dirname + '/../../logger.js');
const RipplePayments   = require(__dirname + '/../../persistence/models/ripple_payments.js');
const PersistenceError = require(__dirname + '/../errors/persistence_error.js');

module.exports = {
  find: find,
  findById: findById
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
