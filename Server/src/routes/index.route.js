const adminRouter = require('./admin.route');
const userRouter = require('./user.route');
const cartRouter = require('./cart.route');
const bookRouter = require('./book.route');

const express = require('express');
const flaskProxy = require('../middleware/flaskProxy');

function route(app) {
  app.use('/checkout-cart', cartRouter);
  app.use('/user', userRouter);
  app.use('/admin',adminRouter);
  app.use('/book',bookRouter);
  // Thêm một route mới để chuyển tiếp các yêu cầu liên quan đến API của Flask
  const flaskApp = express();
  flaskProxy(flaskApp); // Sử dụng middleware flaskProxy cho Flask app
  app.use('/flask-api', flaskApp);
}
module.exports = route;
