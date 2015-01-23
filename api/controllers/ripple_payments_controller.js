var _                      = require('lodash');
var responseHandler        = require(__dirname + '/../response_handler.js');
var ripplePaymentsService  = require(__dirname + '/../../lib/services/ripple_payments_service.js');
var logger                 = require(__dirname + '/../../logger.js');

function find(request, response) {
  ripplePaymentsService.find(request.query)
    .then(function(ripplePayments) {
      responseHandler.success(response, {ripple_payments: ripplePayments});
    }).error(function(error) {
      responseHandler.internalError(response, null, error);
    });
}

function findById(request, response) {
  ripplePaymentsService.find(request.param.id)
    .then(function(ripplePayment) {
      responseHandler.success(response, {ripple_payment: ripplePayment});
    }).error(function(error) {
      responseHandler.internalError(response, null, error);
    });
}

module.exports = {
  find: find,
  findById: findById
};