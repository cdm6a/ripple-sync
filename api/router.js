const express                    = require('express');
const ripplePaymentsController   = require(__dirname+'/controllers/ripple_payments_controller.js');
const managedAddressesController = require(__dirname+'/controllers/managed_addresses_controller.js');

var router = new express.Router();

// Ripple Payments
router.get('/ripple_payments', ripplePaymentsController.find);
router.get('/ripple_payments/:id', ripplePaymentsController.findById);

// Managed Addresses
router.get('/managed_addresses', managedAddressesController.find);
router.get('/managed_addresses/:id', managedAddressesController.findById);

module.exports = router;