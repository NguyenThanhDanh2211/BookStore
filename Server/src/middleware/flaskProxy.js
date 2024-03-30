const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
  app.use(
    '/recommend',
    createProxyMiddleware({
      target: 'http://localhost:8501', // URL của Flask app
      changeOrigin: true,
      pathRewrite: {
        '^/recommend': '/recommend',
      },
    })
  );
};
