import React  from 'react'
import './CSS/Signup.css'
import { Link } from 'react-router-dom'
const loginSignup = () => {
  return (
    <div className='loginsignup'>
      <div className='loginsignup-container'>
        <h1>Đăng Ký</h1>
        <div className='loginsignup-fields'>
          <input type='text' placeholder='Nhập Tên Tài Khoản...' />
          <input type='phone' placeholder='Nhập Số Điện Thoại...' />
          <input type='email' placeholder='Nhập Email...' />
          <input type='password' placeholder='Nhập Mật Khẩu...' />
          </div>
          <button>Đăng Ký</button>
          <p className='loginsignup-login'>Bạn đã có tài khoản?<Link style={{ textDecoration: 'none'}} to ='/login'><span> Đăng nhập ngay</span></Link></p>
          <div className='loginsignup-agree'>
            <input type='checkbox' name='' id=''/>
            <p>Để tiếp tục, Tôi đồng ý với các điều khoản sử dụng & chính sách bảo mật</p>
          </div>
      </div>
    </div>
  )
}

export default loginSignup
