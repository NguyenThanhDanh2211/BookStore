import React, { useState } from 'react';
import './BookDisplay.css';
import starpull from '../Assets/star.png';
import star from '../Assets/starpull.png';
import axios from 'axios';

import { Context } from '../../Context/Context';

const BookDisplay = (props) => {
  const { book } = props;
  const [formData, setFormData] = useState({
    email:'minhquan300902@gmail.com',
    id:book.id,
    name:book.name,
    price:book.price,
    quantity:1,
    total:book.price,
    image:book.image,
  });
  const { email, id, name, price, quantity, total, image, } = formData;
  const addToCart = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3000/cart/addtocart', {
        email,
        id,
        name,
        price,
        quantity,
        total,
        image,
      });
      console.log(response.data); 
    } catch (error) {
      console.error(error.response.data); 
      console.error(
        'There was a problem with your fetch operation:',
        error.message
      );
    }
  };

  return (
    <div className="bookdisplay">
      <div className="bookdisplay-left">
        <div className="bookdisplay-img-list">
          <img src={book.image} alt="" />
          <img src={book.image} alt="" />
          <img src={book.image} alt="" />
          <img src={book.image} alt="" />
        </div>
        <div className="bookdisplay-img">
          <img className="bookdisplay-main-img" src={book.image} alt="" />
        </div>
      </div>
      <div className="bookdisplay-right">
        <h1>{book.name}</h1>
        <div className="bookdisplay-right-star">
          <img src={star} alt="" />
          <img src={star} alt="" />
          <img src={star} alt="" />
          <img src={star} alt="" />
          <img src={starpull} alt="" />
          <p>(19)</p>
        </div>
        <div className="bookdisplay-right-prices">{book.price} VND</div>
        <div className="bookdisplay-right-description"></div>
        <div className="bookdisplay-right-author">
          Tác Giả: <b>{book.author}</b>
        </div>
        <div className="bookdisplay-right-publisher">
          Nhà Xuất Bản: <b>{book.publisher}</b>
        </div>
        <div className="bookdisplay-right-amount">Amount:</div>
        <div>
          <button onClick={addToCart}>
            Thêm Vào Giỏ Hàng
          </button>
          <button>Mua Ngay</button>
        </div>
        <p className="bookdisplay-right-category">
          <span></span>
        </p>
      </div>
    </div>
  );
};

export default BookDisplay;
