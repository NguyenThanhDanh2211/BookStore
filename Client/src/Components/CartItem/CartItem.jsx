    import React, { useState, useEffect } from 'react'
    import './CartItem.css'
    import removeicon from '../../Components/Assets/remove.png'
    import axios from 'axios';
    import Modal from '../Modal/Modal';
    const CartItem = () => {
        const savedUser = JSON.parse(localStorage.getItem('user'));
        const [cartItems, setCartItems] = useState([]);
        const [isModalOpen, setIsModalOpen] = useState(false);
        const [total, setTotal] = useState(0);
        const [qrCode, setQrCode] = useState('');
        useEffect(() => {
            fetchInfo();
        }, []);

        const fetchInfo = async () => {
            try {
                const response = await axios.post('http://localhost:3000/cart/getall',{email: savedUser.email});
                setCartItems(response.data);
                calculateTotal(response.data);
            } catch (error) {
                console.error('There was an error!', error);
            }
        }

        const calculateTotal = (items) => {
            let total = 0;
            items.forEach(item => {
                total += item.price * item.quantity;
            });
            setTotal(total);
        }

        const handlePayment = async () => {
            try {
                // Gọi API để tạo đơn hàng và nhận QR code
                const response = await axios.post('http://localhost:3000/payment/zalopay/create-order',{email: savedUser.email});
                setQrCode(response.data.qrCode); // Lưu QR code vào state
                setIsModalOpen(true); // Mở cửa sổ modal
            } catch (error) {
                console.error('There was an error!', error);
            }
        };
        const closeModal = () => {
            setIsModalOpen(false);
          };
        const handleQuantityChange = async (id, newQuantity) => {
            try {
                const response = await axios.post('http://localhost:3000/cart/update', { id, quantity: newQuantity });
                if (response.status === 200) {
                    fetchInfo();
                }
            } catch (error) {
                console.error('There was an error!', error);
            }
        }

        const handleRemoveItem = async (id) => {
            try {
                const response = await axios.post('http://localhost:3000/cart/remove', { id });
                if (response.status === 200) {
                    fetchInfo();
                }
            } catch (error) {
                console.error('There was an error!', error);
            }
        }

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
                {cartItems.map((e) => {
                    if (e.quantity > 0) {
                        return <div>
                            <div className='cartitems-fortmat cartitems-format-main'>
                                <img src={e.image} alt='' className='cartion-book-icon' />
                                <p>{e.name}</p>
                                <p>{e.price}</p>
                                <input type='number' value={e.quantity} onChange={(event) => handleQuantityChange(e.id, event.target.value)} className='cartitems-quantity' />
                                <p>{e.price * e.quantity}</p>
                                <img className='cartion-remove-icon' src={removeicon} onClick={() => handleRemoveItem(e.id)} alt='' />
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
                                <p>{total}</p>
                            </div>
                            <hr />
                            <div className='cartitems-total-item'>
                                <p>Phí Giao Hàng</p>
                                <p>Miễn Phí</p>
                            </div>
                            <hr />
                            <div className='cartitems-total-item'>
                                <h3>Thành Tiền</h3>
                                <h3>{total}</h3>
                            </div>
                            <button onClick={handlePayment}>Thanh Toán</button>
                            {isModalOpen && <Modal closeModal={closeModal} qrCode={qrCode} />}
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
