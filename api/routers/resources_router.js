const express = require('express');
const ripplePaymentsController = require(__dirname+'/../controllers/ripple_payments_controller.js');

var router = new express.Router();

// Ripple Payments
router.get('/ripple_payments', ripplePaymentsController.find);
router.get('/ripple_payments/:id', ripplePaymentsController.findById);

module.exports = router;