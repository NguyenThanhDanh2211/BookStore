import React from 'react';
import './Item.css';
import { Link } from 'react-router-dom';

const Item = (props) => {
  const new_price = props.discount
    ? (props.price * (1 - props.discount / 100)).toLocaleString('en-US')
    : props.price.toLocaleString('en-US');

  const discountPercent =
    props.discount && props.discount > 0 ? props.discount + '%' : '';

  return (
    <div className="item">
      <Link to={`/book/${props.id}`}>
        <img src={props.image} onClick={window.scrollTo(0, 0)} alt="" />
        <p>{props.name}</p>
        <div className="item-prices">
          <div className="item-price-new">{new_price} đ</div>
          {discountPercent && (
            <div className="percentDis"> - {discountPercent}</div>
          )}
        </div>
        {props.discount && props.discount > 0 && (
          <div className="item-price-old">{props.price} đ</div>
        )}
      </Link>
    </div>
  );
};

export default Item;
