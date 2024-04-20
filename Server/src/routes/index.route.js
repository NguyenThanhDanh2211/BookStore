const userRouter = require('./user.route');
const adminRouter = require('./admin.route');
const cartRouter = require('./cart.route');
const bookRouter = require('./book.route');
const paymentRouter = require('./payment.route');
const cors = require('cors');
function route(app) {
  app.use('/user', userRouter);
  app.use('/admin', adminRouter);
  app.use('/book', bookRouter);
  app.use('/cart',cartRouter);
  app.use('/payment',paymentRouter);
}
module.exports = route;
