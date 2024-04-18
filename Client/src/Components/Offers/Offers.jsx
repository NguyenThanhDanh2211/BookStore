import React from 'react'
import './Offers.css'
import exclucive_image from '../Assets/ex.jpg'
import { useNavigate } from 'react-router-dom';
const Offers = () => {
  const navigate = useNavigate();
  const click = async =>{
    navigate('/book/SDQ');
  };
  return (
    <div className='offers'>
        <div className='offers-left'>
            <h1>Đọc Quyền</h1>
            <h1>Dành Cho Bạn</h1>
            <p>Chỉ Có Trên SmartBooks</p>
              <button onClick={click}>Đến ngay</button>
        </div>
        <div className='offers-right'>
            <img src={exclucive_image} alt='' />
        </div>
    </div>
  )
}

export default Offers
