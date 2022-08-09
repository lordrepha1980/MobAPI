const _dirname  = process.cwd()
const Router    = require('@koa/router');

const router    = new Router({
    prefix: '/custom'
});

/* GET users listing. */

router
    .all("/:class/:action", async (ctx, next) => {
        
        const Custom        = require(`${_dirname}/server/database/customApi/${ctx.params.class}.js`);
        const custom        = new Custom();
        let result          = {data: null};

        if ( custom[ctx.params.action] )
            result.data = await custom[ctx.params.action]( { query: ctx.params.query, ctx } )
        else {
            console.error( 'No action found. Called action: ', ctx.params.action )
            ctx.body = result
        }
    })

module.exports = router;
