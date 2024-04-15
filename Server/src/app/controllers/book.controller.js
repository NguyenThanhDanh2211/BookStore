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
    
    
}

module.exports = new BookController();