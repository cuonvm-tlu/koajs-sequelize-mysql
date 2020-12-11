// index.js
// Include the entry file of koa
const Koa = require('./node_modules/koa/lib/application.js');
const app = new Koa();
const debug = require('debug')('koa');
app.use(async (ctx, next) => {
  console.log(1);
  await next();
  console.log(6);
  const rt = ctx.response.get('X-Response-Time');
  console.log(`${ctx.method} ${ctx.url} - ${rt}`);
});
// time logger here
app.use(async (ctx, next) => {
  console.log(2);
  const start = Date.now();
  await next();
  console.log(5);
  const ms = Date.now() - start;
  ctx.set('X-Response-Time', `${ms}ms`);
});
app.use(async (ctx, next) => {
  console.log(3);
  ctx.body = 'Hello World';
  await next();
  console.log(4);
});


app.listen(3000);