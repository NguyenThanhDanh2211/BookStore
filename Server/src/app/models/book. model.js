const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Book = new Schema({
  name: { type: String, require: true },
  author: { type: String, require: true },
  nhaxuatban: { type: String, require: true },
  namxuatban: { type: String, require: true },
  language: { type: String, require: true },
  price: { type: String, require: true },
  discription: { type: String, require: true },
});

module.exports = mongoose.model('Books', Book);
