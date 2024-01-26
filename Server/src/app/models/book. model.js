const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Book = new Schema({
  name: { type: String, require: true },
  author: { type: String, require: true },
  publisher: { type: String, require: true },
  yearofpublication: { type: Number, require: true },
  language: { type: String, require: true },
  price: { type: Number, require: true },
  description: { type: String, require: true },
  images: [{ type: String }],
  genres: [{ type: String }],
  ratings: [{ type: Number }],
});

module.exports = mongoose.model('Books', Book);
