const Koa = require('koa');
const app = new Koa();
const fileUploader = require('../../index.js');
const path = require('path');
const Router = require('koa-router');
const router = new Router();

app.host = process.env.IP || 'localhost';
app.port = process.env.PORT || 8000;

app.use(fileUploader({
  cors: true,
  // allowedSize: 10,
  destPath: path.join(__dirname, './static'),
  uploadParam: 'img',
  apiPath: '/api/upload',
  returnPrefix: '/assets/',
  saveAsMd5: true
}));

app.use(router.routes());
app.use(router.allowedMethods());

const server = app.listen(app.port, app.host, () => {
  console.log('Koa server listening on %s:%d', server.address().address, server.address().port)
});