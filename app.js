( async () => {
    console.log(    'init App: start');
const Koa               = require("koa");
const cors              = require('@koa/cors');
const app               = new Koa();
const fs                = require('fs');  

if (fs.existsSync(`./server/custom/system/passportStrategy.js`))
    require('./server/custom/system/passportStrategy.js');
else
    require('./server/app/system/passportStrategy');
    
const passport          = require('koa-passport')
app.use(passport.initialize());
app.use(passport.session());
app.use(cors());

const Router            = require('@koa/router');
const koaBody           = require('koa-bodyparser');
const session           = require('koa-session')

const router            = new Router();

const config            = require(_dirname + "/config");
const port              = normalizePort(config.serverPort || "3000");

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

const main   = require(_dirname + '/server/app/main');

await main.checkStructure();
await main.generateTables();

main.moduleLoader();

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

app.listen(port, async () => {
    console.log( "Server starts on port:" + port );

    //generate tables
    // if (!config.noDatabase)
    //     main.initDatabase();
});

function normalizePort(val) {
    const port = parseInt(val, 10);
  
    if (isNaN(port)) {
      // named pipe
      return val;
    }
  
    if (port >= 0) {
      // port number
      return port;
    }
  
    return false;
  }

module.exports = app;
} )();


