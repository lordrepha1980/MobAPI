const { nextTick } = require( 'process' );

( async () => {
console.log(    'init App: start');

const serve             = require('koa-static');
const Koa               = require("koa");
const cors              = require('@koa/cors');
const app               = new Koa();
const fs                = require('fs');

sock                    = null

if (fs.existsSync(`./server/custom/system/passportStrategy.js`))
    require('./server/custom/system/passportStrategy.js');
else
    require('./server/app/system/passportStrategy');

//check if socket file exist
if (fs.existsSync(`./server/custom/socket.js`))
    sock                = require(`./server/custom/socket.js`)( app );
    
const passport          = require('koa-passport')

app.use(passport.initialize());
app.use(passport.session());
app.use(cors());

const Router            = require('@koa/router');
const koaBody           = require('koa-body');
const session           = require('koa-session');

const router            = new Router();

const config            = require(_dirname + "/config");
const port              = normalizePort(config.serverPort || "3000");

app.use(serve(config.publicPath || './public'));
app.use( koaBody({
        multipart: true
}) );

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
const upload            = require("./routes/upload");

if ( sock ) {
    console.log('socket init')
    data.init( sock );
    custom.init( sock );
}

router.use( data.routes() );
router.use( custom.routes() );
router.use( login.routes() );
router.use( upload.routes() );
app.use(session({}, app));

app
    .use(router.routes())
    .use(router.allowedMethods());

app.listen(port, async () => {
    console.log( "Server starts on port:" + port );
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


