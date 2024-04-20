import React, { useState,useEffect } from 'react';
import './BookDisplay.css';
import starpull from '../Assets/star.png';
import star from '../Assets/starpull.png';
import axios from 'axios';

const BookDisplay = (props) => {
  const savedUser = JSON.parse(localStorage.getItem('user'));
  const { book } = props;

  const new_price = book.discount
    ? (book.price * (1 - book.discount / 100)).toLocaleString('en-US')
    : book.price && book.price.toLocaleString('en-US');

  const discountPercent = book.discount ? book.discount + '%' : '';
  const [formData, setFormData] = useState({
    email: '',
    id: '',
    name: '',
    price: '',
    quantity: '',
    total: '',
    image: '',
  });
  const { email, id, name, price, quantity, total, image } = formData;
 

useEffect(() => {
  if (savedUser) {
    setFormData({
      email: savedUser.email,
      id: book.id,
      name: book.name,
      price: book.price,
      quantity: 1,
      total: book.price,
      image: book.image,
    });
  }
}, [savedUser]);

  const addToCart = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        'http://localhost:3000/cart/addtocart',
        {
          email,
          id,
          name,
          price,
          quantity,
          total,
          image,
        }
      );
      console.log(response.data);
    } catch (error) {
      console.error(error.response.data);
      console.error(
        'There was a problem with your fetch operation:',
        error.message
      );
    };
  }

  return (
    <div className="bookdisplay">
      <div className="bookdisplay-left">
        <div className="bookdisplay-img-list">
          <img src={book.image} alt="" />
          <img src={book.image} alt="" />
          <img src={book.image} alt="" />
          {/* <img src={book.image} alt="" /> */}
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
        <div className="bookdisplay-price">
          <div className="bookdisplay-right-prices">{new_price} VND</div>
          {/* Kiểm tra nếu % giảm giá là 0 thì chỉ hiển thị giá gốc */}
          {book.discount !== 0 && (
            <>
              <div className="bookdisplay-price-old">{book.price} đ</div>
              <div className="bookdisplay-percentDis">
                {' '}
                - {discountPercent}{' '}
              </div>
            </>
          )}
        </div>

        <div className="bookdisplay-right-description"></div>
        <div className="bookdisplay-right-author">
          Tác Giả: <b>{book.author}</b>
        </div>
        <div className="bookdisplay-right-publisher">
          Nhà Xuất Bản: <b>{book.publisher}</b>
        </div>
        {/* <div className="bookdisplay-right-amount">Amount:</div> */}
        <div>
          <button onClick={addToCart}>Thêm Vào Giỏ Hàng</button>
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
