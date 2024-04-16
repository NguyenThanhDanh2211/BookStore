import React, { useState, useEffect } from 'react';
import './Description.css';

const Description = (props) => {
  const { book } = props;
  return (
    <div className="descriptionbox">
      <div className="descriptionbox-nav">
        <div className="descriptionbox-nav-box">Description</div>
        <div className="descriptionbox-nav-box fade">Reviews</div>
      </div>
      <div className="descriptionbox-description">
        <p>{book.description}</p>
      </div>
    </div>
  );
};

export default Description;
