import { useState } from 'react';
import './CSS/Login.css';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './CSS/Signup.css';

const LoginSignup = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    phoneNumber: '',
    email: '',
    password: '',
  });

  const { name, phoneNumber, email, password } = formData;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3000/user/signup', {
        name,
        phoneNumber,
        email,
        password,
      });
      // console.log(response);
      console.log(response.data); 
      navigate('/user/login');
      // Log phản hồi từ backend
      // Thực hiện các hành động tiếp theo sau khi đăng ký thành công
    } catch (error) {
      console.error(error.response.data); // Log lỗi từ backend
      console.error(
        'There was a problem with your fetch operation:',
        error.message
      );
      // Xử lý lỗi và hiển thị thông báo cho người dùng
    }
  };

  return (
    <div className="loginsignup">
      <div className="loginsignup-container">
        <h1>Đăng Ký</h1>
        <form onSubmit={handleSubmit}>
          <div className="loginsignup-fields">
            <input
              type="text"
              name="name"
              value={name}
              placeholder="Nhập Tên Tài Khoản..."
              onChange={handleChange}
            />
            <input
              type="phone"
              name="phoneNumber"
              value={phoneNumber}
              placeholder="Nhập Số Điện Thoại..."
              onChange={handleChange}
            />
            <input
              type="email"
              name="email"
              value={email}
              placeholder="Nhập Email..."
              onChange={handleChange}
            />
            <input
              type="password"
              name="password"
              value={password}
              placeholder="Nhập Mật Khẩu..."
              onChange={handleChange}
            />
          </div>
          <button>Đăng Ký</button>
        </form>
        <p className="loginsignup-login">
          Bạn đã có tài khoản?
          <Link style={{ textDecoration: 'none' }} to="/user/login">
            <span> Đăng nhập ngay</span>
          </Link>
        </p>
        <div className="loginsignup-agree">
          <input type="checkbox" name="" id="" />
          <p>
            Để tiếp tục, Tôi đồng ý với các điều khoản sử dụng & chính sách bảo
            mật
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginSignup;
