import React, { useState, useEffect } from 'react'
import './Listbook.css'
import cross_icon from '../../assets/cross_icon.png'
const Listbook = () => {
  const [allbooks, setAllBooks] = useState([]);

  const fetchInfo = async () => {
    await fetch('http://localhost:3000/admin/listbook')
      .then((res) => res.json())
      .then((data) => { setAllBooks(data) })
  }
  useEffect(() => {
    fetchInfo()
  }, [])
  const removebook = async (id) =>{
    await fetch('http://localhost:3000/admin/removebook', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({id:id})
    })
    await fetchInfo(); 
  }


  return (
    <div className='listbook'>
      <h1>Tất Cả Sách</h1>
      <div className='listbook-main'>
        <p>ID</p>
        <p>Sách</p>
        <p>Tên Sách</p>
        <p>Tác Giả</p>
        <p>Nhà Xuất Bản</p>
        <p>Loại Sách</p>
        <p>Giá</p>
        <p>Xóa</p>
      </div>
      <div className='listbook-allbook'>
        <hr />
        {allbooks.map((book, index) => {
          return <>
            <div key={index} className='listbook-main listbook-allbook-item'>
              <p>{book.id}</p>
              <img src={book.image} alt='' className='listbook-allbook-img' />
              <p>{book.name}</p>
              <p>{book.author}</p>
              <p>{book.publisher}</p>
              <p>{book.category}</p>
              <p>{book.price}</p>
              <img onClick={()=>{removebook(book.id)}} className='listbook-allbook-cross' src={cross_icon} alt='' />
            </div>
            <hr />
          </>
        })}
      </div>
    </div>
  )
}

export default Listbook
