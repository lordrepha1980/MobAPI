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
        let path = _dirname + '/server/app/system/auth.js';

        if (fs.existsSync(_dirname + '/server/custom/system/auth.js'))
            path = _dirname + '/server/custom/system/auth.js';

        const Login      = require(path);
        const login     = new Login();

        const user = await login.checkUser(ctx)

        if ( user ) {
            ctx.body = jwt.sign(user, config.auth.secret, config.auth.options);
        } else
            ctx.body = 'User not found'
        
    })

module.exports = router;