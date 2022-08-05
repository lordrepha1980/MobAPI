const Koa               = require("koa");
const Router            = require('@koa/router');

const path              = require("path");
const cookieParser      = require("cookie-parser");
const logger            = require("morgan");

const data              = require("./routes/data");
const custom            = require("./routes/custom");

const app               = new Koa();
const router            = new Router();

app.use( data.routes() )
app.use( custom.routes() )

/* GET users listing. */
router.get("/", (ctx, next) => {
    console.log('get data')
  ctx.body = "Root API";
});

app
  .use(router.routes())
  .use(router.allowedMethods())

module.exports = app;
