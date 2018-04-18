const Koa = require('koa');
const app = new Koa();
const fileUploader = require('../index.js');
const path = require('path');
const Router = require('koa-router');
const router = new Router();
const open = require("open");


app.host = process.env.IP || 'localhost';
app.port = process.env.PORT || 8000;

app.use(fileUploader({
  cors: true,
  allowedSize: 80,
  allowedExt: ['.png', '.jpg', '.gif'],
  destPath: path.join(__dirname, './static'),
  uploadParam: 'img',
  apiPath: '/api/upload',
  returnPrefix: '/assets/',
  saveAsMd5: true
}));



const views = require('koa-views');
 
// Must be used before any router is used

app.use(views(__dirname));

router.get('/', async (ctx, next) => {
    await ctx.render('demo.html');
});
app.use(router.routes());
app.use(router.allowedMethods());

const server = app.listen(app.port, app.host, () => {
    open('http://127.0.0.1:8000');
  console.log('Koa server listening on %s:%d', server.address().address, server.address().port);
});