const Koa       = require("koa");
const Router    = require('@koa/router');

const router    = new Router({
    prefix: '/data'
});

/* GET users listing. */
router
    .get("/:table", (ctx, next) => {
        ctx.body = "Data API"
    })

module.exports = router;
