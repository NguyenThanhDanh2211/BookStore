const adminRouter = require('./admin.route');
const userRouter = require('./user.route');
const cartRouter = require('./cart.route');
const bookRouter = require('./book.route');

function route(app) {
  app.use('/checkout-cart', cartRouter);
  app.use('/user', userRouter);
  app.use('/admin', adminRouter);
  app.use('/book', bookRouter);
}
module.exports = route;
