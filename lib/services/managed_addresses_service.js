const Promise          = require('bluebird');
const logger           = require(__dirname + '/../../logger.js');
const managedAddresses   = require(__dirname + '/../../persistence/').models.managedAddresses;
const PersistenceError = require(__dirname + '/../errors/persistence_error.js');

function find(query) {
  return new Promise(function(resolve, reject) {
    managedAddresses.findAll({
      where: query
    }).then(function(managedAddresses) {
      resolve(managedAddresses);
    }).error(function(error) {
      logger.error('Unable to fetch managed_address with query [%j]', query, error);
      reject(new PersistenceError('Unable to fetch managed addresses'));
    });
  });
}

function findById(id) {
  return new Promise(function(resolve, reject) {
    managedAddresses.find({
      where: {
        id: id
      }
    }).then(function(ripplePayment) {
      resolve(ripplePayment);
    }).error(function(error) {
      logger.error('Unable to fetch managed_address with id [%s]', id, error);
      reject(new PersistenceError('Unable to fetch managed address'));
    });
  });
}

module.exports = {
  find: find,
  findById: findById
};