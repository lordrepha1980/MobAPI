const _dirname  = process.cwd()
const config    = require(_dirname + "/config.json");
const passport  = require('koa-passport');
const Router    = require('@koa/router');
const jwt       = require('jsonwebtoken');

const router    = new Router({
    prefix: '/auth'
});

router
    .post("/check", 
        passport.authenticate('jwt', { session: false }),
        function(ctx) {
            ctx.body = ctx.isAuthenticated()
        }
    )

router
    .post("/", async (ctx) => {
        
        const Login      = require(`${_dirname}/server/database/${config.database.type}/default/auth.js`);
        const login     = new Login();

        const user = await login.checkUser(ctx)

        if ( user ) {
            ctx.body = jwt.sign(user, config.auth.secret, config.auth.options);
        } else
            ctx.body = 'User not found'
        
    })

module.exports = router;