const express = require('express');
const router = express.Router();
const paymentController = require('../app/controllers/payment.controller')
router.post('/zalopay/create-order',paymentController.zalopayCreateOrder);
module.exports = router;