const Book = require('../models/book.model');
class AdminController{
    async create(req,res){
        try {
            const { name,
                    author, 
                    publisher, 
                    yearofpublication, 
                    language, 
                    price, 
                    description, 
                    images, 
                    genres, 
                    ratings} = req.body;
      
            // Kiểm tra xem email đã được đăng ký hay chưa
            const existingBook = await Book.findOne({ name });
            if (existingBook) {
              return res.status(400).json({ message: 'Sách đã tồn tại' });
            }
      

            // Tạo người dùng mới
            const newBook = new Book({
                name,
                author, 
                publisher, 
                yearofpublication, 
                language, 
                price, 
                description, 
                images, 
                genres, 
                ratings
            });
      
            await newBook.save();
            res.status(201).json({
              message: 'Thêm sách thành công',
           });
          } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Thất bại' });
            console.error(error);
          }
    }

    async update(req,res){
        try {
            const { bookId } = req.params; // Lấy bookId từ URL
            const {
                name,
                author,
                publisher,
                yearofpublication,
                language,
                price,
                description,
                images,
                genres,
                ratings
            } = req.body;

            // Tìm sách theo bookId
            const bookToUpdate = await Book.findById(bookId);
            if (!bookToUpdate) {
                return res.status(404).json({ message: 'Không tìm thấy sách' });
            }

            // Cập nhật thông tin sách
            bookToUpdate.name = name;
            bookToUpdate.author = author;
            bookToUpdate.publisher = publisher;
            bookToUpdate.yearofpublication = yearofpublication;
            bookToUpdate.language = language;
            bookToUpdate.price = price;
            bookToUpdate.description = description;
            bookToUpdate.images = images;
            bookToUpdate.genres = genres;
            bookToUpdate.ratings = ratings;

            await bookToUpdate.save();
            res.status(200).json({ message: 'Cập nhật sách thành công' });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Thất bại' });
        }
    }
    async delete(req, res) {
        try {
            const { bookId } = req.params; // Lấy bookId từ URL

            // Tìm sách theo bookId
            const bookToDelete = await Book.findById(bookId);
            if (!bookToDelete) {
                return res.status(404).json({ message: 'Không tìm thấy sách' });
            }

            // Xóa sách
            await bookToDelete.remove();
            res.status(200).json({ message: 'Xóa sách thành công' });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Thất bại' });
        }
    }
}
module.exports = new AdminController();