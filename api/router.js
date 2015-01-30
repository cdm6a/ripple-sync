const express                    = require('express');
const ripplePaymentsController   = require(__dirname+'/controllers/ripple_payments_controller.js');
const rippleAddressesController = require(__dirname+'/controllers/ripple_addresses_controller.js');

var router = new express.Router();

// Ripple Payments
router.get('/ripple_payments', ripplePaymentsController.find);
router.get('/ripple_payments/:id', ripplePaymentsController.findById);

// Managed Addresses
router.get('/ripple_addresses', rippleAddressesController.find);
router.get('/ripple_addresses/:id', rippleAddressesController.findById);

module.exports = router;