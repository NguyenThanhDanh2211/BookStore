import React from 'react'
import './CSS/Login.css'
import { Link } from 'react-router-dom'
const Login = () => {
  return (
    <div className='login'>
      <div className='login-container'>
        <h1>Đăng Nhập</h1>
        <div className='login-fields'>
          <input type='text' placeholder='Nhập Tên Tài Khoản...' />
          <input type='password' placeholder='Nhập Mật Khẩu...' />
          </div>
          <button>Đăng Nhập</button>
          <p className='login-login'>Bạn chưa có tài khoản?<Link style={{ textDecoration: 'none'}} to ='/signup'><span>    Đăng ký ngay</span></Link></p>
      </div>
    </div>
  )
}

export default Login
