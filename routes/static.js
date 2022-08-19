const _dirname  = process.cwd()
const Router    = require('@koa/router');
const fs        = require('fs');  

const router    = new Router({

});

/* GET users listing. */

router
    .get("/", async (ctx, next) => {
        console.log('haha')
        // const src = `${_dirname}/public/client/noackstone/dist/spa/index.html`;
        // console.log(src, fs.existsSync(src))
        // if (await fs.existsSync(src)) {
        //     const staticFile = await fs.readFileSync(src, {'encoding': 'utf8'});
        //     ctx.body = staticFile;
        // } else
        //     ctx.body = 'File not found'
    })

module.exports = router;
