const express = require('express');
const router = express.Router();

const CartController = require('../app/controllers/cart.controller');

router.get('/', CartController.checkout_cart);
router.post('/addtocart', CartController.addToCart);

module.exports = router;
