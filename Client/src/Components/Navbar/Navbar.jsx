// import React, { useState, useContext, useRef } from 'react'
// import './Navbar.css'
// import logo from '../Assets/logo.jpg'
// import cart from '../Assets/cart.jpg'
// import { Link } from 'react-router-dom'
// import { Context } from '../../Context/Context'
// import nav_dropdown from '../Assets/dropdown.png'

// const Navbar = () => {
//   const [menu, setMenu] = useState("home");
//   const { getTotalCartItems } = useContext(Context)
//   const menuRef = useRef();
//   const dropdown_toggle = (e) => {
//     menuRef.current.classList.toggle('nav-menu-visible')
//     e.target.classList.toggle('open');
//   }
//   return (
//     <div className='navbar'>
//       <Link style={{ textDecoration: 'none' }} to='/'>
//             <div className="nav-logo">
//               <img onClick={() => { setMenu("home") }} src={logo} alt="" />
//             </div>
//           </Link>{menu === "home"}
//       <img className='nav-dropdown' onClick={dropdown_toggle} src={nav_dropdown}alt=''/>
//       <ul ref={menuRef} className='nav-menu'>
//         {/* <li>
//           <input type="text" placeholder="Nhập sách cần tìm...." />
//         </li> */}
//         <li className="nav" onClick={() => { setMenu("in") }}>
//           <Link style={{ textDecoration: 'none' }} to='/in'><span>Sách Việt Nam</span></Link>{menu === "in"}
//         </li>
//         <li className="nav" onClick={() => { setMenu("on") }}>
//           <Link style={{ textDecoration: 'none' }} to='/on'><span>Sách Nước Ngoài</span></Link>{menu === "on"}
//         </li>
//       </ul>
//       <div className='nav-cart'>
//         <Link to='/login'><button>Đăng Nhập</button></Link>
//         <Link to='cart'><img src={cart} alt='' /></Link>
//         <div className='nav-cart-count'>{getTotalCartItems()}</div>
//       </div>
//     </div>

//   )
// }

// export default Navbar

import React, { useState, useContext, useRef } from 'react';
import './Navbar.css';
import logo from '../Assets/logo.jpg';
import cart from '../Assets/cart.jpg';
import { Link } from 'react-router-dom';
import { Context } from '../../Context/Context';
import nav_dropdown from '../Assets/dropdown.png';

const Navbar = () => {
  const [menu, setMenu] = useState('home');
  const [searchQuery, setSearchQuery] = useState('');
  const { getTotalCartItems } = useContext(Context);
  const menuRef = useRef();

  const dropdown_toggle = (e) => {
    menuRef.current.classList.toggle('nav-menu-visible');
    e.target.classList.toggle('open');
  };

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
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
      <div className="nav-search">
        <input
          type="text"
          placeholder="Tìm kiếm..."
          value={searchQuery}
          onChange={handleSearch}
        />
        {/* Add logic to handle search */}
        <Link to={`/search?q=${encodeURIComponent(searchQuery)}`}>
          <button>Tìm Kiếm</button>
        </Link>
      </div>
      <div className="nav-cart">
        <Link to="/user/login">
          <button>Đăng Nhập</button>
        </Link>
        <Link to="cart">
          <img src={cart} alt="" />
        </Link>
        <div className="nav-cart-count">{getTotalCartItems()}</div>
      </div>
    </div>
  );
};

export default Navbar;
