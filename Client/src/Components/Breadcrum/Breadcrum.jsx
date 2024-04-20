import React from 'react';
import { Link } from 'react-router-dom'; // Import thư viện Link từ react-router-dom
import './Breadcrum.css';
import arrow from '../Assets/arrow.png';

const Breadcrum = (props) => {
  const { book } = props;
  return (
    <div className="breadcrum">
      <Link to="/">Home</Link> {/* Thêm Link cho Home */}
      <img className="img-muiten" src={arrow} alt="mui ten" />
      {book.category === 'in' ? (
        <Link to="/in">Sách Việt Nam</Link>
      ) : (
        <Link to="/on">Sách nước ngoài</Link>
      )}
      <img className="img-muiten" src={arrow} alt="" />
      <span>{book.name}</span>{' '}
      {/* Đổi thành span để hiển thị text không được link */}
    </div>
  );
};

export default Breadcrum;
