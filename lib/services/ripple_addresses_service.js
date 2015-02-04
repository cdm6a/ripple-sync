const Promise          = require('bluebird');
const logger           = require(__dirname + '/../../logger.js');
const RippleAddresses  = require(__dirname + '/../../persistence/models/ripple_addresses.js');
const PersistenceError = require(__dirname + '/../errors/persistence_error.js');

module.exports = {
  find: find,
  findById: findById
};

function find(query) {
  return new Promise(function(resolve, reject) {
    RippleAddresses.forge(query).fetchAll().then(function(rippleAddresses) {
      resolve(rippleAddresses);
    }).error(function(error) {
      logger.error('Unable to fetch ripple_addresses with query [%j]', query, error);
      reject(new PersistenceError('Unable to fetch ripple addresses'));
    });
  });
}

function findById(id) {
  return new Promise(function(resolve, reject) {
    RippleAddresses.forge({'id': id}).fetch().then(function(rippleAddress) {
      resolve(rippleAddress);
    }).error(function(error) {
      logger.error('Unable to fetch ripple_address with id [%s]', id, error);
      reject(new PersistenceError('Unable to fetch ripple address'));
    });
  });
}
