import React from 'react';
import { useState } from 'react';
import './CSS/Login.css';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3000/user/login',{
      email,
      password,
      }); // Make an API request
      console.log(response.data); // Log the response data
      if (email.includes('@admin')) {
        // Chuyển hướng đến trang admin
        window.location.href = 'http://localhost:5173/';
      } else {
        // Chuyển hướng đến trang chủ bình thường
        navigate('/');
      }
    } catch (error) {
      console.error('Error fetching data:', error.message);
    }
  };
  return (
    <div className="login">
      <div className="login-container">
        <h1>Đăng Nhập</h1>
        <form onSubmit={handleSubmit}>
          <div className="login-fields">
            <input 
              type="text"
              name='email'
              placeholder="Nhập Email..." 
              value={email} 
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password" 
              name='password' 
              placeholder="Nhập Mật Khẩu..." 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
            />
          </div>
          <button>Đăng Nhập</button>
        </form>
        <p className="login-login">
          Bạn chưa có tài khoản?
          <Link style={{ textDecoration: 'none' }} to="/user/signup">
            <span> Đăng ký ngay</span>
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
