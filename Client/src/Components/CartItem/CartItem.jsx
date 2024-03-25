import React, { useContext } from 'react'
import './CartItem.css'
import { Context } from '../../Context/Context'
import removeicon from '../../Components/Assets/remove.png'
const CartItem = () => {
    const {getTotalCartAmount, all_books, cartItems, removeFromCart } = useContext(Context);
    return (
        <div className='cart'>
            <div className='cartitems'>
            <div className='cartitems-format-main'>
                <p>Book</p>
                <p></p>
                <p>Đơn Giá</p>
                <p>Số Lượng</p>
                <p>Thành Tiền</p>
                <p></p>
            </div>
            <hr />
            {all_books.map((e) => {
                if (cartItems[e.id] > 0) {
                    return <div>
                        <div className='cartitems-fortmat cartitems-format-main'>
                            <img src={e.image} alt='' className='cartion-book-icon' />
                            <p>{e.name}</p>
                            <p>{e.price}</p>
                            <button className='cartitems-quantity'>{cartItems[e.id]}</button>
                            <p>{e.price * cartItems[e.id]}</p>
                            <img className='cartion-remove-icon' src={removeicon} onClick={() => { removeFromCart(e.id) }} alt='' />
                        </div>
                        <hr />
                    </div>
                }
                return null;
            })}
            <div className='cartitems-down'>
                <div className='cartitems-total'>
                    <h1>Thanh Toán Giỏ Hàng</h1>
                    <div>
                        <div className='cartitems-total-item'>
                            <p>Tổng</p>
                            <p>{getTotalCartAmount()}</p>
                        </div>
                        <hr />
                        <div className='cartitems-total-item'>
                            <p>Phí Giao Hàng</p>
                            <p>Miễn Phí</p>
                        </div>
                        <hr />
                        <div className='cartitems-total-item'>
                            <h3>Thành Tiền</h3>
                            <h3>{getTotalCartAmount()}</h3>
                        </div>
                        <button>Thanh Toán</button>
                    </div>
                </div>
                <div className='cartitems-promocode'>
                    <p>Mã Ưu Đãi</p>
                    <div className='cartitems-codebox'>
                        <input type='text' placeholder='Nhập mã tại đây' />
                        <button>Nhận Ưu Đãi</button>
                    </div>
                </div>
            </div>
        </div>
        </div>
    )
}

export default CartItem
