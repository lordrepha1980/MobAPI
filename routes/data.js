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

        if (table[ctx.params.action] && ( ctx.params.action === 'findOne'  || ctx.params.action === 'find' ))
            result.data = await table[ctx.params.action]( ctx )
        else
            console.error( 'No action found. Called action: ', ctx.params.action )

        ctx.body = result
    })
    .post("/:table/:action", (ctx, next) => {
        ctx.body = "Data API"
    })

module.exports = router;
