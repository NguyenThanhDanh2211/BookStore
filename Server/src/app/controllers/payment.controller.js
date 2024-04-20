const express = require('express');
const axios = require('axios');
const crypto = require('crypto');
const app = express();

app.use(express.json()); // Để parse JSON body

class paymentController {
  async zalopayCreateOrder(req, res) {
    // Giả sử 'user' là đối tượng người dùng được lấy từ database hoặc session
    const email = req.body.email; // Hoặc req.session.user, tùy thuộc vào cách bạn quản lý session

    const appid = '2633756597048231453';
    const key1 = 'D7fpVm6O4zQDNwYLyu4F';
    const createOrderUrl = 'https://sb-openapi.zalopay.vn/v2/create'; // URL Sandbox

    // Tạo dữ liệu đơn hàng
    const orderInfo = {
      app_id: appid,
      app_user: 'email', // Sử dụng ID người dùng từ request
      app_trans_id: `${Date.now()}`, // Mã giao dịch, cần đảm bảo duy nhất
      app_time: Date.now(), // Thời gian gửi yêu cầu
      amount: 500, // Số tiền của đơn hàng
      item: JSON.stringify({}),
      description: 'Mô tả đơn hàng',
      embed_data: JSON.stringify({}),
      bank_code: 'zalopayapp'
    };

    // Tạo chuỗi MAC
    const hmac_input = `${orderInfo.app_id}|${orderInfo.app_trans_id}|${orderInfo.app_user}|${orderInfo.amount}|${orderInfo.app_time}|${orderInfo.embed_data}|${orderInfo.item}`;
    const mac = HMAC(HmacSHA256, key1, hmac_input)
    orderInfo.mac = mac;

    // Gọi ZaloPay API để tạo đơn hàng
    try {
      const zalopayResponse = await axios.post(createOrderUrl, null, { params: orderInfo });
      // Kiểm tra phản hồi và trả về mã QR cho client
        if (zalopayResponse.data && zalopayResponse.data.qr_code) {
            res.json({ qrCode: zalopayResponse.data.qr_code });
        } else {
            // Xử lý trường hợp không nhận được mã QR
            console.error('Không nhận được mã QR từ ZaloPay:', zalopayResponse.data);
            res.status(500).send('Không nhận được mã QR từ ZaloPay');
        }
        } catch (error) {
        // Xử lý lỗi chi tiết hơn
        if (error.response) {
            console.error('Lỗi khi gọi ZaloPay API:', error.response.data);
            res.status(500).send('Lỗi khi gọi ZaloPay API: ' + error.response.data.message);
        } else {
            console.error('Lỗi khi gọi ZaloPay API:', error.message);
            res.status(500).send('Lỗi khi gọi ZaloPay API: ' + error.message);
        }
        }
    }
}

module.exports = new paymentController();
