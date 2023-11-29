const { nextTick }      = require( 'process' );
const { init }          = require( './routes/custom' );
const debug             = require( 'debug' )( 'app:server:app' );

( async () => {
debug(    'init App: start');

const http              = require('http')
const serve             = require('koa-static');
const Koa               = require("koa");
const cors              = require('@koa/cors');
const jsonwebtoken      = require('jsonwebtoken');
const app               = new Koa();
const server            = http.createServer(app.callback());
const fs                = require('fs');
let sock                = null;
let init                = null;
let User                = null;

if (fs.existsSync(`./server/custom/system/passportStrategy.js`))
    require('./server/custom/system/passportStrategy.js');
else
    require('./server/app/system/passportStrategy');

//check if socket file exist lordrepha
if (fs.existsSync(`./server/custom/system/socket.js`))
    sock                = require(`./server/custom/system/socket.js`)( server );

if (fs.existsSync(`./server/custom/system/init.js`))
    init                = require(`./server/custom/system/init.js`);

if (fs.existsSync( './server/database/MongoDB/dataApi/user.js'));
    User = require( './server/database/MongoDB/dataApi/user.js');
    
const passport          = require('koa-passport')

app.use(passport.initialize());
app.use(passport.session());
app.use(cors());

const Router            = require('@koa/router');
const koaBody           = require('koa-body');
const session           = require('koa-session');

const router            = new Router();

const config            = require(_dirname + "/config");
const sentry            = require(_dirname + '/server/database/sentry.js');
const port              = normalizePort(config.serverPort || "3000");
const Sentry            = new sentry();
let userDb            = null
try{
    userDb = new User()
}
catch(error) {
    debug('register error:', error)
}
    

app.use(serve(config.publicPath || './public'));
app.use( koaBody({
        multipart: true
}) );

function checkAuthRoutes( path ) { 
    if ( config.authRoutes ) { 
        const exists = config.authRoutes.find( ( route ) => {
            if ( route === path )
                return true
        } )

        return exists ? false : true
    }

    return false
}

router.use( '/', async ( ctx, next ) => { 
    
    const urlArray = ctx.request.url.split('/');

    // check Injections
    let injectionCheck = null
    urlArray.forEach( (url) => {
        injectionCheck = url.match("^[a-zA-Z0-9\/\-_.?=-]+$")
    } )
    
    if ( !injectionCheck )
        return ctx.throw(400, 'Injection detected');

    const auth = function () {
        return new Promise( ( resolve, reject ) => {
            try {
                if ( checkAuthRoutes( ctx.path ) ) {
                    const token = ctx.headers['authorization']?.split(' ')[1]
                    if ( !token ) {
                        throw new Error(`No token ${ctx.path} is a authorization route`)
                    }

                    jsonwebtoken.verify(token, config.auth.secret, config.auth.options)
                }

                passport.authenticate('jwt', { session: false }, function (err, user, info, status) {
                    ctx.auth = user ? true : false;
    
                    if (ctx.auth && userDb) {
                        userDb.findOne({ query: { _id: user._id }, auth: ctx.auth, noCheck: true, actions: {login: true} } ).then(({data: result}) => {
                            ctx.user = result
                            resolve({ user, status })
                        })
                    } else {
                        resolve({ user, status })
                    }
                })(ctx);
            } catch ( error ) {
                console.log('Token invalid')
                reject(error)
            }
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

if ( sock ) {
    debug('socket init')
    data.init( sock );
    custom.init( sock );
}

if ( init ) {
    debug('init')
    init.init(sock);
}

router.use( data.routes() );
router.use( custom.routes() );
router.use( login.routes() );
app.use(session({}, app));

app.on("error", (err, ctx) => {
    Sentry.error(err, ctx)
});

app
    .use(router.routes())
    .use(router.allowedMethods());

server.listen(port, async () => {
    debug( "Server starts on port:" + port );
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


