import React from 'react'
import './Popular.css'
import data_home from '../Assets/data'
import Item from '../Item/Item'
const Popular = () => {
  return (
    <div className='popular'>
      <h1>SÁCH PHỔ BIẾN NHẤT</h1>
      <div className='popular-item'>
        {data_home.map((item,i) =>{
          return <Item key={i} id={item.id} name={item.name} image={item.image} new_price={item.new_price} old_price={item.old_price} />
        })}
      </div>
    </div>
  )
}

export default Popular
