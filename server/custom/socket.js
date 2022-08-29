
const IO                = require('koa-socket-2');
const io                = new IO({
    ioOptions: {
      cors: {},
    },
});


module.exports  = ( app ) => {
    io.attach(app);
    console.log('socket io attached');
   
    io.on("connection", (socket) => {
        sock = socket;
        console.log('socket connected');
    });

    io.on("disconnect", (socket) => {
        console.log('socket disconnected');
    });

    io.on("message", (ctx, data) => {
        console.log(data);
    });

    return io
}

