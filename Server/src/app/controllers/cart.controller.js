const Cart = require('../models/cart.model');

class cartController {
  async checkout_cart(req, res, next) {
    try {
      const cartItems = await Cart.find({});
      let totalQuantity = 0;
      let totalPrice = 0;

      // Tính tổng số sản phẩm và tổng số tiền
      cartItems.forEach((item) => {
        totalQuantity += item.quantity;
        totalPrice += item.price * item.quantity;
      });

      res.status(200).json({ items: cartItems, totalQuantity, totalPrice });
    } catch (error) {
      next(error);
    }
  }

  async addToCart(req, res, next) {
    try {
      const { email,id, name, price, quantity, total, image } = req.body;
      // Kiểm tra sản phẩm trong giỏ hàng
      let existingCartItem = await Cart.findOne({ email, name });

      if (existingCartItem) {
        // Nếu sản phẩm có trong giỏ thì cộng dồn số lượng
        existingCartItem.quantity += parseInt(quantity);
        existingCartItem.total += parseFloat(total);
        await existingCartItem.save();
      } else {
        // Thêm một sản phẩm mới
        await Cart.create({
          email,
          id,
          name,
          price,
          quantity,
          total,
          image,
        });
      }

      res.status(201).json({ message: 'Item added to cart successfully' });
    } catch (error) {
      next(error);
    }
  }
  async getTotalCartItems(res,req) {
    let totalItems = 0;
    for (const item in cartItems) {
        if (cartItems[item] > 0) {
            totalItems += cartItems[item];
        }
    }
    res.json({ totalItems });
  };
}

module.exports = new cartController();
