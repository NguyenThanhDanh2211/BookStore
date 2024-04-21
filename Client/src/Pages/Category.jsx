import React, { useEffect, useState } from 'react';
import './CSS/Category.css';
import Item from '../Components/Item/Item';

const Category = (props) => {
  const [all_books, setAllBooks] = useState([]);
  const [sortType, setSortType] = useState('default');

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

  useEffect(() => {
    const sortArray = type => {
      const types = {
        price_asc: 'price',
        price_desc: 'price',
        name_asc: 'name',
        name_desc: 'name',
      };
      const sortProperty = types[type];
      const sorted = [...all_books].sort((a, b) => {
        if (type.endsWith('_asc')) {
          if (sortProperty === 'price') {
            return a[sortProperty] - b[sortProperty];
          } else {
            return a[sortProperty].localeCompare(b[sortProperty]);
          }
        } else if (type.endsWith('_desc')) {
          if (sortProperty === 'price') {
            return b[sortProperty] - a[sortProperty];
          } else {
            return b[sortProperty].localeCompare(a[sortProperty]);
          }
        }
      });
      setAllBooks(sorted);
    };

    sortArray(sortType);
  }, [sortType]);


  return (
    <div className="category-book">
      <img className="category-banner" src={props.banner} alt="" />

      <select onChange={(e) => setSortType(e.target.value)}>
        <option value="default">Default</option>
        <option value="price_asc">Price (Low to High)</option>
        <option value="price_desc">Price (High to Low)</option>
        <option value="name_asc">Name (A-Z)</option>
        <option value="name_desc">Name (Z-A)</option>
      </select>

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
