const Koa               = require("koa");
const app               = new Koa();

require('./auth');
const passport          = require('koa-passport')
app.use(passport.initialize());
app.use(passport.session());

const Router            = require('@koa/router');
const koaBody           = require('koa-bodyparser');
const session           = require('koa-session')

const data              = require("./routes/data");
const custom            = require("./routes/custom");
const login             = require("./routes/login");

const router            = new Router();

app.use( koaBody() );

router.use( '/', async ( ctx, next ) => { 
    const auth = function () {
        return new Promise((resolve, reject) => {
            passport.authenticate('jwt', { session: false }, function (err, user, info, status) {
                ctx.auth = user ? true : false;
                ctx.user = user
                resolve({ user, status })
            })(ctx);
        })
    }

    await auth()
    await next()
    
});

router.use( data.routes() );
router.use( custom.routes() );
router.use( login.routes() );
app.use(session({}, app))

app
  .use(router.routes())
  .use(router.allowedMethods());

module.exports = app;
