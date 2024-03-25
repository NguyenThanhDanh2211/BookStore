import React, { useContext } from 'react'
import { Context } from '../Context/Context';
import { useParams } from 'react-router-dom'
import Breadcrum from '../Components/Breadcrum/Breadcrum';
import BookDisplay from '../Components/BookDisplay/BookDisplay';
import Description from '../Components/Description/Description';
import RelateBook from '../Components/RelateBook/RelateBook';
import './CSS/Home.css'
const Book = () => {
  const {all_books} = useContext(Context);
  const {bookId} = useParams();
  const book = all_books.find((e) => e.id === Number(bookId) );
  return (
    <div className='background'>
      <Breadcrum book={book}></Breadcrum>
      <BookDisplay book={book}></BookDisplay>
      <Description></Description>
      <RelateBook></RelateBook>
    </div>
  )
}

export default Book
