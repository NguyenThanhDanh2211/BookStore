import React, { useEffect, useState } from 'react';
import './CSS/Category.css';
import Item from '../Components/Item/Item';

const Category = (props) => {
  const [all_books, setAllBooks] = useState([]);
  // Hàm để lấy dữ liệu từ server
  const fetchInfo = async () => {
    await fetch('http://localhost:3000/book/getall')
      .then((res) => res.json())
      .then((data) => {
        setAllBooks(data);
      });
  };

  // Sử dụng useEffect để gọi hàm fetchBooks khi component được mount
  useEffect(() => {
    fetchInfo();
  }, []);

  return (
    <div className="category-book">
      <img className="category-banner" src={props.banner} alt="" />

      <div className="category-allbook">
        {all_books.map((item, i) => {
          if (props.category === item.category) {
            return (
              <Item
                key={i}
                id={item.id}
                name={item.name}
                image={item.image}
                price={item.price}
                discount={item.discount}
              />
            );
          } else {
            return null;
          }
        })}
      </div>
    </div>
  );
};

export default Category;
