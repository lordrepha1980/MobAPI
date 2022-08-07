const _dirname  = process.cwd()
const Router    = require('@koa/router');

const router    = new Router();

router
    .post("/auth", async (ctx, next) => {
        ctx.body = 'Auth OK'
    })

module.exports = router;