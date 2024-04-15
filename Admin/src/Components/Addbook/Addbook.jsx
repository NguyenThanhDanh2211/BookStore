import { useState } from 'react';
import './Addbook.css';
import upload_are from '../../assets/upload_area.svg';
const Addbook = () => {
  const [image, setImage] = useState(false);
  const [bookdetails, setbookdetails] = useState({
    id: '',
    name: '',
    author: '',
    publisher: '',
    price: '',
    description: '',
    image: '',
    category: 'Sách Việt Nam',
    discount: '',
  });
  const imageHandler = (e) => {
    setImage(e.target.files[0]);
  };
  const changeHandler = (e) => {
    setbookdetails({
      ...bookdetails,
      [e.target.name]: e.target.value,
    });
  };
  const Add_Book = async () => {
    console.log(bookdetails);
    let responseData;
    let book = bookdetails;

    let formData = new FormData();
    formData.append('book', image);
    await fetch('http://localhost:3000/admin/upload', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
      },
      body: formData,
    })
      .then((resp) => resp.json())
      .then((data) => {
        responseData = data;
      });
    if (responseData.success) {
      book.image = responseData.image_url;
      console.log(book);
      await fetch('http://localhost:3000/admin/addbook', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(book),
      })
        .then((resp) => resp.json())
        .then((data) => {
          data.success
            ? alert('Book added successfully')
            : alert('failed to add');
        });
    }
  };
  return (
    <div className="addbook">
      <div className="addbook-name">
        <div className="addbook-item">
          <p>ID</p>
          <input
            value={bookdetails.id}
            onChange={changeHandler}
            type="text"
            name="id"
            placeholder="Nhập Id..."
          />
        </div>
        <div className="addbook-item">
          <p>Tiêu đề sách</p>
          <input
            value={bookdetails.name}
            onChange={changeHandler}
            type="text"
            name="name"
            placeholder="Nhập tiêu đề..."
          />
        </div>
      </div>
      <div className="addbook-pae">
        <div className="addbook-item">
          <p>Tác giả</p>
          <input
            value={bookdetails.author}
            onChange={changeHandler}
            type="text"
            name="author"
            placeholder="Nhập tác giả..."
          />
        </div>
        <div className="addbook-item">
          <p>Nhà xuất bản</p>
          <input
            value={bookdetails.publisher}
            onChange={changeHandler}
            type="text"
            name="publisher"
            placeholder="Nhập nhà xuất bản..."
          />
        </div>
      </div>
      <div className="addbook-item" style={{ marginTop: '20px' }}>
        <label htmlFor="descripts">Mô tả chi tiết</label>
        <textarea
          style={{ marginTop: '20px' }}
          id="descripts"
          value={bookdetails.description}
          onChange={changeHandler}
          name="description"
          placeholder=""
        />
      </div>
      <div className="addbook-pa">
        <div className="addbook-price">
          <div className="addbook-item">
            <p>Giá</p>
            <input
              value={bookdetails.price}
              onChange={changeHandler}
              type="text"
              name="price"
              placeholder="Nhập giá..."
            />
          </div>
        </div>
        <div className="addbook-item">
          <p>Giảm giá (%)</p>
          <input
            value={bookdetails.discount}
            onChange={changeHandler}
            type="text"
            name="discount"
            placeholder="Nhập % giảm giá..."
          />
        </div>
        <div className="addbook-item">
          <p>Loại</p>
          <select
            value={bookdetails.category}
            onChange={changeHandler}
            name="category"
            className="addbook-category"
          >
            <option value="Sách Việt Nam">Sách Việt Nam</option>
            <option value="Sách Nước Ngoài">Sách Nước Ngoài</option>
          </select>
        </div>
      </div>
      <div className="addbook-item">
        <label htmlFor="file-input">
          <img
            src={image ? URL.createObjectURL(image) : upload_are}
            className="addbook-img"
            alt=""
          />
        </label>
        <input
          onChange={imageHandler}
          type="file"
          id="file-input"
          name="image"
          hidden
        />
      </div>
      <button
        onClick={() => {
          Add_Book();
        }}
        className="addbook-btn"
      >
        Thêm
      </button>
    </div>
  );
};

export default Addbook;
