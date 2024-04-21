import React, { useState, useEffect } from 'react';
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

  const [successMessage, setSuccessMessage] = useState(''); // Trạng thái cho thông báo

  const { email, id, name, price, quantity, total, image } = formData;

  useEffect(() => {
    if (savedUser) {
      const discountPrice = Math.floor(
        book.discount ? book.price * (1 - book.discount / 100) : book.price
      );

      const newFormData = {
        email: savedUser.email,
        id: book.id,
        name: book.name,
        price: discountPrice,
        quantity: 1,
        total: discountPrice,
        image: book.image,
      };

      if (JSON.stringify(formData) !== JSON.stringify(newFormData)) {
        setFormData(newFormData);
      }
    }
  }, [savedUser, book]);

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

      // Hiển thị thông báo thành công
      setSuccessMessage('Thêm vào giỏ hàng thành công!');

      // Ẩn thông báo sau 5 giây
      setTimeout(() => {
        setSuccessMessage('');
      }, 5000);
    } catch (error) {
      console.error('Có lỗi xảy ra:', error.message);
    }
  };

  return (
    <div className="bookdisplay">
      {successMessage && (
        <div className="success-message">{successMessage}</div> // Hiển thị thông báo
      )}
      <div className="bookdisplay-left">
        <div className="bookdisplay-img-list">
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
        <div className="bookdisplay-price">
          <div className="bookdisplay-right-prices">{new_price} VND</div>
          {book.discount !== 0 && (
            <>
              <div className="bookdisplay-price-old">{book.price} đ</div>
              <div className="bookdisplay-percentDis">- {discountPercent}</div>
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
