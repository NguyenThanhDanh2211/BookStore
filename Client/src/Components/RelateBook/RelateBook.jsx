import React, { useState, useEffect } from 'react';
import './RelateBook.css';
import axios from 'axios';

const RelateBook = ({ bookName }) => {
  // Nhận tên sách thông qua props
  const [recommendedBooks, setRecommendedBooks] = useState([]);
  const [posterUrls, setPosterUrls] = useState([]);

  useEffect(() => {
    if (bookName) {
      // Kiểm tra nếu bookName tồn tại
      fetchRecommendation();
    }
  }, [bookName]);

  const fetchRecommendation = () => {
    axios
      .post('http://localhost:5000/recommend', {
        selected_book: bookName, // Sử dụng tên sách để lấy sách liên quan
      })
      .then((response) => {
        setRecommendedBooks(response.data.recommended_books.slice(1, 6));
        setPosterUrls(response.data.poster_urls.slice(1, 6));
      })
      .catch((error) => {
        console.error('Error fetching recommendation:', error);
      });
  };

  return (
    <div className="relatebook">
      <h1>Có Thể Bạn Cũng Thích</h1>
      <div className="relatebook-item">
        {recommendedBooks.map((book, index) => (
          <div key={index}>
            <img src={posterUrls[index]} alt="Poster" />
            <p>{book}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RelateBook;
