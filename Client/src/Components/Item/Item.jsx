import React from 'react'
import './Item.css'
import { Link } from 'react-router-dom'
const Item = (props) => {
  const new_price = props.discount ? props.price * (1 - props.discount / 100) : props.price;
  return (
    <div className='item'>
        <Link to={`/book/${props.id}`}><img onClick={window.scrollTo(0,0)} src={props.image}/></Link>
        <p>{props.name}</p>
        <div className='item-prices'>
            <div className='item-price-new'>
            {new_price}đ
            </div>
            {props.discount && (
              <div className='item-price-old'>
                  {props.price}đ
              </div>
            )}
        </div>
    </div>
  )
}

export default Item
