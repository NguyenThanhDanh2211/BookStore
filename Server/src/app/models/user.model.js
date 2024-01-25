const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const User = new Schema({
  name: { type: String, require: true },
  sdt: { type: String, require: true },
  address: { type: String },
  isAdmin: { type: Boolean, require: true },
});

module.exports = mongoose.model('Users', User);
