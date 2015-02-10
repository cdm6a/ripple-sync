var Promise          = require('bluebird');
var logger           = require(__dirname + '/../../logger.js');
var RippleAddresses  = require(__dirname + '/../../persistence/models/ripple_addresses.js');
var PersistenceError = require(__dirname + '/../errors/persistence_error.js');

module.exports = {
  find: find,
  findById: findById,
  updateLastTransactionHash: updateLastTransactionHash
};

function find(query) {
  return new Promise(function(resolve, reject) {
    RippleAddresses.forge(query).fetchAll().then(function(rippleAddresses) {
      return resolve(rippleAddresses);
    }).error(function(error) {
      logger.error('Unable to fetch ripple_addresses with query [%j]', query, error);
      return reject(new PersistenceError('Unable to fetch ripple addresses'));
    });
  });
}

function findById(id) {
  return new Promise(function(resolve, reject) {
    RippleAddresses.forge({'id': id}).fetch().then(function(rippleAddress) {
      return resolve(rippleAddress);
    }).error(function(error) {
      logger.error('Unable to fetch ripple_address with id [%s]', id, error);
      return reject(new PersistenceError('Unable to fetch ripple address'));
    });
  });
}

function updateLastTransactionHash(address, newHash) {
  return new Promise(function(resolve, reject) {
    RippleAddresses.forge({address: address}).save({last_transaction_hash: newHash}).then(function(rippleAddress) {
      return resolve(rippleAddress);
    }).error(function(error) {
      logger.error('Unable to update last_transaction_hash for address [%s]', address, error);
      return reject(error);
    })
  })
}
