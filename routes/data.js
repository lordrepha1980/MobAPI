const _dirname  = process.cwd()
const Router    = require('@koa/router');

const config    = require("../config");
const fs        = require("fs")

const router    = new Router({
    prefix: '/data'
});

let io;

router.init  = function( socket ) {
    io    = socket;
};

router
    .get("/:table/:action", async (ctx, next) => {
        let result      = null;

        if(!fs.existsSync(`${_dirname}/server/database/${config.database.type}/dataApi/${ctx.params.table}.js`)) {
            error = `Missing endpoint!. Called endpoint: ${ctx.params.table}`
            console.error( error )
            result = { error }
            ctx.status  = 400;
            ctx.body    = result;
            return;
        }

        const Data      = require(`${_dirname}/server/database/${config.database.type}/dataApi/${ctx.params.table}.js`);
        const table     = new Data();

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
        else {
            error = `Missing action!. Called action: ${ctx.params.action}`
            console.error( error )
            result = { error }
        }

        ctx.status      = result.error ? 400 : 200;
        ctx.body        = result
    })
    .post("/:table/:action", async (ctx, next) => {
        let result      = {data: null};

        if(!fs.existsSync(`${_dirname}/server/database/${config.database.type}/dataApi/${ctx.params.table}.js`)) {
            const error = `Missing endpoint!. Called endpoint: ${ctx.params.table}`
            console.error( error )
            result = { error }
            ctx.status  = 400;
            ctx.body    = result;
            return;
        }

        const Data      = require(`${_dirname}/server/database/${config.database.type}/dataApi/${ctx.params.table}.js`);
        const table     = new Data();
        

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
            const error = `Missing action!. Called action: ${ctx.params.action}`
            console.error( error )
            result = { error }
        }

        ctx.status = result.error ? 400 : 200;
        ctx.body = result
    })

module.exports = router;
