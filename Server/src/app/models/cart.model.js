const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Cart = new Schema({
  userName: { type: String, required: true },
  bookName: { type: String, required: true },
  price: { type: Number },
  quantity: { type: Number },
  total: { type: Number },
  images: [{ type: String }],
});

module.exports = mongoose.model('Carts', Cart);
