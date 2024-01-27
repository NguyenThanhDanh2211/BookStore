const Cart = require('../models/cart.model');

class cartController {
  async checkout_cart(req, res, next) {
    Cart.find({})
      .then(() => {
        res.render('cart');
      })
      .catch(next);
  }
}

module.exports = new cartController();
