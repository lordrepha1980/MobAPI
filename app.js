const Koa               = require("koa");
const Router            = require('@koa/router');

const path              = require("path");
const cookieParser      = require("cookie-parser");
const logger            = require("morgan");

const dataRouter        = require("./routes/data");
const customRouter      = require("./routes/custom");

const app               = new Koa();
const router            = new Router();

/* GET users listing. */
router.get("/", (ctx, next) => {
    console.log('get data')
  ctx.body = "Root API";
});

router
    .get("/data", (ctx, next) => {
        ctx.body = "Data API"
    })

router
    .get("/custom", (ctx, next) => {
        ctx.body  = "Custom API";
    });

app
  .use(router.routes())
  .use(router.allowedMethods())

module.exports = app;
