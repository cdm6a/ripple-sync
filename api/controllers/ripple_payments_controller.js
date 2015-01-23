var _               = require('lodash');
var responseHandler = require(__dirname + '/../response_handler.js');
var ripplePayments  = require(__dirname + '/../../persistence/').models.ripplePayments;
var logger          = require(__dirname + '/../../logger.js');

function find(request, response) {
  ripplePayments.findAll({
    where: request.query
  }).then(function(ripplePayments) {
    responseHandler.success(response, {ripple_payments: ripplePayments});
  }).error(function(error) {
    logger.error(error);
    responseHandler.internalError(response, 'Could not retrieve ripple payments');
  });
}

function findById(request, response) {
  ripplePayments.find({
    where:  {
      id: request.params.id
    }
  }).then(function(ripplePayment) {
    responseHandler.success(response, {ripple_payment: ripplePayment});
  }).error(function(error) {
    logger.error('Unable to fetch ripple_payment: ', error);
    responseHandler.internalError(response, 'Could not retrieve ripple payment');
  });
}

module.exports = {
  find: find,
  findById: findById
};