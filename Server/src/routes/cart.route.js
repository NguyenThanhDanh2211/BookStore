const express = require('express');
const router = express.Router();

const CartController = require('../app/controllers/cart.controller');
const cartController = require('../app/controllers/cart.controller');


router.post('/addtocart', CartController.addToCart);
router.post('/gettotalcartitems',CartController.getTotalCartItems);
router.post('/getall',cartController.getall);
router.post('/update',cartController.updateQuantity);
router.post('/remove', cartController.remove);
router.get('/', CartController.checkout_cart);
module.exports = router;
