import React, { useState, useEffect } from 'react';
import './NewBooks.css';
import Item from '../Item/Item.jsx';

const NewBooks = () => {
  const [newBooks, setNewBooks] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:3000/book/getall');
        if (!response.ok) {
          throw new Error('Failed to fetch new books');
        }
        const data = await response.json();
        setNewBooks(data.slice(4, 12)); // Lấy từ cuốn thứ 5 đến cuốn thứ 12
      } catch (error) {
        console.error('Error fetching new books:', error.message);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="new-book">
      <h1>SÁCH MỚI RA MẮT</h1>
      <div className="books">
        {newBooks.map((book, index) => (
          <Item
            key={index}
            id={book.id}
            name={book.name}
            image={book.image}
            price={book.price}
            discount={book.discount}
          />
        ))}
      </div>
    </div>
  );
};

export default NewBooks;
