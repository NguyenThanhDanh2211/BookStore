import React from 'react';
import './Description.css';

const Description = (props) => {
  const { book } = props;
  return (
    <div className="descriptionbox">
      <h3>Thông tin sản phẩm</h3>
      <div className="descriptionbox-id">
        Mã hàng: <b>{book.id}</b>
      </div>
      <div className="descriptionbox-author">
        Tác Giả: <b>{book.author}</b>
      </div>
      <div className="descriptionbox-nsx">
        Nhà Xuất Bản: <b>{book.publisher}</b>
      </div>
      <div className="descriptionbox-cate">
        Thể loại:{' '}
        <b>{book.category === 'in' ? 'Sách Việt Nam' : 'Sách nước ngoài'}</b>
      </div>
      <p>
        Giá sản phẩm trên SmartBook.com đã bao gồm thuế theo luật hiện hành. Bên
        cạnh đó, tuỳ vào loại sản phẩm, hình thức và địa chỉ giao hàng mà có thể
        phát sinh thêm chi phí khác như Phụ phí đóng gói, phí vận chuyển, phụ
        phí hàng cồng kềnh,...
      </p>
      <p style={{ color: 'red' }}>
        Chính sách khuyến mãi trên SmartBook.com không áp dụng cho Hệ thống Nhà
        sách SmartBook trên toàn quốc.
      </p>
      <hr></hr>
      <h3>{book.name}</h3>
      <div className="descriptionbox-description">
        <p>{book.description}</p>
      </div>
    </div>
  );
};

export default Description;
