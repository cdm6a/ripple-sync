const Promise          = require('bluebird');
const logger           = require(__dirname + '/../../logger.js');
const rippleAddresses  = require(__dirname + '/../../persistence/').models.rippleAddresses;
const PersistenceError = require(__dirname + '/../errors/persistence_error.js');

module.exports = {
  find: find,
  findById: findById
};

function find(query) {
  return new Promise(function(resolve, reject) {
    rippleAddresses.findAll({
      where: query
    }).then(function(rippleAddresses) {
      resolve(rippleAddresses);
    }).error(function(error) {
      logger.error('Unable to fetch ripple_addresses with query [%j]', query, error);
      reject(new PersistenceError('Unable to fetch managed addresses'));
    });
  });
}

function findById(id) {
  return new Promise(function(resolve, reject) {
    rippleAddresses.find({
      where: {
        id: id
      }
    }).then(function(ripplePayment) {
      resolve(ripplePayment);
    }).error(function(error) {
      logger.error('Unable to fetch ripple_address with id [%s]', id, error);
      reject(new PersistenceError('Unable to fetch managed address'));
    });
  });
}
