const User = require('../models/user.model');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const secretKey = crypto.randomBytes(32).toString('hex');
class UserController {
  async all(req, res, next) {
    try {
      const books = await User.find({});
      // const books = await Book.find({ category: req.params.category });
      console.log('All Book Fetched');

      res.send(books);
    } catch (error) {
      res.status(500).send(error);
    }
  }

  async signup(req, res) {
    try {
      const { name, phoneNumber, email, password } = req.body;

      // Kiểm tra xem email đã được đăng ký hay chưa
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ message: 'Email tồn tại' });
      }

      // Mã hóa mật khẩu
      const hashedPass = await bcrypt.hash(password, 10);

      // Tạo người dùng mới
      const newUser = new User({
        name,
        phoneNumber,
        role: 'customer',
        email,
        password: hashedPass,
      });

      await newUser.save();
      res.status(201).json({
        message: 'Đăng ký thành công',
        redirectTo: '/user/login',
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Thất bại' });

      console.error(error);
    }
  }

  async login(req, res) {
    try {
      const { email, password } = req.body;

      const user = await User.findOne({ email });
      if (!user || !(await bcrypt.compare(password, user.password))) {
        return res
          .status(401)
          .json({ message: 'Email hoặc mật khẩu không hợp lệ' });
      }

      // Tạo token
      const token = jwt.sign(
        { userId: user.id, email: user.email },
        'secretKey', // Thay bằng secret key thực tế và không nên chia sẻ
        { expiresIn: '1h' } // Thời gian hết hạn của token
      );

      // Kiểm tra nếu địa chỉ email có chứa "@admin"
      if (user.email.includes('@admin')) {
        // Chuyển hướng đến trang admin
        res.status(200).json({
          message: 'Đăng nhập thành công - Chuyển hướng đến trang admin',
          token,
          redirectTo: '/admin',
        });
        // res.render('admin');
      } else {
        // Chuyển hướng đến trang chủ bình thường
        res.status(200).json({
          message: 'Đăng nhập thành công - Chuyển hướng đến trang chủ',
          token,
          redirectTo: '/',
          user,
        });
        // res.render('user');
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'That bai' });
    }
  }
}

module.exports = new UserController();
