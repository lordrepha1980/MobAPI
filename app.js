const Koa               = require("koa");
const Router            = require('@koa/router');
const koaBody           = require('koa-body');

const path              = require("path");
const cookieParser      = require("cookie-parser");
const logger            = require("morgan");

const data              = require("./routes/data");
const custom            = require("./routes/custom");

const app               = new Koa();
const router            = new Router();

app.use( koaBody() );
app.use( data.routes() );
app.use( custom.routes() );
//cooles Kommi
app
  .use(router.routes())
  .use(router.allowedMethods());

module.exports = app;
