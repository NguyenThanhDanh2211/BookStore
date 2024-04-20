import React, { useState, useEffect } from 'react';
import './Popular.css';
import Item from '../Item/Item';

const Popular = () => {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await fetch('http://localhost:3000/book/getall');
        if (!response.ok) {
          throw new Error('Failed to fetch books');
        }
        const data = await response.json();
        setBooks(data);
      } catch (error) {
        console.error('Error fetching books:', error.message);
      }
    };

    fetchBooks();
  }, []);

  return (
    <div className="popular">
      <h1>SÁCH PHỔ BIẾN NHẤT</h1>
      <div className="popular-item">
        {books.slice(0, 4).map((book, index) => (
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

export default Popular;
