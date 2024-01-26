const User = require('../models/user.model');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

class UserController {
  async signup(req, res) {
    try {
      const { name, phoneNumber, address, email, password } = req.body;

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
        address,
        role: 'customer',
        email,
        password: hashedPass,
      });

      await newUser.save();
      res.status(201).json({ message: 'Đăng ký thành công' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Thất bại' });
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
        'your-secret-key', // Thay bằng secret key thực tế và không nên chia sẻ
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
      } else {
        // Chuyển hướng đến trang chủ bình thường
        res.status(200).json({
          message: 'Đăng nhập thành công - Chuyển hướng đến trang chủ',
          token,
          redirectTo: '/',
        });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'That bai' });
    }
  }
}

module.exports = new UserController();
