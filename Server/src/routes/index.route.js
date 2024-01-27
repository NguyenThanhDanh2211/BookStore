const homeRouter = require('./home.route');
const userRouter = require('./user.route');
const cartRouter = require('./cart.route');

function route(app) {
  app.use('/', cartRouter);
  app.use('/user', userRouter);
  app.use('/', homeRouter);
}
module.exports = route;
