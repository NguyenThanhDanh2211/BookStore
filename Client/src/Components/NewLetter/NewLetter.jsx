import React from 'react'
import './NewLetter.css'
const NewLetter = () => {
  return (
    <div className='newletter'>
        <h1>Nhận Ưu Đãi Độc Quyền Qua Email Của Bạn</h1>
        <p>Chúng Tôi Luôn Cập Nhập Mới, Đăng Ký Để Nhận Bản Tin Của Chúng Tôi</p>
        <div>
            <input type="email" placeholder="Enter your email"/>
            <button>Đăng Ký</button>
        </div>
    </div>
  )
}

export default NewLetter
