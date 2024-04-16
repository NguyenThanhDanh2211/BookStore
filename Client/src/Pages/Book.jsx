import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios'; // Import axios if not already done

import Breadcrum from '../Components/Breadcrum/Breadcrum';
import BookDisplay from '../Components/BookDisplay/BookDisplay';
import Description from '../Components/Description/Description';
import RelateBook from '../Components/RelateBook/RelateBook';

import './CSS/Home.css';

const Book = () => {
  const { bookId } = useParams();
  const [book, setBook] = useState([]);

  useEffect(() => {
    const fetchBookInfo = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/book/${bookId}`);
        setBook(response.data);         // Update book state with fetched data
        console.log('Done');
      } catch (error) {
        console.error('Error fetching book data:', error);
      }
    };

    fetchBookInfo(); // Fetch book data when component mounts
  }, [bookId]); // Re-fetch when bookId changes
  return (
    <div className='background'>
      <Breadcrum book={book} />
      <BookDisplay book={book} />
      <Description book={book}/>
      <RelateBook/>
    </div>
  );
};

export default Book;
