const Koa       = require("koa");
const Router    = require('@koa/router');

const router    = new Router({
    prefix: '/custom'
});

/* GET users listing. */
router
    .get("/:action", (ctx, next) => {
        ctx.body = "Custom API"
    })

module.exports = router;
