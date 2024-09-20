// const { createProxyMiddleware } = require('http-proxy-middleware');

// module.exports = function(app) {
//   app.use(
//     '/api', // /api로 시작하는 요청을 프록시
//     createProxyMiddleware({
//       target: 'http://internal-back-alb-1882035709.ap-northeast-2.elb.amazonaws.com', // 백엔드 서버 주소
//       changeOrigin: true,
//     })
//   );
// };