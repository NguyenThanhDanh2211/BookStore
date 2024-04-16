const Book = require('../models/book.model');
const { mongooseToObject } = require('../../util/mongoose');

class BookController {
  async all(req, res, next) {
    try {
      const books = await Book.find();
      console.log('All Book Fetched');
      res.send(books);
    } catch (error) {
      res.status(500).send(error);
    }
  }
  //[GET]/courses/create
  async category(req, res) {
    try {
      const books = await Book.find({ category: req.params.category });
      res.send(books);
    } catch (error) {
      res.status(500).send(error);
    }
  }

  async show(req, res, next) {
    try {
      const book = await Book.findOne({ id: req.params.id }); // Sử dụng _id thay vì id
      res.send(book);
    } catch (error) {
      next(error); // Sử dụng next để xử lý lỗi
    }
  }

  async description(req, res) {
    const bookName = req.params.name;
    try {
      const book = await Book.findOne({ name: bookName });
      if (!book) {
        return res.status(404).json({ error: 'Book not found' });
      }
      res.json({ description: book.description });
    } catch (error) {
      console.error('Error fetching book description:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }
}

module.exports = new BookController();
