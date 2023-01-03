const debug             = require('debug')('app:server:custom/system:socket');
const IO                = require('koa-socket-2');
const io                = new IO({
    ioOptions: {
      cors: {},
    },
});


module.exports  = ( app ) => {
    io.attach(app);
    debug('socket io attached');
   
    io.on("connection", (socket) => {
        sock = socket;
        debug('socket connected');
    });

    io.on("disconnect", (socket) => {
        debug('socket disconnected');
    });

    io.on("message", (ctx, data) => {
        debug(data);
    });

    return io
}

