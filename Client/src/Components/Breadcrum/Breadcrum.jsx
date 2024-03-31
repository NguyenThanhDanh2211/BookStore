import React from 'react';
import './Breadcrum.css';
import arrow from '../Assets/arrow.png';

const Breadcrum = (props) => {
  const { book } = props;
  return (
    <div className="breadcrum">
      Home <img className="img" src={arrow} alt="mui ten" /> BOOK{' '}
      <img className="img" src={arrow} alt="" /> {book.category}{' '}
      <img className="img" src={arrow} alt="" />
      {book.name}
    </div>
  );
};

export default Breadcrum;
