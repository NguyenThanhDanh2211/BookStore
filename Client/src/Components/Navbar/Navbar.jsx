// import React, { useState, useContext, useRef, useEffect } from 'react';
// import './Navbar.css';
// import logo from '../Assets/logo.jpg';
// import cart from '../Assets/cart.jpg';
// import { Link } from 'react-router-dom';
// import { Context } from '../../Context/Context';
// import nav_dropdown from '../Assets/dropdown.png';
// import Search from '../Search/Search'; // Import component Search

// const Navbar = () => {
//   const [menu, setMenu] = useState('home');
//   const { getTotalCartItems } = useContext(Context);
//   const menuRef = useRef();
//   const [searchQuery, setSearchQuery] = useState(''); // State để lưu trữ query tìm kiếm
//   const [showSearch, setShowSearch] = useState(false); // State để theo dõi trạng thái hiển thị của component Search

//   const dropdown_toggle = (e) => {
//     menuRef.current.classList.toggle('nav-menu-visible');
//     e.target.classList.toggle('open');
//   };

//   const handleKeyDown = (e) => {
//     setSearchQuery(e.target.value); // Cập nhật giá trị của ô input
//   };

//   // useEffect(() => {
//   //   const handleClickOutside = (event) => {
//   //     // Kiểm tra xem người dùng click có phải là ô input hoặc component Search không
//   //     const isInputOrSearch =
//   //       menuRef.current.contains(event.target) ||
//   //       event.target.className === 'search';
//   //     // Nếu không phải là ô input hoặc component Search, ẩn component Search
//   //     setShowSearch(isInputOrSearch);
//   //   };

//   //   // Đăng ký sự kiện click cho toàn bộ trang
//   //   document.addEventListener('click', handleClickOutside);

//   //   // Hủy đăng ký sự kiện khi component unmount
//   //   return () => {
//   //     document.removeEventListener('click', handleClickOutside);
//   //   };
//   // }, []);

//   useEffect(() => {
//     const handleHover = (event) => {
//       // Kiểm tra xem người dùng hover có phải là ô input hoặc component Search không
//       const isInputOrSearch =
//         menuRef.current.contains(event.target) ||
//         event.target.className === 'search';
//       // Nếu không phải là ô input hoặc component Search, ẩn component Search
//       setShowSearch(isInputOrSearch);
//     };

//     // Đăng ký sự kiện hover cho toàn bộ trang
//     document.addEventListener('mouseover', handleHover);

//     // Hủy đăng ký sự kiện khi component unmount
//     return () => {
//       document.removeEventListener('mouseover', handleHover);
//     };
//   }, []);

//   return (
//     <div className="navbar">
//       <Link style={{ textDecoration: 'none' }} to="/">
//         <div className="nav-logo">
//           <img
//             onClick={() => {
//               setMenu('home');
//             }}
//             src={logo}
//             alt=""
//           />
//         </div>
//       </Link>
//       {menu === 'home'}
//       <img
//         className="nav-dropdown"
//         onClick={dropdown_toggle}
//         src={nav_dropdown}
//         alt=""
//       />
//       <ul ref={menuRef} className="nav-menu">
//         <li>
//           <input
//             className="search"
//             type="text"
//             placeholder="Nhập tên sách cần tìm...."
//             onKeyDown={handleKeyDown} // Xử lý sự kiện nhấn phím
//           />
//           {searchQuery && <Search searchQuery={searchQuery} />}{' '}
//           {/* Hiển thị component Search nếu có nội dung trong ô input */}
//         </li>
//         <li
//           className="nav"
//           onClick={() => {
//             setMenu('in');
//           }}
//         >
//           <Link style={{ textDecoration: 'none' }} to="/in">
//             <span>Sách Việt Nam</span>
//           </Link>
//           {menu === 'in'}
//         </li>
//         <li
//           className="nav"
//           onClick={() => {
//             setMenu('on');
//           }}
//         >
//           <Link style={{ textDecoration: 'none' }} to="/on">
//             <span>Sách Nước Ngoài</span>
//           </Link>
//           {menu === 'on'}
//         </li>
//       </ul>
//       <div className="nav-cart">
//         <Link to="/login">
//           <button>Đăng Nhập</button>
//         </Link>
//         <Link to="cart">
//           <img src={cart} alt="" />
//         </Link>
//         <div className="nav-cart-count">{getTotalCartItems()}</div>
//       </div>
//     </div>
//   );
// };

// export default Navbar;

import React, { useState, useContext, useRef, useEffect } from 'react';
import './Navbar.css';
import logo from '../Assets/logo.jpg';
import cart from '../Assets/cart.jpg';
import { Link } from 'react-router-dom';
import { Context } from '../../Context/Context';
import nav_dropdown from '../Assets/dropdown.png';
import Search from '../Search/Search'; // Import component Search

const Navbar = () => {
  const [menu, setMenu] = useState('home');
  const { getTotalCartItems } = useContext(Context);
  const menuRef = useRef();
  const [searchQuery, setSearchQuery] = useState(''); // State để lưu trữ query tìm kiếm
  const [showSearch, setShowSearch] = useState(false); // State để theo dõi trạng thái hiển thị của component Search

  const dropdown_toggle = (e) => {
    menuRef.current.classList.toggle('nav-menu-visible');
    e.target.classList.toggle('open');
  };

  const handleKeyDown = (e) => {
    setSearchQuery(e.target.value); // Cập nhật giá trị của ô input
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      // Kiểm tra xem người dùng click có phải là ô input hoặc component Search không
      const isInputOrSearch =
        menuRef.current.contains(event.target) ||
        event.target.className === 'search';
      // Nếu không phải là ô input hoặc component Search, ẩn component Search
      setShowSearch(isInputOrSearch);
    };

    // Đăng ký sự kiện click cho toàn bộ trang
    document.addEventListener('click', handleClickOutside);

    // Hủy đăng ký sự kiện khi component unmount
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  const handleHover = () => {
    setShowSearch(false); // Ẩn component Search khi di chuột ra khỏi ô input
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
        <li>
          <input
            className="search"
            type="text"
            placeholder="Nhập tên sách cần tìm...."
            onKeyDown={handleKeyDown} // Xử lý sự kiện nhấn phím
            onMouseLeave={handleHover} // Xử lý sự kiện di chuột ra khỏi ô input
          />
          {searchQuery && <Search searchQuery={searchQuery} />}{' '}
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
        <Link to="/login">
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
