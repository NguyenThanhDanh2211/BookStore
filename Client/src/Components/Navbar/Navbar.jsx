import React, { useState, useEffect, useContext, useRef } from 'react';
import './Navbar.css';
import logo from '../Assets/logo.jpg';
import cart from '../Assets/cart.jpg';
import { Link } from 'react-router-dom';
import { Context } from '../../Context/Context';
import nav_dropdown from '../Assets/dropdown.png';
import Search from '../Search/Search'; // Import component Search
import axios from 'axios';

const Navbar = () => {
  const [menu, setMenu] = useState('home');
  const [searchQuery, setSearchQuery] = useState(''); // State để lưu trữ query tìm kiếm
  // const [showSearch, setShowSearch] = useState(false); // State để theo dõi trạng thái hiển thị của component Search
  const [totalCartItems, setTotalCartItems] = useState(0);
  const menuRef = useRef();
  const inputRef = useRef();

  const [user, setUser] = useState(null);
  useEffect(() => {
    //Lấy thông tin người dùng từ localStorage khi component được render
    const savedUser = JSON.parse(localStorage.getItem('user'));
    if (savedUser) {
      setUser(savedUser);

    // Call API to get total cart items
    axios.post('http://localhost:3000/cart/gettotalcartitems', { email: savedUser.email })
    .then(response => {
      setTotalCartItems(response.data.totalItems);
    })
    .catch(error => {
      console.error('There was an error!', error);
    });
  }
  }, []);

  const handleSearchQueryChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const clearSearchQuery = () => {
    setSearchQuery('');
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!inputRef.current.contains(event.target)) {
        // Nếu click không nằm trong inputRef (component search), set state searchQuery về rỗng để ẩn component search
        setSearchQuery('');
      }
    };

    document.addEventListener('click', handleClickOutside);

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  const dropdown_toggle = (e) => {
    menuRef.current.classList.toggle('nav-menu-visible');
    e.target.classList.toggle('open');
  };

  const logout = () => {
    localStorage.removeItem('user');
  };

  const handleKeyDown = (e) => {
    setSearchQuery(e.target.value); // Cập nhật giá trị của ô input
  };

  return (
    <div className="navbar">
      <Link style={{ textDecoration: 'none' }} to="/">
        <div className="nav-logo">
          <img
            onClick={() => {
              setMenu('home');
            }}
            src={logo}
            alt=""
          />
        </div>
      </Link>
      {menu === 'home'}
      <img
        className="nav-dropdown"
        onClick={dropdown_toggle}
        src={nav_dropdown}
        alt=""
      />
      <ul ref={menuRef} className="nav-menu">
        <li ref={inputRef}>
          <input
            className="search"
            type="text"
            placeholder="Nhập tên sách cần tìm...."
            onKeyDown={handleKeyDown}
            onChange={handleSearchQueryChange}
            value={searchQuery}
          />
          {searchQuery && (
            <Search
              searchQuery={searchQuery}
              clearSearchQuery={clearSearchQuery}
            />
          )}{' '}
          {/* Hiển thị component Search nếu có nội dung trong ô input */}
        </li>
        <li
          className="nav"
          onClick={() => {
            setMenu('in');
          }}
        >
          <Link style={{ textDecoration: 'none' }} to="/in">
            <span>Sách Việt Nam</span>
          </Link>
          {menu === 'in'}
        </li>
        <li
          className="nav"
          onClick={() => {
            setMenu('on');
          }}
        >
          <Link style={{ textDecoration: 'none' }} to="/on">
            <span>Sách Nước Ngoài</span>
          </Link>
          {menu === 'on'}
        </li>
      </ul>
      <div className="nav-cart">
        {user ? (
          <>
            <span>Xin chào: {user.name}</span>
            <Link to="/login">
              <button className="signout" onClick={logout}>
                Đăng xuất
              </button>
            </Link>
          </>
        ) : (
          <Link to="/login">
            <button>Đăng Nhập</button>
          </Link>
        )}
        <Link to="cart">
          <img src={cart} alt="" />
        </Link>
        <div className="nav-cart-count">{totalCartItems}</div>
      </div>
    </div>
  );
};

export default Navbar;
