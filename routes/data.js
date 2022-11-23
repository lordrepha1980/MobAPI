const _dirname  = process.cwd()
const Router    = require('@koa/router');

const config    = require("../config");

const router    = new Router({
    prefix: '/data'
});

let io;

router.init  = function( socket ) {
    io    = socket;
};

router
    .get("/:table/:action", async (ctx, next) => {

        const Data      = require(`${_dirname}/server/database/${config.database.type}/dataApi/${ctx.params.table}.js`);
        const table     = new Data();
        let result      = null;

        if (table[ctx.params.action] && ( ctx.params.action === 'findOne'  || ctx.params.action === 'find' || ctx.params.action === 'count'))
            result = await table[ctx.params.action]( { 
                table:      ctx.params.table, 
                query:      ctx.params.query,
                sort:       ctx.params.sort,
                skip:       ctx.params.skip,
                limit:      ctx.params.limit,
                auth:       ctx.auth,
                user:       ctx.user ? ctx.user : null,
                ctx,
                io
        } )
        else
            console.error( 'No action found. Called action: ', ctx.params.action )

        ctx.status      = result.error ? 400 : 200;
        ctx.body        = result
    })
    .post("/:table/:action", async (ctx, next) => {
        const Data      = require(`${_dirname}/server/database/${config.database.type}/dataApi/${ctx.params.table}.js`);
        const table     = new Data();
        let result      = {data: null};

        if (table[ctx.params.action]) {
            result = await table[ctx.params.action]( { 
                table:      ctx.request.body.table || ctx.params.table, 
                query:      ctx.request.body.query, 
                body:       ctx.request.body.body, 
                actions:    ctx.request.body.actions,
                sort:       ctx.request.body.sort,
                skip:       ctx.request.body.skip,
                limit:      ctx.request.body.limit,
                auth:       ctx.auth,
                user:       ctx.user ? ctx.user : null,
                ctx, 
                io
            } )
        } else {
            const err = 'No action found. Called action: ' + ctx.params.action
            console.error( err )
            result.error = err
        }

        ctx.status = result.error ? 500 : 200;
        ctx.body = result
    })

module.exports = router;
