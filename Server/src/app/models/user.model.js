const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const User = new Schema({
  name: { type: String, required: true },
  phoneNumber: { type: String, required: true },
  address: { type: String },
  role: { type: String, enum: ['customer', 'admin'], default: 'customer' },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  registrationDate: { type: Date, default: Date.now },
  profileImage: { type: String },
});

module.exports = mongoose.model('Users', User);
