const Book = require('../models/book.model');
const {mongooseToObject} = require('../../util/mongoose');

class BookController {
    async all(req, res, next) {
        try {
            const books = await Book.find();
            res.send(books);
          } catch (error) {
            res.status(500).send(error);
          }
    }
    //[GET]/courses/create
    async category(req,res){
        try {
            const books = await Book.find({ category: req.params.category });
            res.send(books);
          } catch (error) {
            res.status(500).send(error);
          }
    }
    async show(req, res, next) {
      try {
        const book = await Book.findOne({ id:req.params.id }); // Sử dụng _id thay vì id
        res.send(book);
      } catch (error) {
        next(error); // Sử dụng next để xử lý lỗi
      }
    }
    
}

module.exports = new BookController();