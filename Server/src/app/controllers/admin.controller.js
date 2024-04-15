const Book = require('../models/book.model');
const port = 3000;

class AdminController {
  // hiển thị sách
  async listbook(req, res) {
    const books = await Book.find({});
    console.log('All Book Fetched');
    res.send(books);
  }
  //upload hình
  async upload(req, res) {
    res.json({
      success: 1,
      image_url: `http://localhost:${port}/admin/images/${req.file.filename}`,
    });
  }
  // thêm sách
  async addbook(req, res) {
    let books = await Book.find({});
    let stt;
    if (books.length > 0) {
      let last_book_array = books.slice(-1);
      let last_book = last_book_array[0];
      stt = last_book.stt + 1;
    } else {
      stt = 1;
    }
    const book = new Book({
      stt: stt,
      id: req.body.id,
      name: req.body.name,
      image: req.body.image,
      author: req.body.author,
      publisher: req.body.publisher,
      category: req.body.category,
      price: req.body.price,
      description: req.body.description,
      discount: req.body.discount,
      date: req.body.date,
      available: req.body.avilable,
    });
    console.log(book);
    await book.save();
    console.log('Saved');
    res.json({
      success: true,
      name: req.body.name,
    });
  }
  //xoa sach
  async removebook(req, res) {
    await Book.findOneAndDelete({ id: req.body.id });
    console.log('Removed');
    res.json({
      success: true,
      name: req.body.name,
    });
  }
}
module.exports = new AdminController();
