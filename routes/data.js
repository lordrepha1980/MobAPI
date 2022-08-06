const _dirname  = process.cwd()
const Router    = require('@koa/router');

const config    = require("../config.json");


const router    = new Router({
    prefix: '/data'
});

/* GET users listing. */
router
    .get("/:table/:action", async (ctx, next) => {
        const Data      = require(`${_dirname}/server/database/${config.database.type}/generatedTables/${ctx.params.table}.js`);
        const table     = new Data();
        let result      = {data: null};

        if (table[ctx.params.action] && ( ctx.params.action === 'findOne'  || ctx.params.action === 'find' || ctx.params.action === 'count'))
            result.data = await table[ctx.params.action]( { table: ctx.params.table, query: ctx.params.query } )
        else
            console.error( 'No action found. Called action: ', ctx.params.action )

        ctx.body = result
    })
    .post("/:table/:action", async (ctx, next) => {
        const Data      = require(`${_dirname}/server/database/${config.database.type}/generatedTables/${ctx.params.table}.js`);
        const table     = new Data();
        let result      = {data: null};

        if (table[ctx.params.action]) {
            result = await table[ctx.params.action]( { table: ctx.params.table, query: ctx.request.body.query, body: ctx.request.body.body, actions: ctx.request.body.actions } )
        } else {
            const err = 'No action found. Called action: ' + ctx.params.action
            console.error( err )
            result.error = err
        }

        ctx.status = result.error ? 500 : 200;
        ctx.body = result
    })

module.exports = router;
