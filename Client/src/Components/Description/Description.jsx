import React, { useState, useEffect } from 'react';
import './Description.css';

const Description = () => {
  const [description, setDescription] = useState('');

  useEffect(() => {
    const fetchDescription = async () => {
      try {
        const response = await fetch(
          'http://localhost:3000/book/description/:name'
        );
        const data = await response.json();
        setDescription(data.description);
      } catch (error) {
        console.error('Error fetching book description:', error);
      }
    };

    fetchDescription();
  }, []);

  return (
    <div className="descriptionbox">
      <div className="descriptionbox-nav">
        <div className="descriptionbox-nav-box">Description</div>
        <div className="descriptionbox-nav-box fade">Reviews</div>
      </div>
      <div className="descriptionbox-description">
        <p>{description}</p>
      </div>
    </div>
  );
};

export default Description;
