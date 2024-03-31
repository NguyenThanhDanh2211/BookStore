const Book = require('../models/book.model');



class AdminController{
    // hiển thị sách 
    async listbook(req,res){
        const  books = await Book.find({});
        console.log("All Book Fetched");
        res.send(books);
    }
    //upload hình 
    async upload(req,res){
        res.json({
            success: 1,
            image_url: `http://localhost:${process.env.PORT}/images/${req.file.filename}`,
        });
    };
    // thêm sách 
    async addbook(req,res){
        let books = await Book.find({})
        let id;
        if(books.length>0){
            let last_book_array = books.slice(-1)
            let last_book = last_book_array[0]
            id = last_book.id + 1
        }
        else{
            id = 1
        }
        const book = new Book({
            id: id,
            name: req.body.name,
            image: req.body.image,
            author: req.body.author,
            publisher: req.body.publisher,
            category: req.body.category,
            price: req.body.price,
            date: req.body.date,
            available: req.body.avilable
        });
        console.log(book);
        await book.save();
        console.log("Saved");
        res.json({
            success: true,
            name: req.body.name,
        })
    }
    //xoa sach
    async removebook(req,res){
        await Book.findOneAndDelete({id:req.body.id})
        console.log("Removed");
        res.json({
        success: true,
        name: req.body.name,
    });
    }
}
module.exports = new AdminController();