const homeRouter = require('./home.route');
const userRouter = require('./user.route');

function route(app) {
  app.use('/user', userRouter);
  app.use('/', homeRouter);
}
module.exports = route;
