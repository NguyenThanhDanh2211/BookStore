import React from 'react';
import './Breadcrum.css';
import arrow from '../Assets/arrow.png';

const Breadcrum = (props) => {
  const { book } = props;
  return (
    <div className="breadcrum">
      Home <img className="img" src={arrow} alt="mui ten" /> BOOK{' '}
      <img className="img" src={arrow} alt="" /> {props.category}{' '}
      <img className="img" src={arrow} alt="" />
      {props.name}
    </div>
  );
};

export default Breadcrum;
