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
  async getall(req, res) {
    try {
      const cart = await Cart.find({ email: req.body.email });
      console.log('All Cart Fetched');

      res.send(cart);
    } catch (error) {
      res.status(500).send(error);
    }
  }
  async addToCart(req, res, next) {
    try {
      const { email, id, name, price, quantity, total, image } = req.body;
      // Kiểm tra sản phẩm trong giỏ hàng
      const existingCartItem = await Cart.findOne({ email, name });

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
  async getTotalCartItems(req, res) {
    try {
      const cartItems = await Cart.find({ email: req.body.email });
      let totalItems = 0;
      for (const item of cartItems) {
        totalItems += item.quantity;
      }
      res.json({ totalItems });
    } catch (error) {
      next(error);
    }
  }
  async updateQuantity(req, res) {
    const { id, quantity } = req.body;
    try {
      let item = await Cart.findOne({ id });
      item.quantity = quantity;
      await item.save();
      res.status(200).send('Số lượng đã được cập nhật');
    } catch (error) {
      res.status(500).send('Có lỗi xảy ra');
    }
  }
  async remove(req, res) {
    const { id } = req.body;
    try {
      await Cart.deleteOne({ id });
      res.status(200).send('Sản phẩm đã được xóa');
    } catch (error) {
      res.status(500).send('Có lỗi xảy ra');
    }
  }
}

module.exports = new cartController();
