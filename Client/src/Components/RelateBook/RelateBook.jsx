// import React from 'react';
// import './RelateBook.css';
// import data_books from '../Assets/data';
// import Item from '../Item/Item';
// const RelateBook = () => {
//   return (
//     <div className="relatebook">
//       <h1>Có Thể Bạn Cũng Thích</h1>
//       <div className="relatebook-item">
//         {data_books.map((item, i) => {
//           return (
//             <Item
//               key={i}
//               id={item.id}
//               name={item.name}
//               image={item.image}
//               new_price={item.new_price}
//               old_price={item.old_price}
//             />
//           );
//         })}
//       </div>
//     </div>
//   );
// };

// export default RelateBook;

import React, { useState, useEffect } from 'react';
import './RelateBook.css';
import axios from 'axios';

const RelateBook = () => {
  const [recommendedBooks, setRecommendedBooks] = useState([]);

  useEffect(() => {
    fetchRecommendation();
  }, []);

  const fetchRecommendation = () => {
    axios
      .post('http://localhost:3000/flask-api/recommend', {
        selected_book: 'Cây Cam Ngọt Của Tôi',
      })
      .then((response) => {
        console.log('Recommended books:', response.data.recommended_books);
        console.log('Poster URLs:', response.data.poster_urls);
        setRecommendedBooks(response.data.recommended_books.slice(0, 6)); // Lấy 6 quyển sách đầu tiên
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
            <p>{book}</p>
            <img src={book.poster_url} alt="Poster" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default RelateBook;
