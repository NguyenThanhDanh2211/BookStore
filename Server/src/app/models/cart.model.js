const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Cart = new Schema({
  email: { type: String, required: true },
  id: { type: String, required: true },
  name: {type: String, required: true},
  price: { type: Number },
  quantity: { type: Number },
  total: { type: Number },
  image: [{ type: String }],
});

module.exports = mongoose.model('Carts', Cart);
