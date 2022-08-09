const Koa               = require("koa");
const app               = new Koa();
const fs                = require('fs');  

if (fs.existsSync(`./server/custom/system/passportStrategy.js`))
    require('./server/custom/system/passportStrategy.js');
else
    require('./server/app/system/passportStrategy');
    
const passport          = require('koa-passport')
app.use(passport.initialize());
app.use(passport.session());

const Router            = require('@koa/router');
const koaBody           = require('koa-bodyparser');
const session           = require('koa-session')

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

const main             = require("./server/app/main");
main.moduleLoader()
const data              = require("./routes/data");
const custom            = require("./routes/custom");
const login             = require("./routes/login");

router.use( data.routes() );
router.use( custom.routes() );
router.use( login.routes() );
app.use(session({}, app));


app
  .use(router.routes())
  .use(router.allowedMethods());

module.exports = app;
