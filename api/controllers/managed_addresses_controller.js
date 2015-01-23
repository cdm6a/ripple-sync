var _                       = require('lodash');
var responseHandler         = require(__dirname + '/../response_handler.js');
var managedAddressesService = require(__dirname + '/../../lib/services/managed_addresses_service.js');
var logger                  = require(__dirname + '/../../logger.js');

function find(request, response) {
  managedAddressesService.find(request.query)
    .then(function(managedAddresses) {
      responseHandler.success(response, {managed_addresses: managedAddresses});
    }).error(function(error) {
      responseHandler.internalError(response, null, error);
    });
}

function findById(request, response) {
  managedAddressesService.find(request.param.id)
    .then(function(managedAddress) {
      responseHandler.success(response, {managed_address: managedAddress});
    }).error(function(error) {
      responseHandler.internalError(response, null, error);
    });
}

module.exports = {
  find: find,
  findById: findById
};