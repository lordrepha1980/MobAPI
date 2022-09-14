const _dirname  = process.cwd()
const Router    = require('@koa/router');

const router    = new Router({
    prefix: '/custom'
});

let io;

router.init  = function( socket ) {
    io    = socket;
};

router
    .post("/:class/:action", async (ctx, next) => {
        
        const Custom        = require(`${_dirname}/server/database/customApi/${ctx.params.class}.js`);
        const custom        = new Custom();
        let result          = {data: null};

        if ( custom[ctx.params.action] )
            result.data = await custom[ctx.params.action]( { body: ctx.request.body, ctx, io } )
        else {
            console.error( 'No action found. Called action: ', ctx.params.action )

            ctx.status  = result.error ? 400 : 200;
            ctx.body    = result;
        }
    })

router
    .get("/:class/:action", async (ctx, next) => {
        
        const Custom        = require(`${_dirname}/server/database/customApi/get${ctx.params.class}.js`);
        const custom        = new Custom();
        let result          = {data: null};

        if ( custom[ctx.params.action] )
            result.data = await custom[ctx.params.action]( { query: ctx.request.query, ctx, io } )
        else {
            console.error( 'No action found. Called action: ', ctx.params.action )

            ctx.status  = result.error ? 400 : 200;
            ctx.body    = result;
        }
    })

module.exports = router;
