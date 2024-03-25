import React from 'react'
import './Breadcrum.css'
import arrow from '../Assets/arrow.png'
const Breadcrum = (props) => {
    const {book} = props
  return (
    <div className='breadcrum'>
        Home <img src={arrow} alt=''/> BOOK <img src={arrow} alt=''/> {book.category} <img src={arrow} alt=''/>{book.name}
    </div>
  )
}

export default Breadcrum
