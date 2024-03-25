import React from 'react'
import './RelateBook.css'
import data_books from '../Assets/data'
import Item from '../Item/Item'
const RelateBook = () => {
  return (
    <div className='relatebook'>
        <h1>Sách có liên quan</h1>
        <div className='relatebook-item'>
            {data_books.map((item,i)=>{
                return <Item key={i} id={item.id} name={item.name} image={item.image} new_price={item.new_price} old_price={item.old_price} />
            })}
        </div>
    </div>
  )
}

export default RelateBook
