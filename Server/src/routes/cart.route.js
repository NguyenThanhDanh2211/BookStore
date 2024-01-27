const express = require('express');
const router = express.Router();

const CartController = require('../app/controllers/cart.controller');

router.get('/checkout-cart', CartController.checkout_cart);

module.exports = router;
