const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Book = new Schema({
  name: { type: String, required: true },
  author: { type: String, required: true },
  publisher: { type: String, required: true },
  yearofpublication: { type: Number, required: true },
  language: { type: String, required: true },
  price: { type: Number, required: true },
  description: { type: String, required: true },
  images: [{ type: String }],
  genres: [{ type: String }],
  ratings: [{ type: Number }],
});

module.exports = mongoose.model('Books', Book);
