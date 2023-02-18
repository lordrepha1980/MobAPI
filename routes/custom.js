const _dirname  = process.cwd()
const Router    = require('@koa/router');
const fs        = require('fs');

const router    = new Router({
    prefix: '/custom'
});

let io;

router.init  = function( socket ) {
    io      = socket;
};

router
    .post("/:class/:action", async (ctx, next) => {
        let result          = {data: null};

        if(!fs.existsSync(`${_dirname}/server/database/customApi/post/${ctx.params.class}.js`)) {
            const error = `Missing endpoint!. Called endpoint: ${ctx.params.class}`
            console.error( error )
            result = { error }
            ctx.status  = 400;
            ctx.body    = result;
            return;
        }

        const Custom        = require(`${_dirname}/server/database/customApi/post/${ctx.params.class}.js`);
        const custom        = new Custom();

        if ( !custom[ctx.params.action] ) {
            const error = `Missing action!. Called action: ${ctx.params.action}`
            console.error( error )
            result = { error }
            ctx.status  = 400;
            ctx.body    = result;
            return;
        }

        result.data = await custom[ctx.params.action]( { body: ctx.request.body, ctx, io } )
        ctx.status  = result.error ? 400 : 200;
        ctx.body    = result;
    })

router
    .get("/:class/:action", async (ctx, next) => {
        let result          = {data: null};

        if(!fs.existsSync(`${_dirname}/server/database/customApi/get/${ctx.params.class}.js`)) {
            const error = `Missing endpoint!. Called endpoint: ${ctx.params.class}`
            console.error( error )
            result = { error }
            ctx.status  = 400;
            ctx.body    = result;
            return;
        }

        const Custom        = require(`${_dirname}/server/database/customApi/get/${ctx.params.class}.js`);
        const custom        = new Custom();

        if ( !custom[ctx.params.action] ) {
            const error = `Missing action!. Called action: ${ctx.params.action}`
            console.error( error )
            result = { error }
            ctx.status  = 400;
            ctx.body    = result;
            return;
        }

        result.data = await custom[ctx.params.action]( { body: ctx.request.body, ctx, io } )
        ctx.status  = result.error ? 400 : 200;
        ctx.body    = result;
    })

module.exports = router;
