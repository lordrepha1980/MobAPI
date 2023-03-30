const _dirname  = process.cwd()
const config    = require(_dirname + "/config");
const passport  = require('koa-passport');
const Router    = require('@koa/router');
const debug     = require('debug')('app:routes:login');

const main      = require(_dirname + '/server/app/main');

const Secret    = require( _dirname + '/server/app/system/secret.js');
const secret    = new Secret();

const signin            = new (main.getModule('/system/signin.js'))();
const register          = new (main.getModule('/system/register.js'))();
const login             = new (main.getModule('/system/auth.js'))();
const logout            = new (main.getModule('/system/logout.js'))();


//todoo check custom files

const router    = new Router({
    prefix: '/auth'
});

if ( config.module.useSignin ) {
    router
        .post("/check", 
            passport.authenticate('jwt', { session: false }),
            function(ctx) {
                ctx.body = ctx.isAuthenticated()
            }
        )

    router
        .post(["/signin", "/login"], async ( ctx ) => {
            if ( !ctx.request.body?.body || !ctx.request.body.body.username || !ctx.request.body.body.password ) {
                debug("Please set username and password")
                ctx.status  = 400;
                ctx.body    = { error: "Please set username and password" };
                return
            }
    
            const signinDone = await signin.signin( ctx.request.body );
    
            ctx.status  = signinDone.error ? 400 : 200;
            ctx.body    = signinDone.error ? { error: signinDone.error } : { data: { token: signinDone } };
        })

    router
        .post("/", async (ctx) => {

            const token = await login.checkUser(ctx.request.body);
    
            ctx.status  = token.error ? 400 : 200;
            ctx.body    = token ? { data: { token } } : { error: 'User not found' };
            
        })

    // router
    //     .get("/", async (ctx) => {

    //         const token = await login.checkUser(ctx.request.body);
    
    //         ctx.status  = token.error ? 400 : 200;
    //         ctx.body    = token ? { data: { token } } : 'User not found';
            
    //     })
    
    router
        .get("/logout", async (ctx) => {

            const data  = await logout.logout(ctx);
            
            ctx.status  = data.error ? 400 : 200;
            ctx.body    = data;
            
        })
}

if ( config.module.useRegister ) {  
    router
        .post("/register", async ( ctx ) => {

            if ( !ctx.request.body?.body || !ctx.request.body.body.username || !ctx.request.body.body.password ) {
                debug("Please set username and password")
                ctx.body = {error: "Please set username and password" };
                return
            }

            const registerDone = await register.register( ctx.request.body );
            ctx.status = registerDone.error ? 400 : 200;
            ctx.body = registerDone;
        })
}

router
    .get("/secret", async (ctx) => {
        const secrets   = await secret.generate()

        ctx.status      = secrets.error ? 400 : 200;
        ctx.body        = secrets
    })

module.exports = router;