const Book = require('../models/book.model');
const unidecode = require('unidecode');
class BookController {

  async all(req, res, next) {
    try {
      const books = await Book.find({});
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

  async filter(req, res) {
    try {
      const searchQuery = req.query.search_query;

      if (!searchQuery) {
        return res.status(400).json({ error: 'No search query provided' });
      }

      // Tìm sách dựa trên tên sách hoặc tên tác giả
      const matchedBooks = await Book.find({
        $or: [
          { name: { $regex: new RegExp(searchQuery, 'i') } },
          { author: { $regex: new RegExp(searchQuery, 'i') } },
        ],
      });

      if (matchedBooks.length === 0) {
        return res.status(404).send({ error: 'No matching books found' });
      }

      res.json(matchedBooks);
    } catch (error) {
      console.error('Error filtering books:', error);
      res.status(500).send({ error: 'Internal server error' });
    }
  }

  // async filter(req, res) {
  //   try {
  //     const searchQuery = req.query.search_query;

  //     if (!searchQuery) {
  //       return res.status(400).json({ error: 'No search query provided' });
  //     }

  //     // Chuyển đổi chuỗi tìm kiếm sang chữ thường và không dấu
  //     const normalizedSearchQuery = unidecode(searchQuery.toLowerCase());

  //     // Tìm sách dựa trên tên sách hoặc tên tác giả (không phân biệt chữ hoa chữ thường và không phân biệt dấu)
  //     const matchedBooks = await Book.find({
  //       $or: [
  //         { name: { $regex: new RegExp(normalizedSearchQuery, 'i') } },
  //         { author: { $regex: new RegExp(normalizedSearchQuery, 'i') } },
  //       ],
  //     });

  //     if (matchedBooks.length === 0) {
  //       return res.status(404).send({ error: 'No matching books found' });
  //     }

  //     res.json(matchedBooks);
  //   } catch (error) {
  //     console.error('Error filtering books:', error);
  //     res.status(500).send({ error: 'Internal server error' });
  //   }
  // }
}

module.exports = new BookController();
