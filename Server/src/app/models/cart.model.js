const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Cart = new Schema({
  email: { type: String, required: true },
  id: { type: String},
  name: {type: String},
  price: { type: Number },
  quantity: { type: Number },
  total: { type: Number },
  image: [{ type: String }],
});

module.exports = mongoose.model('Carts', Cart);
