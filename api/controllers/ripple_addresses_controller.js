var _                       = require('lodash');
var responseHandler         = require(__dirname + '/../response_handler.js');
var rippleAddressesService  = require(__dirname + '/../../lib/services/ripple_addresses_service.js');

function find(request, response) {
  rippleAddressesService.find(request.query)
    .then(function(rippleAddresses) {
      responseHandler.success(response, {ripple_addresses: rippleAddresses});
    }).error(function(error) {
      responseHandler.internalError(response, null, error);
    });
}

function findById(request, response) {
  rippleAddressesService.findById(request.params.id)
    .then(function(rippleAddress) {
      responseHandler.success(response, {ripple_address: rippleAddress});
    }).error(function(error) {
      responseHandler.internalError(response, null, error);
    });
}

module.exports = {
  find: find,
  findById: findById
};