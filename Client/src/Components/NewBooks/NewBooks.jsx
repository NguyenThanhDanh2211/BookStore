import React from 'react'
import './NewBooks.css'
import new_books from '../Assets/newbooks.js'
import Item from '../Item/Item.jsx'
const NewBook = () => {
  return (
    <div className='new-book'>
      <h1>SÁCH MỚI RA MẮT</h1>
      <div className='books'>
        {new_books.map((item,i)=>{
           return <Item key={i} id={item.id} name={item.name} image={item.image} new_price={item.new_price} old_price={item.old_price} />
        })}
      </div>
    </div>
  )
}

export default NewBook
