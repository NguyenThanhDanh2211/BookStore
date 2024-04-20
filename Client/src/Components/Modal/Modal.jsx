import React from 'react';
import './Modal.css'; // Đảm bảo bạn đã tạo một file CSS cho Modal

const Modal = ({ closeModal, qrCode }) => {
  return (
    <div className='modal-background'>
      <div className='modal-container'>
        <button onClick={closeModal} className='modal-close-button'>X</button>
        {qrCode ? (
          <div className='qr-code-container'>
            <img src={`data:image/png;base64,${qrCode}`} alt="QR Code" />
            <p>Quét mã QR để thanh toán</p>
          </div>
        ) : (
          <p>Đang tạo mã QR...</p>
        )}
      </div>
    </div>
  );
};

export default Modal;
