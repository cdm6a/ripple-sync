var Promise                = require('bluebird');
var request                = require('superagent');
                             require('superagent-bluebird-promise');
var config                 = require(__dirname + '/../../config/config.js');
var logger                 = require(__dirname + '/../../logger.js');
var rippleAddressesService = require(__dirname + '/../services/ripple_addresses_service.js');
var ripplePaymentsService  = require(__dirname + '/../services/ripple_payments_service.js');

module.exports = {
  loopAndPersistNotifications: loopAndPersistNotifications
};

function fetchAddressesAndProcessNotifications() {
  return new Promise(function (resolve, reject) {
    rippleAddressesService.find()
      .then(function (rippleAddresses) {
        var processingArray = rippleAddresses.map(function(rippleAddress) {
          return processAddressesNotifications(rippleAddress);
        });
        return Promise.all(processingArray);
      }).error(function (error) {
        logger.error('[ripple_notification_service.js:fetchAddressesAndProcessNotifications] Unable to fetch ripple addresses', error);
        return reject(error);
      });
  });
}

function processAddressesNotifications(rippleAddress) {
  var requestUrl = config.get('rippleRestHost') + '/v1/accounts/' + rippleAddress.address + '/notifications/' + rippleAddress.last_transaction_hash;
  var nextNotificationUrl;
  request.get(requestUrl).promise()
    .then(function (response) {
      if (!response.body.success) {
        logger.error('[ripple_notification_service.js:processAddressesNotifications] Received unsuccessful response from ripple-rest', response.body);
        return Promise.reject(response.body);
      } else {
        nextNotificationUrl = response.body.notification.next_notification_url;
        return loopAndPersistNotifications(nextNotificationUrl);
      }
    })
    .error(function (error) {
      logger.error('[ripple_notification_service.js:processAddressesNotifications] Could not fetch notification for rippleAddress [%j]', rippleAddress, error);
      return Promise.reject(error);
    })
}

function loopAndPersistNotifications(notification) {
  var notificationUrl = notification.notificationUrl;
  if (!notificationUrl) {
    return Promise.resolve();
  }

  var promise = new Promise(function(resolve, reject) {
    var nextNotificationUrl;
    request.get(notificationUrl).promise()
      .then(function(response) {
        // TODO: Check success
        nextNotificationUrl = response.body.notification.next_notification_url;
        return request.get(response.body.notification.transaction_url).promise();
      })
      .then(function(response) {
        // TODO: Check success
        return ripplePaymentsService.createRecordFromRippleRestResponse(response.body);
      })
      .then(function(paymentRecord) {
        logger.info('Recorded payment record: %j', paymentRecord);
        return rippleAddressesService.updateLastTransactionHash(notification.address, paymentRecord.hash);
      })
      .then(function(rippleAddress) {
        return resolve(nextNotificationUrl);
      })
      .error(function(error) {
        logger.error('[ripple_notification_service.js:loopAndPersistNotifications] Error attempting to loop through notifications', error);
        reject(error);
      })
  });
  return promise.then(loopAndPersistNotifications);
}