import React, { useState, useEffect } from 'react';
import './RelateBook.css';
import axios from 'axios';
import { Link } from 'react-router-dom';

const RelateBook = ({ bookName }) => {
  const [recommendedBooks, setRecommendedBooks] = useState([]);
  const [posterUrls, setPosterUrls] = useState([]);
  const [bookIds, setBookIds] = useState([]);

  useEffect(() => {
    if (bookName) {
      // Kiểm tra nếu bookName tồn tại
      fetchRecommendation();
    }
  }, [bookName]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [recommendedBooks]);

  const fetchRecommendation = () => {
    axios
      .post('http://localhost:5000/recommend', {
        selected_book: bookName,
      })
      .then((response) => {
        setRecommendedBooks(response.data.recommended_books.slice(1, 6));
        setPosterUrls(response.data.poster_urls.slice(1, 6));
        setBookIds(response.data.bookIds.slice(1, 6));
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
            {/* Sử dụng Link để chuyển đến trang chi tiết sách */}
            <Link to={`/book/${bookIds[index]}`}>
              <img src={posterUrls[index]} alt="Poster" />
              <p>{book}</p>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RelateBook;
