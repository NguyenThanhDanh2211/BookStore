import React from 'react'
import './Offers.css'
import exclucive_image from '../Assets/ex.jpg'
const Offers = () => {
  return (
    <div className='offers'>
        <div className='offers-left'>
            <h1>Đọc Quyền</h1>
            <h1>Dành Cho Bạn</h1>
            <p>Chỉ Có Trên SmartBooks</p>
            <button>Đến ngay</button>
        </div>
        <div className='offers-right'>
            <img src={exclucive_image} alt='' />
        </div>
    </div>
  )
}

export default Offers
