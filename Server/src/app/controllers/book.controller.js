const Book = require('../models/book.model');
const {mongooseToObject} = require('../../util/mongoose');

class BookController {
    show(req, res, next) {
        // Book.findOne({slug: req.params.slug})
        //     .then(book => {
        //         res.render('book/show',{course: mongooseToObject(book)});
        //     })
        //     .catch(next);
        res.render('book/show');
    }
    //[GET]/courses/create
    create(req, res, next){
        res.render('books/create');
    }
    //[POST]/courses/store
    async store(req, res, next) {
         try {
            const book = new Book(req.body);
            await book.save();
            res.redirect('/');
        } catch (error) {
            console.log('Loi!!!!');
        }
    }
    
}

module.exports = new BookController();